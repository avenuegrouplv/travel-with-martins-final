import { useState } from 'react';
import Hero from './components/Hero';
import Tours from './components/Tours';
import About from './components/About';
import Blog from './components/Blog';
import Reviews from './components/Reviews';
import BookingForm from './components/BookingForm';
import NetlifyGuide from './components/NetlifyGuide';
import { Globe, Menu, X, Instagram, Facebook, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedTourId, setSelectedTourId] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTourForBooking = (tourId: string) => {
    setSelectedTourId(tourId);
    // Give a short delay to allow state update, then scroll
    setTimeout(() => {
      scrollToSection('pieteikums');
    }, 100);
  };

  const handleClearSelectedTour = () => {
    setSelectedTourId('');
  };

  const navLinks = [
    { name: 'Sākums', id: 'sakums' },
    { name: 'Ceļojumi', id: 'celojumi' },
    { name: 'Par gidu', id: 'par-mums' },
    { name: 'Atsauksmes', id: 'atsauksmes' },
    { name: 'Blogs', id: 'blogs' },
    { name: 'Pieteikties', id: 'pieteikums' }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1c1917] font-sans antialiased selection:bg-amber-500/30 selection:text-amber-900">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/80 backdrop-blur-md border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#sakums"
            onClick={(e) => { e.preventDefault(); scrollToSection('sakums'); }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-[#1c1917] shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-stone-900 group-hover:text-amber-600 transition-colors tracking-tight">
                Ceļo ar Mārtiņu
              </span>
              <p className="text-[10px] text-stone-500 font-light -mt-1 uppercase tracking-wider font-sans">Aktīvā atpūta & kalni</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className="text-stone-600 hover:text-stone-900 font-medium text-sm transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('pieteikums')}
              className="px-5 py-2.5 bg-[#1c1917] hover:bg-stone-800 text-white font-semibold rounded-xl text-xs sm:text-sm active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              Rezervēt vietu
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 bg-[#faf9f6] border-b border-stone-200/60 shadow-xl z-30 md:hidden p-6 space-y-4"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  className="text-stone-700 hover:text-stone-900 font-semibold text-base py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={() => scrollToSection('pieteikums')}
                className="w-full py-3 bg-[#1c1917] text-white font-bold rounded-xl text-center text-sm"
              >
                Rezervēt vietu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sections */}
      <main>
        {/* Hero Banner with action buttons linked to scroll */}
        <Hero
          onExploreTours={() => scrollToSection('celojumi')}
          onBookNow={() => scrollToSection('pieteikums')}
        />
        
        {/* Tours Listing and Detail modal */}
        <Tours onSelectTourForBooking={handleSelectTourForBooking} />
        
        {/* Bio about guide Martins */}
        <About />

        {/* Testimonials review wall */}
        <Reviews />

        {/* Blog and tips */}
        <Blog />

        {/* Active local-storage persistent booking form */}
        <BookingForm
          selectedTourId={selectedTourId}
          onClearSelectedTour={handleClearSelectedTour}
        />

        {/* Expandable Netlify & CMS-free code verify guide */}
        <div className="py-8 bg-stone-100 border-t border-stone-200/50">
          <NetlifyGuide />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1c1917] text-stone-400 py-16 px-6 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo info block */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-[#1c1917]">
                <Globe className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-bold text-white text-base">Ceļo ar Mārtiņu</span>
            </div>
            <p className="font-sans text-xs font-light text-stone-400 max-w-sm leading-relaxed">
              Mēs neradām masveida tūrisma paketes. Mēs radām un vadām unikālus pārgājienus, dabas ceļojumus un ekspedīcijas, kas paliek sirdī uz mūžu. Tīrs dabas skaistums, lieliska kompānija un drošība.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-stone-800 hover:bg-stone-700 hover:text-white rounded-lg transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-stone-800 hover:bg-stone-700 hover:text-white rounded-lg transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-sm">Ātrā navigācija</h4>
            <div className="flex flex-col gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact block */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-sm">Kontakti</h4>
            <div className="space-y-2 text-xs font-light">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+371 29123456</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">martins.travels@gmail.com</span>
              </p>
              <p className="pt-2 text-[10px] text-stone-500">
                Piedāvājumus, sadarbības vai individuālu maršrutu izstrādi lūdzam sūtīt uz e-pastu.
              </p>
            </div>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-sans font-light">
            &copy; {new Date().getFullYear()} Ceļo ar Mārtiņu. Visas tiesības aizsargātas.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-stone-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Drošs statisks kods • publicēšanai Netlify / Vercel / GitHub Pages</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
