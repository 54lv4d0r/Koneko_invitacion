'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [portadaUrl, setPortadaUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchAssets = () => {
      const { data } = supabase.storage
        .from('invitaciones')
        .getPublicUrl('portadaXV.jpg');

      if (data?.publicUrl) {
        setPortadaUrl(data.publicUrl);
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
    <div className="relative min-h-screen bg-[#f8f6f0] overflow-x-hidden flex flex-col items-center select-none">
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
              
              {/* Solapas del sobre */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="absolute top-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 50,50" fill="#f5f0e3" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full h-1/2" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polygon points="0,50 100,50 50,0" fill="#f1ead7" stroke="#e0d5be" strokeWidth="0.4" />
                </svg>
              </div>

              {/* Indicador flotante superior */}
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

              {/* NUEVO SELLO DE LACRE REALISTA CON BORDES ORGÁNICOS */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="relative z-30 w-56 h-56 flex items-center justify-center cursor-pointer drop-shadow-2xl"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Gradiente de volumen para la cera (Verde Esmeralda Profundo) */}
                    <radialGradient id="realWaxGrad" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#216a70" />
                      <stop offset="35%" stopColor="#124f53" />
                      <stop offset="70%" stopColor="#082d30" />
                      <stop offset="100%" stopColor="#031617" />
                    </radialGradient>

                    {/* Gradiente de profundidad interior para el troquel */}
                    <radialGradient id="pitDepth" cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#1a6266" />
                      <stop offset="75%" stopColor="#082d30" />
                      <stop offset="100%" stopColor="#021112" />
                    </radialGradient>

                    {/* Gradiente metálico dorado para el monograma */}
                    <linearGradient id="goldReliefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff2c2" />
                      <stop offset="30%" stopColor="#d8a84e" />
                      <stop offset="70%" stopColor="#a37622" />
                      <stop offset="100%" stopColor="#5e410b" />
                    </linearGradient>
                  </defs>

                  {/* Cuerpo fluido e irregular de la cera derretida */}
                  <path
                    d="M 100,10 C 130,4 168,14 182,42 C 196,70 198,106 182,138 C 166,170 138,194 102,190 C 66,186 28,172 14,138 C 0,104 10,64 32,34 C 54,4 68,16 100,10 Z"
                    fill="url(#realWaxGrad)"
                  />

                  {/* Gotas orgánicas de cera derretida en los bordes */}
                  <circle cx="176" cy="132" r="7" fill="#082d30" />
                  <circle cx="25" cy="58" r="9" fill="#124f53" />
                  <circle cx="135" cy="184" r="6" fill="#031617" />
                  <circle cx="55" cy="180" r="8" fill="#062224" />

                  {/* Bisel del pozo donde presiona el timbre */}
                  <path
                    d="M 100,36 C 132,34 158,54 160,88 C 162,122 140,154 108,158 C 76,162 44,142 40,108 C 36,74 68,38 100,36 Z"
                    fill="url(#pitDepth)"
                    stroke="#021112"
                    strokeWidth="2.5"
                  />

                  {/* Brillo curvo reflectante de cera pulida */}
                  <path
                    d="M 48,36 C 70,20 130,18 152,34"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.3"
                  />

                  {/* Anillo troquelado interno */}
                  <path
                    d="M 100,44 C 126,42 148,58 150,86 C 152,114 134,142 106,144 C 78,146 50,130 48,102 C 46,74 74,46 100,44 Z"
                    fill="none"
                    stroke="#d8a84e"
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                    opacity="0.45"
                  />

                  {/* Monograma "N" y detalles grabados */}
                  <g transform="translate(100, 100)" textAnchor="middle" dominantBaseline="central">
                    {/* Sombra de grabado */}
                    <text
                      x="1"
                      y="3"
                      fill="#01090a"
                      fontSize="62"
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      fontStyle="italic"
                      opacity="0.8"
                    >
                      N
                    </text>
                    
                    {/* Letra principal en oro metálico */}
                    <text
                      x="0"
                      y="0"
                      fill="url(#goldReliefGrad)"
                      fontSize="62"
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      fontStyle="italic"
                    >
                      N
                    </text>

                    {/* Leyendas grabadas */}
                    <text y="-38" fill="#d8a84e" fontSize="8.5" fontFamily="sans-serif" letterSpacing="3" opacity="0.8">
                      MIS XV
                    </text>
                    <text y="40" fill="#d8a84e" fontSize="8.5" fontFamily="Georgia, serif" letterSpacing="2" opacity="0.8">
                      NATASHA
                    </text>
                  </g>
                </svg>
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

        {/* Imagen cargada dinámicamente desde Supabase Storage */}
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
            <div className="w-full h-full flex items-center justify-center text-teal-800 text-sm">
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
