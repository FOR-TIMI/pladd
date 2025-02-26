import { useAppContext } from "@/app/hooks/useAppContext";
import useTrackCursor from "@/hooks/useTrackCursor";
import { motion } from "framer-motion";
import { useRef } from "react";
import HeroSvgComponent from "./HeroSvgComponent";

const Hero = () => {
  const { t } = useAppContext() || {};
  const heroRef = useRef(null);
  useTrackCursor(heroRef);

  if (!t) return null;

  return (
    <section className="min-h-screen flex items-center pt-20 overflow-hidden relative">
      <div className="grid-background"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              <span className="text-gradient">{t("hero.title")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl mb-8 opacity-90 max-w-lg"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#services"
                className="btn-primary px-8 py-3 rounded-lg text-white font-medium text-center"
              >
                {t("hero.cta")}
              </a>

              <a
                href="#contact"
                className="px-8 py-3 rounded-lg border border-current font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {t("hero.contact")}
              </a>
            </motion.div>
          </div>

          <div ref={heroRef} className="md:w-1/2 spotlight track-cursor">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-[100px] rounded-full"></div>

              <HeroSvgComponent className="hidden relative z-10 rounded-xl shadow-xl md:flex items-center justify-center" />

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent opacity-30 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary opacity-20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
