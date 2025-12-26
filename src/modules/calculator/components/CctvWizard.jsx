import React, { useState } from 'react';
import { 
  Zap, Wifi, HardDrive, Ruler, ArrowRight, ArrowLeft, 
  CheckCircle, Download, User, ShieldCheck, Plus, Minus, 
  RotateCcw, Server, MemoryStick, Save, XCircle, Layout, Box,
  Clock, Award, Lock, FileText, Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { db } from '@/lib/firebase/config'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

// ==========================================
// 1. UTILIDADES
// ==========================================

const getImageData = (url) => {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); 
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg'); 
      resolve(dataURL);
    };
    img.onerror = () => resolve(null); 
    img.src = url;
  });
};

const generateTechnicalScope = (config, qtyCams) => {
  let text = `Suministro e instalación de sistema de videovigilancia profesional compuesto por ${qtyCams} cámara(s). `;
  
  if (config.installFinish === 'tube') {
    text += "La implementación incluye canalización industrial mediante tubería PVC de alto impacto, garantizando protección mecánica. ";
  } else if (config.installFinish === 'canaleta') {
    text += "El cableado será protegido mediante canaletas adhesivas decorativas, asegurando estética en interiores. ";
  } else {
    text += "Instalación estándar con fijación mediante grapas de acero y ordenamiento de cableado. ";
  }

  if (config.isHighHeight) text += "Incluye protocolos de seguridad para trabajos en altura (>3m). ";
  if (!config.hasPower) text += "Incluye habilitación de punto eléctrico desde la matriz más cercana. ";

  if (config.storageType === 'nvr') {
    text += "Grabación centralizada en NVR con disco duro especializado para vigilancia 24/7. ";
  } else if (config.storageType === 'sd') {
    text += "Grabación descentralizada mediante memorias MicroSD en cada cámara. ";
  }

  text += "Incluye configuración remota en celulares y capacitación de usuario final.";
  return text;
};

// ==========================================
// 2. COMPONENTE PRINCIPAL
// ==========================================

