'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, MapPin, Calendar, Heart } from 'lucide-react';

export default function EnvelopeScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio play deferred:", err);
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

  return (
    <div className="relative min-h-screen bg-[#f8f6f0] overflow-hidden flex flex-col items-center justify-center">
      {/* Audio Element (Música de fondo) */}
      <audio ref={audioRef} loop src="https://invitacion-celebriq.b-cdn.net/wp-content/uploads/2025/07/Coldplay.mp3" />

      {/* Botón flotante para pausar/reproducir música */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleAudio}
          className="fixed top-5 right-5 z-50 bg-teal-700/80 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg backdrop-blur-md transition-all flex items-center justify-center border border-teal-500/30"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      )}

      {/* SOBRE CON SELLO DE LACRE INTERACTIVO */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#f4f0e6] shadow-inner p-4"
          >
            <div className="relative w-full max-w-4xl h-[85vh] max-h-[600px] bg-[#fcfaf7] border border-[#e5dec9] rounded-lg shadow-2xl overflow-hidden flex items-center justify-center">
              
              {/* Solapas simuladas del sobre */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="absolute top-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 50,50" fill="#f5f0e3" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,50 100,50 50,0" fill="#f1ead7" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
                <svg className="absolute top-0 left-0 w-1/2 h-full" viewBox="0 0 50 100" preserveAspectRatio="none">
                  <polygon points="0,0 0,100 50,50" fill="#ede5d0" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
                <svg className="absolute top-0 right-0 w-1/2 h-full" viewBox="0 0 50 100" preserveAspectRatio="none">
                  <polygon points="50,0 50,100 0,50" fill="#ede5d0" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
              </div>

              {/* Indicador "¡Toca aquí!" */}
              <div className="absolute z-20 flex flex-col items-center top-[38%] sm:top-[36%]">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#3a3a3a] text-white text-xs font-semibold px-4 py-1.5 rounded-md shadow-md border border-gray-600 mb-2"
                >
                  ¡Toca aquí!
                </motion.div>
              </div>

              {/* SELLO DE LACRE */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="relative z-30 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-teal-700 shadow-2xl flex flex-col items-center justify-center text-amber-100 p-2 cursor-pointer border-4 border-teal-800 transition-all group"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(20, 82, 86, 0.6), inset 0 2px 6px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="text-amber-200 mb-1 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                  </svg>
                </div>

                <span className="text-sm font-serif italic tracking-wide text-amber-100/90 font-light">Mis XV</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-amber-100 tracking-wider font-cursive">Natasha</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO DE LA INVITACIÓN */}
      <div className={`w-full max-w-xl mx-auto min-h-screen px-4 py-12 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={isOpen ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm border border-teal-900/10 rounded-2xl p-8 sm:p-12 text-center shadow-xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800"></div>

          <p className="text-teal-800 tracking-[0.3em] uppercase text-xs font-semibold mb-2">Te invito a celebrar</p>
          <h1 className="text-5xl sm:text-6xl font-serif text-teal-900 my-4 font-normal" style={{ fontFamily: "'Cinzel', serif" }}>
            Natasha
          </h1>
          <div className="flex items-center justify-center gap-3 my-2">
            <span className="h-[1px] w-12 bg-teal-700/30"></span>
            <span className="text-2xl font-serif italic text-teal-700 font-light">Mis XV Años</span>
            <span className="h-[1px] w-12 bg-teal-700/30"></span>
          </div>

          <p className="text-gray-600 italic text-sm my-6 max-w-sm mx-auto leading-relaxed">
            "Hay momentos inolvidables que se atesoran en el corazón para siempre, por esa razón, quiero que compartas conmigo este día tan especial."
          </p>

          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/60 rounded-full px-6 py-2 text-teal-800 text-sm font-medium">
            <Calendar className="w-4 h-4 text-teal-700" />
            <span>27 de Septiembre, 2025</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
