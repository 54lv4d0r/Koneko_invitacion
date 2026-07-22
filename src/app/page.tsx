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
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#e5dec9] p-4"
          >
            <div className="relative w-full max-w-3xl h-[75vh] max-h-[520px] bg-[#eadeca] border-2 border-[#c7b897] rounded-lg shadow-2xl overflow-hidden flex items-center justify-center">
              
              {/* CAPAS Y SOLAPAS DEL SOBRE */}
              <div className="absolute inset-0 pointer-events-none">
                
                {/* Interior/Fondo del sobre */}
                <div className="absolute inset-0 bg-[#d1c2a5]" />

                {/* Solapa Inferior (Base del cuerpo) */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-[60%] bg-[#ebdcc3] border-t-2 border-[#bfae8a]"
                  style={{ 
                    clipPath: 'polygon(0 100%, 100% 100%, 50% 15%)',
                  }} 
                />

                {/* Solapa Izquierda */}
                <div 
                  className="absolute top-0 left-0 w-1/2 h-full bg-[#f3e4cc] border-r border-[#c4b38f]"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                  }} 
                />

                {/* Solapa Derecha */}
                <div 
                  className="absolute top-0 right-0 w-1/2 h-full bg-[#eee0c7] border-l border-[#c4b38f]"
                  style={{ 
                    clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                  }} 
                />

                {/* Solapa Superior Principal (Cierra hacia abajo) */}
                <div 
                  className="absolute top-0 left-0 w-full h-[58%] bg-[#faf0dc] z-10"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.22))'
                  }} 
                />
              </div>

              {/* Indicador flotante */}
              <div className="absolute z-20 flex flex-col items-center top-[8%] sm:top-[10%]">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#1b3d3b] text-amber-100 text-xs font-serif italic tracking-wider px-4 py-1.5 rounded-full shadow-xl border border-amber-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Toca el sello para abrir la invitación</span>
                </motion.div>
              </div>

              {/* SELLO DE LACRE ONDULADO REAL (SVG INLINE SÚPER LIGERO) */}
              <div className="relative z-30 flex items-center justify-center top-[4%]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer flex items-center justify-center filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]"
                >
                  {/* SVG de fondo para la silueta del sello con floripondio/ondas reales */}
                  <svg 
                    viewBox="0 0 200 200" 
                    className="absolute inset-0 w-full h-full text-[#0a2e31]"
                    fill="currentColor"
                  >
                    <path d="M100 10 C108 10, 112 18, 120 20 C128 22, 136 17, 142 22 C148 27, 149 36, 154 42 C159 48, 168 50, 171 58 C174 66, 170 75, 171 83 C172 91, 179 97, 178 105 C177 113, 170 119, 168 127 C166 135, 170 144, 166 151 C162 158, 153 159, 147 164 C141 169, 139 178, 132 181 C125 184, 116 180, 108 181 C100 182, 92 182, 85 180 C78 178, 73 171, 66 168 C59 165, 50 165, 44 159 C38 153, 39 144, 34 138 C29 132, 20 129, 18 121 C16 113, 22 105, 21 97 C20 89, 14 82, 16 74 C18 66, 26 62, 30 55 C34 48, 34 39, 40 33 C46 27, 55 28, 62 23 C69 18, 74 11, 82 10 C90 9, 92 10, 100 10 Z" />
                  </svg>

                  {/* Contenido interior del sello */}
                  <div className="relative z-10 w-[78%] h-[78%] rounded-full border-2 border-dashed border-[#d4af37]/80 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-[#1b565a] via-[#0f3c3f] to-[#061c1e] shadow-inner">
                    <span className="text-[9px] sm:text-[10px] font-sans italic tracking-[0.25em] text-[#d4af37] opacity-90 uppercase mb-0.5">
                      Mis XV
                    </span>
                    
                    <span className="text-4xl sm:text-5xl font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffe699] via-[#d4af37] to-[#aa7c11] drop-shadow-md my-0.5">
                      N
                    </span>

                    <span className="text-[9px] sm:text-[10px] font-serif italic tracking-[0.2em] text-[#d4af37] opacity-90 uppercase mt-0.5">
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
