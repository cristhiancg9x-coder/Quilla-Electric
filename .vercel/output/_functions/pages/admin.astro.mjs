import { b as createAstro, c as createComponent, d as renderHead, e as renderSlot, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_DjG7uRHx.mjs';
/* empty css                                 */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Activity, Zap, Unlock, Lock, Package, Plus, Save, X, Edit2, Trash2, Database, UploadCloud, Check, AlertTriangle, Settings, Wrench, MessageCircle, User, Clock, CheckCircle, Phone, Eye, LogOut, LayoutDashboard, Menu, Search, Bell } from 'lucide-react';
import { d as db } from '../chunks/config_BZ9jvQ5Q.mjs';
import { onSnapshot, collection, doc, updateDoc, setDoc, deleteDoc, writeBatch, query, orderBy, limit } from 'firebase/firestore';
import { p as productsData } from '../chunks/cctv-products_cBGzD3Uk.mjs';
import { l as logout } from '../chunks/authStore_Doj8OU2W.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://quillaelectric.site");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>${title} | Quilla Admin</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-slate-950 text-white font-['Inter'] overflow-hidden"> <main class="h-screen w-full"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/PROYECTOS/quilla-astro/src/layouts/AdminLayout.astro", void 0);

function SaaSManager() {
  const [tools, setTools] = useState([
    { id: "cctv-wizard", name: "Cotizador CCTV 3D", status: "public", revenue: 1500, users: 45 },
    { id: "pozo-tierra", name: "Generador Protocolos Pozo", status: "locked", revenue: 450, users: 12 },
    { id: "fugas-bot", name: "Detector Fugas IA", status: "private", revenue: 0, users: 0 }
  ]);
  useEffect(() => {
    const updatedTools = tools.map((t) => ({
      ...t,
      status: localStorage.getItem(`permiso_${t.id}`) || t.status
    }));
    setTools(updatedTools);
  }, []);
  const changeStatus = (id, newStatus) => {
    setTools(tools.map((tool) => {
      if (tool.id === id) {
        localStorage.setItem(`permiso_${tool.id}`, newStatus);
        return { ...tool, status: newStatus };
      }
      return tool;
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity", children: /* @__PURE__ */ jsx(DollarSign, { size: 80 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-slate-400 text-xs font-bold uppercase tracking-wider", children: "Ingresos Mensuales" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-green-400 mt-2 font-mono", children: "S/ 2,450.00" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-green-500 text-xs mt-2", children: [
          /* @__PURE__ */ jsx(TrendingUp, { size: 12 }),
          " +12% vs mes anterior"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 p-4 opacity-10", children: /* @__PURE__ */ jsx(Users, { size: 80 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-slate-400 text-xs font-bold uppercase tracking-wider", children: "Usuarios Activos" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-blue-400 mt-2 font-mono", children: "142" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs mt-2", children: "Clientes y Técnicos" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 p-4 opacity-10", children: /* @__PURE__ */ jsx(Activity, { size: 80 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-slate-400 text-xs font-bold uppercase tracking-wider", children: "Estado del Sistema" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-purple-400 mt-2 font-mono", children: "ONLINE" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative flex h-3 w-3", children: [
            /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-green-500" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-green-400", children: "Servidores Operativos" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-800 bg-slate-800/50", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Zap, { className: "text-yellow-400 fill-yellow-400" }),
        " Centro de Comando SaaS"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-800", children: tools.map((tool) => /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: `p-3 rounded-lg ${tool.status === "public" ? "bg-green-500/20 text-green-400" : tool.status === "locked" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`, children: tool.status === "public" ? /* @__PURE__ */ jsx(Unlock, { size: 24 }) : tool.status === "locked" ? /* @__PURE__ */ jsx(DollarSign, { size: 24 }) : /* @__PURE__ */ jsx(Lock, { size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg text-white", children: tool.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400", children: [
              "ID: ",
              /* @__PURE__ */ jsx("span", { className: "font-mono text-xs", children: tool.id })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => changeStatus(tool.id, "public"),
              className: `px-4 py-2 rounded-md text-sm font-bold transition-all ${tool.status === "public" ? "bg-green-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`,
              children: "Público"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => changeStatus(tool.id, "locked"),
              className: `px-4 py-2 rounded-md text-sm font-bold transition-all ${tool.status === "locked" ? "bg-yellow-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`,
              children: "De Pago ($)"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => changeStatus(tool.id, "private"),
              className: `px-4 py-2 rounded-md text-sm font-bold transition-all ${tool.status === "private" ? "bg-red-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`,
              children: "Privado"
            }
          )
        ] })
      ] }, tool.id)) })
    ] })
  ] });
}

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: "", name: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "cctv",
    // valor por defecto
    image: "sin-imagen.jpg"
  });
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const liveData = snapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() }));
      setProducts(liveData);
    });
    return () => unsubscribe();
  }, []);
  const startEditing = (product) => {
    setEditingId(product.id);
    setEditForm({ price: product.price, name: product.name });
  };
  const saveChanges = async () => {
    try {
      const productRef = doc(db, "productos", editingId);
      await updateDoc(productRef, {
        price: Number(editForm.price),
        name: editForm.name
      });
      setEditingId(null);
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newProduct.id || !newProduct.name || !newProduct.price) return alert("Llena los datos");
    try {
      await setDoc(doc(db, "productos", newProduct.id), {
        id: newProduct.id,
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category,
        image: newProduct.image,
        description: "Descripción pendiente..."
      });
      setIsCreating(false);
      setNewProduct({ id: "", name: "", price: "", category: "cctv", image: "sin-imagen.jpg" });
      alert("¡Producto creado!");
    } catch (error) {
      alert("Error al crear: " + error.message);
    }
  };
  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.")) {
      await deleteDoc(doc(db, "productos", id));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-full flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Package, { className: "text-blue-400" }),
          " Inventario en Nube"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Datos sincronizados con Firebase." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsCreating(true),
          className: "bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 18 }),
            " Nuevo Producto"
          ]
        }
      )
    ] }),
    isCreating && /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 p-6 border-b border-blue-500/30 animate-fadeIn", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-4", children: "✨ Agregando nuevo item" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleCreate, className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-400", children: "ID Único (ej: camara-x1)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: newProduct.id,
              onChange: (e) => setNewProduct({ ...newProduct, id: e.target.value }),
              className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white",
              placeholder: "codigo-unico"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-400", children: "Nombre" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: newProduct.name,
              onChange: (e) => setNewProduct({ ...newProduct, name: e.target.value }),
              className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white",
              placeholder: "Nombre comercial"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-400", children: "Precio (S/)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: newProduct.price,
              onChange: (e) => setNewProduct({ ...newProduct, price: e.target.value }),
              className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white",
              placeholder: "0.00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-400", children: "Nombre de Archivo de Imagen" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: newProduct.image,
              onChange: (e) => setNewProduct({ ...newProduct, image: e.target.value }),
              className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white",
              placeholder: "foto.jpg"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex justify-end gap-2 mt-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsCreating(false), className: "px-4 py-2 text-slate-400 hover:text-white", children: "Cancelar" }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "px-6 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-500", children: "Guardar en Nube" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto flex-1", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-slate-400", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-slate-950 text-slate-200 uppercase font-bold text-xs sticky top-0 z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-4 bg-slate-950", children: "ID / Imagen" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 bg-slate-950", children: "Producto" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 bg-slate-950", children: "Precio" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 bg-slate-950 text-right", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-800", children: products.map((product) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-800/30", children: [
        /* @__PURE__ */ jsxs("td", { className: "p-4 font-mono text-xs", children: [
          /* @__PURE__ */ jsx("div", { className: "text-white font-bold", children: product.id }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-600 truncate max-w-[100px]", children: product.image })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: editingId === product.id ? /* @__PURE__ */ jsx(
          "input",
          {
            autoFocus: true,
            type: "text",
            value: editForm.name,
            onChange: (e) => setEditForm({ ...editForm, name: e.target.value }),
            className: "bg-slate-800 text-white p-1 rounded border border-blue-500 w-full"
          }
        ) : /* @__PURE__ */ jsx("span", { className: "font-bold text-white", children: product.name }) }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: editingId === product.id ? /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: editForm.price,
            onChange: (e) => setEditForm({ ...editForm, price: e.target.value }),
            className: "bg-slate-800 text-white p-1 rounded border border-green-500 w-20 font-bold"
          }
        ) : /* @__PURE__ */ jsxs("span", { className: "text-green-400 font-bold", children: [
          "S/ ",
          product.price
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "p-4 text-right flex justify-end gap-2", children: editingId === product.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("button", { onClick: saveChanges, className: "p-2 bg-green-600 text-white rounded", children: /* @__PURE__ */ jsx(Save, { size: 16 }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => setEditingId(null), className: "p-2 bg-slate-700 text-white rounded", children: /* @__PURE__ */ jsx(X, { size: 16 }) })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("button", { onClick: () => startEditing(product), className: "p-2 text-blue-400 hover:bg-blue-900/30 rounded", children: /* @__PURE__ */ jsx(Edit2, { size: 16 }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(product.id), className: "p-2 text-red-400 hover:bg-red-900/30 rounded", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
        ] }) })
      ] }, product.id)) })
    ] }) })
  ] });
}

