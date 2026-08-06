import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePolicyModal({ isOpen, onClose }: ModalProps) {
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
        console.error("Error loading cookie preferences in policy modal", e);
      }
    }
  }, [isOpen]);

  const handleToggle = (category: "analytics" | "functional" | "marketing") => {
    let newAnalytics = analytics;
    let newFunctional = functional;
    let newMarketing = marketing;

    if (category === "analytics") newAnalytics = !analytics;
    if (category === "functional") newFunctional = !functional;
    if (category === "marketing") newMarketing = !marketing;

    setAnalytics(newAnalytics);
    setFunctional(newFunctional);
    setMarketing(newMarketing);

    const prefs = { necessary: true, analytics: newAnalytics, functional: newFunctional, marketing: newMarketing };
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent", "custom");
    localStorage.setItem("travel_cookie_consent", "custom");
  };

  const renderContent = () => {
    if (lang === "LV") {
      return (
        <div className="space-y-6 text-sm text-[#5A5854] leading-relaxed">
          <p className="text-xs text-[#8C8A84] italic">
            Pēdējo reizi atjaunots: 2026.gada janvāris
          </p>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">1. Kas ir sīkdatnes?</h4>
            <p>
              Sīkdatnes (cookies) ir mazi teksta faili, ko tīmekļa vietne saglabā Jūsu datorā vai mobilajā ierīcē, kad Jūs to apmeklējat. Katrā nākamajā apmeklējuma reizē sīkdatnes tiek nosūtītas atpakaļ uz izcelsmes vietni vai trešās puses vietni, kas atpazīst attiecīgo sīkdatni.
            </p>
            <p>
              Sīkdatnes darbojas kā konkrētas vietnes atmiņa, ļaujot vietnei atcerēties Jūsu iestatījumus un darbības (piemēram, valodu, fontu izmērus un citus attēlošanas iestatījumus), lai Jums tie nebūtu jāievada no jauna katru reizi.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">2. Kāpēc mēs izmantojam sīkdatnes?</h4>
            <p>
              <strong>Travel with Martins</strong> (SageOn Media) izmanto sīkdatnes šādiem mērķiem:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vietnes funkcionalitātes nodrošināšanai:</strong> Lai tīmekļa vietne varētu darboties un nodrošināt pamatfunkcijas.</li>
              <li><strong>Lietošanas pieredzes uzlabošanai:</strong> Lai atcerētos Jūsu izvēles un sniegtu personalizētāku saturu.</li>
              <li><strong>Analītikai un statistikai:</strong> Lai saprastu, kā apmeklētāji mijiedarbojas ar vietni (kuras lapas apmeklē visbiežāk, cik ilgi uzturas vietnē), kas palīdz mums uzlabot vietnes struktūru un saturu.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">3. Sīkdatņu kategorijas un to pielāgošana</h4>
            <div className="space-y-3">
              {/* Obligātās */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-[#0D1B2A]">Nepieciešamās sīkdatnes (Obligātas)</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0D1B2A]/10 text-[#0D1B2A] px-2 py-0.5 rounded-full whitespace-nowrap">
                    Vienmēr aktīvas
                  </span>
                </div>
                <p className="text-xs">
                  Šīs sīkdatnes ir nepieciešamas vietnes pamata funkcijām, drošībai un nepārtrauktai darbībai (piemēram, sesijas uzturēšanai, navigācijai un kontaktformu apstrādei). Bez tām vietne nevar pareizi darboties.
                </p>
              </div>

              {/* Analītiskās */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Analītiskās & Statistiskās sīkdatnes</p>
                  <p className="text-xs">
                    Izmanto trešo pušu analītikas rīkus (piemēram, Google Analytics), lai apkopotu anonīmu statistiku par apmeklētāju skaitu, populārākajām lapām un uzturēšanās ilgumu. Tas palīdz uzlabot vietnes struktūru un saturu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("analytics")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    analytics ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={analytics}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      analytics ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {analytics && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* Funkcionālās */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Funkcionālās sīkdatnes</p>
                  <p className="text-xs">
                    Ļauj vietnei atcerēties Jūsu veiktās izvēles (piemēram, valodas iestatījumus, fontu izmēru un reģionu), nodrošinot ērtāku un personalizētāku lietošanu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("functional")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    functional ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={functional}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      functional ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {functional && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* Mārketinga */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Mārketinga & Reklāmas sīkdatnes</p>
                  <p className="text-xs">
                    Izmanto, lai rādītu Jūsu interesēm atbilstošākus paziņojumus un piedāvājumus sociālajos tīklos vai sadarbības partneru vietnēs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("marketing")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    marketing ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={marketing}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      marketing ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {marketing && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">4. Kā pārvaldīt un izdzēst sīkdatnes?</h4>
            <p>
              Lielākā daļa pārlūkprogrammu ir iestatītas tā, lai automātiski pieņemtu sīkdatnes. Jūs varat jebkurā laikā mainīt Savas pārlūkprogrammas iestatījumus, lai bloķētu sīkdatnes vai saņemtu brīdinājumu, kad tās tiek sūtītas.
            </p>
            <div>
              <p className="font-bold text-[#0D1B2A] mb-2 text-xs uppercase tracking-wider">
                Instrukcijas populārākajām pārlūkprogrammām:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Google Chrome</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.apple.com/lv-lv/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Safari</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Mozilla Firefox</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.microsoft.com/lv-lv/topic/168dab11-0753-043d-7c16-ede5947798d2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>MS Edge</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
              </div>
            </div>

            <p className="text-xs text-[#8C8A84] bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD]">
              <strong>Ievērojiet:</strong> Ja Jūs bloķēsiet sīkdatnes, dažas mūsu tīmekļa vietnes funkcijas var nebūt pieejamas vai darboties nepilnīgi.
            </p>

            <p className="pt-2 border-t border-[#F2ECE0]">
              Ja Jums ir jautājumi par mūsu sīkdatņu politiku, lūdzu, sazinieties ar mums, rakstot uz:{" "}
              <a href="mailto:travelwithmartinss@gmail.com" className="text-[#F87E2E] hover:underline font-semibold">
                travelwithmartinss@gmail.com
              </a>
            </p>
          </section>
        </div>
      );
    } else if (lang === "RU") {
      return (
        <div className="space-y-6 text-sm text-[#5A5854] leading-relaxed">
          <p className="text-xs text-[#8C8A84] italic">
            Последнее обновление: январь 2026 года
          </p>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">1. Что такое файлы куки?</h4>
            <p>
              Файлы куки (cookies) — это небольшие текстовые файлы, которые веб-сайт сохраняет на вашем компьютере или мобильном устройстве при его посещении. При каждом последующем посещении файлы куки отправляются обратно на исходный веб-сайт или на сторонний сайт, который распознает данный файл куки.
            </p>
            <p>
              Файлы куки работают как память конкретного сайта, позволяя ему запоминать ваши настройки и действия (например, язык, размер шрифта и другие параметры отображения), чтобы вам не приходилось вводить их заново при каждом посещении.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">2. Почему мы используем файлы куки?</h4>
            <p>
              <strong>Travel with Martins</strong> использует файлы куки в следующих целях:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Обеспечение функциональности сайта:</strong> Чтобы веб-сайт мог работать и обеспечивать базовые функции.</li>
              <li><strong>Улучшение пользовательского опыта:</strong> Чтобы запоминать ваши предпочтения и предоставлять более персонализированный контент.</li>
              <li><strong>Аналитика и статистика:</strong> Чтобы понять, как посетители взаимодействуют с сайтом (какие страницы посещают чаще всего, сколько времени проводят на сайте), что помогает нам улучшать структуру и содержание сайта.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">3. Категории файлов cookie и их настройка</h4>
            <div className="space-y-3">
              {/* Obligātās */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-[#0D1B2A]">Обязательные файлы cookie</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0D1B2A]/10 text-[#0D1B2A] px-2 py-0.5 rounded-full whitespace-nowrap">
                    Всегда активны
                  </span>
                </div>
                <p className="text-xs">
                  Эти файлы cookie необходимы для основных функций веб-сайта, безопасности и непрерывной работы (например, поддержания сеанса, навигации и обработки контактных форм). Без них сайт не может работать корректно.
                </p>
              </div>

              {/* Analītiskās */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Аналитические и статистические куки</p>
                  <p className="text-xs">
                    Используют аналитические инструменты сторонних разработчиков (например, Google Analytics) для сбора анонимной статистики о количестве посетителей, наиболее популярных страницах и продолжительности пребывания.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("analytics")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    analytics ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={analytics}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      analytics ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {analytics && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* Funkcionālās */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Функциональные файлы cookie</p>
                  <p className="text-xs">
                    Позволяют сайту запоминать сделанный вами выбор (например, языковые настройки, размер шрифта и регион), обеспечивая более удобное и персонализированное использование.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("functional")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    functional ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={functional}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      functional ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {functional && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* Mārketinga */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Маркетинговые и рекламные куки</p>
                  <p className="text-xs">
                    Используются для показа объявлений и предложений, соответствующих вашим интересам, в социальных сетях или на сайтах партнеров.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("marketing")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    marketing ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={marketing}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      marketing ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {marketing && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">4. Как управлять и удалять файлы куки?</h4>
            <p>
              Большинство браузеров настроены на автоматический прием файлов куки. Вы можете в любое время изменить настройки своего браузера, чтобы заблокировать файлы куки или получать предупреждение об их отправке.
            </p>
            <div>
              <p className="font-bold text-[#0D1B2A] mb-2 text-xs uppercase tracking-wider">
                Инструкции для самых популярных браузеров:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Google Chrome</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.apple.com/lv-lv/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Safari</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Mozilla Firefox</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.microsoft.com/lv-lv/topic/168dab11-0753-043d-7c16-ede5947798d2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>MS Edge</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
              </div>
            </div>

            <p className="text-xs text-[#8C8A84] bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD]">
              <strong>Обратите внимание:</strong> Если вы заблокируете файлы куки, некоторые функции нашего веб-сайта могут быть недоступны или работать неполноценно.
            </p>

            <p className="pt-2 border-t border-[#F2ECE0]">
              Если у вас возникли вопросы по поводу нашей политики использования файлов куки, пожалуйста, свяжитесь с нами по адресу:{" "}
              <a href="mailto:travelwithmartinss@gmail.com" className="text-[#F87E2E] hover:underline font-semibold">
                travelwithmartinss@gmail.com
              </a>
            </p>
          </section>
        </div>
      );
    } else {
      return (
        <div className="space-y-6 text-sm text-[#5A5854] leading-relaxed">
          <p className="text-xs text-[#8C8A84] italic">
            Last updated: January 2026
          </p>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">1. What are cookies?</h4>
            <p>
              Cookies are small text files that a website saves on your computer or mobile device when you visit it. On each subsequent visit, the cookies are sent back to the originating website or a third-party website that recognizes that cookie.
            </p>
            <p>
              Cookies act as a memory for a specific website, allowing the website to remember your settings and actions (such as language, font sizes, and other display preferences) so that you do not have to enter them again each time.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">2. Why do we use cookies?</h4>
            <p>
              <strong>Travel with Martins</strong> uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>To ensure website functionality:</strong> To enable the website to operate and provide basic features.</li>
              <li><strong>To improve user experience:</strong> To remember your choices and provide more personalized content.</li>
              <li><strong>For analytics and statistics:</strong> To understand how visitors interact with the website (which pages they visit most often, how long they stay), which helps us improve the structure and content of the website.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">3. Cookie Categories and Customization</h4>
            <div className="space-y-3">
              {/* Mandatory */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-[#0D1B2A]">Necessary Cookies (Mandatory)</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0D1B2A]/10 text-[#0D1B2A] px-2 py-0.5 rounded-full whitespace-nowrap">
                    Always active
                  </span>
                </div>
                <p className="text-xs">
                  These cookies are required for basic website functions, security, and uninterrupted operation (e.g. session maintenance, navigation, contact forms). Without them, the website cannot function properly.
                </p>
              </div>

              {/* Analytics */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Analytics & Statistical Cookies</p>
                  <p className="text-xs">
                    Uses third-party analytics tools (such as Google Analytics) to collect anonymous statistics about the number of visitors, most popular pages, and session duration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("analytics")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    analytics ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={analytics}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      analytics ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {analytics && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* Functional */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Functional Cookies</p>
                  <p className="text-xs">
                    Allows the website to remember choices you make (such as language settings, font sizes, and region) to provide a more convenient and personalized experience.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("functional")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    functional ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={functional}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      functional ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {functional && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>

              {/* Marketing */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD] flex items-start justify-between gap-3">
                <div className="space-y-1 pr-2">
                  <p className="font-bold text-[#0D1B2A]">Marketing & Advertising Cookies</p>
                  <p className="text-xs">
                    Used to deliver relevant notifications and offers tailored to your interests on social media or partner websites.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("marketing")}
                  className={`shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer mt-0.5 ${
                    marketing ? "bg-[#0D1B2A]" : "bg-[#D0CCC4]"
                  }`}
                  aria-pressed={marketing}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-md flex items-center justify-center ${
                      marketing ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  >
                    {marketing && <Check className="w-3 h-3 text-[#0D1B2A]" />}
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="font-display font-bold text-[#0D1B2A] text-lg">4. How to manage and delete cookies?</h4>
            <p>
              Most browsers are set to automatically accept cookies. You can change your browser settings at any time to block cookies or to be warned when they are sent.
            </p>
            <div>
              <p className="font-bold text-[#0D1B2A] mb-2 text-xs uppercase tracking-wider">
                Instructions for the most popular browsers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Google Chrome</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.apple.com/lv-lv/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Safari</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>Mozilla Firefox</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
                <a
                  href="https://support.microsoft.com/lv-lv/topic/168dab11-0753-043d-7c16-ede5947798d2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] hover:border-[#D4AF37] hover:bg-white transition-all rounded-xl text-xs font-bold text-[#0D1B2A]"
                >
                  <span>MS Edge</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C8A84]" />
                </a>
              </div>
            </div>

            <p className="text-xs text-[#8C8A84] bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE6DD]">
              <strong>Please note:</strong> If you block cookies, some features of our website may not be available or may function incompletely.
            </p>

            <p className="pt-2 border-t border-[#F2ECE0]">
              If you have any questions about our cookie policy, please contact us by writing to:{" "}
              <a href="mailto:travelwithmartinss@gmail.com" className="text-[#F87E2E] hover:underline font-semibold">
                travelwithmartinss@gmail.com
              </a>
            </p>
          </section>
        </div>
      );
    }
  };

  const getTitle = () => {
    if (lang === "LV") return "Sīkdatņu politika";
    if (lang === "RU") return "Политика использования куки";
    return "Cookie Policy";
  };

  const getCloseBtnText = () => {
    if (lang === "LV") return "Aizvērt";
    if (lang === "RU") return "Закрыть";
    return "Close";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black cursor-pointer"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#FAF9F5] text-[#2C2B29] rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#EAE6DD]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#8C8A84] hover:text-[#0D1B2A] rounded-full hover:bg-[#F2ECE0] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-display font-black text-[#0D1B2A] mb-6 uppercase tracking-tight">
              {getTitle()}
            </h3>
            
            {renderContent()}

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0D1B2A] text-white rounded-full text-xs font-bold hover:bg-[#D4AF37] hover:text-[#0D1B2A] transition-colors cursor-pointer uppercase tracking-wider"
              >
                {getCloseBtnText()}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
