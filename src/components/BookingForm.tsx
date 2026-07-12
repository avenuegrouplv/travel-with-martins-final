import React, { useState, useEffect } from 'react';
import { TOURS_DATA } from '../data';
import { BookingSubmission } from '../types';
import { Mail, Phone, User, Calendar, Users, MessageSquare, CheckCircle2, Trash2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFormProps {
  selectedTourId: string;
  onClearSelectedTour: () => void;
}

export default function BookingForm({ selectedTourId, onClearSelectedTour }: BookingFormProps) {
  const [selectedTour, setSelectedTour] = useState(selectedTourId || '');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [savedBookings, setSavedBookings] = useState<BookingSubmission[]>([]);

  // Update tour selection when prop changes
  useEffect(() => {
    if (selectedTourId) {
      setSelectedTour(selectedTourId);
    }
  }, [selectedTourId]);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('martins_bookings');
      if (stored) {
        setSavedBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading bookings from localStorage', e);
    }
  }, []);

  const selectedTourDetails = TOURS_DATA.find(t => t.id === selectedTour);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !selectedTour || !preferredDate) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: BookingSubmission = {
        id: 'book_' + Date.now(),
        tourId: selectedTour,
        tourTitle: selectedTour === 'consultation' ? 'Individuāla konsultācija / Cits galamērķis' : (selectedTourDetails?.title || 'Ceļojums'),
        fullName,
        email,
        phone,
        peopleCount,
        date: preferredDate,
        message: message.trim() || undefined,
        submittedAt: new Date().toISOString()
      };

      const updatedBookings = [newSubmission, ...savedBookings];
      setSavedBookings(updatedBookings);
      try {
        localStorage.setItem('martins_bookings', JSON.stringify(updatedBookings));
      } catch (err) {
        console.error('Failed to save booking to localStorage', err);
      }

      setIsSubmitting(false);
      setSubmissionSuccess(true);
      
      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setPeopleCount(1);
      setPreferredDate('');
      setMessage('');
      onClearSelectedTour();
    }, 1200);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = savedBookings.filter(b => b.id !== id);
    setSavedBookings(updated);
    try {
      localStorage.setItem('martins_bookings', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to delete booking from localStorage', err);
    }
  };

  return (
    <section id="pieteikums" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Info / Persistence list */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Sazinies ar Mārtiņu</span>
            <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 leading-tight">
              Rezervē savu vietu piedzīvojumā
            </h2>
            <p className="font-sans text-stone-600 font-light text-sm sm:text-base leading-relaxed">
              Aizpildi pieteikuma formu un es sazināšos ar tevi 24 stundu laikā pa norādīto e-pastu vai tālruni, lai izrunātu visas ceļojuma nianses un atbildētu uz taviem jautājumiem.
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/50 space-y-4">
            <h4 className="font-display font-bold text-stone-800 text-sm flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>Garantēta drošība un kvalitāte</span>
            </h4>
            <p className="font-sans text-stone-600 text-xs font-light leading-relaxed">
              Mēs neprasām tūlītēju samaksu mājaslapā. Pirms jebkādu maksājumu veikšanas mēs vienmēr sazvanāmies, pārbaudām fizisko sagatavotību un ceļojuma mērķu sakritību, lai pārliecinātos, ka brauciens būs piemērots tieši Tev.
            </p>
          </div>

          {/* Persistent list of active submissions */}
          {savedBookings.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h3 className="font-display font-bold text-stone-900 text-base flex items-center gap-2">
                <span>Tavas aktīvās rezervācijas ({savedBookings.length})</span>
              </h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {savedBookings.map((b) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={b.id}
                    className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <p className="font-display font-semibold text-stone-900 text-sm leading-tight">
                        {b.tourTitle}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-stone-500 font-light">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="truncate">{b.fullName}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{b.peopleCount} {b.peopleCount === 1 ? 'persona' : 'personas'}</span>
                        </span>
                        <span className="flex items-center gap-1 col-span-2">
                          <Calendar className="w-3 h-3" />
                          <span>Pieteiktais datums: {new Date(b.date).toLocaleDateString('lv-LV', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 pt-1.5 border-t border-stone-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>Gaida saziņu ar gidu</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      className="text-stone-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-all cursor-pointer shrink-0 self-center"
                      title="Atcelt pieteikumu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Form body */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md">
          <AnimatePresence mode="wait">
            {!submissionSuccess ? (
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Tour selection dropdown */}
                <div className="space-y-2">
                  <label className="block font-display font-semibold text-stone-800 text-sm">Izvēlies ceļojumu vai tēmu</label>
                  <select
                    value={selectedTour}
                    onChange={(e) => setSelectedTour(e.target.value)}
                    required
                    id="select-booking-tour"
                    className="w-full py-3 px-4 bg-stone-50 border border-stone-200 rounded-xl font-sans text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm sm:text-base"
                  >
                    <option value="" disabled>-- Izvēlies no saraksta --</option>
                    {TOURS_DATA.map((t) => (
                      <option key={t.id} value={t.id}>{t.title} ({t.duration})</option>
                    ))}
                    <option value="consultation">Individuāla konsultācija / Cits jautājums</option>
                  </select>
                </div>

                {/* Form fields group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block font-display font-semibold text-stone-800 text-sm">Vārds, Uzvārds</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Jānis Bērziņš"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        id="input-booking-name"
                        className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block font-display font-semibold text-stone-800 text-sm">E-pasta adrese</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="janis@piemērs.lv"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="input-booking-email"
                        className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block font-display font-semibold text-stone-800 text-sm">Tālruņa numurs</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+371 20000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        id="input-booking-phone"
                        className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="block font-display font-semibold text-stone-800 text-sm">Vēlamais brauciena datums</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        required
                        id="input-booking-date"
                        className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl font-sans text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* People count */}
                <div className="space-y-2">
                  <label className="block font-display font-semibold text-stone-800 text-sm flex justify-between">
                    <span>Ceļotāju skaits</span>
                    <span className="text-amber-600 font-bold">{peopleCount} {peopleCount === 1 ? 'persona' : 'personas'}</span>
                  </label>
                  <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 rounded-xl p-2 w-full max-w-xs justify-between">
                    <button
                      type="button"
                      onClick={() => setPeopleCount(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 flex items-center justify-center font-bold font-sans cursor-pointer active:scale-95 transition-all"
                    >
                      -
                    </button>
                    <span className="font-display font-bold text-stone-800 text-base">{peopleCount}</span>
                    <button
                      type="button"
                      onClick={() => setPeopleCount(prev => Math.min(12, prev + 1))}
                      className="w-10 h-10 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 flex items-center justify-center font-bold font-sans cursor-pointer active:scale-95 transition-all"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 font-light mt-1">Maksimālais pieteikumu skaits vienā reizē ir 12, lai nepārsniegtu grupas limitu.</p>
                </div>

                {/* Message comments */}
                <div className="space-y-2">
                  <label className="block font-display font-semibold text-stone-800 text-sm">Papildu komentāri vai vēlmes</label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-stone-400 absolute left-4 top-4" />
                    <textarea
                      placeholder="Pastāsti par savu pārgājienu pieredzi vai uzdod jautājumus..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      id="input-booking-message"
                      className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm leading-relaxed"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="btn-booking-submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-200 disabled:text-stone-400 text-[#1c1917] font-bold rounded-xl shadow-lg shadow-amber-500/10 active:scale-99 transition-all cursor-pointer text-center text-sm sm:text-base"
                >
                  {isSubmitting ? 'Nosūta pieteikumu...' : 'Nosūtīt pieteikumu Mārtiņam'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12 space-y-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2 max-w-lg">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">Pieteikums saņemts veiksmīgi!</h3>
                  <p className="font-sans text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                    Paldies! Tavs pieteikums ir reģistrēts un saglabāts tavā pārlūkā. Es (Mārtiņš) sazināšos ar tevi pa norādīto e-pastu un tālruni 24 stundu laikā, lai izrunātu visu sīkāk!
                  </p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left w-full space-y-1 text-xs text-stone-500 max-w-sm">
                  <p className="font-bold text-stone-700">Tevis saglabātie dati:</p>
                  <p>• Ceļojums: <span className="font-medium text-stone-800">{selectedTour === 'consultation' ? 'Konsultācija' : (selectedTourDetails?.title || 'Ceļojums')}</span></p>
                  <p>• Datums: <span className="font-medium text-stone-800">{preferredDate}</span></p>
                  <p>• Ceļotāji: <span className="font-medium text-stone-800">{peopleCount}</span></p>
                </div>

                <button
                  onClick={() => {
                    setSubmissionSuccess(false);
                    setSelectedTour('');
                  }}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
                >
                  Pieteikt vēl kādu braucienu
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
