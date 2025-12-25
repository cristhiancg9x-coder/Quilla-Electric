import React, { useState, useEffect } from 'react';
import { db } from '@lib/firebase/config';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { Settings, Save, DollarSign, Wrench, MessageCircle } from 'lucide-react';

export default function ConfigManager() {
  const [config, setConfig] = useState({
    manoObra: 0,
    precioMetroCable: 0,
    mensajeWhatsapp: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. ESCUCHAR CONFIGURACIÓN EN VIVO
  useEffect(() => {
    const docRef = doc(db, "configuracion", "global");
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setConfig(snap.data());
      } else {
        // Si no existe, creamos una por defecto
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

  // 2. GUARDAR CAMBIOS
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

  if (loading) return <div className="text-slate-400 p-4">Cargando ajustes...</div>;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl max-w-2xl">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <Settings size={24} />
        </div>
        <div>
            <h3 className="text-xl font-bold text-white">Variables del Cotizador</h3>
            <p className="text-sm text-slate-400">Define los costos base de tus servicios.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* MANO DE OBRA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Wrench size={14}/> Mano de Obra (x Cámara)
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 font-bold">S/</span>
                    <input 
                        type="number" 
                        value={config.manoObra}
                        onChange={e => setConfig({...config, manoObra: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-purple-500 outline-none transition-colors"
                    />
                </div>
                <p className="text-[10px] text-slate-500">Costo base por instalar cada cámara.</p>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Activity size={14}/> Metro de Cable
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 font-bold">S/</span>
                    <input 
                        type="number" 
                        step="0.1"
                        value={config.precioMetroCable}
                        onChange={e => setConfig({...config, precioMetroCable: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-purple-500 outline-none transition-colors"
                    />
                </div>
                <p className="text-[10px] text-slate-500">Precio cobrado al cliente por metro extra.</p>
            </div>
        </div>

        {/* MENSAJE WHATSAPP */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                <MessageCircle size={14}/> Saludo de WhatsApp
            </label>
            <textarea 
                rows="2"
                value={config.mensajeWhatsapp}
                onChange={e => setConfig({...config, mensajeWhatsapp: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-green-500 outline-none transition-colors text-sm"
            ></textarea>
        </div>

        <button 
            type="submit" 
            disabled={saving}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20"
        >
            {saving ? "Guardando..." : <><Save size={18}/> Guardar Configuración</>}
        </button>

      </form>
    </div>
  );
}

// Icono auxiliar (puedes importarlo de lucide-react arriba si falta)
import { Activity } from 'lucide-react';