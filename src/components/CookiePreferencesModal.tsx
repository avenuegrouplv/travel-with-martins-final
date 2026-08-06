import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categories: { necessary: boolean; analytics: boolean; functional: boolean; marketing: boolean }) => void;
}

export default function CookiePreferencesModal({ isOpen, onClose, onSave }: CookiePreferencesModalProps) {
  const { lang } = useLanguage();

  const [analytics, setAnalytics] = useState(true);
  const [functional, setFunctional] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem("cookie_consent_preferences");
        if (saved) {
          const parsed = JSON.parse(saved);
          setAnalytics(!!parsed.analytics);
          setFunctional(!!parsed.functional);
          setMarketing(!!parsed.marketing);
        }
      } catch (e) {
        console.error("Error reading saved cookie preferences", e);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    const prefs = { necessary: true, analytics, functional, marketing };
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent", "custom");
    localStorage.setItem("travel_cookie_consent", "custom");
    onSave(prefs);
    onClose();
  };

  const handleAcceptAll = () => {
    const prefs = { necessary: true, analytics: true, functional: true, marketing: true };
    setAnalytics(true);
    setFunctional(true);
    setMarketing(true);
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("travel_cookie_consent", "accepted");
    onSave(prefs);
    onClose();
  };

  const texts = {
    LV: {
      title: "Sīkdatņu iestatījumi",
      subtitle: "Pielāgojiet savas sīkdatņu izvēles. Obligātās sīkdatnes ir nepieciešamas tīmekļa vietnes drošai un pareizai darbībai.",
      alwaysActive: "Vienmēr aktīvas",
      save: "Saglabāt izvēli",
      acceptAll: "Piekrītu visām",
      necessary: {
        title: "Obligātās sīkdatnes",
        desc: "Šīs sīkdatnes ir nepieciešamas mājaslapas pamatfunkcijām, navigācijai un drošības nodrošināšanai."
      },
      analytics: {
        title: "Analītiskās sīkdatnes",
        desc: "Palīdz mums saprast, kā apmeklētāji mijiedarbojas ar vietni, vācot anonīmus lietošanas datus."
      },
      functional: {
        title: "Funkcionālās sīkdatnes",
        desc: "Ļauj vietnei atcerēties jūsu izvēles (piemēram, izvēlēto valodu) un nodrošināt personalizētas funkcijas."
      },
      marketing: {
        title: "Mārketinga sīkdatnes",
        desc: "Tiek izmantotas, lai sekotu apmeklētājiem starp vietnēm un rādītu atbilstošas reklāmas."
      }
    },
    EN: {
      title: "Cookie Settings",
      subtitle: "Customize your cookie preferences. Necessary cookies are required for proper and secure website operation.",
      alwaysActive: "Always active",
      save: "Save choices",
      acceptAll: "Accept all",
      necessary: {
        title: "Necessary Cookies",
        desc: "These cookies are essential for basic website functions, security, and navigation."
      },
      analytics: {
        title: "Analytics Cookies",
        desc: "Help us understand how visitors interact with the website by collecting anonymous usage statistics."
      },
      functional: {
        title: "Functional Cookies",
        desc: "Allow the website to remember your preferences (such as selected language) and provide enhanced features."
      },
      marketing: {
        title: "Marketing Cookies",
        desc: "Used to track visitors across websites to deliver relevant advertisements."
      }
    },
    RU: {
      title: "Настройки файлов cookie",
      subtitle: "Настройте свои предпочтения. Обязательные файлы cookie необходимы для безопасной работы сайта.",
      alwaysActive: "Всегда активны",
      save: "Сохранить выбор",
      acceptAll: "Принять все",
      necessary: {
        title: "Обязательные куки",
        desc: "Эти файлы cookie необходимы для основных функций веб-сайта, навигации и безопасности."
      },
      analytics: {
        title: "Аналитические куки",
        desc: "Помогают нам понять, как посетители используют сайт, собирая анонимные данные."
      },
      functional: {
        title: "Функциональные куки",
        desc: "Позволяют сайту запоминать ваши настройки (например, выбранный язык) и предоставлять персональные функции."
      },
      marketing: {
        title: "Маркетинговые куки",
        desc: "Используются для отслеживания посетителей на сайтах с целью показа релевантной рекламы."
      }
    }
  };

  const t = texts[lang] || texts.LV;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#FAF9F5] text-[#2C2B29] rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#EAE6DD]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#8C8A84] hover:text-[#0D1B2A] rounded-full hover:bg-[#F2ECE0] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 space-y-2 pr-6">
              <h3 className="text-2xl font-display font-black text-[#0D1B2A] uppercase tracking-tight">
                {t.title}
              </h3>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Cookie Categories Toggles */}
            <div className="space-y-4 mb-8">
              {/* 1. Necessary (Obligātās) */}
              <div className="bg-white p-4 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-4">
                <div className="space-y-1 pr-2">
                  <span className="font-bold text-sm text-[#0D1B2A] block">
                    {t.necessary.title}
                  </span>
                  <p className="text-xs text-[#5A5854]">
                    {t.necessary.desc}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-[#0D1B2A]/10 text-[#0D1B2A] px-2.5 py-1 rounded-full whitespace-nowrap mt-0.5">
                  {t.alwaysActive}
                </span>
              </div>

              {/* 2. Analytics (Analītiskās) */}
              <div className="bg-white p-4 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-4">
                <div className="space-y-1 pr-2">
                  <span className="font-bold text-sm text-[#0D1B2A] block">
                    {t.analytics.title}
                  </span>
                  <p className="text-xs text-[#5A5854]">
                    {t.analytics.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAnalytics(!analytics)}
                  className={`shrink-0 w-12 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    analytics ? "bg-[#0D1B2A]" : "bg-[#EAE6DD]"
                  }`}
                  aria-pressed={analytics}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      analytics ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  >
                    {analytics && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* 3. Functional (Funkcionālās) */}
              <div className="bg-white p-4 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-4">
                <div className="space-y-1 pr-2">
                  <span className="font-bold text-sm text-[#0D1B2A] block">
                    {t.functional.title}
                  </span>
                  <p className="text-xs text-[#5A5854]">
                    {t.functional.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFunctional(!functional)}
                  className={`shrink-0 w-12 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    functional ? "bg-[#0D1B2A]" : "bg-[#EAE6DD]"
                  }`}
                  aria-pressed={functional}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      functional ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  >
                    {functional && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* 4. Marketing (Mārketinga) */}
              <div className="bg-white p-4 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-4">
                <div className="space-y-1 pr-2">
                  <span className="font-bold text-sm text-[#0D1B2A] block">
                    {t.marketing.title}
                  </span>
                  <p className="text-xs text-[#5A5854]">
                    {t.marketing.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMarketing(!marketing)}
                  className={`shrink-0 w-12 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    marketing ? "bg-[#0D1B2A]" : "bg-[#EAE6DD]"
                  }`}
                  aria-pressed={marketing}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      marketing ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  >
                    {marketing && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t border-[#EAE6DD]">
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 bg-white text-[#0D1B2A] border border-[#0D1B2A] hover:bg-[#F2ECE0] transition-colors rounded-none text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {t.save}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2.5 bg-[#0D1B2A] text-white hover:bg-[#D4AF37] hover:text-[#0D1B2A] transition-colors rounded-none text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {t.acceptAll}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
