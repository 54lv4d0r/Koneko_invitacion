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

              {/* SELLO DE LACRE HIPERREALISTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="relative z-30 w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center cursor-pointer group filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]"
              >
                {/* Textura fotográfica/3D de la cera en alta resolución */}
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                  alt="Sello de lacre real"
                  className="absolute inset-0 w-full h-full object-cover rounded-full mix-blend-multiply opacity-90 [clip-path:polygon(30%_0%,_70%_0%,_100%_30%,_100%_70%,_70%_100%,_30%_100%,_0%_70%,_0%_30%)]"
                  style={{
                    maskImage: 'radial-gradient(circle, black 65%, transparent 72%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 72%)'
                  }}
                />

                {/* SVG Híbrido: Genera el bisel del troquel y la tipografía en bajorrelieve */}
                <svg viewBox="0 0 200 200" className="relative z-10 w-full h-full">
                  <defs>
                    {/* Gradiente metálico dorado para el monograma */}
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff8e7" />
                      <stop offset="30%" stopColor="#dfb254" />
                      <stop offset="70%" stopColor="#b38128" />
                      <stop offset="100%" stopColor="#69480d" />
                    </linearGradient>

                    {/* Sombra de profundidad interior para el troquel */}
                    <radialGradient id="innerShadow" cx="50%" cy="50%" r="50%">
                      <stop offset="70%" stopColor="rgba(0,0,0,0)" />
                      <stop offset="95%" stopColor="rgba(0,0,0,0.6)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
                    </radialGradient>
                  </defs>

                  {/* Bisel del hundimiento central */}
                  <circle cx="100" cy="100" r="62" fill="url(#innerShadow)" />
                  <circle cx="100" cy="100" r="61" fill="none" stroke="#113e41" strokeWidth="2" opacity="0.6" />
                  <circle cx="100" cy="100" r="57" fill="none" stroke="#dfb254" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />

                  {/* Monograma en bajorrelieve con sombras de grabado */}
                  <g textAnchor="middle" dominantBaseline="central">
                    {/* Sombra superior para dar la ilusión de grabado hacia adentro */}
                    <text
                      x="99"
                      y="98"
                      fill="#031415"
                      fontSize="64"
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      fontStyle="italic"
                      opacity="0.9"
                    >
                      N
                    </text>

                    {/* Brillo inferior para simular el borde expuesto a la luz */}
                    <text
                      x="101"
                      y="102"
                      fill="#ffffff"
                      fontSize="64"
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      fontStyle="italic"
                      opacity="0.3"
                    >
                      N
                    </text>

                    {/* Letra principal en oro metálico */}
                    <text
                      x="100"
                      y="100"
                      fill="url(#goldGradient)"
                      fontSize="64"
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      fontStyle="italic"
                    >
                      N
                    </text>

                    {/* Texto perimetral sutil */}
                    <text x="100" y="62" fill="#dfb254" fontSize="7.5" fontFamily="sans-serif" letterSpacing="3" opacity="0.75" className="font-semibold">
                      MIS XV
                    </text>
                    <text x="100" y="138" fill="#dfb254" fontSize="7.5" fontFamily="Georgia, serif" letterSpacing="2" opacity="0.75">
                      NATASHA
                    </text>
                  </g>
                </svg>
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
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

        {/* Imagen de portada desde Supabase */}
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