function ProductUploader() {
  const [status, setStatus] = useState("idle");
  const [log, setLog] = useState("");
  const uploadData = async () => {
    if (!confirm(`Se van a sobrescribir los datos en Firebase con los ${productsData.length} productos de tu JSON. ¿Continuar?`)) return;
    setStatus("loading");
    setLog("Iniciando carga masiva...");
    try {
      const batch = writeBatch(db);
      let count = 0;
      productsData.forEach((product) => {
        const docRef = doc(db, "productos", product.id);
        let cleanImageName = product.image;
        if (cleanImageName.includes("/")) {
          cleanImageName = cleanImageName.split("/").pop();
        }
        batch.set(docRef, {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          // Convertimos a numero real
          category: product.category,
          description: product.description || "",
          features: product.features || [],
          // Si tienes arrays de características
          // AQUÍ LA CLAVE: Guardamos solo el nombre del archivo para que Astro lo busque luego
          image: cleanImageName
        });
        count++;
      });
      setLog(`Preparando ${count} productos...`);
      await batch.commit();
      setStatus("success");
      setLog(`¡Éxito! ${count} productos sincronizados en la Nube.`);
      alert("Migración completada correctamente.");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setLog("Error: " + error.message);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold mb-2 flex items-center gap-2 text-lg", children: [
      /* @__PURE__ */ jsx(Database, { className: "text-blue-400" }),
      " Migración de Datos (JSON → Nube)"
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-sm mb-6", children: [
      "Esta herramienta lee tu archivo ",
      /* @__PURE__ */ jsx("code", { children: "cctv-products.json" }),
      " local y sube la información a Firebase.",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-xs", children: "Nota: Las imágenes se quedan en tu PC, solo subimos los nombres y precios." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-800", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm font-mono text-slate-300", children: log || "Esperando orden..." }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: uploadData,
          disabled: status === "loading",
          className: `px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg ${status === "success" ? "bg-green-600 text-white hover:bg-green-500" : status === "loading" ? "bg-slate-600 text-slate-300 cursor-wait" : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-105"}`,
          children: [
            status === "loading" && /* @__PURE__ */ jsx(UploadCloud, { className: "animate-bounce" }),
            status === "success" && /* @__PURE__ */ jsx(Check, { size: 18 }),
            status === "error" && /* @__PURE__ */ jsx(AlertTriangle, { size: 18 }),
            status === "loading" ? "Subiendo..." : "Sincronizar Ahora"
          ]
        }
      )
    ] })
  ] });
}

