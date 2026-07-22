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

  // Generador geométrico de floripondio/festoneado perfectamente simétrico (24 ondas)
  const generateScallopedPath = (radius = 48, numScallops = 24, scallopDepth = 3.5) => {
    const center = 50;
    let path = '';
    for (let i = 0; i < numScallops; i++) {
      const angleStep = (Math.PI * 2) / numScallops;
      const a1 = i * angleStep;
      const a2 = (i + 1) * angleStep;
      const aMid = (a1 + a2) / 2;

      const x1 = center + radius * Math.cos(a1);
      const y1 = center + radius * Math.sin(a1);
      
      const xMid = center + (radius + scallopDepth) * Math.cos(aMid);
      const yMid = center + (radius + scallopDepth) * Math.sin(aMid);

      const x2 = center + radius * Math.cos(a2);
      const y2 = center + radius * Math.sin(a2);

      if (i === 0) {
        path += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `;
      }
      path += `Q ${xMid.toFixed(2)} ${yMid.toFixed(2)}, ${x2.toFixed(2)} ${y2.toFixed(2)} `;
    }
    return path + 'Z';
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
          className="fixed top-4 right-4 z-50 bg-teal-800/80 hover:bg-teal-800 text-white p-3 rounded-full shadow-lg backdrop-blur-md transition-all border border-teal-600/30 cursor-pointer"
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
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#eae3d2] p-4 sm:p-6"
          >
            {/* Contenedor principal con relación de aspecto fija 3:2 optimizado para móvil */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/2] flex items-center justify-center filter drop-shadow-2xl">
              
              {/* VECTOR DEL SOBRE */}
              <svg 
                viewBox="0 0 600 400" 
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="envelopeBg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#eedfcc" />
                    <stop offset="100%" stopColor="#d9c5a7" />
                  </linearGradient>

                  <linearGradient id="flapTop" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f8edd8" />
                    <stop offset="100%" stopColor="#e2ceb0" />
                  </linearGradient>

                  <linearGradient id="flapBottom" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#e2d0b5" />
                    <stop offset="100%" stopColor="#cbba9b" />
                  </linearGradient>

                  <linearGradient id="flapSide" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ebdcc8" />
                    <stop offset="100%" stopColor="#cfbc9b" />
                  </linearGradient>

                  <filter id="shadowFlap" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.22" />
                  </filter>
                </defs>

                {/* Base del sobre */}
                <rect x="0" y="0" width="600" height="400" rx="6" fill="url(#envelopeBg)" />

                {/* Solapas inferiores y laterales */}
                <path d="M 0 400 L 300 210 L 600 400 Z" fill="url(#flapBottom)" />
                <path d="M 0 0 L 285 200 L 0 400 Z" fill="url(#flapSide)" opacity="0.9" />
                <path d="M 600 0 L 315 200 L 600 400 Z" fill="url(#flapSide)" opacity="0.85" />

                {/* Solapa Superior */}
                <path 
                  d="M 0 0 
                     L 600 0 
                     L 318 212 
                     Q 300 226, 282 212 
                     Z" 
                  fill="url(#flapTop)" 
                  filter="url(#shadowFlap)"
                />
              </svg>

              {/* Indicador flotante superior */}
              <div className="absolute z-20 flex flex-col items-center top-3 sm:top-5">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#1b3d3b] text-amber-100 text-[10px] sm:text-xs font-serif italic tracking-wider px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-xl border border-amber-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                  <span>Toca el sello para abrir la invitación</span>
                </motion.div>
              </div>

              {/* SELLO DE LACRE CON TAMAÑO RESPONSIVO */}
              <div className="absolute z-30 flex items-center justify-center top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                >
                  {/* Vector exterior del sello */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#0a2e31]" fill="currentColor">
                    <path d={generateScallopedPath(44, 24, 3)} />
                  </svg>

                  {/* Contenedor interior equilibrado al 80% */}
                  <div className="relative z-10 w-[80%] h-[80%] rounded-full border border-dashed border-[#d4af37]/80 flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-[#1c5559] via-[#0f3c3f] to-[#061c1e] shadow-inner">
                    <span className="text-[7px] sm:text-[9px] font-sans italic tracking-[0.2em] text-[#d4af37] opacity-90 uppercase mb-0.5">
                      Mis XV
                    </span>
                    
                    <span className="text-2xl sm:text-4xl font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffe699] via-[#d4af37] to-[#aa7c11] drop-shadow-md my-0">
                      N
                    </span>

                    <span className="text-[7px] sm:text-[9px] font-serif italic tracking-[0.18em] text-[#d4af37] opacity-90 uppercase mt-0.5">
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
      <div className={`w-full max-w-md sm:max-w-xl mx-auto px-4 py-8 sm:py-10 transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        
        <motion.header 
          initial={{ y: 20, opacity: 0 }}
          animate={isOpen ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <span className="text-teal-800 tracking-[0.3em] uppercase text-xs font-bold block mb-2">Te invito a celebrar</span>
          <h1 className="text-4xl sm:text-6xl font-serif text-teal-950 font-normal my-2">
            Natasha
          </h1>
          <p className="text-teal-700/80 font-serif italic text-base sm:text-lg">Mis XV Años</p>
        </motion.header>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={isOpen ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/80 backdrop-blur-sm border border-teal-900/10 rounded-2xl p-6 sm:p-8 text-center shadow-lg mb-8"
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
