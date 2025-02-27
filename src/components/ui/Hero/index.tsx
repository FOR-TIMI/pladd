import { useAppContext } from "@/hooks/useAppContext";
import { motion } from "framer-motion";
import { useRef } from "react";
import HeroSvgComponent from "./HeroSvgComponent";
import useParallaxEffect from "@/hooks/useParallaxEffect";

const Hero = () => {
  const { t } = useAppContext() || {};
  const containerRef = useRef(null);
  const { elementRef } = useParallaxEffect({ strength: 15 });

  if (!t) return null;

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    },
  };

  return (
    <section className="min-h-screen flex items-center pt-20 overflow-hidden relative" ref={containerRef}>
      <div className="grid-background absolute inset-0" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              <span className="text-gradient">{t("hero.title")}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-8 opacity-90 max-w-lg"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#services"
                className="btn-primary px-8 py-3 rounded-lg text-white font-medium text-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={t("hero.cta")}
              >
                {t("hero.cta")}
              </a>

              <a
                href="#contact"
                className="px-8 py-3 rounded-lg border border-current font-medium text-center 
                          hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                          focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label={t("hero.contact")}
              >
                {t("hero.contact")}
              </a>
            </motion.div>
          </div>

          <div className="md:w-1/2" ref={elementRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                type: "spring", 
                stiffness: 50, 
                damping: 15 
              }}
              className="relative"
            >
              {/* Ambient glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50" aria-hidden="true"></div>
              <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-[100px] rounded-full" aria-hidden="true"></div>

              <HeroSvgComponent 
                className="hidden relative z-10 rounded-xl max-w-full h-auto md:flex items-center justify-center transform-gpu"
                aria-label="Decorative technology illustration"
              />

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent opacity-30 rounded-full blur-xl" aria-hidden="true"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary opacity-20 rounded-full blur-xl" aria-hidden="true"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;