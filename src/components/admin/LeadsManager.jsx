import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { User, Phone, Calendar, DollarSign, Eye, CheckCircle, Clock } from 'lucide-react';

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Traemos los últimos 50 prospectos ordenados por fecha
    const q = query(collection(db, "prospectos"), orderBy("date", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Función para marcar como "Contactado"
  const toggleStatus = async (lead) => {
    const newStatus = lead.status === 'new' ? 'contacted' : 'new';
    await updateDoc(doc(db, "prospectos", lead.id), { status: newStatus });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-slate-800/50">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="text-green-400"/> Prospectos Interesados (CRM)
        </h3>
        <p className="text-sm text-slate-400">Clientes que llegaron al final del cotizador.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-200 uppercase font-bold text-xs">
            <tr>
              <th className="p-4">Estado</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Proyecto</th>
              <th className="p-4 text-right">Total (Aprox)</th>
              <th className="p-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {leads.map((lead) => (
              <tr key={lead.id} className={`hover:bg-slate-800/30 transition-colors ${lead.status === 'new' ? 'bg-blue-900/10' : ''}`}>
                <td className="p-4">
                    {lead.status === 'new' ? (
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold flex w-fit gap-1 items-center"><Clock size={12}/> Nuevo</span>
                    ) : (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold flex w-fit gap-1 items-center"><CheckCircle size={12}/> Atendido</span>
                    )}
                </td>
                <td className="p-4 text-xs font-mono">
                    {lead.date?.toDate ? lead.date.toDate().toLocaleDateString() : 'Reciente'}
                    <div className="text-slate-500">{lead.date?.toDate ? lead.date.toDate().toLocaleTimeString() : ''}</div>
                </td>
                <td className="p-4">
                    <div className="font-bold text-white">{lead.clientName}</div>
                    <div className="text-xs flex items-center gap-1 text-slate-500"><Phone size={10}/> {lead.clientPhone || 'Sin número'}</div>
                </td>
                <td className="p-4 text-xs">
                    <div className="text-slate-300">{lead.itemsSummary}</div>
                    <div className="text-slate-500 italic">{lead.installType}</div>
                </td>
                <td className="p-4 text-right font-bold text-green-400">
                    S/ {lead.totalAmount}
                </td>
                <td className="p-4 text-center">
                    <button onClick={() => toggleStatus(lead)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300" title="Cambiar Estado">
                        <Eye size={18}/>
                    </button>
                    <a href={`https://wa.me/51${lead.clientPhone}`} target="_blank" className="p-2 hover:bg-green-900/30 text-green-500 rounded-lg ml-2 inline-block">
                        <Phone size={18}/>
                    </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <div className="p-8 text-center text-slate-500">Aún no hay cotizaciones registradas.</div>}
      </div>
    </div>
  );
}