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
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#eae3d2] p-4"
          >
            <div className="relative w-full max-w-2xl h-[65vh] max-h-[460px] flex items-center justify-center filter drop-shadow-2xl">
              
              {/* VISTA VECTORIAL FIDELÍSIMA AL SOBRE FÍSICO DE REFERENCIA */}
              <svg 
                viewBox="0 0 600 420" 
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Degradados para dar volumen real al papel */}
                  <linearGradient id="envelopeBg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#eedfcc" />
                    <stop offset="100%" stopColor="#d9c5a7" />
                  </linearGradient>

                  <linearGradient id="flapTop" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f7ebda" />
                    <stop offset="100%" stopColor="#e3cfb3" />
                  </linearGradient>

                  <linearGradient id="flapBottom" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#e2d0b5" />
                    <stop offset="100%" stopColor="#ccb798" />
                  </linearGradient>

                  <linearGradient id="flapSide" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ebdcc8" />
                    <stop offset="100%" stopColor="#d2bf9f" />
                  </linearGradient>

                  {/* Sombra proyectada por la solapa superior */}
                  <filter id="shadowFlap" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* 1. Fondo base del sobre */}
                <rect x="0" y="0" width="600" height="420" rx="8" fill="url(#envelopeBg)" />

                {/* 2. Solapa Inferior (Triángulo inferior que sube hacia el centro) */}
                <path d="M 0 420 L 300 230 L 600 420 Z" fill="url(#flapBottom)" />

                {/* 3. Solapa Izquierda */}
                <path d="M 0 0 L 290 220 L 0 420 Z" fill="url(#flapSide)" opacity="0.9" />

                {/* 4. Solapa Derecha */}
                <path d="M 600 0 L 310 220 L 600 420 Z" fill="url(#flapSide)" opacity="0.85" />

                {/* 5. Solapa Superior Real (Punta redondeada que abraza hacia abajo) */}
                <path 
                  d="M 12 0 
                     L 588 0 
                     C 595 0, 600 5, 595 15
                     L 318 232 
                     Q 300 248, 282 232 
                     L 5 15 
                     C 0 5, 5 0, 12 0 Z" 
                  fill="url(#flapTop)" 
                  filter="url(#shadowFlap)"
                />

                {/* Línea de pliegue sutil en los bordes superiores */}
                <path d="M 0 0 L 300 238 L 600 0" stroke="#bda888" strokeWidth="1.5" fill="none" opacity="0.4" />
              </svg>

              {/* Indicador flotante superior */}
              <div className="absolute z-20 flex flex-col items-center top-[6%] sm:top-[8%]">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#1b3d3b] text-amber-100 text-xs font-serif italic tracking-wider px-4 py-1.5 rounded-full shadow-xl border border-amber-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Toca el sello para abrir la invitación</span>
                </motion.div>
              </div>

              {/* SELLO DE LACRE CON BORDE ONDULADO/FESTONADO CORRECTO */}
              <div className="relative z-30 flex items-center justify-center top-[8%]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="relative w-40 h-40 sm:w-48 sm:h-48 cursor-pointer flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                >
                  {/* Círculo con borde festoneado/ondulado mediante SVG inline */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#0a2e31]" fill="currentColor">
                    <path d="
                      M 50 5
                      Q 53 1, 56 5 Q 60 1, 63 6 Q 68 3, 70 8 Q 75 6, 77 12 Q 82 11, 83 17 Q 88 17, 88 23 Q 93 25, 92 31 Q 97 34, 95 40 Q 99 44, 96 50 Q 99 56, 95 60 Q 97 66, 92 69 Q 93 75, 88 77 Q 88 83, 83 83 Q 82 89, 77 88 Q 75 94, 70 92 Q 68 97, 63 94 Q 60 99, 56 95 Q 53 99, 50 95 Q 47 99, 44 95 Q 40 99, 37 94 Q 32 97, 30 92 Q 25 94, 23 88 Q 18 89, 17 83 Q 12 83, 12 77 Q 7 75, 8 69 Q 3 66, 5 60 Q 1 56, 4 50 Q 1 44, 5 40 Q 3 34, 8 31 Q 7 25, 12 23 Q 12 17, 17 17 Q 18 11, 23 12 Q 25 6, 30 8 Q 32 3, 37 6 Q 40 1, 44 5 Z
                    " />
                  </svg>

                  {/* Interior del sello */}
                  <div className="relative z-10 w-[74%] h-[74%] rounded-full border-2 border-dashed border-[#d4af37]/80 flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-[#1c5559] via-[#0f3c3f] to-[#061c1e] shadow-inner">
                    <span className="text-[9px] font-sans italic tracking-[0.2em] text-[#d4af37] opacity-90 uppercase mb-0.5">
                      Mis XV
                    </span>
                    
                    <span className="text-3xl sm:text-4xl font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffe699] via-[#d4af37] to-[#aa7c11] drop-shadow-md my-0">
                      N
                    </span>

                    <span className="text-[9px] font-serif italic tracking-[0.18em] text-[#d4af37] opacity-90 uppercase mt-0.5">
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
