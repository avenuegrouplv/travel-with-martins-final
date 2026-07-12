import { Heart, Compass, Shield, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const values = [
    {
      icon: Users,
      title: 'Mazas grupas (max 12)',
      description: 'Nekādu milzīgu tūristu autobusu un steigas. Mēs ceļojam kā draugu kopa, kur katram tiek veltīta uzmanība un rodas ciešas saites.'
    },
    {
      icon: Compass,
      title: 'Autentiska pieredze',
      description: 'Mēs ejam ārpus parastajām tūristu takām, nakšņojam vietējo ģimeņu namos, gatavojam ēst kopā un iepazīstam dabu no iekšienes.'
    },
    {
      icon: Shield,
      title: 'Drošība un atbalsts',
      description: 'Visi maršruti ir personīgi izpētīti. Katrā solī esmu blakus ar zināšanām, pieredzi, kalnu aprīkojumu un pilnu atbalstu.'
    },
    {
      icon: Heart,
      title: 'Piedzīvojumu gars',
      description: 'Mūsu ceļojumi nav vienkārši ekskursijas – tie ir aktīvās atpūtas piedzīvojumi, kas izaicina, priecē un paliek atmiņā uz mūžu.'
    }
  ];

  return (
    <section id="par-mums" className="py-24 bg-white px-6 border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Mans Stāsts</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              Sveiki, es esmu Mārtiņš!
            </h2>
            
            <p className="font-sans text-stone-700 font-light text-base sm:text-lg leading-relaxed">
              Mana aizraušanās ar kalniem un tālām zemēm sākās pirms vairāk nekā desmit gadiem. Kopš tā laika esmu pieveicis tūkstošiem kilometru pa Alpiem, Kaukāzu, Pirenejiem un tālajiem tuksneša ceļiem.
            </p>
            <p className="font-sans text-stone-600 font-light text-sm sm:text-base leading-relaxed">
              Es sapratu, ka vislielāko gandarījumu man sniedz nevis vienatnē sasniegtās virsotnes, bet gan iespēja atvērt šo maģisko dabas pasauli citiem. Tā radās "Ceļo ar Mārtiņu" – nevis kā tūrisma aģentūra, bet gan kā kopiena cilvēkiem, kuri alkst pēc īstiem, mežonīgiem un patiesiem piedzīvojumiem.
            </p>
            <p className="font-sans text-stone-600 font-light text-sm sm:text-base leading-relaxed">
              Mans mērķis ir radīt vidi, kur tu vari atslēgties no ikdienas steigas, pārbaudīt savas robežas drošos apstākļos, baudīt zvaigžņotas debesis un satikt līdzīgi domājošos.
            </p>

            {/* Signature or Badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center font-display font-bold text-amber-700">
                MP
              </div>
              <div>
                <h4 className="font-display font-semibold text-stone-900 text-sm">Mārtiņš Plānis</h4>
                <p className="font-sans text-xs text-stone-500 font-light">Kalnu gids un piedzīvojumu vadītājs</p>
              </div>
            </div>
          </div>

          {/* Image & Values Column */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-lg relative group">
              <img
                src="https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=800&q=80"
                alt="Martins in the mountains"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-sans text-xs text-amber-400 font-semibold uppercase tracking-widest">Grupas vadītājs</p>
                <p className="font-display text-xl font-bold mt-1">„Daba runā klusi, mums vienkārši jāmāk ieklausīties.”</p>
              </div>
            </div>
            
            {/* Soft decorative blur circle */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl -z-10" />
          </div>

        </div>

        {/* Values Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          {values.map((val, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-200/50 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
                <val.icon className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-stone-900 text-lg mb-2">
                {val.title}
              </h4>
              <p className="font-sans text-stone-600 text-sm font-light leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
