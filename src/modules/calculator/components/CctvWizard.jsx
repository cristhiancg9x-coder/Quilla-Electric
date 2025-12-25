import React, { useState } from 'react';
import { 
  Zap, Wifi, HardDrive, Ruler, ArrowRight, ArrowLeft, 
  CheckCircle, Download, User, ShieldCheck, Plus, Minus, 
  RotateCcw, Server, MemoryStick, Save, XCircle, Layout, Box,
  Clock, Award, Lock
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { db } from '@lib/firebase/config'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

export default function CctvWizard({ products, config }) {
  const catalog = products || []; 
  
  // PRECIOS BASE
  const PRECIO_MANO_OBRA = config?.manoObra ? Number(config.manoObra) : 120;
  const PRECIO_CABLE_BASE = config?.precioMetroCable ? Number(config.precioMetroCable) : 2.5; 
  const MENSAJE_WHATSAPP = config?.mensajeWhatsapp || "Hola Quilla, coticé este proyecto:";

  const PRECIO_MICROSD = 45; 
  const PRECIO_DISCO_1TB = 220;
  const PRECIO_DISCO_2TB = 350;
  const PRECIO_NVR_BASE = 280; 

  // 1. CAMBIO: Iniciamos en el Paso 0 (Bienvenida)
  const [step, setStep] = useState(0);
  
  const initialConfig = {
    placeType: '',          
    hasPower: false,       
    hasWifi: false,        
    daysRecording: 15,     
    avgDistance: 20,       
    isHighHeight: false,
    storageType: 'nvr', 
    installFinish: 'standard' 
  };

  const [wizardConfig, setWizardConfig] = useState(initialConfig);
  const [cart, setCart] = useState([]); 
  const [clientData, setClientData] = useState({ name: '', phone: '' });
  const [isSaving, setIsSaving] = useState(false); 

  // --- LÓGICA DE FILTRADO Y CÁLCULOS (INTACTA) ---
  const getCameras = () => {
    return catalog.filter(p => {
      if (['storage', 'cable', 'kit_por_camara', 'accessory', 'ups', 'rack', 'monitor', 'storage_card', 'storage_disk', 'nvr'].includes(p.category)) return false;
      if (!wizardConfig.hasPower) return p.category === 'solar_4g'; 
      if (wizardConfig.placeType === 'rental' && p.category === 'wired_wifi') return false; 
      if (wizardConfig.hasPower && wizardConfig.hasWifi) return p.category !== 'solar_4g'; 
      return true;
    });
  };

  const getQty = (id) => cart.filter(item => item.id === id).length;
  const addOne = (product) => setCart([...cart, product]);
  const removeOne = (product) => {
    const index = cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const resetCotizador = () => {
    setStep(0); // Volvemos a la bienvenida
    setCart([]);
    setWizardConfig(initialConfig);
    setClientData({ name: '', phone: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

// 3. LÓGICA DE CÁLCULO MEJORADA (Lógica Híbrida Solar vs Estándar)
  const calculateQuote = () => {
    let materialCost = 0;
    let serviceCost = 0;
    const numCameras = cart.length;
    let itemsList = []; 

    // A. CÁLCULO DE EQUIPOS (Cámaras)
    cart.forEach(item => { materialCost += item.price; });
    
    // Agrupamos para listado visual en el PDF/Resumen
    const groupedCameras = {};
    cart.forEach(item => {
        if (!groupedCameras[item.name]) groupedCameras[item.name] = { ...item, qty: 0 };
        groupedCameras[item.name].qty += 1;
    });
    Object.values(groupedCameras).forEach(cam => {
        itemsList.push({ name: cam.name, qty: cam.qty, unitPrice: cam.price, total: cam.price * cam.qty, type: 'Equipo' });
    });

    // --- SEPARACIÓN DE TIPOS DE CÁMARAS ---
    // Identificamos cuáles son solares y cuáles estándar para cobrar diferente
    const solarCameras = cart.filter(c => c.category === 'solar_4g');
    const standardCameras = cart.filter(c => c.category !== 'solar_4g');
    
    const qtySolar = solarCameras.length;
    const qtyStandard = standardCameras.length;

    // B. ALMACENAMIENTO & INFRAESTRUCTURA (Solo para cámaras estándar)
    // Las solares suelen llevar SD, las estándar pueden ir a NVR o SD
    
    if (numCameras > 0) {
        // LÓGICA 1: Tarjetas SD (Aplica a todas si el usuario eligió SD)
        if (wizardConfig.storageType === 'sd') {
            const costSD = (PRECIO_MICROSD * numCameras);
            materialCost += costSD;
            itemsList.push({ name: `Memoria MicroSD Cls10 (${numCameras} unid.)`, qty: numCameras, unitPrice: PRECIO_MICROSD, total: costSD, type: 'Almacenamiento' });
        
        // LÓGICA 2: NVR (Solo aplica a cámaras estándar)
        } else if (wizardConfig.storageType === 'nvr') {
            
            // Si hay cámaras estándar, cobramos NVR y Disco
            if (qtyStandard > 0) {
                materialCost += PRECIO_NVR_BASE;
                itemsList.push({ name: 'Grabador NVR (Central)', qty: 1, unitPrice: PRECIO_NVR_BASE, total: PRECIO_NVR_BASE, type: 'Equipo' });

                const hddPrice = wizardConfig.daysRecording > 15 ? PRECIO_DISCO_2TB : PRECIO_DISCO_1TB;
                const hddName = wizardConfig.daysRecording > 15 ? 'Disco Duro 2TB (Vigilancia)' : 'Disco Duro 1TB (Vigilancia)';
                materialCost += hddPrice;
                itemsList.push({ name: hddName, qty: 1, unitPrice: hddPrice, total: hddPrice, type: 'Almacenamiento' });

                // --- ACABADOS (Solo calculamos metros para las estándar) ---
                let precioMetroFinal = PRECIO_CABLE_BASE;
                let finishName = "Estándar (Grapas)";
                
                if (wizardConfig.installFinish === 'canaleta') {
                    precioMetroFinal += 5; 
                    finishName = "Canaleta Adhesiva";
                } else if (wizardConfig.installFinish === 'tube') {
                    precioMetroFinal += 12; 
                    finishName = "Tubería PVC";
                }

                // IMPORTANTE: Solo calculamos metros para las cámaras que usan cable (Standard)
                const totalMetros = wizardConfig.avgDistance * qtyStandard; 
                const costCable = totalMetros * precioMetroFinal;
                materialCost += costCable;
                itemsList.push({ name: `Cableado + ${finishName} (${totalMetros}m para ${qtyStandard} cams)`, qty: totalMetros, unitPrice: precioMetroFinal, total: costCable, type: 'Infraestructura' });
                
                const kitPrice = 35; 
                materialCost += (kitPrice * qtyStandard);
                itemsList.push({ name: 'Kit Materiales de Instalación', qty: qtyStandard, unitPrice: kitPrice, total: kitPrice * qtyStandard, type: 'Insumos' });
            }

            // Si hay cámaras solares mezcladas, esas llevan SD aunque el sistema sea NVR (generalmente)
            if (qtySolar > 0) {
                 const costSDSolar = (PRECIO_MICROSD * qtySolar);
                 materialCost += costSDSolar;
                 itemsList.push({ name: `MicroSD para Solar (${qtySolar} unid.)`, qty: qtySolar, unitPrice: PRECIO_MICROSD, total: costSDSolar, type: 'Almacenamiento' });
            }
        }
    }

    // C. MANO DE OBRA (Cálculo Inteligente por Tipo)
    
    // 1. Costo para Cámaras Estándar
    if (qtyStandard > 0) {
        let laborStandard = PRECIO_MANO_OBRA;
        if (wizardConfig.isHighHeight) laborStandard += 50; 
        
        // Aquí SI cobramos el extra si no hay luz
        if (!wizardConfig.hasPower) laborStandard += 40; 
        
        if (wizardConfig.installFinish === 'tube' && wizardConfig.storageType === 'nvr') laborStandard += 30;

        const totalLaborStandard = laborStandard * qtyStandard;
        serviceCost += totalLaborStandard;
        itemsList.push({ name: `Instalación Cámaras Cableadas (${qtyStandard})`, qty: qtyStandard, unitPrice: laborStandard, total: totalLaborStandard, type: 'Servicio' });
    }

    // 2. Costo para Cámaras Solares (Lógica Nueva)
    if (qtySolar > 0) {
        let laborSolar = PRECIO_MANO_OBRA;
        
        // A las solares NO les cobramos "Falta de punto eléctrico"
        // Pero SI les cobramos altura si aplica
        if (wizardConfig.isHighHeight) laborSolar += 50;
        
        // Podríamos cobrar un extra pequeño por el montaje del panel si quisieras
        // laborSolar += 20; // Opcional: Montaje de panel

        const totalLaborSolar = laborSolar * qtySolar;
        serviceCost += totalLaborSolar;
        itemsList.push({ name: `Instalación Cámaras Solares (${qtySolar})`, qty: qtySolar, unitPrice: laborSolar, total: totalLaborSolar, type: 'Servicio' });
    }

    // Configuración Central (Solo si hay NVR)
    if (qtyStandard > 0 && wizardConfig.storageType === 'nvr') {
        serviceCost += 150; 
        itemsList.push({ name: 'Configuración de Rack/NVR Central', qty: 1, unitPrice: 150, total: 150, type: 'Servicio' });
    }

    return { materialCost, serviceCost, total: materialCost + serviceCost, itemsList };
  };

  const quote = calculateQuote();

  const handleFinalize = async () => {
    if (!clientData.name || !clientData.phone) return alert("Por favor completa tus datos.");
    setIsSaving(true);
    try {
        await addDoc(collection(db, "prospectos"), {
            date: serverTimestamp(),
            clientName: clientData.name,
            clientPhone: clientData.phone,
            totalAmount: quote.total,
            itemsSummary: `${cart.length} Cams | ${wizardConfig.storageType} | ${wizardConfig.installFinish}`,
            installType: wizardConfig.installFinish,
            status: 'new'
        });
        setStep(4);
    } catch (error) {
        console.error("Error guardando lead:", error);
        alert("Hubo un error de conexión, pero te mostraremos el resumen.");
        setStep(4);
    }
    setIsSaving(false);
  };

  const getWhatsappLink = () => {
    const text = `${MENSAJE_WHATSAPP} \n` +
                 `👤 Cliente: ${clientData.name} \n` +
                 `📷 Cámaras: ${cart.length} \n` +
                 `🛠️ Acabado: ${wizardConfig.installFinish} \n` +
                 `💰 Total Aprox: S/ ${quote.total.toFixed(2)}`;
    return `https://wa.me/+51951413458?text=${encodeURIComponent(text)}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 40, 'F');
    doc.setFontSize(22); doc.setTextColor(255, 255, 255); doc.text("QUILLA ELECTRIC", 14, 20);
    doc.setFontSize(10); doc.setTextColor(200, 200, 200); doc.text("Soluciones Tecnológicas & Seguridad Electrónica", 14, 26);
    doc.text("RUC: 10XXXXXXXXX | Cel: 951 413 458", 14, 32);

    doc.setTextColor(0, 0, 0); doc.setFontSize(11);
    doc.text(`Cliente: ${clientData.name || '----'}`, 14, 50);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, 50);
    doc.setLineWidth(0.5); doc.line(14, 52, 196, 52);

    const tableBody = quote.itemsList.map(item => [item.qty, item.name, item.type, `S/ ${item.unitPrice.toFixed(2)}`, `S/ ${item.total.toFixed(2)}`]);

    autoTable(doc, {
      startY: 60,
      head: [['Cant', 'Descripción', 'Tipo', 'P. Unit', 'Total']],
      body: tableBody,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
      columnStyles: { 0: { halign: 'center' }, 4: { halign: 'right' } }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFillColor(248, 250, 252); doc.rect(120, finalY, 76, 35, 'F');
    doc.setFontSize(10); doc.setTextColor(100);
    doc.text("Materiales:", 125, finalY + 10); doc.text(`S/ ${quote.materialCost.toFixed(2)}`, 190, finalY + 10, { align: 'right' });
    doc.text("Mano de Obra:", 125, finalY + 18); doc.text(`S/ ${quote.serviceCost.toFixed(2)}`, 190, finalY + 18, { align: 'right' });
    doc.setFontSize(14); doc.setTextColor(37, 99, 235); doc.setFont("helvetica", "bold");
    doc.text("TOTAL:", 125, finalY + 30); doc.text(`S/ ${quote.total.toFixed(2)}`, 190, finalY + 30, { align: 'right' });

    doc.setFontSize(8); doc.setTextColor(150); doc.text("Esta cotización tiene una validez de 15 días. Precios incluyen IGV.", 105, 280, { align: 'center' });
    doc.save(`Cotizacion_Quilla_${clientData.name || 'Cliente'}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 font-sans min-h-[600px] flex flex-col">
      
      {/* HEADER DINÁMICO */}
      <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50 rounded-t-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="text-blue-500"/> Cotizador <span className="text-blue-500">PRO</span>
        </h2>
        <div className="flex items-center gap-2">
            {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-bold px-3 py-1 rounded hover:bg-slate-800 transition-colors">
                    <ArrowLeft size={16} /> Atrás
                </button>
            )}
            {/* Solo mostramos el paso si ya empezamos */}
            {step > 0 && (
                <div className="text-xs font-mono bg-blue-900/30 px-3 py-1 rounded text-blue-300 border border-blue-500/30">
                PASO {step}/4
                </div>
            )}
        </div>
      </div>

      <div className="p-6 md:p-8 flex-1">
        
        {/* ============================================== */}
        {/* PASO 0: BIENVENIDA (ONBOARDING STARTUP STYLE)  */}
        {/* ============================================== */}
        {step === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center animate-fadeIn">
                
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl">
                        <ShieldCheck size={64} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Hola, vamos a blindar tu seguridad
                </h1>
                
                <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
                    Olvídate de las cotizaciones complicadas. Responde 3 preguntas simples y diseñaremos el sistema de cámaras perfecto para ti.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2 hover:border-blue-500/30 transition-colors">
                        <Clock className="text-blue-400" size={24} />
                        <h4 className="font-bold text-white">Rápido</h4>
                        <p className="text-xs text-slate-500">Menos de 1 minuto</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2 hover:border-purple-500/30 transition-colors">
                        <Award className="text-purple-400" size={24} />
                        <h4 className="font-bold text-white">Preciso</h4>
                        <p className="text-xs text-slate-500">Precios reales</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2 hover:border-green-500/30 transition-colors">
                        <Lock className="text-green-400" size={24} />
                        <h4 className="font-bold text-white">Seguro</h4>
                        <p className="text-xs text-slate-500">Tus datos protegidos</p>
                    </div>
                </div>

                <button 
                    onClick={() => setStep(1)}
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900"
                >
                    <span className="text-lg">Comenzar Ahora</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

            </div>
        )}

        {/* PASO 1: DIAGNÓSTICO */}
        {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-semibold text-blue-200 mb-6">1. Diagnóstico del Lugar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => setWizardConfig({...wizardConfig, placeType: 'house'})} className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${wizardConfig.placeType === 'house' ? 'border-blue-500 bg-blue-600/10' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}><span className="text-3xl">🏠</span><span className="font-bold">Casa Propia / Negocio</span></button>
                <button onClick={() => setWizardConfig({...wizardConfig, placeType: 'rental'})} className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${wizardConfig.placeType === 'rental' ? 'border-blue-500 bg-blue-600/10' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}><span className="text-3xl">🏢</span><span className="font-bold">Alquiler / Departamento</span></button>
            </div>
            <div className="space-y-3 mt-6">
                <label className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl cursor-pointer hover:bg-slate-900 transition border border-slate-800">
                    <input type="checkbox" checked={wizardConfig.hasPower} onChange={(e) => setWizardConfig({...wizardConfig, hasPower: e.target.checked})} className="accent-blue-500 w-5 h-5"/>
                    <Zap className={wizardConfig.hasPower ? "text-yellow-400" : "text-slate-500"}/>
                    <div><div className="font-bold text-sm">Punto Eléctrico Disponible</div><div className="text-xs text-slate-400">Hay enchufes o cables 220V cerca.</div></div>
                </label>
                <label className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl cursor-pointer hover:bg-slate-900 transition border border-slate-800">
                    <input type="checkbox" checked={wizardConfig.hasWifi} onChange={(e) => setWizardConfig({...wizardConfig, hasWifi: e.target.checked})} className="accent-blue-500 w-5 h-5"/>
                    <Wifi className={wizardConfig.hasWifi ? "text-green-400" : "text-slate-500"}/>
                    <div><div className="font-bold text-sm">Señal Wi-Fi Estable</div><div className="text-xs text-slate-400">Llega internet donde irán las cámaras.</div></div>
                </label>
            </div>
            <button onClick={() => setStep(2)} disabled={!wizardConfig.placeType} className="w-full bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-500 py-4 rounded-xl font-bold mt-8 flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20 transition-all">Siguiente Paso <ArrowRight size={18}/></button>
            </div>
        )}

        {/* PASO 2: SELECCIÓN DE CÁMARAS */}
        {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">2. Elige tus Cámaras</h3>
            <p className="text-sm text-slate-400 mb-6">Selecciona la cantidad según tu necesidad:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {getCameras().map(cam => {
                const qty = getQty(cam.id);
                return (
                    <div key={cam.id} className={`relative p-4 rounded-xl border transition-all flex flex-col gap-3 ${qty > 0 ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}>
                    <div className="flex items-start gap-4"><img src={cam.image} className="w-16 h-16 object-contain rounded bg-white p-1"/><div className="flex-1"><h4 className="font-bold text-sm text-white">{cam.name}</h4><div className="font-bold text-blue-400 mt-1">S/ {cam.price}</div></div></div>
                    <div className="flex items-center justify-end gap-3 mt-2 border-t border-slate-800 pt-3">
                        {qty === 0 ? (<button onClick={() => addOne(cam)} className="bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition-colors w-full">+ Agregar</button>) : 
                        (<div className="flex items-center gap-3 bg-slate-950 rounded-lg p-1 border border-blue-500/50"><button onClick={() => removeOne(cam)} className="p-1 hover:bg-slate-800 rounded text-red-400"><Minus size={16}/></button><span className="font-bold text-white w-4 text-center text-sm">{qty}</span><button onClick={() => addOne(cam)} className="p-1 hover:bg-slate-800 rounded text-green-400"><Plus size={16}/></button></div>)}
                    </div>
                    </div>
                );
                })}
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-800"><span className="font-bold text-white flex items-center gap-2"><div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">{cart.length}</div>Cámaras</span><button onClick={() => setStep(3)} disabled={cart.length === 0} className="bg-blue-600 px-8 py-3 rounded-lg font-bold disabled:bg-slate-800 disabled:text-slate-600 transition-colors hover:bg-blue-500 shadow-lg shadow-blue-900/20">Continuar</button></div>
            </div>
        )}

        {/* PASO 3: DETALLES DE INGENIERÍA */}
        {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
            <h3 className="text-lg font-semibold text-blue-200">3. Detalles de Ingeniería</h3>
            
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2"><HardDrive size={18} className="text-blue-400"/> Método de Grabación</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className={`p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === 'sd' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-800'}`}><input type="radio" className="hidden" checked={wizardConfig.storageType === 'sd'} onChange={() => setWizardConfig({...wizardConfig, storageType: 'sd'})}/><div className="font-bold text-white text-sm">Chips MicroSD</div><div className="text-xs text-slate-400">Sin cables de red</div></label>
                    <label className={`p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === 'nvr' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-800'}`}><input type="radio" className="hidden" checked={wizardConfig.storageType === 'nvr'} onChange={() => setWizardConfig({...wizardConfig, storageType: 'nvr'})}/><div className="font-bold text-white text-sm">NVR Central</div><div className="text-xs text-slate-400">Profesional (Cableado)</div></label>
                    <label className={`p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === 'none' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-800'}`}><input type="radio" className="hidden" checked={wizardConfig.storageType === 'none'} onChange={() => setWizardConfig({...wizardConfig, storageType: 'none'})}/><div className="font-bold text-white text-sm">Sin Grabación</div><div className="text-xs text-slate-400">Solo visualización</div></label>
                </div>
            </div>

            {/* SELECCIÓN DE ACABADOS (SOLO SI ES NVR) */}
            {wizardConfig.storageType === 'nvr' && (
                 <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Layout size={18} className="text-yellow-400"/> Tipo de Acabado (Estética)</h4>
                    <div className="space-y-3">
                         <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === 'standard' ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-800'}`}>
                            <input type="radio" name="finish" checked={wizardConfig.installFinish === 'standard'} onChange={() => setWizardConfig({...wizardConfig, installFinish: 'standard'})} className="accent-yellow-500"/>
                            <div><div className="font-bold text-sm text-white">Estándar (Grapas)</div><div className="text-xs text-slate-400">Cable expuesto ordenado. Precio Base.</div></div>
                         </label>
                         <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === 'canaleta' ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-800'}`}>
                            <input type="radio" name="finish" checked={wizardConfig.installFinish === 'canaleta'} onChange={() => setWizardConfig({...wizardConfig, installFinish: 'canaleta'})} className="accent-yellow-500"/>
                            <div><div className="font-bold text-sm text-white">Canaleta Adhesiva</div><div className="text-xs text-slate-400">Estético para interiores. (+S/5 x mt)</div></div>
                         </label>
                         <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === 'tube' ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-800'}`}>
                            <input type="radio" name="finish" checked={wizardConfig.installFinish === 'tube'} onChange={() => setWizardConfig({...wizardConfig, installFinish: 'tube'})} className="accent-yellow-500"/>
                            <div><div className="font-bold text-sm text-white">Tubería PVC (Industrial)</div><div className="text-xs text-slate-400">Protección total exteriores. (+S/12 x mt)</div></div>
                         </label>
                    </div>
                 </div>
            )}

            {wizardConfig.storageType !== 'none' && (
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6">
                    <div>
                        <div className="flex justify-between mb-2"><label className="text-sm font-bold text-slate-300">Días de Grabación</label><span className="text-blue-400 font-bold">{wizardConfig.daysRecording} Días</span></div>
                        <input type="range" min="7" max="45" step="1" value={wizardConfig.daysRecording} onChange={(e) => setWizardConfig({...wizardConfig, daysRecording: parseInt(e.target.value)})} className="w-full h-2 bg-slate-700 rounded-lg accent-blue-500"/>
                    </div>
                </div>
            )}
            
            {wizardConfig.storageType === 'nvr' && (
                 <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                     <div className="flex justify-between mb-2"><label className="text-sm font-bold text-slate-300 flex items-center gap-2"><Ruler size={16} className="text-yellow-400"/> Distancia Promedio</label><span className="text-yellow-400 font-bold">{wizardConfig.avgDistance} Metros</span></div>
                     <input type="range" min="5" max="100" step="5" value={wizardConfig.avgDistance} onChange={(e) => setWizardConfig({...wizardConfig, avgDistance: parseInt(e.target.value)})} className="w-full h-2 bg-slate-700 rounded-lg accent-yellow-500"/>
                 </div>
            )}
            
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Tu Nombre / Empresa" className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none" onChange={(e) => setClientData({...clientData, name: e.target.value})} value={clientData.name}/>
                <input type="tel" placeholder="Tu Celular" className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none" onChange={(e) => setClientData({...clientData, phone: e.target.value})} value={clientData.phone}/>
            </div>

            <button onClick={handleFinalize} disabled={!clientData.name || !clientData.phone || isSaving} className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/20">
                {isSaving ? "Guardando Cotización..." : "VER RESUMEN FINAL 📊"}
            </button>
            </div>
        )}

        {/* PASO 4: RESUMEN DETALLADO */}
        {step === 4 && (
            <div className="animate-fadeIn space-y-6">
            
            {/* MAPA VISUAL (NUEVO) */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Topología del Sistema</h4>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <div className="flex flex-col items-center gap-2">
                         <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${wizardConfig.storageType === 'nvr' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                             {wizardConfig.storageType === 'nvr' ? <Server size={24}/> : <MemoryStick size={24}/>}
                         </div>
                         <div className="text-[10px] font-bold text-slate-300">{wizardConfig.storageType === 'nvr' ? 'Grabador' : 'Chips SD'}</div>
                    </div>
                    {wizardConfig.storageType === 'nvr' ? (
                         <div className="flex flex-col items-center w-24">
                             <div className={`h-1 w-full ${wizardConfig.installFinish === 'tube' ? 'bg-slate-400' : 'bg-yellow-600'} rounded`}></div>
                             <div className="text-[9px] text-slate-500 mt-1">{wizardConfig.installFinish === 'standard' ? 'Cable UTP' : wizardConfig.installFinish === 'canaleta' ? 'Canaleta' : 'Tubería'}</div>
                         </div>
                    ) : (
                         <div className="flex flex-col items-center w-24"><div className="h-1 w-full border-t-2 border-dashed border-blue-500"></div><div className="text-[9px] text-blue-400 mt-1">Señal WiFi</div></div>
                    )}
                    <div className="flex flex-col items-center gap-2">
                         <div className="flex -space-x-2">
                             {[...Array(Math.min(3, cart.length))].map((_,i) => <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center">📷</div>)}
                             {cart.length > 3 && <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs">+{cart.length-3}</div>}
                         </div>
                         <div className="text-[10px] font-bold text-slate-300">{cart.length} Cámaras</div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-4 bg-slate-800 border-b border-slate-700 font-bold text-white flex justify-between"><span>Descripción del Proyecto</span><span className="text-blue-400">{clientData.name}</span></div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-200 uppercase bg-slate-950">
                            <tr><th className="px-4 py-3 text-center">Cant</th><th className="px-4 py-3">Item</th><th className="px-4 py-3 text-right">Subtotal</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {quote.itemsList.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/50">
                                    <td className="px-4 py-3 text-center font-bold text-white">{item.qty}</td>
                                    <td className="px-4 py-3"><div className="text-slate-200 font-medium">{item.name}</div><div className="text-xs text-slate-500">{item.type}</div></td>
                                    <td className="px-4 py-3 text-right font-mono text-slate-300">S/ {item.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-950 text-white font-bold">
                            <tr><td colSpan="2" className="px-4 py-4 text-right">TOTAL ESTIMADO:</td><td className="px-4 py-4 text-right text-green-400 text-lg">S/ {quote.total.toFixed(2)}</td></tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <button onClick={generatePDF} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all"><Download size={20} className="text-red-400"/> Descargar PDF</button>
                <a href={getWhatsappLink()} target="_blank" className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all hover:scale-105"><Zap size={20}/> Solicitar Instalación</a>
            </div>

            <div className="border-t border-slate-800 mt-8 pt-6 flex justify-center">
                <button onClick={resetCotizador} className="text-slate-500 hover:text-white flex items-center gap-2 hover:bg-slate-900 px-4 py-2 rounded-lg transition-all"><RotateCcw size={16}/> Nueva Cotización</button>
            </div>
            </div>
        )}
      </div>
    </div>
  );
}