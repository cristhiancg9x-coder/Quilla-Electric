import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $currentUser, $isAdmin } from '@modules/auth/store/authStore';
import { auth } from '@lib/firebase/config';

export default function AdminGuard({ children }) {
  const user = useStore($currentUser);
  const isAdmin = useStore($isAdmin);
  // 🔒 ESTADO INICIAL: true (Cargando).
  // Esto asegura que la pantalla empiece VACÍA o mostrando el spinner.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preguntamos a Firebase: "¿Quién está ahí?"
    const unsubscribe = auth.onAuthStateChanged((u) => {
        setLoading(false); // Ya tenemos respuesta, dejamos de cargar
    });
    return () => unsubscribe();
  }, []);

  // 1. PANTALLA DE CARGA (Nadie ve nada todavía)
  if (loading) {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-slate-400 animate-pulse">Verificando Blindaje...</p>
        </div>
    );
  }

  // 2. SI NO HAY USUARIO (Incógnito o Desconectado) -> FUERA
  if (!user) {
    // Redirección forzada
    if (typeof window !== "undefined") window.location.replace("/login");
    return null; // Retornamos null para no renderizar NADA del dashboard
  }

  // 3. SI HAY USUARIO PERO NO ES ADMIN -> ACCESO DENEGADO
  if (!isAdmin) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
            <h1 className="text-4xl mb-2">⛔</h1>
            <p className="text-xl font-bold text-red-500">Acceso No Autorizado</p>
            <a href="/" className="mt-4 text-slate-400 hover:text-white underline">Volver al Inicio</a>
        </div>
    );
  }

  // 4. SOLO SI PASA TODO LO ANTERIOR -> MUESTRA EL DASHBOARD
  return <>{children}</>;
}