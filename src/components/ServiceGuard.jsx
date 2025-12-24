import React, { useState, useEffect } from 'react';
import { Lock, DollarSign } from 'lucide-react';

export default function ServiceGuard({ toolId, children }) {
  const [accessLevel, setAccessLevel] = useState('loading'); // loading, granted, denied_pay, denied_private

  useEffect(() => {
    // 1. Preguntamos al sistema (LocalStorage por ahora) cuál es el estado de esta herramienta
    // Por defecto es 'public' si no hay nada guardado
    const status = localStorage.getItem(`permiso_${toolId}`) || 'public';
    
    if (status === 'public') {
        setAccessLevel('granted');
    } else if (status === 'locked') {
        setAccessLevel('denied_pay');
    } else {
        setAccessLevel('denied_private');
    }
  }, [toolId]);

  if (accessLevel === 'loading') return <div className="p-10 text-center text-white">Verificando permisos...</div>;

  // CASO 1: ACCESO CONCEDIDO (Muestra el Cotizador)
  if (accessLevel === 'granted') {
      return <>{children}</>;
  }

  // CASO 2: ES DE PAGO (SaaS)
  if (accessLevel === 'denied_pay') {
      return (
        <div className="bg-slate-900 border border-yellow-500/30 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-10">
            <div className="bg-yellow-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign size={40} className="text-yellow-400"/>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Herramienta Premium</h2>
            <p className="text-slate-400 mb-8 text-lg">
                El <strong>Generador Profesional</strong> es una herramienta exclusiva para miembros PRO.
                Suscríbete para acceder a reportes ilimitados.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl text-lg transition-transform hover:scale-105">
                Desbloquear por S/ 15.00
            </button>
            <p className="text-xs text-slate-500 mt-4">Acceso inmediato • Cancelación en cualquier momento</p>
        </div>
      );
  }

  // CASO 3: PRIVADO (Solo Tú)
  return (
    <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-10">
        <div className="bg-red-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} className="text-red-400"/>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Acceso Restringido</h2>
        <p className="text-slate-400 mb-8">
            Esta herramienta es de uso interno exclusivo para técnicos de <strong>Quilla Electric</strong>.
        </p>
        <button 
            onClick={() => {
                const pass = prompt("Ingrese Clave Maestra:");
                if(pass === "admin123") setAccessLevel('granted'); // Clave simple para demo
            }}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl"
        >
            Soy Técnico (Ingresar Clave)
        </button>
    </div>
  );
}