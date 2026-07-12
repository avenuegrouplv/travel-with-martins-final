import { useState, useMemo } from 'react';
import { Tour, TourCategory, TourDifficulty } from '../types';
import { TOURS_DATA } from '../data';
import { Search, Filter, Calendar, Clock, Sparkles, MapPin, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToursProps {
  onSelectTourForBooking: (tourId: string) => void;
}

export default function Tours({ onSelectTourForBooking }: ToursProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TourCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<TourDifficulty | 'all'>('all');
  const [activeTour, setActiveTour] = useState<Tour | null>(null);

  // Filter logic
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tour.longDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || tour.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const categoryLabels: Record<TourCategory | 'all', string> = {
    all: 'Visi braucieni',
    hiking: 'Pārgājieni',
    cultural: 'Kultūra & Garšas',
    nature: 'Daba & Ainavas',
    exotic: 'Eksotiskās zemes'
  };

  const difficultyLabels: Record<TourDifficulty | 'all', string> = {
    all: 'Jebkura grūtība',
    easy: 'Viegli',
    moderate: 'Vidēji grūti',
    challenging: 'Izaicinoši'
  };

  const difficultyColors: Record<TourDifficulty, string> = {
    easy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    moderate: 'bg-blue-50 text-blue-700 border-blue-100',
    challenging: 'bg-rose-50 text-rose-700 border-rose-100'
  };

  return (
    <section id="celojumi" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 mb-4">
          Mūsu Plānotie Ceļojumi
        </h2>
        <p className="font-sans text-stone-600 max-w-2xl mx-auto text-lg font-light">
          Katrs ceļojums ir rūpīgi izstrādāts un personīgi pārbaudīts. Meklē savu nākamo piedzīvojumu un dodies ceļā kopā ar Mārtiņu.
        </p>
      </div>

      {/* Filters & Search Grid */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/80 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Meklēt galamērķi vai kalnu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="input-tour-search"
            className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Category Dropdown/Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider hidden sm:inline">Kategorija:</span>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(categoryLabels) as Array<TourCategory | 'all'>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-[#1c1917] font-semibold'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/60'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as TourDifficulty | 'all')}
              id="select-difficulty-filter"
              className="bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-3 text-xs sm:text-sm text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {(Object.keys(difficultyLabels) as Array<TourDifficulty | 'all'>).map((diff) => (
                <option key={diff} value={diff}>
                  {difficultyLabels[diff]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of tours */}
      {filteredTours.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
          <Compass className="w-12 h-12 text-stone-300 mx-auto mb-4 animate-pulse" />
          <p className="font-sans text-stone-500 text-lg">Netika atrasts neviens ceļojums pēc norādītajiem kritērijiem.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedDifficulty('all'); }}
            className="mt-4 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg text-sm font-medium transition-all"
          >
            Notīrīt filtrus
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredTours.map((tour) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={tour.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-stone-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image */}
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Labels on cover */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${difficultyColors[tour.difficulty]}`}>
                    {difficultyLabels[tour.difficulty]}
                  </span>
                </div>

                {tour.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-500 text-[#1c1917] px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MŪSU IETEIKUMS</span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                  <span className="inline-flex items-center gap-1.5 text-xs bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {tour.duration}
                  </span>
                  
                  <div className="text-right">
                    <p className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">Cena no</p>
                    <p className="text-2xl font-bold text-amber-400">{tour.price} €</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{categoryLabels[tour.category]}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors mb-3 leading-tight">
                    {tour.title}
                  </h3>
                  <p className="font-sans text-stone-600 text-sm font-light line-clamp-3 leading-relaxed mb-6">
                    {tour.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => setActiveTour(tour)}
                    id={`btn-tour-detail-${tour.id}`}
                    className="flex-1 py-3 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer text-center"
                  >
                    Skatīt programmu
                  </button>
                  <button
                    onClick={() => onSelectTourForBooking(tour.id)}
                    id={`btn-tour-book-${tour.id}`}
                    className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-[#1c1917] font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/10 transition-all cursor-pointer text-center"
                  >
                    Pieteikt braucienu
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tour Detail Modal */}
      <AnimatePresence>
        {activeTour && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#faf9f6] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-stone-200"
            >
              {/* Modal Header Cover */}
              <div className="relative h-60 sm:h-72 bg-stone-900">
                <img
                  src={activeTour.image}
                  alt={activeTour.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-[#faf9f6]/30 to-black/60" />
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveTour(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${difficultyColors[activeTour.difficulty]}`}>
                    {difficultyLabels[activeTour.difficulty]} • {activeTour.duration}
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-white shadow-sm leading-tight">
                    {activeTour.title}
                  </h2>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                {/* Intro */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-display text-xl font-bold text-stone-900">Par šo ceļojumu</h3>
                    <p className="font-sans text-stone-600 font-light leading-relaxed text-sm sm:text-base">
                      {activeTour.longDescription}
                    </p>
                  </div>
                  
                  {/* Summary Box */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4 h-fit">
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Tuvākie datumi</p>
                      <div className="mt-1.5 space-y-1">
                        {activeTour.dates.map((d) => (
                          <div key={d} className="flex items-center gap-2 text-stone-700 text-sm font-medium">
                            <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>{new Date(d).toLocaleDateString('lv-LV', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-stone-100">
                      <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Cena dalībniekam</p>
                      <p className="text-3xl font-extrabold text-stone-900 mt-1">{activeTour.price} €</p>
                      <p className="text-[10px] text-stone-400 font-light leading-snug mt-1">Skaidri norādīts viss iekļautais bez slēptiem maksājumiem.</p>
                    </div>
                  </div>
                </div>

                {/* Day-by-Day Itinerary */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Dienas maršruts un programma</span>
                  </h3>
                  
                  <div className="relative border-l-2 border-stone-200 ml-4 pl-6 space-y-6">
                    {activeTour.itinerary.map((day) => (
                      <div key={day.day} className="relative">
                        {/* Dot */}
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-[#faf9f6] ring-2 ring-amber-500/10" />
                        
                        <h4 className="font-display font-bold text-stone-900 text-base">
                          {day.day}. diena: {day.title}
                        </h4>
                        <p className="font-sans text-stone-600 text-sm font-light mt-1.5 leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's Included and What's Not */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200">
                  {/* Included */}
                  <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/80 space-y-3">
                    <h4 className="font-display font-bold text-emerald-800 text-base flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Cenā ir iekļauts:</span>
                    </h4>
                    <ul className="space-y-2">
                      {activeTour.included.map((item, idx) => (
                        <li key={idx} className="font-sans text-stone-700 text-sm font-light flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  <div className="bg-stone-100/50 rounded-2xl p-5 border border-stone-200 space-y-3">
                    <h4 className="font-display font-bold text-stone-700 text-base flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-stone-500 shrink-0" />
                      <span>Cenā nav iekļauts:</span>
                    </h4>
                    <ul className="space-y-2">
                      {activeTour.notIncluded.map((item, idx) => (
                        <li key={idx} className="font-sans text-stone-600 text-sm font-light flex items-start gap-2">
                          <span className="text-stone-400 mt-0.5 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="font-sans text-stone-500 text-xs font-light text-center sm:text-left">
                  Ir jautājumi par maršrutu? Raksti mums pieteikumā!
                </span>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTour(null)}
                    className="flex-1 sm:flex-initial py-2.5 px-5 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 font-medium rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Aizvērt
                  </button>
                  <button
                    onClick={() => {
                      onSelectTourForBooking(activeTour.id);
                      setActiveTour(null);
                    }}
                    className="flex-1 sm:flex-initial py-2.5 px-6 bg-amber-500 hover:bg-amber-400 text-[#1c1917] font-semibold rounded-xl text-sm shadow-md transition-all cursor-pointer"
                  >
                    Pieteikties braucienam
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
