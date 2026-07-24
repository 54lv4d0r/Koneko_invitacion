'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar, MapPin, Gift, Mail, ChevronLeft, ChevronRight, MessageCircle, Church, PartyPopper } from 'lucide-react';

// ==========================================
// CONFIGURACIÓN DE DATOS Y FUNCIONES AUXILIARES
// ==========================================
const EVENT_DATA = {
  quinceaneraName: "Marelynk",
  subtitle: "TE INVITO A MIS XV AÑOS",
  dateText: "15 de Agosto, 2026",
  targetDate: "2026-08-15T18:00:00",
  quote: '"Hay momentos inolvidables que se atesoran en el corazón para siempre. Por esa razón, quiero que compartas conmigo este día tan especial."',
  whatsappNumber: "50500000000",
  whatsappMessage: "¡Hola! Confirmo mi asistencia a los XV Años de Marelynk ✨",
  
  // Ubicaciones
  locations: {
    church: {
      title: "MISA",
      address: "Capilla de la Iglesia San Felipe, León — 6:00 PM",
      mapEmbedUrl: "https://maps.google.com/maps?q=12.4358,-86.8795&z=16&output=embed",
      directMapUrl: "https://www.google.com/maps/search/?api=1&query=12.4358,-86.8795"
    },
    reception: {
      title: "RECEPCIÓN",
      address: "Sutiaba, Casa Cural 1c. al oeste, 1/2c. al sur, León",
      mapEmbedUrl: "https://maps.google.com/maps?q=12.432750,-86.896111&z=16&output=embed",
      directMapUrl: "https://www.google.com/maps/search/?api=1&query=12.432750,-86.896111"
    }
  }
};

// Generador del borde festoneado/ondulado para el sello de lacre
function generateScallopedPath(radius = 48, numScallops = 24, scallopDepth = 3.5) {
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
}

// Componente de Brillo Lujoso
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

