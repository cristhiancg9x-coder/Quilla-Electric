import React, { useState } from 'react';
import { db } from '@lib/firebase/config';
import { doc, writeBatch } from 'firebase/firestore'; // Usamos Batch para subir todo junto
import { UploadCloud, Check, AlertTriangle, Database } from 'lucide-react';
import productsData from '@modules/calculator/data/cctv-products.json'; // Tu archivo JSON local

export default function ProductUploader() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [log, setLog] = useState("");

  const uploadData = async () => {
    // 1. Preguntar por seguridad
    if (!confirm(`Se van a sobrescribir los datos en Firebase con los ${productsData.length} productos de tu JSON. ¿Continuar?`)) return;
    
    setStatus('loading');
    setLog("Iniciando carga masiva...");

    try {
      const batch = writeBatch(db);
      let count = 0;
      
      productsData.forEach((product) => {
        // Referencia al documento (usamos el ID del producto como ID en Firebase)
        const docRef = doc(db, "productos", product.id);
        
        // 2. LIMPIEZA DE DATOS:
        // Aseguramos que la imagen sea solo el nombre del archivo, no la ruta completa
        // Ej: si en JSON dice "/src/assets/camaras/foto1.jpg", guardamos solo "foto1.jpg"
        let cleanImageName = product.image;
        if (cleanImageName.includes('/')) {
            cleanImageName = cleanImageName.split('/').pop();
        }

        // 3. PREPARAR EL OBJETO:
        batch.set(docRef, {
          id: product.id,
          name: product.name,
          price: Number(product.price), // Convertimos a numero real
          category: product.category,
          description: product.description || "",
          features: product.features || [], // Si tienes arrays de características
          // AQUÍ LA CLAVE: Guardamos solo el nombre del archivo para que Astro lo busque luego
          image: cleanImageName 
        });
        count++;
      });

      setLog(`Preparando ${count} productos...`);

      // 4. EJECUTAR LA SUBIDA (COMMIT)
      await batch.commit();
      
      setStatus('success');
      setLog(`¡Éxito! ${count} productos sincronizados en la Nube.`);
      alert("Migración completada correctamente.");

    } catch (error) {
      console.error(error);
      setStatus('error');
      setLog("Error: " + error.message);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-lg">
        <Database className="text-blue-400"/> Migración de Datos (JSON → Nube)
      </h3>
      
      <p className="text-slate-400 text-sm mb-6">
        Esta herramienta lee tu archivo <code>cctv-products.json</code> local y sube la información a Firebase.
        <br/>
        <span className="text-yellow-500 text-xs">Nota: Las imágenes se quedan en tu PC, solo subimos los nombres y precios.</span>
      </p>
      
      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-800">
          <div className="text-sm font-mono text-slate-300">
              {log || "Esperando orden..."}
          </div>

          <button 
            onClick={uploadData}
            disabled={status === 'loading'}
            className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg ${
              status === 'success' ? 'bg-green-600 text-white hover:bg-green-500' : 
              status === 'loading' ? 'bg-slate-600 text-slate-300 cursor-wait' : 
              'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'
            }`}
          >
            {status === 'loading' && <UploadCloud className="animate-bounce"/>}
            {status === 'success' && <Check size={18}/>}
            {status === 'error' && <AlertTriangle size={18}/>}
            
            {status === 'loading' ? "Subiendo..." : "Sincronizar Ahora"}
          </button>
      </div>
    </div>
  );
}