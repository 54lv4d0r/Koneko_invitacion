'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar, Sparkles } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio play deferred or blocked:", err);
      });
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f8f6f0] overflow-x-hidden flex flex-col items-center select-none font-sans">
      <audio ref={audioRef} loop src="https://invitacion-celebriq.b-cdn.net/wp-content/uploads/2025/07/Coldplay.mp3" />

      {/* Botón flotante de audio */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleAudio}
          className="fixed top-5 right-5 z-50 bg-teal-800/80 hover:bg-teal-800 text-white p-3 rounded-full shadow-lg backdrop-blur-md transition-all border border-teal-600/30 cursor-pointer"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      )}

      {/* Sobre de entrada */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.2 } }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#eae3d2] shadow-inner p-4"
          >
            <div className="relative w-full max-w-4xl h-[85vh] max-h-[600px] bg-[#e3d8c4] border border-[#d2c3a7] rounded-xl shadow-2xl overflow-hidden flex items-center justify-center">
              
              {/* ESTRUCTURA REALISTA DEL SOBRE CERRADO */}
              <div className="absolute inset-0 pointer-events-none">
                
                {/* 1. Fondo base (Interior del sobre) */}
                <div className="absolute inset-0 bg-[#d9cdb6]" />

                {/* 2. Solapa inferior (Brazos que suben suavemente) */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-[65%] bg-[#ebdcc3] border-t border-[#d5c5a8]"
                  style={{ 
                    clipPath: 'polygon(0 100%, 100% 100%, 50% 20%)',
                    filter: 'drop-shadow(0px -2px 3px rgba(0,0,0,0.05))'
                  }} 
                />

                {/* 3. Solapa izquierda */}
                <div 
                  className="absolute top-0 left-0 w-[55%] h-full bg-[#f2e4cc]"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                    filter: 'drop-shadow(2px 0px 4px rgba(0,0,0,0.06))'
                  }} 
                />

                {/* 4. Solapa derecha */}
                <div 
                  className="absolute top-0 right-0 w-[55%] h-full bg-[#eee0c8]"
                  style={{ 
                    clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                    filter: 'drop-shadow(-2px 0px 4px rgba(0,0,0,0.06))'
                  }} 
                />

                {/* 5. Solapa Superior Principal (VA CERRADA HACIA ABAJO) */}
                <div 
                  className="absolute top-0 left-0 w-full h-[62%] bg-[#f7ebd7] z-10"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.18))'
                  }} 
                />

                {/* Sombra de pliegue sutil en la punta de la solapa superior */}
                <div 
                  className="absolute top-0 left-0 w-full h-[62%] bg-black/5 z-10"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
              </div>

              {/* Indicador flotante */}
              <div className="absolute z-20 flex flex-col items-center top-[10%] sm:top-[12%]">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#1b3d3b] text-amber-100 text-xs font-serif italic tracking-wider px-4 py-1.5 rounded-full shadow-xl border border-amber-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Toca el sello para abrir la invitación</span>
                </motion.div>
              </div>

              {/* SELLO DE LACRE CON BORDE ONDULADO/FESTONADO (CSS MASK) */}
              <div className="relative z-30 flex items-center justify-center top-[6%]">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer flex items-center justify-center p-3 bg-[#0a2e31] drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]"
                  style={{
                    // Genera las ondas circulares (scalloped edge) en el borde externo
                    WebkitMaskImage: 'radial-gradient(circle 10px at 10px 10px, transparent 98%, black 100%)',
                    WebkitMaskSize: '20px 20px',
                    WebkitMaskComposite: 'exclude',
                    maskImage: 'radial-gradient(circle 10px at 10px 10px, transparent 98%, black 100%)',
                    maskSize: '20px 20px',
                    maskComposite: 'exclude',
                    borderRadius: '50%'
                  }}
                >
                  {/* Borde exterior acentuado */}
                  <div className="absolute inset-0 rounded-full border-4 border-[#164d51] shadow-inner" />

                  {/* Círculo interno decorativo */}
                  <div className="w-full h-full rounded-full border-2 border-dashed border-[#d4af37]/80 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#1b565a] via-[#0f3c3f] to-[#061c1e] shadow-inner">
                    <span className="text-[10px] font-sans italic tracking-[0.25em] text-[#d4af37] opacity-90 uppercase mb-0.5">
                      Mis XV
                    </span>
                    
                    <span className="text-5xl sm:text-6xl font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffe699] via-[#d4af37] to-[#aa7c11] drop-shadow-md my-0.5">
                      N
                    </span>

                    <span className="text-[10px] font-serif italic tracking-[0.2em] text-[#d4af37] opacity-90 uppercase mt-0.5">
                      Natasha
                    </span>
                  </div>
                </motion.button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal de la invitación */}
      <div className={`w-full max-w-xl mx-auto px-4 py-10 transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        
        <motion.header 
          initial={{ y: 20, opacity: 0 }}
          animate={isOpen ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <span className="text-teal-800 tracking-[0.3em] uppercase text-xs font-bold block mb-2">Te invito a celebrar</span>
          <h1 className="text-5xl sm:text-6xl font-serif text-teal-950 font-normal my-2">
            Natasha
          </h1>
          <p className="text-teal-700/80 font-serif italic text-lg">Mis XV Años</p>
        </motion.header>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={isOpen ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/80 backdrop-blur-sm border border-teal-900/10 rounded-2xl p-8 text-center shadow-lg mb-8"
        >
          <p className="text-gray-600 italic text-sm leading-relaxed max-w-sm mx-auto mb-6">
            "Hay momentos inolvidables que se atesoran en el corazón para siempre. Por esa razón, quiero que compartas conmigo este día tan especial."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-teal-900/10 text-teal-900">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-700" />
              <span className="font-medium text-sm">27 de Septiembre, 2025</span>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
