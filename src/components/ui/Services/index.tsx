import { useAppContext } from "@/app/hooks/useAppContext";
import useScrollReveal from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { useRef } from "react";

const Services = () => {
  const { t } = useAppContext() || {};
  const servicesRef = useRef(null);
  useScrollReveal();

  if (!t) return null;

  const services = [
    {
      icon: "🔒",
      title: t("services.cybersecurity.title"),
      description: t("services.cybersecurity.description"),
    },
    {
      icon: "🖥️",
      title: t("services.techSupport.title"),
      description: t("services.techSupport.description"),
    },
    {
      icon: "☁️",
      title: t("services.cloudServices.title"),
      description: t("services.cloudServices.description"),
    },
    {
      icon: "🌐",
      title: t("services.networkSolutions.title"),
      description: t("services.networkSolutions.description"),
    },
  ];

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
      ref={servicesRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="card p-6 rounded-xl scroll-reveal border-glow"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="opacity-80">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
