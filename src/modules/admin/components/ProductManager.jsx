import React, { useState, useEffect } from 'react';
import { db } from '@lib/firebase/config';
import { collection, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Edit2, Save, X, Package, Plus, Trash2, AlertCircle } from 'lucide-react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: '', name: '' });
  
  // ESTADO PARA NUEVO PRODUCTO
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    category: 'cctv', // valor por defecto
    image: 'sin-imagen.jpg'
  });

  // 1. ESCUCHAR DATOS (Live Sync)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const liveData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(liveData);
    });
    return () => unsubscribe();
  }, []);

  // 2. FUNCIONES DE EDICIÓN
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

  // 3. FUNCIÓN PARA CREAR NUEVO PRODUCTO 🆕
  const handleCreate = async (e) => {
    e.preventDefault();
    if(!newProduct.id || !newProduct.name || !newProduct.price) return alert("Llena los datos");

    try {
        // Usamos setDoc para poder definir nosotros mismos el ID (ej: "camara-h3")
        await setDoc(doc(db, "productos", newProduct.id), {
            id: newProduct.id,
            name: newProduct.name,
            price: Number(newProduct.price),
            category: newProduct.category,
            image: newProduct.image,
            description: "Descripción pendiente..."
        });
        
        setIsCreating(false); // Cerrar formulario
        setNewProduct({ id: '', name: '', price: '', category: 'cctv', image: 'sin-imagen.jpg' }); // Limpiar
        alert("¡Producto creado!");
    } catch (error) {
        alert("Error al crear: " + error.message);
    }
  };

  // 4. FUNCIÓN BORRAR (Cuidado con esta) 🗑️
  const handleDelete = async (id) => {
      if(confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.")) {
          await deleteDoc(doc(db, "productos", id));
      }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-full flex flex-col">
      
      {/* HEADER */}
      <div className="p-6 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center">
        <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="text-blue-400"/> Inventario en Nube
            </h3>
            <p className="text-sm text-slate-400">Datos sincronizados con Firebase.</p>
        </div>
        
        {/* BOTÓN AGREGAR NUEVO */}
        <button 
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
        >
            <Plus size={18}/> Nuevo Producto
        </button>
      </div>

      {/* FORMULARIO DE CREACIÓN (Solo aparece si isCreating es true) */}
      {isCreating && (
          <div className="bg-slate-800 p-6 border-b border-blue-500/30 animate-fadeIn">
              <h4 className="font-bold text-white mb-4">✨ Agregando nuevo item</h4>
              <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs text-slate-400">ID Único (ej: camara-x1)</label>
                      <input 
                        type="text" 
                        value={newProduct.id} 
                        onChange={e => setNewProduct({...newProduct, id: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                        placeholder="codigo-unico"
                      />
                  </div>
                  <div>
                      <label className="text-xs text-slate-400">Nombre</label>
                      <input 
                        type="text" 
                        value={newProduct.name} 
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                        placeholder="Nombre comercial"
                      />
                  </div>
                  <div>
                      <label className="text-xs text-slate-400">Precio (S/)</label>
                      <input 
                        type="number" 
                        value={newProduct.price} 
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                        placeholder="0.00"
                      />
                  </div>
                  <div>
                      <label className="text-xs text-slate-400">Nombre de Archivo de Imagen</label>
                      <input 
                        type="text" 
                        value={newProduct.image} 
                        onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                        placeholder="foto.jpg"
                      />
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                      <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancelar</button>
                      <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-500">Guardar en Nube</button>
                  </div>
              </form>
          </div>
      )}

      {/* TABLA */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-200 uppercase font-bold text-xs sticky top-0 z-10">
            <tr>
              <th className="p-4 bg-slate-950">ID / Imagen</th>
              <th className="p-4 bg-slate-950">Producto</th>
              <th className="p-4 bg-slate-950">Precio</th>
              <th className="p-4 bg-slate-950 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-800/30">
                
                <td className="p-4 font-mono text-xs">
                    <div className="text-white font-bold">{product.id}</div>
                    <div className="text-slate-600 truncate max-w-[100px]">{product.image}</div>
                </td>

                <td className="p-4">
                  {editingId === product.id ? (
                    <input 
                      autoFocus
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="bg-slate-800 text-white p-1 rounded border border-blue-500 w-full"
                    />
                  ) : (
                    <span className="font-bold text-white">{product.name}</span>
                  )}
                </td>

                <td className="p-4">
                  {editingId === product.id ? (
                    <input 
                    type="number" 
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="bg-slate-800 text-white p-1 rounded border border-green-500 w-20 font-bold"
                    />
                  ) : (
                    <span className="text-green-400 font-bold">S/ {product.price}</span>
                  )}
                </td>

                <td className="p-4 text-right flex justify-end gap-2">
                  {editingId === product.id ? (
                    <>
                      <button onClick={saveChanges} className="p-2 bg-green-600 text-white rounded"><Save size={16}/></button>
                      <button onClick={() => setEditingId(null)} className="p-2 bg-slate-700 text-white rounded"><X size={16}/></button>
                    </>
                  ) : (
                    <>
                        <button onClick={() => startEditing(product)} className="p-2 text-blue-400 hover:bg-blue-900/30 rounded"><Edit2 size={16}/></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-400 hover:bg-red-900/30 rounded"><Trash2 size={16}/></button>
                    </>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}