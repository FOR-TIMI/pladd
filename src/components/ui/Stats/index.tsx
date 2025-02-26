import { useAppContext } from "@/app/hooks/useAppContext";
import useScrollReveal from "@/hooks/useScrollReveal";

const Stats = () => {
  const { t } = useAppContext() || {};
  useScrollReveal();

  if (!t) return null;

  const stats = [
    { number: "500+", label: t("stats.clients") },
    { number: "10,000+", label: t("stats.issues") },
    { number: "99.9%", label: t("stats.uptime") },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 scroll-reveal">
          <h2 className="text-3xl font-bold mb-2">{t("stats.title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center scroll-reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
