'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar, Sparkles } from 'lucide-react';

// ==========================================
// CONFIGURACIÓN RÁPIDA DE DATOS
// ==========================================
const EVENT_DATA = {
  quinceaneraName: "Natasha",
  subtitle: "TE INVITO A CELEBRAR MIS XV AÑOS",
  dateText: "27 de Septiembre, 2025",
  quote: '"Hay momentos inolvidables que se atesoran en el corazón para siempre. Por esa razón, quiero que compartas conmigo este día tan especial."',
  // Ruta local en public/galeria/foto_banner001.jpg o URL de Supabase Storage
  bannerImage: "/galeria/foto_banner001.jpg", 
};

// Generador de destellos/estrellas animadas para el banner
const SparkleStars = () => {
  // Arreglo de 12 estrellas con posiciones y animaciones independientes
  const stars = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {stars.map((_, i) => {
        const top = Math.floor(Math.random() * 90) + 5;
        const left = Math.floor(Math.random() * 90) + 5;
        const duration = 2 + Math.random() * 2.5;
        const delay = Math.random() * 2;
        const size = Math.floor(Math.random() * 12) + 10;

        return (
          <motion.div
            key={i}
            className="absolute text-amber-200/90 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            style={{ top: `${top}%`, left: `${left}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.3, 1.2, 0.3],
              rotate: [0, 90, 180],
              y: [0, -12, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <Sparkles style={{ width: `${size}px`, height: `${size}px` }} />
          </motion.div>
        );
      })}
    </div>
  );
};

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
          className="fixed top-4 right-4 z-50 bg-teal-900/80 hover:bg-teal-900 text-white p-3 rounded-full shadow-lg backdrop-blur-md transition-all border border-amber-500/30 cursor-pointer"
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

                <rect x="0" y="0" width="600" height="400" rx="6" fill="url(#envelopeBg)" />
                <path d="M 0 400 L 300 210 L 600 400 Z" fill="url(#flapBottom)" />
                <path d="M 0 0 L 285 200 L 0 400 Z" fill="url(#flapSide)" opacity="0.9" />
                <path d="M 600 0 L 315 200 L 600 400 Z" fill="url(#flapSide)" opacity="0.85" />
                <path 
                  d="M 0 0 L 600 0 L 318 212 Q 300 226, 282 212 Z" 
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

              {/* SELLO DE LACRE */}
              <div className="absolute z-30 flex items-center justify-center top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#0a2e31]" fill="currentColor">
                    <path d={generateScallopedPath(44, 24, 3)} />
                  </svg>

                  <div className="relative z-10 w-[80%] h-[80%] rounded-full border border-dashed border-[#d4af37]/80 flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-[#1c5559] via-[#0f3c3f] to-[#061c1e] shadow-inner">
                    <span className="text-[7px] sm:text-[9px] font-sans italic tracking-[0.2em] text-[#d4af37] opacity-90 uppercase mb-0.5">
                      Mis XV
                    </span>
                    <span className="text-2xl sm:text-4xl font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffe699] via-[#d4af37] to-[#aa7c11] drop-shadow-md my-0">
                      {EVENT_DATA.quinceaneraName.charAt(0)}
                    </span>
                    <span className="text-[7px] sm:text-[9px] font-serif italic tracking-[0.18em] text-[#d4af37] opacity-90 uppercase mt-0.5">
                      {EVENT_DATA.quinceaneraName}
                    </span>
                  </div>
                </motion.button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO PRINCIPAL DE LA INVITACIÓN */}
      <div className={`w-full max-w-md sm:max-w-xl mx-auto px-4 py-6 sm:py-8 transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* TARJETA HERO DE BANNER CON FOTO + DESTELLOS + NOMBRES */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={isOpen ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl mb-8 border border-teal-900/10 bg-teal-950 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8 text-center"
        >
          {/* 1. Foto de Fondo Banner */}
          <img 
            src={EVENT_DATA.bannerImage} 
            alt={`Banner de ${EVENT_DATA.quinceaneraName}`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
            onError={(e) => {
              // Fallback elegante mientras no está subida la foto real
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* 2. Capa de degradado para asegurar contraste legibilidad de textos */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-black/30 z-0" />

          {/* 3. Animación de destellos brillantes flotantes */}
          <SparkleStars />

          {/* 4. Textos Superpuestos */}
          <div className="relative z-20 pt-4">
            <span className="text-amber-200 tracking-[0.25em] uppercase text-[10px] sm:text-xs font-semibold drop-shadow-md block mb-3">
              {EVENT_DATA.subtitle}
            </span>
            
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff5d6] via-[#ffd97d] to-[#d4af37] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] my-1 tracking-wide">
              {EVENT_DATA.quinceaneraName}
            </h1>
          </div>

          {/* Tarjeta inferior con cita y fecha integrada en la tarjeta del banner */}
          <div className="relative z-20 mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-lg">
            <p className="text-amber-100/90 italic text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-4 font-serif">
              {EVENT_DATA.quote}
            </p>

            <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/15 text-amber-200">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span className="font-medium text-xs sm:text-sm tracking-wide">{EVENT_DATA.dateText}</span>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
