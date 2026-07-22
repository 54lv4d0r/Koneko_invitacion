'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reemplaza esta URL con la URL base de tu bucket de Supabase
  const SUPABASE_STORAGE_URL = 'https://TU-PROYECTO.supabase.co/storage/v1/object/public/invitaciones';
  const portadaUrl = `${SUPABASE_STORAGE_URL}/portadaXV.jpg`;

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
    <div className="relative min-h-screen bg-[#f8f6f0] overflow-x-hidden flex flex-col items-center">
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
              
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="absolute top-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 50,50" fill="#f5f0e3" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,50 100,50 50,0" fill="#f1ead7" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
              </div>

              <div className="absolute z-20 flex flex-col items-center top-[38%] sm:top-[36%]">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#3a3a3a] text-white text-xs font-semibold px-4 py-1.5 rounded-md shadow-md border border-gray-600 mb-2"
                >
                  ¡Toca aquí!
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="relative z-30 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-teal-800 shadow-2xl flex flex-col items-center justify-center text-amber-100 p-2 cursor-pointer border-4 border-teal-900 transition-all group"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(20, 82, 86, 0.6), inset 0 2px 6px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="text-amber-200 mb-1 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-xs font-serif italic tracking-wide text-amber-100/90">Mis XV</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-amber-100 tracking-wider">Natasha</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal de la invitación */}
      <div className={`w-full max-w-xl mx-auto px-4 py-10 transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* Encabezado / Bienvenida */}
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

        {/* Foto de portada (Supabase) */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isOpen ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-10 bg-teal-900/10"
        >
          <img 
            src={portadaUrl} 
            alt="Portada Natasha XV Años" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Si la imagen de Supabase aún no está subida, muestra un placeholder elegante temporal
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent"></div>
        </motion.div>

        {/* Tarjeta de Mensaje y Fecha */}
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