function ConfigManager() {
  const [config, setConfig] = useState({
    manoObra: 0,
    precioMetroCable: 0,
    mensajeWhatsapp: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const docRef = doc(db, "configuracion", "global");
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setConfig(snap.data());
      } else {
        setDoc(docRef, {
          manoObra: 80,
          precioMetroCable: 2.5,
          mensajeWhatsapp: "Hola Quilla, me interesa esta cotización:"
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, "configuracion", "global"), {
        manoObra: Number(config.manoObra),
        precioMetroCable: Number(config.precioMetroCable),
        mensajeWhatsapp: config.mensajeWhatsapp
      });
      alert("¡Configuración actualizada!");
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    }
    setSaving(false);
  };
  if (loading) return /* @__PURE__ */ jsx("div", { className: "text-slate-400 p-4", children: "Cargando ajustes..." });
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl max-w-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 border-b border-slate-800 pb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "p-2 bg-purple-500/10 rounded-lg text-purple-400", children: /* @__PURE__ */ jsx(Settings, { size: 24 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white", children: "Variables del Cotizador" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Define los costos base de tus servicios." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-xs font-bold text-slate-400 uppercase flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Wrench, { size: 14 }),
            " Mano de Obra (x Cámara)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-2.5 text-slate-500 font-bold", children: "S/" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: config.manoObra,
                onChange: (e) => setConfig({ ...config, manoObra: e.target.value }),
                className: "w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-purple-500 outline-none transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500", children: "Costo base por instalar cada cámara." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-xs font-bold text-slate-400 uppercase flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Activity, { size: 14 }),
            " Metro de Cable"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-2.5 text-slate-500 font-bold", children: "S/" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                step: "0.1",
                value: config.precioMetroCable,
                onChange: (e) => setConfig({ ...config, precioMetroCable: e.target.value }),
                className: "w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-purple-500 outline-none transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500", children: "Precio cobrado al cliente por metro extra." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("label", { className: "text-xs font-bold text-slate-400 uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MessageCircle, { size: 14 }),
          " Saludo de WhatsApp"
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: "2",
            value: config.mensajeWhatsapp,
            onChange: (e) => setConfig({ ...config, mensajeWhatsapp: e.target.value }),
            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-green-500 outline-none transition-colors text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: saving,
          className: "w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20",
          children: saving ? "Guardando..." : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Save, { size: 18 }),
            " Guardar Configuración"
          ] })
        }
      )
    ] })
  ] });
}

