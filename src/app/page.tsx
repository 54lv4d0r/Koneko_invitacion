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
              <div className="absolute z-20 flex flex-col items-center top-[22%] sm:top-[25%]">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-[#1b3d3b] text-amber-100 text-xs font-serif italic tracking-wider px-4 py-1.5 rounded-full shadow-xl border border-amber-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Toca el sello para abrir la invitación</span>
                </motion.div>
              </div>

              {/* SELLO DE LACRE ARTESANAL EN SVG */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="relative z-30 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center cursor-pointer filter drop-shadow-[0_15px_25px_rgba(10,40,40,0.45)] group"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    {/* Gradiente principal de cera verde esmeralda / azul petróleo */}
                    <radialGradient id="waxBase" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#1a5a5e" />
                      <stop offset="45%" stopColor="#0d3b3e" />
                      <stop offset="85%" stopColor="#062224" />
                      <stop offset="100%" stopColor="#021112" />
                    </radialGradient>

                    {/* Gradiente para el bisel interior grabado */}
                    <radialGradient id="waxInner" cx="40%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#1e666a" />
                      <stop offset="70%" stopColor="#0a3235" />
                      <stop offset="100%" stopColor="#041a1c" />
                    </radialGradient>

                    {/* Gradiente dorado metálico para la "N" */}
                    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff5d0" />
                      <stop offset="30%" stopColor="#e5ba63" />
                      <stop offset="70%" stopColor="#b88628" />
                      <stop offset="100%" stopColor="#7a5310" />
                    </linearGradient>

                    {/* Filtro de relieve 3D realista para la cera */}
                    <filter id="waxRelief" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                      <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.8" specularExponent="15" lightingColor="#ffffff" result="specular">
                        <fePointLight x="-20" y="-30" z="80" />
                      </feSpecularLighting>
                      <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularCombined" />
                      <feMerge>
                        <feMergeNode in="SourceGraphic" />
                        <feMergeNode in="specularCombined" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Capa de sombra posterior de la cera */}
                  <path
                    d="M 100,10 C 135,8 165,22 182,50 C 198,78 190,115 180,145 C 170,175 138,194 102,190 C 66,186 32,172 18,140 C 4,108 12,72 30,42 C 48,12 65,12 100,10 Z"
                    fill="rgba(0,0,0,0.25)"
                    transform="translate(2, 6)"
                  />

                  {/* Cuerpo principal fluido e irregular del sello de lacre */}
                  <path
                    d="M 100,12 C 128,9 152,18 170,38 C 188,58 196,88 188,116 C 180,144 162,170 134,182 C 106,194 72,188 48,174 C 24,160 10,132 12,104 C 14,76 28,52 48,34 C 68,16 72,15 100,12 Z"
                    fill="url(#waxBase)"
                    filter="url(#waxRelief)"
                  />

                  {/* Pequeños goteos y deformaciones orgánicas de la cera en los bordes */}
                  <circle cx="178" cy="128" r="7" fill="#0c373a" />
                  <circle cx="28" cy="65" r="9" fill="#12484c" />
                  <circle cx="148" cy="178" r="6" fill="#08282a" />
                  <circle cx="58" cy="176" r="8" fill="#0a2e31" />

                  {/* Hundimiento/pozo central donde presiona el timbre de metal */}
                  <path
                    d="M 100,38 C 130,36 158,54 160,88 C 162,122 142,152 110,158 C 78,164 46,146 42,114 C 38,82 70,40 100,38 Z"
                    fill="url(#waxInner)"
                    stroke="#05191b"
                    strokeWidth="3"
                  />

                  {/* Anillo de presión troquelado en la cera */}
                  <path
                    d="M 100,44 C 125,42 150,58 152,86 C 154,114 136,142 108,146 C 80,150 52,134 48,106 C 44,78 75,46 100,44 Z"
                    fill="none"
                    stroke="#e5ba63"
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                    opacity="0.4"
                  />

                  {/* Brillo curvo de superficie pulida */}
                  <path
                    d="M 60,55 C 80,42 115,40 135,48"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.25"
                  />

                  {/* Monograma "N" y detalles dorados grabados */}
                  <g transform="translate(100, 102)" textAnchor="middle" dominantBaseline="central">
                    {/* Sombra del grabado */}
                    <text
                      y="2"
                      x="1"
                      fill="#020b0c"
                      fontSize="58"
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      fontStyle="italic"
                      opacity="0.8"
                    >
                      N
                    </text>
                    {/* Letra principal en oro metálico */}
                    <text
                      y="0"
                      x="0"
                      fill="url(#goldText)"
                      fontSize="58"
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      fontStyle="italic"
                    >
                      N
                    </text>

                    {/* Leyenda sutil superior/inferior */}
                    <text y="-36" fill="#e5ba63" fontSize="8" fontFamily="sans-serif" letterSpacing="3" opacity="0.6">
                      MIS XV
                    </text>
                    <text y="38" fill="#e5ba63" fontSize="8" fontFamily="Georgia, serif" letterSpacing="2" opacity="0.6">
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
