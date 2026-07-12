import { Star, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data';
import { motion } from 'motion/react';

export default function Reviews() {
  return (
    <section id="atsauksmes" className="py-24 bg-stone-100/60 px-6 border-y border-stone-200/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">Mūsu Kopiena</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            Atsauksmes no Ceļotājiem
          </h2>
          <p className="font-sans text-stone-600 max-w-2xl mx-auto text-lg font-light">
            Labākais mūsu darba rādītājs ir ceļotāju smaids un vēlme atgriezties atkal jaunos piedzīvojumos. Lasi, ko saka mūsu biedri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/50 shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-all duration-300"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-stone-100 group-hover:text-amber-100/50 transition-colors">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-sans text-stone-700 text-sm font-light leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-stone-100 relative z-10">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm leading-tight">
                    {rev.name}
                  </h4>
                  <div className="flex flex-wrap gap-x-1.5 items-center text-stone-500 text-xs font-light mt-0.5">
                    <span>Brauciens: {rev.tourName}</span>
                    <span>•</span>
                    <span>{new Date(rev.date).toLocaleDateString('lv-LV', { year: 'numeric', month: 'long' })}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic invitation banner */}
        <div className="bg-amber-500 text-[#1c1917] rounded-3xl p-8 sm:p-12 mt-16 shadow-lg flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">Vēlies pievienoties mūsu nākamajam stāstam?</h3>
            <p className="font-sans text-stone-800 text-sm sm:text-base font-light">Tev nav jābūt profesionālam tūristam – galvenais ir zinātkāre un labs garastāvoklis!</p>
          </div>
          <a
            href="#pieteikums"
            className="px-8 py-4 bg-[#1c1917] hover:bg-stone-800 text-white font-semibold rounded-xl text-center shadow-md active:scale-98 transition-all whitespace-nowrap shrink-0 text-sm"
          >
            Sazinies un rezervē
          </a>
        </div>
      </div>
    </section>
  );
}