// Destellos flotantes animados
const LuxuryGlitterOverlay = () => {
  const sparkles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {sparkles.map((_, i) => {
        const top = Math.floor(Math.random() * 88) + 6;
        const left = Math.floor(Math.random() * 88) + 6;
        const duration = 2.5 + Math.random() * 2.5;
        const delay = Math.random() * 2;
        const size = Math.floor(Math.random() * 10) + 8;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${top}%`, left: `${left}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
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

// Componente Wrapper para los Paneles
const LuxuryPanel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <section className="h-screen w-full snap-start flex flex-col justify-center items-center relative overflow-hidden p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full h-full max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-amber-500/20 relative flex flex-col items-center justify-between p-6 bg-[#071e1c] ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
};

// Lógica de Conteo Regresivo
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
          horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seg: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-xs text-center my-4">
      {[
        { label: 'Días', val: timeLeft.dias },
        { label: 'Horas', val: timeLeft.horas },
        { label: 'Min', val: timeLeft.min },
        { label: 'Seg', val: timeLeft.seg },
      ].map((item, idx) => (
        <div key={idx} className="bg-[#092b27]/80 backdrop-blur-md border border-amber-500/30 rounded-xl p-2 flex flex-col items-center shadow-lg">
          <span className="text-2xl font-serif font-bold text-amber-200">{item.val}</span>
          <span className="text-[9px] uppercase tracking-wider text-amber-100/70">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// Carrusel Estilo Polaroid
const PolaroidCarousel = () => {
  const photos = Array.from({ length: 30 }, (_, i) => `/galeria/foto_${i + 1}.jpg`);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-xs flex flex-col items-center">
      <div className="w-full bg-amber-50/95 p-3 pb-8 rounded-sm shadow-2xl transform rotate-1 border border-amber-200/50">
        <div className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden rounded-sm">
          <img
            src={photos[currentIndex]}
            alt={`Recuerdo ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-amber-200/40 text-xs italic font-serif">
            Foto #{currentIndex + 1}
          </div>
        </div>
        <p className="text-center font-serif italic text-neutral-800 text-xs mt-3 tracking-widest">
          Recuerdos ✨ ({currentIndex + 1} / {photos.length})
        </p>
      </div>

      <div className="flex justify-between w-full mt-4 px-2">
        <button
          onClick={prevSlide}
          className="bg-[#082824] border border-amber-500/30 text-amber-200 p-2 rounded-full shadow-lg hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#082824] border border-amber-500/30 text-amber-200 p-2 rounded-full shadow-lg hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
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

  const scallopedPath = generateScallopedPath(44, 24, 3);

  return (
    <div className="relative min-h-screen bg-[#040e0d] text-amber-50 select-none font-sans">
      {/* CAMBIO DE CANCIÓN: Tercer Cielo - No Crezcas Más */}
      <audio ref={audioRef} loop src="https://invitacion-celebriq.b-cdn.net/wp-content/uploads/2025/07/Tercer-Cielo-No-Crezcas-Mas.mp3" />

      {/* BOTÓN FLOTANTE DE AUDIO */}
      {isOpen && (
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 bg-[#09221f]/90 text-amber-200 p-3 rounded-full shadow-2xl backdrop-blur-md border border-amber-500/30 cursor-pointer"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* PANTALLA INICIAL: SOBRE CON SELLO DE LACRE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.1 } }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#061816] p-4 sm:p-6"
          >
            <div className="relative w-full max-w-md aspect-[3/2] flex items-center justify-center filter drop-shadow-2xl">
              
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

              <div className="absolute z-30 flex items-center justify-center top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="relative w-32 h-32 sm:w-36 sm:h-36 cursor-pointer flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#0a2b27]" fill="currentColor">
                    <path d={scallopedPath} />
                  </svg>

                  <div className="relative z-10 w-[80%] h-[80%] rounded-full border border-dashed border-[#d4af37]/80 flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-[#12423c] via-[#0b2b27] to-[#041210] shadow-inner">
                    <span className="text-[7px] sm:text-[8px] font-sans italic tracking-[0.2em] text-[#d4af37] opacity-90 uppercase mb-0.5">
                      Mis XV
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffe699] via-[#d4af37] to-[#aa7c11] drop-shadow-md my-0">
                      {EVENT_DATA.quinceaneraName.charAt(0)}
                    </span>
                    <span className="text-[7px] sm:text-[8px] font-serif italic tracking-[0.18em] text-[#d4af37] opacity-90 uppercase mt-0.5">
                      {EVENT_DATA.quinceaneraName}
                    </span>
                  </div>
                </motion.button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENEDOR PRINCIPAL SNAP (10 PANELES) */}
      {isOpen && (
        <main className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth">

          {/* PANEL 1: BANNER PORTADA (TEXTO MOVIDO ABAJO) */}
          <LuxuryPanel>
            <div className="absolute inset-0 z-0">
              <img src="/galeria/banner_portada.jpg" alt="Portada" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#061917]/30 via-transparent to-[#041211]/95" />
            </div>
            <LuxuryGlitterOverlay />

            <div className="relative z-20 text-center w-full mt-auto space-y-3">
              <div>
                <span className="text-amber-200/90 tracking-[0.3em] uppercase text-xs font-serif block mb-1 drop-shadow-md">
                  {EVENT_DATA.subtitle}
                </span>
                <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff3cc] via-[#f7d774] to-[#cba33f] drop-shadow-lg">
                  {EVENT_DATA.quinceaneraName}
                </h1>
              </div>

              <div className="pb-2 text-center border-t border-amber-500/20 pt-3 w-full">
                <span className="text-amber-300 font-serif text-sm tracking-widest uppercase flex items-center justify-center gap-2 drop-shadow-md">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {EVENT_DATA.dateText}
                </span>
              </div>
            </div>
          </LuxuryPanel>

          {/* PANEL 2: MENSAJE CON FONDO PERSONALIZABLE */}
          <LuxuryPanel>
            <div className="absolute inset-0 z-0">
              <img src="/galeria/fondo_panel2.jpg" alt="Fondo Mensaje" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-[#061917]/70 backdrop-blur-xs" />
            </div>
            <div className="my-auto relative z-10 text-center px-4">
              <LuxurySparkle size={24} className="mx-auto mb-6" />
              <p className="italic text-base sm:text-lg leading-relaxed font-serif text-amber-100/90 drop-shadow-md">
                {EVENT_DATA.quote}
              </p>
            </div>
          </LuxuryPanel>

          {/* PANEL 3: CONTEO REGRESIVO */}
          <LuxuryPanel>
            <div className="absolute inset-0 z-0">
              <img src="/galeria/fondo_panel3.jpg" alt="Fondo Contador" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-[#061917]/75" />
            </div>
            <div className="my-auto relative z-10 text-center flex flex-col items-center w-full">
              <span className="text-amber-300 text-xs tracking-widest uppercase mb-2 font-serif">Faltan tan solo:</span>
              <CountdownTimer targetDate={EVENT_DATA.targetDate} />
              <span className="text-amber-200/80 text-xs italic font-serif mt-2">Para el gran día</span>
            </div>
          </LuxuryPanel>

          {/* PANEL 4: CONFIRMACIÓN WHATSAPP */}
          <LuxuryPanel>
            <div className="my-auto text-center relative z-10 flex flex-col items-center gap-6 px-4">
              <MessageCircle className="w-12 h-12 text-amber-300" />
              <h2 className="text-2xl font-serif text-amber-200 italic">"Nos encantaría que nos acompañes"</h2>
              <a
                href={`https://wa.me/${EVENT_DATA.whatsappNumber}?text=${encodeURIComponent(EVENT_DATA.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-amber-50 font-medium px-6 py-3 rounded-full shadow-lg border border-amber-300/30 flex items-center gap-2 active:scale-95 transition-all text-sm tracking-wide"
              >
                Confirmar por WhatsApp
              </a>
            </div>
          </LuxuryPanel>

          {/* PANEL 5: CAJÓN VACÍO PARA FOTO 1 */}
          <LuxuryPanel>
            <div className="absolute inset-0 z-0">
              <img src="/galeria/foto_panel5.jpg" alt="Panel 5" className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="my-auto z-10 text-center">
              {/* Espacio reservado para foto */}
            </div>
          </LuxuryPanel>
        
          {/* PANEL 6: UBICACIÓN Y MAPAS DE MISA Y RECEPCIÓN */}
          <LuxuryPanel>
            <div className="w-full h-full flex flex-col justify-between py-1 relative z-10 overflow-y-auto no-scrollbar gap-2">
              <div className="text-center">
                <MapPin className="w-5 h-5 text-amber-300 mx-auto mb-0.5" />
                <h3 className="text-lg font-serif text-amber-200">Ubicación del Evento</h3>
              </div>

              {/* 1. MISA - DIRECCIÓN Y MAPA */}
              <div className="flex flex-col gap-1.5">
                <div className="bg-[#092b27]/90 border border-amber-500/30 rounded-xl p-2.5 text-left shadow-md">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Church className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[10px] font-serif font-bold text-amber-300 uppercase tracking-widest">
                      {EVENT_DATA.locations.church.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-100/90 leading-snug">
                    {EVENT_DATA.locations.church.address}
                  </p>
                </div>

                <a
                  href={EVENT_DATA.locations.church.directMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-32 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg relative block group cursor-pointer"
                >
                  <iframe
                    src={EVENT_DATA.locations.church.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="pointer-events-none"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 text-neutral-900 text-[10px] font-medium px-2 py-1 rounded shadow border border-neutral-300 flex items-center gap-1 group-hover:bg-amber-100 transition-all z-20">
                    <span>Abrir Misa en Maps</span>
                  </div>
                </a>
              </div>

              {/* 2. RECEPCIÓN - DIRECCIÓN Y MAPA */}
              <div className="flex flex-col gap-1.5">
                <div className="bg-[#092b27]/90 border border-amber-500/30 rounded-xl p-2.5 text-left shadow-md">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[10px] font-serif font-bold text-amber-300 uppercase tracking-widest">
                      {EVENT_DATA.locations.reception.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-100/90 leading-snug">
                    {EVENT_DATA.locations.reception.address}
                  </p>
                </div>

                <a
                  href={EVENT_DATA.locations.reception.directMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-32 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg relative block group cursor-pointer"
                >
                  <iframe
                    src={EVENT_DATA.locations.reception.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="pointer-events-none"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 text-neutral-900 text-[10px] font-medium px-2 py-1 rounded shadow border border-neutral-300 flex items-center gap-1 group-hover:bg-amber-100 transition-all z-20">
                    <span>Abrir Recepción en Maps</span>
                  </div>
                </a>
              </div>

            </div>
          </LuxuryPanel>

          {/* PANEL 7: CÓDIGO DE VESTIMENTA */}
          <LuxuryPanel>
            <div className="my-auto text-center relative z-10 flex flex-col items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <LuxurySparkle size={20} />
              </div>
              <h3 className="text-2xl font-serif text-amber-200">Código de Vestimenta</h3>
              <p className="text-lg font-serif italic text-amber-100">Traje Formal</p>
              <div className="w-12 h-[1px] bg-amber-500/40 my-1" />
              <p className="text-xs text-amber-200/80 tracking-wide max-w-xs bg-[#092b27]/80 p-3 rounded-xl border border-amber-500/20">
                Se reserva amablemente el color <span className="text-emerald-400 font-bold">Verde</span> para la quinceañera.
              </p>
            </div>
          </LuxuryPanel>

          {/* PANEL 8: CARRUSEL RECUERDOS (POLAROID - 30 FOTOS) */}
          <LuxuryPanel>
            <div className="my-auto w-full flex flex-col items-center z-10">
              <h3 className="text-xl font-serif text-amber-200 mb-4">Mis Recuerdos</h3>
              <PolaroidCarousel />
            </div>
          </LuxuryPanel>

          {/* PANEL 9: CAJÓN VACÍO PARA FOTO 2 */}
          <LuxuryPanel>
            <div className="absolute inset-0 z-0">
              <img src="/galeria/foto_panel9.jpg" alt="Panel 9" className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="my-auto z-10 text-center">
              {/* Espacio reservado para foto */}
            </div>
          </LuxuryPanel>

          {/* PANEL 10: MESA DE REGALOS Y LLUVIA DE SOBRES */}
          <LuxuryPanel>
            <div className="my-auto text-center relative z-10 flex flex-col items-center gap-6 px-4 w-full">
              <div className="flex gap-4">
                <Gift className="w-8 h-8 text-amber-300" />
                <Mail className="w-8 h-8 text-amber-300" />
              </div>
              
              <h3 className="text-2xl font-serif text-amber-200">Mesa de Regalos</h3>

              <div className="bg-[#092b27]/90 border border-amber-500/30 rounded-2xl p-5 w-full max-w-xs text-center shadow-xl space-y-3">
                <p className="text-xs italic font-serif text-amber-100/90 leading-relaxed">
                  "Tu presencia es nuestro mejor regalo, pero si deseas hacernos un presente..."
                </p>
                <div className="pt-2 border-t border-amber-500/20">
                  <span className="text-sm font-serif font-bold text-amber-300 block">Lluvia de Sobres</span>
                  <span className="text-[10px] text-amber-100/70">Habrá una urna disponible el día del evento</span>
                </div>
              </div>
            </div>
          </LuxuryPanel>

        </main>
      )}
    </div>
  );
}
