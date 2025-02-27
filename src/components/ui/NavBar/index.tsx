import { useAppContext } from "@/hooks/useAppContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./index.css"
import LogoLink from "../Logo/Link";

const Navbar = () => {
  const { t, toggleLanguage, language, toggleTheme, theme } =
    useAppContext() || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!t || !toggleLanguage || !language || !toggleTheme || !theme) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 backdrop bg-opacity-80" : "py-4"
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <LogoLink />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-sm font-medium hover:text-gradient transition-colors"
          >
            {t("nav.home")}
          </a>
          <a
            href="#services"
            className="text-sm font-medium hover:text-gradient transition-colors"
          >
            {t("nav.services")}
          </a>
          <a
            href="#about"
            className="text-sm font-medium hover:text-gradient transition-colors"
          >
            {t("nav.about")}
          </a>
          <a
            href="#contact"
            className="text-sm font-medium hover:text-gradient transition-colors"
          >
            {t("nav.contact")}
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={
              language === "en" ? "Switch to French" : "Switch to English"
            }
          >
            {language === "en" ? "FR" : "EN"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <a
            href="#contact"
            className="btn-primary px-4 py-2 rounded-lg text-white text-sm font-medium"
          >
            {t("hero.contact")}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop bg-opacity-90 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#" className="py-2 text-sm font-medium">
                {t("nav.home")}
              </a>
              <a href="#services" className="py-2 text-sm font-medium">
                {t("nav.services")}
              </a>
              <a href="#about" className="py-2 text-sm font-medium">
                {t("nav.about")}
              </a>
              <a href="#contact" className="py-2 text-sm font-medium">
                {t("nav.contact")}
              </a>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2"
                >
                  <span className="text-sm font-medium">
                    {language === "en" ? "Français" : "English"}
                  </span>
                </button>

                <a
                  href="#contact"
                  className="btn-primary px-4 py-2 rounded-lg text-white text-sm font-medium"
                >
                  {t("hero.contact")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
