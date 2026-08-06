import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import CookieConsent from "./components/CookieConsent";
import { LanguageProvider } from "./context/LanguageContext";
import SEO from "./components/SEO";

const Collaboration = lazy(() => import("./pages/Collaboration"));
const Destinations = lazy(() => import("./pages/Destinations"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Dynamic SEO and Metatags Coordinator */}
        <SEO />
        <div className="min-h-screen bg-[#F7F7F7] text-[#2C2B29] font-sans antialiased flex flex-col justify-between">
          {/* Scroll To Top helper on route changes */}
          <ScrollToTop />
          
          {/* Persistent Sticky Navigation Header */}
          <Header />

          {/* Multi-page Routing Stage */}
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-[50vh] bg-[#F7F7F7]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/par-mani" element={<Home />} />
                <Route path="/sadarbiba" element={<Collaboration />} />
                <Route path="/galamerki" element={<Destinations />} />
                <Route path="/buj" element={<FAQ />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/kontakti" element={<ContactPage />} />
                <Route path="/sikdatnu-politika" element={<CookiePolicy />} />
                
                {/* Fallback route - novirza uz sākumlapu */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer block with quick-links, follow buttons and policy modals */}
          <Footer />
          
          {/* Global Cookie Consent popup */}
          <CookieConsent />
        </div>
      </Router>
    </LanguageProvider>
  );
}
