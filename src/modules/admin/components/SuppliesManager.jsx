import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { 
  Hammer, Edit, Trash2, Plus, Save, X, Search, 
  DollarSign, Ruler, Tag, Package
} from 'lucide-react';

export default function SuppliesManager() {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Formulario especializado para INSUMOS
  const initialForm = { name: '', price: '', category: 'canalizacion', unit: 'unidad' };
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { id: 'canalizacion', label: 'Canalización (Tubos/Canaletas)' },
    { id: 'cableado', label: 'Cables (UTP/Eléctrico)' },
    { id: 'accesorio', label: 'Conectores y Accesorios' },
    { id: 'ferreteria', label: 'Ferretería (Tornillos/Cintillos)' }
  ];

  const units = ['unidad', 'metro', 'caja', 'paquete', 'ciento'];

  // --- CRUD FIREBASE ---
  const fetchSupplies = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "insumos")); // 🔥 NUEVA COLECCIÓN
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSupplies(docs);
    } catch (error) {
      console.error("Error cargando insumos:", error);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSupplies(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return alert("Datos incompletos");

    try {
      const dataToSave = {
        ...formData,
        price: Number(formData.price), // Guardar como número para cálculos futuros
        updatedAt: new Date()
      };

      if (isEditing) {
        await updateDoc(doc(db, "insumos", isEditing), dataToSave);
      } else {
        await addDoc(collection(db, "insumos"), dataToSave);
      }

      setFormData(initialForm);
      setIsEditing(null);
      setShowForm(false);
      fetchSupplies();
    } catch (error) {
      console.error(error);
      alert("Error al guardar insumo");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Borrar este insumo del inventario?")) {
      await deleteDoc(doc(db, "insumos", id));
      fetchSupplies();
    }
  };

  // --- RENDER ---
  const filtered = supplies.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="text-slate-200 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Hammer className="text-orange-500" /> Inventario de Insumos
          </h2>
          <p className="text-slate-500 text-sm">Gestiona tubos, cables y materiales menores.</p>
        </div>
        <button 
          onClick={() => { setShowForm(!showForm); setIsEditing(null); setFormData(initialForm); }}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
        >
          {showForm ? <X size={18}/> : <Plus size={18}/>}
          {showForm ? "Cancelar" : "Nuevo Insumo"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8 animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Material</label>
                <input required type="text" placeholder="Ej: Tubo PVC 3/4 Industrial" className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Costo Unitario</label>
                    <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 text-slate-500" size={14} />
                        <input required type="number" step="0.01" placeholder="0.00" className="w-full p-2 pl-8 bg-slate-950 border border-slate-700 rounded text-white" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                </div>
                <div className="w-1/3">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Unidad</label>
                    <select className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Categoría Técnica</label>
                <select className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
            </div>
            <div className="flex items-end">
                <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2">
                    <Save size={18}/> Guardar Material
                </button>
            </div>
        </form>
      )}

      {/* TABLA LISTADO */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex gap-2">
            <Search className="text-slate-500"/>
            <input type="text" placeholder="Buscar material..." className="bg-transparent outline-none text-white w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-xs uppercase font-bold text-slate-300">
                <tr>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3 text-right">Costo</th>
                    <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
                {filtered.map(item => (
                    <tr key={item.id} className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                            <Package size={16} className="text-slate-600"/>
                            {item.name}
                            <span className="text-xs text-slate-500 bg-slate-800 px-1 rounded">x {item.unit}</span>
                        </td>
                        <td className="px-4 py-3">
                            <span className={`text-[10px] px-2 py-1 rounded-full border ${
                                item.category === 'canalizacion' ? 'border-orange-500/30 text-orange-400 bg-orange-900/20' : 
                                item.category === 'cableado' ? 'border-blue-500/30 text-blue-400 bg-blue-900/20' : 
                                'border-slate-700 bg-slate-800'
                            }`}>
                                {categories.find(c => c.id === item.category)?.label || item.category}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-white">S/ {item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 flex justify-center gap-2">
                            <button onClick={() => { setFormData(item); setIsEditing(item.id); setShowForm(true); }} className="p-1 hover:text-blue-400"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(item.id)} className="p-1 hover:text-red-400"><Trash2 size={16}/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filtered.length === 0 && <div className="p-8 text-center text-slate-600">No hay insumos registrados.</div>}
      </div>
    </div>
  );
}