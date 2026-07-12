import { Compass, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreTours: () => void;
  onBookNow: () => void;
}

export default function Hero({ onExploreTours, onBookNow }: HeroProps) {
  return (
    <div id="sakums" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
      {/* Background Image overlay with dark fade */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-65 scale-105 transition-transform duration-[10000ms]"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-black/50" />

      {/* Decorative Floating Element */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-sm font-medium tracking-wide mb-8 hover:bg-white/15 transition-all cursor-default"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Atklāj pasauli kopā ar domubiedriem</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl"
        >
          Ceļo ar <span className="text-amber-400 font-extrabold relative inline-block">Mārtiņu</span><br />
          <span className="text-3xl sm:text-5xl md:text-6xl font-light text-stone-200">Piedzīvojumi, kas maina dzīvi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg sm:text-xl text-stone-300 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Nelielas ceļotāju grupas, autentiski vietējie maršruti, drosmīgi pārgājieni un neaizmirstami vakari pie ugunskura. Aizmirsti par parastām tūristu takām.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExploreTours}
            id="btn-hero-explore"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#1c1917] font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-98 transition-all cursor-pointer text-base"
          >
            <span>Skatīt ceļojumus</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onBookNow}
            id="btn-hero-book"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-sm hover:border-white/50 active:scale-98 transition-all cursor-pointer text-base"
          >
            Pieteikt konsultāciju
          </button>
        </motion.div>

        {/* Stats overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 sm:gap-12 mt-20 pt-8 border-t border-white/10 w-full max-w-3xl"
        >
          <div className="text-center">
            <p className="text-2xl sm:text-4xl font-display font-bold text-amber-400">100%</p>
            <p className="text-xs sm:text-sm text-stone-400 uppercase tracking-wider font-medium mt-1">Autentiski maršruti</p>
          </div>
          <div className="text-center border-x border-white/10 px-4">
            <p className="text-2xl sm:text-4xl font-display font-bold text-amber-400">12 max</p>
            <p className="text-xs sm:text-sm text-stone-400 uppercase tracking-wider font-medium mt-1">Cilvēki grupā</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-4xl font-display font-bold text-amber-400">500+</p>
            <p className="text-xs sm:text-sm text-stone-400 uppercase tracking-wider font-medium mt-1">Laimīgi ceļotāji</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
