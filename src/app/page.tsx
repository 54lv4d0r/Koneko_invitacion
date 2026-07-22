'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar } from 'lucide-react';

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

// Componente de Destello Elegante de 4 Puntas (Luxury Diamond Sparkle)
const LuxurySparkle = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-amber-200/90 ${className}`}
    style={{ filter: 'drop-shadow(0px 0px 6px rgba(251, 191, 36, 0.85))' }}
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

// Generador de destellos lujosos animados sobre la imagen
const LuxuryGlitterOverlay = () => {
  const sparkles = Array.from({ length: 16 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {sparkles.map((_, i) => {
        const top = Math.floor(Math.random() * 88) + 6;
        const left = Math.floor(Math.random() * 88) + 6;
        const duration = 2.5 + Math.random() * 2.5;
        const delay = Math.random() * 3;
        const size = Math.floor(Math.random() * 12) + 8; // tamaños sutiles (8px - 20px)

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${top}%`, left: `${left}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.95, 0],
              scale: [0.2, 1.1, 0.2],
              rotate: [0, 45, 90],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <LuxurySparkle size={size} />
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

  // Generador geométrico de floripondio para el sello de lacre
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
      <div className="min-h-screen bg-[#081a18] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#081816] text-amber-50 overflow-x-hidden flex flex-col items-center select-none font-sans">
      <audio ref={audioRef} loop src="https://invitacion-celebriq.b-cdn.net/wp-content/uploads/2025/07/Coldplay.mp3" />

      {/* Botón flotante de audio */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 bg-[#09221f]/80 hover:bg-[#0d2e2b] text-amber-200 p-3 rounded-full shadow-2xl backdrop-blur-md transition-all border border-amber-500/30 cursor-pointer"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      )}

      {/* VISTA 1: SOBRE DE BIENVENIDA */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.2 } }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#0d2220] p-4 sm:p-6"
          >
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/2] flex items-center justify-center filter drop-shadow-2xl">
              
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
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
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

              <div className="absolute z-20 flex flex-col items-center top-3 sm:top-5">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#081a18] text-amber-200 text-[10px] sm:text-xs font-serif italic tracking-wider px-4 py-1.5 rounded-full shadow-xl border border-amber-500/30 flex items-center gap-1.5"
                >
                  <LuxurySparkle size={12} />
                  <span>Toca el sello para abrir la invitación</span>
                </motion.div>
              </div>

              {/* SELLO DE LACRE */}
              <div className="absolute z-30 flex items-center justify-center top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#0a2b27]" fill="currentColor">
                    <path d={generateScallopedPath(44, 24, 3)} />
                  </svg>

                  <div className="relative z-10 w-[80%] h-[80%] rounded-full border border-dashed border-[#d4af37]/80 flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-[#12423c] via-[#0b2b27] to-[#041210] shadow-inner">
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

      {/* CONTENEDOR PRINCIPAL SCROLLABLE (PANELES) */}
      <div className={`w-full max-w-md sm:max-w-xl mx-auto px-4 py-8 sm:py-12 transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* PANEL 1: BANNER PRINCIPAL HERO (Scrollable) */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center py-4">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={isOpen ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-amber-500/20 bg-[#071e1c] flex flex-col justify-between p-6 sm:p-8 text-center min-h-[500px]"
          >
            {/* Foto de Banner de Fondo */}
            <img 
              src={EVENT_DATA.bannerImage} 
              alt={`Banner de ${EVENT_DATA.quinceaneraName}`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Overlay suave para máxima legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#061917]/70 via-[#071f1d]/50 to-[#041211]/90 z-0" />

            {/* Brillos Luxury Animados */}
            <LuxuryGlitterOverlay />

            {/* Encabezado Nombres */}
            <div className="relative z-20 pt-6">
              <span className="text-amber-200/90 tracking-[0.3em] uppercase text-[10px] sm:text-xs font-serif font-light drop-shadow-md block mb-4">
                {EVENT_DATA.subtitle}
              </span>
              
              <h1 className="text-5xl sm:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff3cc] via-[#f7d774] to-[#cba33f] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] my-2 tracking-wide">
                {EVENT_DATA.quinceaneraName}
              </h1>
            </div>

            {/* Tarjeta de Cita + Fecha integrada en la parte inferior */}
            <div className="relative z-20 mt-8 bg-[#092b27]/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 text-amber-100/90 shadow-2xl">
              <p className="italic text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-5 font-serif font-light tracking-wide">
                {EVENT_DATA.quote}
              </p>

              <div className="flex items-center justify-center gap-2 pt-4 border-t border-amber-500/15 text-amber-300">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-serif text-xs sm:text-sm tracking-widest uppercase">{EVENT_DATA.dateText}</span>
              </div>
            </div>

          </motion.div>
        </section>

        {/* 
          PANEL 2, PANEL 3, ETC.
          Aquí iremos añadiendo los siguientes paneles conforme los vayamos diseñando 
          (ej. Cuenta Regresiva, Ubicación, Dresscode, Confirmación de asistencia).
        */}

      </div>
    </div>
  );
}
