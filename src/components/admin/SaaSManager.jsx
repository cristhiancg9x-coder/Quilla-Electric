import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Zap, DollarSign, Activity, Users, TrendingUp } from 'lucide-react';

export default function SaaSManager() {
  const [tools, setTools] = useState([
    { id: 'cctv-wizard', name: 'Cotizador CCTV 3D', status: 'public', revenue: 1500, users: 45 },
    { id: 'pozo-tierra', name: 'Generador Protocolos Pozo', status: 'locked', revenue: 450, users: 12 },
    { id: 'fugas-bot', name: 'Detector Fugas IA', status: 'private', revenue: 0, users: 0 },
  ]);

  // Cargar estado inicial real
  useEffect(() => {
    const updatedTools = tools.map(t => ({
        ...t,
        status: localStorage.getItem(`permiso_${t.id}`) || t.status
    }));
    setTools(updatedTools);
  }, []);

  const changeStatus = (id, newStatus) => {
    setTools(tools.map(tool => {
      if (tool.id === id) {
        localStorage.setItem(`permiso_${tool.id}`, newStatus);
        return { ...tool, status: newStatus };
      }
      return tool;
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* DASHBOARD METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign size={80} />
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ingresos Mensuales</h3>
            <p className="text-3xl font-black text-green-400 mt-2 font-mono">S/ 2,450.00</p>
            <div className="flex items-center gap-1 text-green-500 text-xs mt-2">
                <TrendingUp size={12}/> +12% vs mes anterior
            </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
             <div className="absolute right-0 top-0 p-4 opacity-10">
                <Users size={80} />
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Usuarios Activos</h3>
            <p className="text-3xl font-black text-blue-400 mt-2 font-mono">142</p>
            <p className="text-slate-500 text-xs mt-2">Clientes y Técnicos</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
             <div className="absolute right-0 top-0 p-4 opacity-10">
                <Activity size={80} />
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Estado del Sistema</h3>
            <p className="text-3xl font-black text-purple-400 mt-2 font-mono">ONLINE</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs text-green-400">Servidores Operativos</span>
            </div>
        </div>
      </div>

      {/* PANEL DE CONTROL DE HERRAMIENTAS */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-slate-800/50">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Zap className="text-yellow-400 fill-yellow-400"/> Centro de Comando SaaS
            </h2>
        </div>

        <div className="divide-y divide-slate-800">
            {tools.map(tool => (
                <div key={tool.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                    
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${
                            tool.status === 'public' ? 'bg-green-500/20 text-green-400' :
                            tool.status === 'locked' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                        }`}>
                            {tool.status === 'public' ? <Unlock size={24}/> : 
                             tool.status === 'locked' ? <DollarSign size={24}/> : <Lock size={24}/>}
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-white">{tool.name}</h4>
                            <p className="text-sm text-slate-400">ID: <span className="font-mono text-xs">{tool.id}</span></p>
                        </div>
                    </div>

                    {/* CONTROLADOR DE ESTADO (SWITCH) */}
                    <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button 
                            onClick={() => changeStatus(tool.id, 'public')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                                tool.status === 'public' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                            }`}
                        >
                            Público
                        </button>
                        <button 
                            onClick={() => changeStatus(tool.id, 'locked')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                                tool.status === 'locked' ? 'bg-yellow-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                            }`}
                        >
                            De Pago ($)
                        </button>
                        <button 
                            onClick={() => changeStatus(tool.id, 'private')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                                tool.status === 'private' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                            }`}
                        >
                            Privado
                        </button>
                    </div>

                </div>
            ))}
        </div>
      </div>
    </div>
  );
}