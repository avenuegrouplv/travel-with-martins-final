import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import CookiePreferencesModal from "./CookiePreferencesModal";

export default function CookieConsent() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    // Clear previously stored consent on mount so the banner always appears in preview
    localStorage.removeItem("cookie_consent");
    localStorage.removeItem("travel_cookie_consent");

    const handleShow = () => {
      localStorage.removeItem("cookie_consent");
      localStorage.removeItem("travel_cookie_consent");
      setIsVisible(true);
    };
    window.addEventListener("show_cookie_consent", handleShow);

    // Show banner after 500ms delay on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("show_cookie_consent", handleShow);
    };
  }, []);

  const handleAcceptAll = () => {
    const prefs = { necessary: true, analytics: true, functional: true, marketing: true };
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("travel_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    const prefs = { necessary: true, analytics: false, functional: false, marketing: false };
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent", "rejected");
    localStorage.setItem("travel_cookie_consent", "rejected");
    setIsVisible(false);
  };

  const handleCloseX = () => {
    localStorage.setItem("cookie_consent", "dismissed");
    localStorage.setItem("travel_cookie_consent", "dismissed_x");
    setIsVisible(false);
  };

  const handlePreferencesSave = () => {
    setIsVisible(false);
  };

  const translations = {
    LV: {
      acceptAll: "Piekrītu visām",
      customize: "Pielāgot",
      reject: "Noraidīt",
      privacyLink: "Privātuma politikā.",
      textPart1: "Mēs izmantojam sīkdatnes, lai uzlabotu Jūsu lietošanas pieredzi, nodrošinātu vietnes darbību un analizētu apmeklētāju plūsmu. Jūs varat piekrist visām sīkdatnēm vai pielāgot savas izvēles. Vairāk informācijas mūsu "
    },
    EN: {
      acceptAll: "Accept all",
      customize: "Customize",
      reject: "Reject",
      privacyLink: "Privacy Policy.",
      textPart1: "We use cookies to improve your user experience, ensure website functionality, and analyze visitor traffic. You can agree to all cookies or customize your choices. More information in our "
    },
    RU: {
      acceptAll: "Принять все",
      customize: "Настроить",
      reject: "Отклонить",
      privacyLink: "Политике конфиденциальности.",
      textPart1: "Мы используем файлы cookie для улучшения пользовательского опыта, обеспечения работы сайта и анализа потока посетителей. Вы можете согласиться со всеми файлами cookie или настроить свои предпочтения. Подробнее в нашей "
    }
  };

  const t = translations[lang] || translations.LV;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-5 md:p-6 flex justify-center pointer-events-none">
            <motion.div
              key="cookie-banner"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto max-w-5xl w-full bg-[#0D1B2A] text-white border border-[#D4AF37]/40 shadow-2xl rounded-none p-5 sm:p-6 md:p-7 relative flex flex-col lg:flex-row gap-5 items-center justify-between"
              id="cookie-consent-container"
            >
              {/* Close Button X */}
              <button
                onClick={handleCloseX}
                className="absolute top-3 right-3 text-white/60 hover:text-[#D4AF37] transition-colors p-1.5 cursor-pointer"
                id="cookie-close-x"
                aria-label="Aizvērt"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Content Text */}
              <div className="flex-1 min-w-0 pr-6 lg:pr-4">
                <p className="text-xs sm:text-sm text-[#ECEAE4] leading-relaxed font-sans">
                  {t.textPart1}
                  <button
                    onClick={() => setPrivacyOpen(true)}
                    className="text-[#D4AF37] hover:underline font-bold inline cursor-pointer ml-1"
                  >
                    {t.privacyLink}
                  </button>
                </p>
              </div>

              {/* 3 Horizontal Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2.5 w-full lg:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial text-center bg-[#D4AF37] hover:bg-[#E5C048] text-[#0D1B2A] font-sans text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-all duration-200 rounded-none cursor-pointer whitespace-nowrap"
                  id="cookie-accept-btn"
                >
                  {t.acceptAll}
                </button>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(true)}
                  className="flex-1 sm:flex-initial text-center border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-sans text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-all duration-200 rounded-none cursor-pointer whitespace-nowrap"
                  id="cookie-customize-btn"
                >
                  {t.customize}
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="flex-1 sm:flex-initial text-center border border-white/20 hover:border-white hover:bg-white/10 text-white font-sans text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-all duration-200 rounded-none cursor-pointer whitespace-nowrap"
                  id="cookie-reject-btn"
                >
                  {t.reject}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <CookiePreferencesModal
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        onSave={handlePreferencesSave}
      />
    </>
  );
}