function LeadsManager() {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "prospectos"), orderBy("date", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    });
    return () => unsubscribe();
  }, []);
  const toggleStatus = async (lead) => {
    const newStatus = lead.status === "new" ? "contacted" : "new";
    await updateDoc(doc(db, "prospectos", lead.id), { status: newStatus });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-slate-800 bg-slate-800/50", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(User, { className: "text-green-400" }),
        " Prospectos Interesados (CRM)"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Clientes que llegaron al final del cotizador." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-slate-400", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-slate-950 text-slate-200 uppercase font-bold text-xs", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Estado" }),
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Fecha" }),
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Cliente" }),
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Proyecto" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 text-right", children: "Total (Aprox)" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 text-center", children: "Acción" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-800", children: leads.map((lead) => /* @__PURE__ */ jsxs("tr", { className: `hover:bg-slate-800/30 transition-colors ${lead.status === "new" ? "bg-blue-900/10" : ""}`, children: [
          /* @__PURE__ */ jsx("td", { className: "p-4", children: lead.status === "new" ? /* @__PURE__ */ jsxs("span", { className: "bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold flex w-fit gap-1 items-center", children: [
            /* @__PURE__ */ jsx(Clock, { size: 12 }),
            " Nuevo"
          ] }) : /* @__PURE__ */ jsxs("span", { className: "bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold flex w-fit gap-1 items-center", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 12 }),
            " Atendido"
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "p-4 text-xs font-mono", children: [
            lead.date?.toDate ? lead.date.toDate().toLocaleDateString() : "Reciente",
            /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: lead.date?.toDate ? lead.date.toDate().toLocaleTimeString() : "" })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-white", children: lead.clientName }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs flex items-center gap-1 text-slate-500", children: [
              /* @__PURE__ */ jsx(Phone, { size: 10 }),
              " ",
              lead.clientPhone || "Sin número"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "p-4 text-xs", children: [
            /* @__PURE__ */ jsx("div", { className: "text-slate-300", children: lead.itemsSummary }),
            /* @__PURE__ */ jsx("div", { className: "text-slate-500 italic", children: lead.installType })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "p-4 text-right font-bold text-green-400", children: [
            "S/ ",
            lead.totalAmount
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "p-4 text-center", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => toggleStatus(lead), className: "p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300", title: "Cambiar Estado", children: /* @__PURE__ */ jsx(Eye, { size: 18 }) }),
            /* @__PURE__ */ jsx("a", { href: `https://wa.me/51${lead.clientPhone}`, target: "_blank", className: "p-2 hover:bg-green-900/30 text-green-500 rounded-lg ml-2 inline-block", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) })
          ] })
        ] }, lead.id)) })
      ] }),
      leads.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-slate-500", children: "Aún no hay cotizaciones registradas." })
    ] })
  ] });
}