// Ahora recibimos 'supplies' (Insumos) además de productos y config
export default function CctvWizard({ products = [], supplies = [], config }) {
  
  const catalog = products; 
  
  // PRECIOS BASE (Respaldo por si no se encuentran en la BD)
  const PRECIO_MANO_OBRA = config?.manoObra ? Number(config.manoObra) : 120;
  const PRECIO_NVR_BASE = 280; 
  const PRECIO_DISCO_1TB = 220;
  const PRECIO_DISCO_2TB = 350;
  const PRECIO_MICROSD = 45;
  const MENSAJE_WHATSAPP = config?.mensajeWhatsapp || "Hola Quilla, coticé este proyecto:";

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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // --- BUSCADOR INTELIGENTE DE PRECIOS DE INSUMOS ---
  const findSupplyPrice = (keyword, defaultPrice) => {
    if (!supplies || supplies.length === 0) return defaultPrice;
    // Busca un insumo que contenga la palabra clave (ej. "tubo", "utp")
    const found = supplies.find(s => s.name.toLowerCase().includes(keyword.toLowerCase()));
    return found ? Number(found.price) : defaultPrice;
  };

  // --- FILTRADO DE CÁMARAS ---
  const getCameras = () => {
    return catalog.filter(p => {
      // Filtramos categorías que no sean cámaras de venta
      if (['storage', 'cable', 'kit', 'accessory', 'ups', 'rack', 'monitor', 'disk', 'nvr'].includes(p.category)) return false;
      
      // Lógica de compatibilidad
      if (!wizardConfig.hasPower && p.category !== 'solar_4g') return false; 
      if (wizardConfig.placeType === 'rental' && p.category === 'wired_wifi') return false; 
      if (wizardConfig.hasPower && wizardConfig.hasWifi && p.category === 'solar_4g') return false; 
      
      return true;
    });
  };

  const getQty = (id) => cart.filter(item => item.id === id).length;
  const addOne = (product) => setCart([...cart, product]);
  const removeOne = (product) => {
    const index = cart.findIndex(item => item.id === product.id);
    if (index > -1) { const newCart = [...cart]; newCart.splice(index, 1); setCart(newCart); }
  };

  const resetCotizador = () => {
    setStep(0); setCart([]); setWizardConfig(initialConfig); setClientData({ name: '', phone: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- CÁLCULO MATEMÁTICO (El Cerebro) ---
  const calculateQuote = () => {
    let materialCost = 0;
    let serviceCost = 0;
    const numCameras = cart.length;
    let itemsList = []; 

    // 1. EQUIPOS (Cámaras)
    const groupedCameras = {};
    cart.forEach(item => {
        materialCost += item.price;
        if (!groupedCameras[item.name]) groupedCameras[item.name] = { ...item, qty: 0 };
        groupedCameras[item.name].qty += 1;
    });
    
    Object.values(groupedCameras).forEach(cam => {
        itemsList.push({ 
            name: cam.name, 
            qty: cam.qty, 
            unitPrice: cam.price, 
            total: cam.price * cam.qty, 
            type: 'Equipo',
            image: cam.image 
        });
    });

    const solarCameras = cart.filter(c => c.category === 'solar_4g');
    const standardCameras = cart.filter(c => c.category !== 'solar_4g');
    const qtyStandard = standardCameras.length;
    const qtySolar = solarCameras.length;

    // 2. INFRAESTRUCTURA (Solo si es NVR o Cableado)
    if (wizardConfig.storageType === 'nvr' && qtyStandard > 0) {
        
        // A. NVR y Disco
        materialCost += PRECIO_NVR_BASE;
        itemsList.push({ name: 'Grabador NVR (Central)', qty: 1, unitPrice: PRECIO_NVR_BASE, total: PRECIO_NVR_BASE, type: 'Equipo' });

        const hddPrice = wizardConfig.daysRecording > 15 ? PRECIO_DISCO_2TB : PRECIO_DISCO_1TB;
        const hddName = wizardConfig.daysRecording > 15 ? 'Disco Duro 2TB (Vigilancia)' : 'Disco Duro 1TB (Vigilancia)';
        materialCost += hddPrice;
        itemsList.push({ name: hddName, qty: 1, unitPrice: hddPrice, total: hddPrice, type: 'Almacenamiento' });

        // B. CÁLCULO DE MATERIALES (Ingeniería de Costos)
        const totalMetros = wizardConfig.avgDistance * qtyStandard;
        
        // Cable UTP
        const precioCable = findSupplyPrice('cable utp', 1.50); // Precio por metro
        const costoCable = totalMetros * precioCable;
        materialCost += costoCable;
        itemsList.push({ name: `Cable UTP Cat6 (x${totalMetros}m)`, qty: totalMetros, unitPrice: precioCable, total: costoCable, type: 'Materiales' });

        // Canalización (Tubos o Canaletas)
        if (wizardConfig.installFinish === 'tube') {
            const precioTubo = findSupplyPrice('tubo pvc', 8.50); // Precio por tubo de 3m
            const numTubos = Math.ceil(totalMetros / 3); // Cada tubo mide 3m
            const costoTubos = numTubos * precioTubo;
            materialCost += costoTubos;
            itemsList.push({ name: `Tubería PVC 3/4" (x${numTubos} unid)`, qty: numTubos, unitPrice: precioTubo, total: costoTubos, type: 'Canalización' });
        
        } else if (wizardConfig.installFinish === 'canaleta') {
            const precioCanaleta = findSupplyPrice('canaleta', 6.00); // Precio por canaleta de 2m
            const numCanaletas = Math.ceil(totalMetros / 2); 
            const costoCanaletas = numCanaletas * precioCanaleta;
            materialCost += costoCanaletas;
            itemsList.push({ name: `Canaleta Adhesiva (x${numCanaletas} unid)`, qty: numCanaletas, unitPrice: precioCanaleta, total: costoCanaletas, type: 'Canalización' });
        }

        // Accesorios (Cajas, Baluns, DC)
        // Buscamos precios unitarios en la BD
        const precioCaja = findSupplyPrice('caja de paso', 3.50);
        const precioBalun = findSupplyPrice('video balun', 10.00); // Par
        const precioDC = findSupplyPrice('conector dc', 2.50);     // Par
        
        // Costo del kit por cámara
        const costoKitUnitario = precioCaja + precioBalun + precioDC;
        const costoTotalKits = costoKitUnitario * qtyStandard;
        
        materialCost += costoTotalKits;
        itemsList.push({ 
            name: 'Kit de Conexión (Caja, Balun, DC)', 
            qty: qtyStandard, 
            unitPrice: costoKitUnitario, 
            total: costoTotalKits, 
            type: 'Accesorios' 
        });
    }

    // 3. MICROSD (Para Solares o Wifi Independiente)
    const camsNeedSD = wizardConfig.storageType === 'sd' ? numCameras : qtySolar;
    if (camsNeedSD > 0) {
        const costoSD = camsNeedSD * PRECIO_MICROSD;
        materialCost += costoSD;
        itemsList.push({ name: `Memoria MicroSD Cls10 (${camsNeedSD} unid.)`, qty: camsNeedSD, unitPrice: PRECIO_MICROSD, total: costoSD, type: 'Almacenamiento' });
    }

    // 4. MANO DE OBRA
    if (qtyStandard > 0) {
        let labor = PRECIO_MANO_OBRA;
        if (wizardConfig.isHighHeight) labor += 50; 
        if (wizardConfig.installFinish === 'tube') labor += 30; // Tubo es más trabajoso

        const totalLabor = labor * qtyStandard;
        serviceCost += totalLabor;
        itemsList.push({ name: `Instalación Técnica (${qtyStandard} ptos)`, qty: qtyStandard, unitPrice: labor, total: totalLabor, type: 'Servicio' });
        
        if (wizardConfig.storageType === 'nvr') {
            serviceCost += 150; 
            itemsList.push({ name: 'Configuración Central y Red', qty: 1, unitPrice: 150, total: 150, type: 'Servicio' });
        }
    }

    if (qtySolar > 0) {
        let laborSolar = PRECIO_MANO_OBRA;
        if (wizardConfig.isHighHeight) laborSolar += 50;
        
        const totalLaborSolar = laborSolar * qtySolar;
        serviceCost += totalLaborSolar;
        itemsList.push({ name: `Montaje Cámara Solar (${qtySolar} ptos)`, qty: qtySolar, unitPrice: laborSolar, total: totalLaborSolar, type: 'Servicio' });
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
            itemsSummary: `${cart.length} Cams | ${wizardConfig.installFinish}`,
            status: 'new'
        });
        setStep(4);
    } catch (error) {
        console.error("Error guardando lead:", error);
        setStep(4); // Avanzamos igual
    }
    setIsSaving(false);
  };

  const getWhatsappLink = () => {
    const text = `${MENSAJE_WHATSAPP} \n` +
                 `👤 Cliente: ${clientData.name} \n` +
                 `📷 Cámaras: ${cart.length} \n` +
                 `💰 Total Aprox: S/ ${quote.total.toFixed(2)}`;
    return `https://wa.me/+51951413458?text=${encodeURIComponent(text)}`;
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    const doc = new jsPDF();
    const logoData = await getImageData('/logo.png'); 
    
    // Header
    doc.setFillColor(5, 11, 20); doc.rect(0, 0, 210, 45, 'F');
    if (logoData) doc.addImage(logoData, 'PNG', 10, 8, 25, 25);
    doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255); doc.setFontSize(22); doc.text("COTIZACIÓN TÉCNICA", 45, 18);
    doc.setFontSize(10); doc.setTextColor(0, 240, 255); doc.text("Quilla Electric | Ingeniería & Seguridad Electrónica", 45, 25);
    doc.setFont("helvetica", "normal"); doc.setTextColor(200, 200, 200); doc.text("RUC: 10XXXXXXXXX | Cel: 951 413 458", 45, 32);

    // Cliente
    doc.setTextColor(0, 0, 0); doc.setFontSize(11); doc.setFont("helvetica", "bold");
    doc.text(`Cliente: ${clientData.name}`, 14, 55); doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, 55);
    doc.line(14, 58, 196, 58);

    // Alcance
    doc.setFontSize(10); doc.setTextColor(5, 11, 20); doc.text("ALCANCE TÉCNICO:", 14, 66);
    doc.setFont("helvetica", "normal"); doc.setTextColor(80, 80, 80);
    const splitScope = doc.splitTextToSize(generateTechnicalScope(wizardConfig, cart.length), 180);
    doc.text(splitScope, 14, 72);

    const tableStartY = 72 + (splitScope.length * 5) + 5;

    // Tabla
    const itemsWithImages = await Promise.all(quote.itemsList.map(async (item) => {
        let imgData = null;
        if (item.image) imgData = await getImageData(item.image);
        return { ...item, imgData };
    }));

    const tableBody = itemsWithImages.map(item => [
        '', item.qty, item.name + (item.type ? `\n(${item.type})` : ''), 
        `S/ ${item.unitPrice.toFixed(2)}`, `S/ ${item.total.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: tableStartY,
      head: [['Ref.', 'Cant.', 'Descripción', 'Unitario', 'Total']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], textColor: [0, 240, 255] },
      styles: { fontSize: 9, valign: 'middle' },
      columnStyles: { 0: { cellWidth: 15 }, 1: { halign: 'center' }, 3: { halign: 'right' }, 4: { halign: 'right' } },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 0 && itemsWithImages[data.row.index]?.imgData) {
            doc.addImage(itemsWithImages[data.row.index].imgData, 'JPEG', data.cell.x + 2, data.cell.y + 2, 11, 11);
        }
      }
    });

    // Totales
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10); doc.setTextColor(100);
    doc.text(`Materiales: S/ ${quote.materialCost.toFixed(2)}`, 190, finalY + 8, { align: 'right' });
    doc.text(`Servicios: S/ ${quote.serviceCost.toFixed(2)}`, 190, finalY + 15, { align: 'right' });
    doc.setFontSize(14); doc.setTextColor(0, 0, 0); doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: S/ ${quote.total.toFixed(2)}`, 190, finalY + 28, { align: 'right' });

    doc.save(`Cotizacion_Quilla_${clientData.name}.pdf`);
    setIsGeneratingPDF(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 font-sans min-h-[600px] flex flex-col">
      
      {/* HEADER */}
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
            {step > 0 && <div className="text-xs font-mono bg-blue-900/30 px-3 py-1 rounded text-blue-300 border border-blue-500/30">PASO {step}/4</div>}
        </div>
      </div>

      <div className="p-6 md:p-8 flex-1">
        
        {step === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center animate-fadeIn">
                <ShieldCheck size={64} className="text-blue-500 mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Hola, vamos a blindar tu seguridad
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mb-10">
                    Cotización de ingeniería precisa. Responde 3 preguntas y obtén el diseño de tu sistema.
                </p>
                <button onClick={() => setStep(1)} className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all hover:scale-105">
                    <span className="text-lg">Comenzar Ahora</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        )}

        {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
                <h3 className="text-lg font-semibold text-blue-200 mb-6">1. Diagnóstico del Lugar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => setWizardConfig({...wizardConfig, placeType: 'house'})} className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${wizardConfig.placeType === 'house' ? 'border-blue-500 bg-blue-600/10' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}><span className="text-3xl">🏠</span><span className="font-bold">Casa Propia / Negocio</span></button>
                    <button onClick={() => setWizardConfig({...wizardConfig, placeType: 'rental'})} className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${wizardConfig.placeType === 'rental' ? 'border-blue-500 bg-blue-600/10' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}><span className="text-3xl">🏢</span><span className="font-bold">Alquiler / Departamento</span></button>
                </div>
                <div className="space-y-3 mt-6">
                    <label className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl cursor-pointer hover:bg-slate-900 transition border border-slate-800"><input type="checkbox" checked={wizardConfig.hasPower} onChange={(e) => setWizardConfig({...wizardConfig, hasPower: e.target.checked})} className="accent-blue-500 w-5 h-5"/> <Zap className="text-yellow-400"/> <span>Punto Eléctrico Disponible</span></label>
                    <label className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl cursor-pointer hover:bg-slate-900 transition border border-slate-800"><input type="checkbox" checked={wizardConfig.hasWifi} onChange={(e) => setWizardConfig({...wizardConfig, hasWifi: e.target.checked})} className="accent-blue-500 w-5 h-5"/> <Wifi className="text-green-400"/> <span>Señal Wi-Fi Estable</span></label>
                </div>
                <button onClick={() => setStep(2)} disabled={!wizardConfig.placeType} className="w-full bg-blue-600 disabled:bg-slate-800 py-4 rounded-xl font-bold mt-8 flex justify-center items-center gap-2 transition-all">Siguiente Paso <ArrowRight size={18}/></button>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">2. Elige tus Cámaras</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {getCameras().map(cam => {
                        const qty = getQty(cam.id);
                        return (
                            <div key={cam.id} className={`relative p-4 rounded-xl border transition-all flex flex-col gap-3 ${qty > 0 ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}>
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-white rounded p-1 flex items-center justify-center shrink-0">
                                        {cam.image ? <img src={cam.image} className="w-full h-full object-contain"/> : <Box className="text-slate-400"/>}
                                    </div>
                                    <div className="flex-1"><h4 className="font-bold text-sm text-white">{cam.name}</h4><div className="font-bold text-blue-400 mt-1">S/ {cam.price}</div></div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-2 border-t border-slate-800 pt-3">
                                    {qty === 0 ? (<button onClick={() => addOne(cam)} className="bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition-colors w-full">+ Agregar</button>) : 
                                    (<div className="flex items-center gap-3 bg-slate-950 rounded-lg p-1 border border-blue-500/50"><button onClick={() => removeOne(cam)} className="p-1 hover:bg-slate-800 rounded text-red-400"><Minus size={16}/></button><span className="font-bold text-white w-4 text-center text-sm">{qty}</span><button onClick={() => addOne(cam)} className="p-1 hover:bg-slate-800 rounded text-green-400"><Plus size={16}/></button></div>)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-800"><span className="font-bold text-white flex items-center gap-2"><div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">{cart.length}</div>Cámaras</span><button onClick={() => setStep(3)} disabled={cart.length === 0} className="bg-blue-600 px-8 py-3 rounded-lg font-bold disabled:bg-slate-800 transition-colors">Continuar</button></div>
            </div>
        )}

        {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
                <h3 className="text-lg font-semibold text-blue-200">3. Ingeniería</h3>
                
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2"><HardDrive size={18} className="text-blue-400"/> Sistema de Grabación</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label className={`p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === 'sd' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-800'}`}><input type="radio" className="hidden" checked={wizardConfig.storageType === 'sd'} onChange={() => setWizardConfig({...wizardConfig, storageType: 'sd'})}/><div className="font-bold text-white text-sm">MicroSD (Individual)</div></label>
                        <label className={`p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === 'nvr' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-800'}`}><input type="radio" className="hidden" checked={wizardConfig.storageType === 'nvr'} onChange={() => setWizardConfig({...wizardConfig, storageType: 'nvr'})}/><div className="font-bold text-white text-sm">NVR (Centralizado)</div></label>
                        <label className={`p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === 'none' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-800'}`}><input type="radio" className="hidden" checked={wizardConfig.storageType === 'none'} onChange={() => setWizardConfig({...wizardConfig, storageType: 'none'})}/><div className="font-bold text-white text-sm">Solo Ver (Sin grabar)</div></label>
                    </div>
                </div>

                {wizardConfig.storageType === 'nvr' && (
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Layout size={18} className="text-yellow-400"/> Acabado de Instalación</h4>
                        <div className="space-y-3">
                            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === 'standard' ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-800'}`}><input type="radio" checked={wizardConfig.installFinish === 'standard'} onChange={() => setWizardConfig({...wizardConfig, installFinish: 'standard'})} className="accent-yellow-500"/> Estándar (Grapas)</label>
                            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === 'canaleta' ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-800'}`}><input type="radio" checked={wizardConfig.installFinish === 'canaleta'} onChange={() => setWizardConfig({...wizardConfig, installFinish: 'canaleta'})} className="accent-yellow-500"/> Canaleta Adhesiva</label>
                            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === 'tube' ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-800'}`}><input type="radio" checked={wizardConfig.installFinish === 'tube'} onChange={() => setWizardConfig({...wizardConfig, installFinish: 'tube'})} className="accent-yellow-500"/> Tubería PVC</label>
                        </div>
                    </div>
                )}

                {wizardConfig.storageType === 'nvr' && (
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <div className="flex justify-between mb-2"><label className="text-sm font-bold text-slate-300 flex items-center gap-2"><Ruler size={16} className="text-yellow-400"/> Distancia Promedio (Metros)</label><span className="text-yellow-400 font-bold">{wizardConfig.avgDistance}m</span></div>
                        <input type="range" min="5" max="100" step="5" value={wizardConfig.avgDistance} onChange={(e) => setWizardConfig({...wizardConfig, avgDistance: parseInt(e.target.value)})} className="w-full h-2 bg-slate-700 rounded-lg accent-yellow-500"/>
                        <p className="text-xs text-slate-500 mt-2">El sistema calculará automáticamente cables, tubos y cajas necesarios.</p>
                    </div>
                )}

                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Tu Nombre" className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none" onChange={(e) => setClientData({...clientData, name: e.target.value})} value={clientData.name}/>
                    <input type="tel" placeholder="Tu Celular" className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none" onChange={(e) => setClientData({...clientData, phone: e.target.value})} value={clientData.phone}/>
                </div>

                <button onClick={handleFinalize} disabled={!clientData.name || !clientData.phone || isSaving} className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/20">
                    {isSaving ? "Calculando..." : "VER RESUMEN DETALLADO 📊"}
                </button>
            </div>
        )}

        {step === 4 && (
            <div className="animate-fadeIn space-y-6">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Topología del Sistema</h4>
                    <div className="flex items-center gap-4 justify-center">
                        <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-600"><Server size={24}/></div><span className="text-[10px] font-bold text-slate-300">Central</span></div>
                        <div className="flex flex-col items-center w-24"><div className="h-1 w-full bg-yellow-600 rounded"></div><span className="text-[9px] text-slate-500 mt-1">Conexión Física</span></div>
                        <div className="flex flex-col items-center gap-2"><div className="flex -space-x-2">{[...Array(Math.min(3, cart.length))].map((_,i) => <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center">📷</div>)}</div><span className="text-[10px] font-bold text-slate-300">{cart.length} Cams</span></div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="p-4 bg-slate-800 border-b border-slate-700 font-bold text-white flex justify-between"><span>Detalle del Proyecto</span><span className="text-blue-400">{clientData.name}</span></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-400">
                            <thead className="text-xs text-slate-200 uppercase bg-slate-950"><tr><th className="px-4 py-3 text-center">Cant</th><th className="px-4 py-3">Item</th><th className="px-4 py-3 text-right">Subtotal</th></tr></thead>
                            <tbody className="divide-y divide-slate-800">
                                {quote.itemsList.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/50">
                                        <td className="px-4 py-3 text-center font-bold text-white">{item.qty}</td>
                                        <td className="px-4 py-3"><div className="text-slate-200 font-medium">{item.name}</div><div className="text-xs text-slate-500">{item.type}</div></td>
                                        <td className="px-4 py-3 text-right font-mono text-slate-300">S/ {item.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-950 text-white font-bold"><tr><td colSpan="2" className="px-4 py-4 text-right">TOTAL:</td><td className="px-4 py-4 text-right text-green-400 text-lg">S/ {quote.total.toFixed(2)}</td></tr></tfoot>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all">
                        {isGeneratingPDF ? <Loader2 className="animate-spin"/> : <Download className="text-red-400"/>} {isGeneratingPDF ? "Generando..." : "Descargar PDF"}
                    </button>
                    <a href={getWhatsappLink()} target="_blank" className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 hover:scale-105 transition-all"><Zap size={20}/> Solicitar Instalación</a>
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