'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [portadaUrl, setPortadaUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Evitar que Vercel ejecute lógica de cliente durante la generación estática
  useEffect(() => {
    setIsMounted(true);

    const fetchAssets = () => {
      try {
        const { data } = supabase.storage
          .from('invitaciones')
          .getPublicUrl('portadaXV.jpg');

        if (data?.publicUrl) {
          setPortadaUrl(data.publicUrl);
        }
      } catch (error) {
        console.error("Error al obtener imagen de Supabase:", error);
      }
    };

    fetchAssets();
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio reproducido tras interacción:", err);
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

  // Si se está compilando en el servidor de Vercel, retornamos un HTML estático mínimo
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
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#f4f0e6] shadow-inner p-4"
          >
            <div className="relative w-full max-w-4xl h-[85vh] max-h-[600px] bg-[#fcfaf7] border border-[#e5dec9] rounded-lg shadow-2xl overflow-hidden flex items-center justify-center">
              
              {/* Solapas decorativas */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="absolute top-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 50,50" fill="#f5f0e3" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,50 100,50 50,0" fill="#f1ead7" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
              </div>

              {/* Indicador flotante */}
              <div className="absolute z-20 flex flex-col items-center top-[18%] sm:top-[22%]">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#1b3d3b] text-amber-100 text-xs font-serif italic tracking-wider px-4 py-1.5 rounded-full shadow-xl border border-amber-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Toca el sello para abrir la invitación</span>
                </motion.div>
              </div>

              {/* Sello Lacre Estándar */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="relative z-30 w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center cursor-pointer drop-shadow-2xl"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-800 via-teal-900 to-teal-950 border-4 border-teal-900 shadow-2xl flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-400/50 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-sans italic tracking-widest text-amber-300/80 uppercase">Mis XV</span>
                    <span className="text-6xl font-serif font-bold italic text-amber-200 my-1 drop-shadow">N</span>
                    <span className="text-[10px] font-serif italic tracking-widest text-amber-300/80 uppercase">Natasha</span>
                  </div>
                </div>
              </motion.button>

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

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isOpen ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-10 bg-teal-900/10"
        >
          {portadaUrl ? (
            <img 
              src={portadaUrl} 
              alt="Portada Natasha XV Años" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-teal-800 text-sm p-6 bg-teal-900/5">
              <Sparkles className="w-10 h-10 animate-pulse mb-3 text-teal-600/50" />
              Cargando portada desde Supabase...
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent"></div>
        </motion.div>

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
