import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { ShieldCheck, ArrowLeft, Zap, Wifi, ArrowRight, Minus, Plus, HardDrive, Layout, Ruler, Server, MemoryStick, Download, RotateCcw } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { d as db } from './config_Bdc6_zUD.mjs';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function CctvWizard({ products, config }) {
  const catalog = products || [];
  const PRECIO_MANO_OBRA = config?.manoObra ? Number(config.manoObra) : 120;
  const PRECIO_CABLE_BASE = config?.precioMetroCable ? Number(config.precioMetroCable) : 2.5;
  const MENSAJE_WHATSAPP = config?.mensajeWhatsapp || "Hola Quilla, coticé este proyecto:";
  const PRECIO_MICROSD = 45;
  const PRECIO_DISCO_1TB = 220;
  const PRECIO_DISCO_2TB = 350;
  const PRECIO_NVR_BASE = 280;
  const [step, setStep] = useState(1);
  const initialConfig = {
    placeType: "",
    hasPower: false,
    hasWifi: false,
    daysRecording: 15,
    avgDistance: 20,
    isHighHeight: false,
    storageType: "nvr",
    // 'nvr', 'sd', 'none'
    installFinish: "standard"
    // 'standard' (Grapas), 'canaleta', 'tube' <--- NUEVO ESTADO
  };
  const [wizardConfig, setWizardConfig] = useState(initialConfig);
  const [cart, setCart] = useState([]);
  const [clientData, setClientData] = useState({ name: "", phone: "" });
  const [isSaving, setIsSaving] = useState(false);
  const getCameras = () => {
    return catalog.filter((p) => {
      if (["storage", "cable", "kit_por_camara", "accessory", "ups", "rack", "monitor", "storage_card", "storage_disk", "nvr"].includes(p.category)) return false;
      if (!wizardConfig.hasPower) return p.category === "solar_4g";
      if (wizardConfig.placeType === "rental" && p.category === "wired_wifi") return false;
      if (wizardConfig.hasPower && wizardConfig.hasWifi) return p.category !== "solar_4g";
      return true;
    });
  };
  const getQty = (id) => cart.filter((item) => item.id === id).length;
  const addOne = (product) => setCart([...cart, product]);
  const removeOne = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };
  const resetCotizador = () => {
    setStep(1);
    setCart([]);
    setWizardConfig(initialConfig);
    setClientData({ name: "", phone: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const calculateQuote = () => {
    let materialCost = 0;
    let serviceCost = 0;
    const numCameras = cart.length;
    let itemsList = [];
    cart.forEach((item) => {
      materialCost += item.price;
    });
    const groupedCameras = {};
    cart.forEach((item) => {
      if (!groupedCameras[item.name]) groupedCameras[item.name] = { ...item, qty: 0 };
      groupedCameras[item.name].qty += 1;
    });
    Object.values(groupedCameras).forEach((cam) => {
      itemsList.push({ name: cam.name, qty: cam.qty, unitPrice: cam.price, total: cam.price * cam.qty, type: "Equipo" });
    });
    if (numCameras > 0) {
      if (wizardConfig.storageType === "sd") {
        const costSD = PRECIO_MICROSD * numCameras;
        materialCost += costSD;
        itemsList.push({ name: `Memoria MicroSD Cls10 (${numCameras} unid.)`, qty: numCameras, unitPrice: PRECIO_MICROSD, total: costSD, type: "Almacenamiento" });
      } else if (wizardConfig.storageType === "nvr") {
        materialCost += PRECIO_NVR_BASE;
        itemsList.push({ name: "Grabador NVR (Central)", qty: 1, unitPrice: PRECIO_NVR_BASE, total: PRECIO_NVR_BASE, type: "Equipo" });
        const hddPrice = wizardConfig.daysRecording > 15 ? PRECIO_DISCO_2TB : PRECIO_DISCO_1TB;
        const hddName = wizardConfig.daysRecording > 15 ? "Disco Duro 2TB (Vigilancia)" : "Disco Duro 1TB (Vigilancia)";
        materialCost += hddPrice;
        itemsList.push({ name: hddName, qty: 1, unitPrice: hddPrice, total: hddPrice, type: "Almacenamiento" });
        let precioMetroFinal = PRECIO_CABLE_BASE;
        let finishName = "Estándar (Grapas)";
        if (wizardConfig.installFinish === "canaleta") {
          precioMetroFinal += 5;
          finishName = "Canaleta Adhesiva";
        } else if (wizardConfig.installFinish === "tube") {
          precioMetroFinal += 12;
          finishName = "Tubería PVC/Conduit";
        }
        const totalMetros = wizardConfig.avgDistance * numCameras;
        const costCable = totalMetros * precioMetroFinal;
        materialCost += costCable;
        itemsList.push({ name: `Cableado + ${finishName} (${totalMetros}m)`, qty: totalMetros, unitPrice: precioMetroFinal, total: costCable, type: "Infraestructura" });
        const kitPrice = 35;
        materialCost += kitPrice * numCameras;
        itemsList.push({ name: "Kit Materiales de Instalación", qty: numCameras, unitPrice: kitPrice, total: kitPrice * numCameras, type: "Insumos" });
      }
    }
    let laborPerCamera = PRECIO_MANO_OBRA;
    if (wizardConfig.isHighHeight) laborPerCamera += 50;
    if (!wizardConfig.hasPower) laborPerCamera += 40;
    if (wizardConfig.installFinish === "tube" && wizardConfig.storageType === "nvr") laborPerCamera += 30;
    serviceCost += laborPerCamera * numCameras;
    itemsList.push({ name: "Servicio de Instalación y Configuración", qty: numCameras, unitPrice: laborPerCamera, total: serviceCost, type: "Servicio" });
    if (numCameras > 0 && wizardConfig.storageType === "nvr") {
      serviceCost += 150;
      itemsList.push({ name: "Configuración de Rack/NVR Central", qty: 1, unitPrice: 150, total: 150, type: "Servicio" });
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
        status: "new"
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
    const text = `${MENSAJE_WHATSAPP} 
👤 Cliente: ${clientData.name} 
📷 Cámaras: ${cart.length} 
🛠️ Acabado: ${wizardConfig.installFinish} 
💰 Total Aprox: S/ ${quote.total.toFixed(2)}`;
    return `https://wa.me/+51951413458?text=${encodeURIComponent(text)}`;
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, "F");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("QUILLA ELECTRIC", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text("Soluciones Tecnológicas & Seguridad Electrónica", 14, 26);
    doc.text("RUC: 10XXXXXXXXX | Cel: 951 413 458", 14, 32);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Cliente: ${clientData.name || "----"}`, 14, 50);
    doc.text(`Fecha: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, 160, 50);
    doc.setLineWidth(0.5);
    doc.line(14, 52, 196, 52);
    const tableBody = quote.itemsList.map((item) => [item.qty, item.name, item.type, `S/ ${item.unitPrice.toFixed(2)}`, `S/ ${item.total.toFixed(2)}`]);
    autoTable(doc, {
      startY: 60,
      head: [["Cant", "Descripción", "Tipo", "P. Unit", "Total"]],
      body: tableBody,
      theme: "striped",
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
      columnStyles: { 0: { halign: "center" }, 4: { halign: "right" } }
    });
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFillColor(248, 250, 252);
    doc.rect(120, finalY, 76, 35, "F");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Materiales:", 125, finalY + 10);
    doc.text(`S/ ${quote.materialCost.toFixed(2)}`, 190, finalY + 10, { align: "right" });
    doc.text("Mano de Obra:", 125, finalY + 18);
    doc.text(`S/ ${quote.serviceCost.toFixed(2)}`, 190, finalY + 18, { align: "right" });
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL:", 125, finalY + 30);
    doc.text(`S/ ${quote.total.toFixed(2)}`, 190, finalY + 30, { align: "right" });
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Esta cotización tiene una validez de 15 días. Precios incluyen IGV.", 105, 280, { align: "center" });
    doc.save(`Cotizacion_Quilla_${clientData.name || "Cliente"}.pdf`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 font-sans min-h-[600px] flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50 rounded-t-2xl", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "text-blue-500" }),
        " Cotizador ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-500", children: "PRO" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        step > 1 && /* @__PURE__ */ jsxs("button", { onClick: () => setStep(step - 1), className: "text-slate-400 hover:text-white flex items-center gap-1 text-sm font-bold px-3 py-1 rounded hover:bg-slate-800 transition-colors", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
          " Atrás"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs font-mono bg-blue-900/30 px-3 py-1 rounded text-blue-300 border border-blue-500/30", children: [
          "PASO ",
          step,
          "/4"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 flex-1", children: [
      step === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-blue-200 mb-6", children: "1. Diagnóstico del Lugar" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setWizardConfig({ ...wizardConfig, placeType: "house" }), className: `p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${wizardConfig.placeType === "house" ? "border-blue-500 bg-blue-600/10" : "border-slate-800 bg-slate-900 hover:border-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "🏠" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Casa Propia / Negocio" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setWizardConfig({ ...wizardConfig, placeType: "rental" }), className: `p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${wizardConfig.placeType === "rental" ? "border-blue-500 bg-blue-600/10" : "border-slate-800 bg-slate-900 hover:border-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "🏢" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Alquiler / Departamento" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-6", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl cursor-pointer hover:bg-slate-900 transition border border-slate-800", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: wizardConfig.hasPower, onChange: (e) => setWizardConfig({ ...wizardConfig, hasPower: e.target.checked }), className: "accent-blue-500 w-5 h-5" }),
            /* @__PURE__ */ jsx(Zap, { className: wizardConfig.hasPower ? "text-yellow-400" : "text-slate-500" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: "Punto Eléctrico Disponible" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Hay enchufes o cables 220V cerca." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl cursor-pointer hover:bg-slate-900 transition border border-slate-800", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: wizardConfig.hasWifi, onChange: (e) => setWizardConfig({ ...wizardConfig, hasWifi: e.target.checked }), className: "accent-blue-500 w-5 h-5" }),
            /* @__PURE__ */ jsx(Wifi, { className: wizardConfig.hasWifi ? "text-green-400" : "text-slate-500" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: "Señal Wi-Fi Estable" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Llega internet donde irán las cámaras." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setStep(2), disabled: !wizardConfig.placeType, className: "w-full bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-500 py-4 rounded-xl font-bold mt-8 flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20 transition-all", children: [
          "Siguiente Paso ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
        ] })
      ] }),
      step === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-blue-200 mb-2", children: "2. Elige tus Cámaras" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-6", children: "Selecciona la cantidad según tu necesidad:" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar", children: getCameras().map((cam) => {
          const qty = getQty(cam.id);
          return /* @__PURE__ */ jsxs("div", { className: `relative p-4 rounded-xl border transition-all flex flex-col gap-3 ${qty > 0 ? "border-blue-500 bg-blue-900/10" : "border-slate-800 bg-slate-900 hover:border-slate-700"}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("img", { src: cam.image, className: "w-16 h-16 object-contain rounded bg-white p-1" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-white", children: cam.name }),
                /* @__PURE__ */ jsxs("div", { className: "font-bold text-blue-400 mt-1", children: [
                  "S/ ",
                  cam.price
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-3 mt-2 border-t border-slate-800 pt-3", children: qty === 0 ? /* @__PURE__ */ jsx("button", { onClick: () => addOne(cam), className: "bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition-colors w-full", children: "+ Agregar" }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-slate-950 rounded-lg p-1 border border-blue-500/50", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => removeOne(cam), className: "p-1 hover:bg-slate-800 rounded text-red-400", children: /* @__PURE__ */ jsx(Minus, { size: 16 }) }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-white w-4 text-center text-sm", children: qty }),
              /* @__PURE__ */ jsx("button", { onClick: () => addOne(cam), className: "p-1 hover:bg-slate-800 rounded text-green-400", children: /* @__PURE__ */ jsx(Plus, { size: 16 }) })
            ] }) })
          ] }, cam.id);
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-6 pt-6 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm", children: cart.length }),
            "Cámaras"
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setStep(3), disabled: cart.length === 0, className: "bg-blue-600 px-8 py-3 rounded-lg font-bold disabled:bg-slate-800 disabled:text-slate-600 transition-colors hover:bg-blue-500 shadow-lg shadow-blue-900/20", children: "Continuar" })
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-blue-200", children: "3. Detalles de Ingeniería" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-6 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(HardDrive, { size: 18, className: "text-blue-400" }),
            " Método de Grabación"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxs("label", { className: `p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === "sd" ? "border-blue-500 bg-blue-900/20" : "border-slate-800"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", checked: wizardConfig.storageType === "sd", onChange: () => setWizardConfig({ ...wizardConfig, storageType: "sd" }) }),
              /* @__PURE__ */ jsx("div", { className: "font-bold text-white text-sm", children: "Chips MicroSD" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Sin cables de red" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === "nvr" ? "border-blue-500 bg-blue-900/20" : "border-slate-800"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", checked: wizardConfig.storageType === "nvr", onChange: () => setWizardConfig({ ...wizardConfig, storageType: "nvr" }) }),
              /* @__PURE__ */ jsx("div", { className: "font-bold text-white text-sm", children: "NVR Central" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Profesional (Cableado)" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `p-3 rounded-xl border cursor-pointer ${wizardConfig.storageType === "none" ? "border-blue-500 bg-blue-900/20" : "border-slate-800"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", checked: wizardConfig.storageType === "none", onChange: () => setWizardConfig({ ...wizardConfig, storageType: "none" }) }),
              /* @__PURE__ */ jsx("div", { className: "font-bold text-white text-sm", children: "Sin Grabación" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Solo visualización" })
            ] })
          ] })
        ] }),
        wizardConfig.storageType === "nvr" && /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-6 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Layout, { size: 18, className: "text-yellow-400" }),
            " Tipo de Acabado (Estética)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === "standard" ? "border-yellow-500 bg-yellow-900/10" : "border-slate-800"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "finish", checked: wizardConfig.installFinish === "standard", onChange: () => setWizardConfig({ ...wizardConfig, installFinish: "standard" }), className: "accent-yellow-500" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-white", children: "Estándar (Grapas)" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Cable expuesto ordenado. Precio Base." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === "canaleta" ? "border-yellow-500 bg-yellow-900/10" : "border-slate-800"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "finish", checked: wizardConfig.installFinish === "canaleta", onChange: () => setWizardConfig({ ...wizardConfig, installFinish: "canaleta" }), className: "accent-yellow-500" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-white", children: "Canaleta Adhesiva" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Estético para interiores. (+S/5 x mt)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${wizardConfig.installFinish === "tube" ? "border-yellow-500 bg-yellow-900/10" : "border-slate-800"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "finish", checked: wizardConfig.installFinish === "tube", onChange: () => setWizardConfig({ ...wizardConfig, installFinish: "tube" }), className: "accent-yellow-500" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-white", children: "Tubería PVC (Industrial)" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: "Protección total exteriores. (+S/12 x mt)" })
              ] })
            ] })
          ] })
        ] }),
        wizardConfig.storageType !== "none" && /* @__PURE__ */ jsx("div", { className: "bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-slate-300", children: "Días de Grabación" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-bold", children: [
              wizardConfig.daysRecording,
              " Días"
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "7", max: "45", step: "1", value: wizardConfig.daysRecording, onChange: (e) => setWizardConfig({ ...wizardConfig, daysRecording: parseInt(e.target.value) }), className: "w-full h-2 bg-slate-700 rounded-lg accent-blue-500" })
        ] }) }),
        wizardConfig.storageType === "nvr" && /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-6 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-slate-300 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Ruler, { size: 16, className: "text-yellow-400" }),
              " Distancia Promedio"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-yellow-400 font-bold", children: [
              wizardConfig.avgDistance,
              " Metros"
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "5", max: "100", step: "5", value: wizardConfig.avgDistance, onChange: (e) => setWizardConfig({ ...wizardConfig, avgDistance: parseInt(e.target.value) }), className: "w-full h-2 bg-slate-700 rounded-lg accent-yellow-500" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Tu Nombre / Empresa", className: "w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none", onChange: (e) => setClientData({ ...clientData, name: e.target.value }), value: clientData.name }),
          /* @__PURE__ */ jsx("input", { type: "tel", placeholder: "Tu Celular", className: "w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none", onChange: (e) => setClientData({ ...clientData, phone: e.target.value }), value: clientData.phone })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleFinalize, disabled: !clientData.name || !clientData.phone || isSaving, className: "w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/20", children: isSaving ? "Guardando Cotización..." : "VER RESUMEN FINAL 📊" })
      ] }),
      step === 4 && /* @__PURE__ */ jsxs("div", { className: "animate-fadeIn space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider", children: "Topología del Sistema" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 flex-wrap justify-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-lg flex items-center justify-center ${wizardConfig.storageType === "nvr" ? "bg-purple-600" : "bg-blue-600"}`, children: wizardConfig.storageType === "nvr" ? /* @__PURE__ */ jsx(Server, { size: 24 }) : /* @__PURE__ */ jsx(MemoryStick, { size: 24 }) }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-slate-300", children: wizardConfig.storageType === "nvr" ? "Grabador" : "Chips SD" })
            ] }),
            wizardConfig.storageType === "nvr" ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-24", children: [
              /* @__PURE__ */ jsx("div", { className: `h-1 w-full ${wizardConfig.installFinish === "tube" ? "bg-slate-400" : "bg-yellow-600"} rounded` }),
              /* @__PURE__ */ jsx("div", { className: "text-[9px] text-slate-500 mt-1", children: wizardConfig.installFinish === "standard" ? "Cable UTP" : wizardConfig.installFinish === "canaleta" ? "Canaleta" : "Tubería" })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-24", children: [
              /* @__PURE__ */ jsx("div", { className: "h-1 w-full border-t-2 border-dashed border-blue-500" }),
              /* @__PURE__ */ jsx("div", { className: "text-[9px] text-blue-400 mt-1", children: "Señal WiFi" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex -space-x-2", children: [
                [...Array(Math.min(3, cart.length))].map((_, i) => /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center", children: "📷" }, i)),
                cart.length > 3 && /* @__PURE__ */ jsxs("div", { className: "w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs", children: [
                  "+",
                  cart.length - 3
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-slate-300", children: [
                cart.length,
                " Cámaras"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 rounded-xl border border-slate-800 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-800 border-b border-slate-700 font-bold text-white flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "Descripción del Proyecto" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: clientData.name })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left text-slate-400", children: [
            /* @__PURE__ */ jsx("thead", { className: "text-xs text-slate-200 uppercase bg-slate-950", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center", children: "Cant" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Item" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Subtotal" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-800", children: quote.itemsList.map((item, idx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-800/50", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center font-bold text-white", children: item.qty }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsx("div", { className: "text-slate-200 font-medium", children: item.name }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: item.type })
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right font-mono text-slate-300", children: [
                "S/ ",
                item.total.toFixed(2)
              ] })
            ] }, idx)) }),
            /* @__PURE__ */ jsx("tfoot", { className: "bg-slate-950 text-white font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-4 py-4 text-right", children: "TOTAL ESTIMADO:" }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-4 text-right text-green-400 text-lg", children: [
                "S/ ",
                quote.total.toFixed(2)
              ] })
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center mt-8", children: [
          /* @__PURE__ */ jsxs("button", { onClick: generatePDF, className: "bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all", children: [
            /* @__PURE__ */ jsx(Download, { size: 20, className: "text-red-400" }),
            " Descargar PDF"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: getWhatsappLink(), target: "_blank", className: "bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all hover:scale-105", children: [
            /* @__PURE__ */ jsx(Zap, { size: 20 }),
            " Solicitar Instalación"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-slate-800 mt-8 pt-6 flex justify-center", children: /* @__PURE__ */ jsxs("button", { onClick: resetCotizador, className: "text-slate-500 hover:text-white flex items-center gap-2 hover:bg-slate-900 px-4 py-2 rounded-lg transition-all", children: [
          /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
          " Nueva Cotización"
        ] }) })
      ] })
    ] })
  ] });
}

export { CctvWizard as C };