function LogoutButton() {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: async () => {
        await logout();
      },
      type: "button",
      className: "w-full flex items-center justify-center gap-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2 rounded-lg transition-colors cursor-pointer font-bold",
      children: [
        /* @__PURE__ */ jsx(LogOut, { size: 14 }),
        "Cerrar Sesión"
      ]
    }
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = [
    {
      id: "inventory",
      label: "Inventario CCTV",
      icon: Package,
      description: "Gestiona productos y precios en tiempo real"
    },
    {
      id: "crm",
      label: "Clientes (CRM)",
      icon: User,
      description: "Prospectos y cotizaciones recibidas"
    },
    {
      id: "saas",
      label: "Control SaaS",
      icon: LayoutDashboard,
      description: "Configuración de precios base y herramientas"
    },
    {
      id: "data",
      label: "Base de Datos",
      icon: Database,
      description: "Utilidades de backup y migración"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-slate-950 text-white overflow-hidden font-sans", children: [
    /* @__PURE__ */ jsxs("aside", { className: `
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `, children: [
      /* @__PURE__ */ jsx("div", { className: "h-20 flex items-center px-6 border-b border-slate-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-900/20", children: "Q" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "font-bold text-lg tracking-tight leading-none", children: [
            "Quilla",
            /* @__PURE__ */ jsx("span", { className: "text-blue-500", children: "OS" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1", children: "Panel Admin v2.2" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("nav", { className: "p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)]", children: [
        /* @__PURE__ */ jsx("p", { className: "px-4 text-xs font-bold text-slate-500 uppercase mb-2 mt-2", children: "Menú Principal" }),
        menuItems.map((item) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            },
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium ${activeTab === item.id ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsx(item.icon, { size: 20, className: activeTab === item.id ? "text-white" : "text-slate-500 group-hover:text-white" }),
              item.label,
              item.id === "crm" && /* @__PURE__ */ jsx("span", { className: "ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" })
            ]
          },
          item.id
        )),
        /* @__PURE__ */ jsx("p", { className: "px-4 text-xs font-bold text-slate-500 uppercase mb-2 mt-6", children: "Sistema" }),
        /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-sm font-medium", children: [
          /* @__PURE__ */ jsx(Settings, { size: 20, className: "text-slate-500" }),
          "Ajustes Generales"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4 px-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-500" }),
          /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold truncate", children: "Administrador" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
              " En Línea"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(LogoutButton, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 flex flex-col h-screen overflow-hidden bg-slate-950 relative", children: [
      /* @__PURE__ */ jsxs("header", { className: "h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "md:hidden text-slate-400 hover:text-white", children: /* @__PURE__ */ jsx(Menu, {}) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white capitalize flex items-center gap-2", children: [
              menuItems.find((i) => i.id === activeTab)?.icon && React.createElement(menuItems.find((i) => i.id === activeTab).icon, { size: 24, className: "text-blue-500" }),
              menuItems.find((i) => i.id === activeTab)?.label
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 hidden md:block", children: menuItems.find((i) => i.id === activeTab)?.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative hidden md:block", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-2.5 text-slate-500", size: 16 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Buscar en el sistema...",
                className: "bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 w-64 text-slate-300 transition-all focus:w-80"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "p-2 text-slate-400 hover:text-white relative bg-slate-900 rounded-full border border-slate-800 hover:border-slate-600 transition-colors", children: [
            /* @__PURE__ */ jsx(Bell, { size: 20 }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto animate-fadeIn pb-20", children: [
        activeTab === "inventory" && /* @__PURE__ */ jsx(ProductManager, {}),
        activeTab === "crm" && /* @__PURE__ */ jsx(LeadsManager, {}),
        activeTab === "saas" && /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx(ConfigManager, {}),
          /* @__PURE__ */ jsxs("div", { className: "opacity-75", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "h-px bg-slate-800 flex-1" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 uppercase font-bold", children: "Herramientas Legacy" }),
              /* @__PURE__ */ jsx("span", { className: "h-px bg-slate-800 flex-1" })
            ] }),
            /* @__PURE__ */ jsx(SaaSManager, {})
          ] })
        ] }),
        activeTab === "data" && /* @__PURE__ */ jsx(ProductUploader, {})
      ] }) })
    ] }),
    isMobileMenuOpen && /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setIsMobileMenuOpen(false),
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
      }
    )
  ] });
}

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Panel Maestro" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminGuard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@modules/admin/components/AdminGuard.jsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "AdminDashboard", AdminDashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@modules/admin/components/AdminDashboard.jsx", "client:component-export": "default" })} ` })} ` })}`;
}, "C:/PROYECTOS/quilla-astro/src/pages/admin/index.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
