import React, { useState, useRef } from 'react';
import { X, MessageCircle, Zap, ShieldCheck, Bot } from 'lucide-react';

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Abrir: Activar sonido y reproducir
      if(videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsMuted(false);
      }
    } else {
      // Cerrar: Silenciar
      if(videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* GLOBO DE TEXTO (Llamada a la acción) */}
      {!isOpen && (
        <div 
          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-xl mb-3 animate-bounce border border-blue-400 cursor-pointer flex items-center gap-2" 
          onClick={toggleOpen}
        >
          <Bot size={18} />
          <span className="font-bold text-sm">¿Te ayudo con tu instalación?</span>
        </div>
      )}

      {/* CONTENEDOR DEL AVATAR */}
      <div className={`transition-all duration-500 ease-in-out bg-slate-900 border-2 border-blue-500 shadow-2xl overflow-hidden ${isOpen ? 'w-80 rounded-2xl h-auto' : 'w-20 h-20 rounded-full hover:scale-110 cursor-pointer'}`}>
        
        {/* BOTÓN CERRAR */}
        {isOpen && (
          <button onClick={toggleOpen} className="absolute top-2 right-2 z-20 bg-slate-900/80 text-white p-1 rounded-full hover:bg-red-500 transition-colors border border-slate-600">
            <X size={20} />
          </button>
        )}

        {/* VIDEO IA */}
        <div className="relative w-full h-full" onClick={!isOpen ? toggleOpen : undefined}>
            <video 
              ref={videoRef}
              src="/bienvenida.mp4" 
              className={`object-cover w-full ${isOpen ? 'h-64' : 'h-full'}`}
              autoPlay 
              loop 
              muted={isMuted} 
              playsInline
            />
            {/* Degradado para que el texto se lea bien */}
            {isOpen && <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-slate-900 to-transparent"></div>}
        </div>

        {/* MENÚ DE OPCIONES (Estilo Cyberpunk) */}
        {isOpen && (
          <div className="p-4 bg-slate-900 space-y-3 border-t border-slate-700">
            <p className="text-center text-blue-300 text-xs uppercase tracking-widest mb-2">Selecciona una opción</p>
            
            <a href="/cotizador" className="flex items-center gap-3 bg-slate-800 hover:bg-blue-900/50 hover:border-blue-500 border border-slate-700 text-white p-3 rounded-lg transition-all group">
              <ShieldCheck size={20} className="text-blue-400 group-hover:text-blue-300" />
              <div className="text-sm font-bold">Cotizar Cámaras 3D</div>
            </a>

            <a href="/servicios" className="flex items-center gap-3 bg-slate-800 hover:bg-purple-900/50 hover:border-purple-500 border border-slate-700 text-white p-3 rounded-lg transition-all group">
              <Zap size={20} className="text-purple-400 group-hover:text-purple-300" />
              <div className="text-sm font-bold">Ver Servicios</div>
            </a>

            <a href="https://wa.me/51951413458" target="_blank" className="flex items-center gap-3 bg-green-900/30 hover:bg-green-900/50 hover:border-green-500 border border-green-800 text-white p-3 rounded-lg transition-all group">
              <MessageCircle size={20} className="text-green-400 group-hover:text-green-300" />
              <div className="text-sm font-bold">Hablar con Humano</div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}