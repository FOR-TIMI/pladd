import { useAppContext } from "@/hooks/useAppContext";
import useScrollReveal from "@/hooks/useScrollReveal";

const Testimonials = () => {
  const { t } = useAppContext() || {};
  useScrollReveal();

  if (!t) return null;

  const testimonials = [
    {
      quote: t("testimonials.testimonial1.quote"),
      author: t("testimonials.testimonial1.author"),
      company: t("testimonials.testimonial1.company"),
    },
    {
      quote: t("testimonials.testimonial2.quote"),
      author: t("testimonials.testimonial2.author"),
      company: t("testimonials.testimonial2.company"),
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="grid-background"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card p-8 rounded-xl relative border-glow scroll-reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-6 left-6 text-5xl opacity-10">"</div>
              <p className="text-lg mb-6 relative z-10">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author
                    .split(" ")
                    .map((name: string) => name[0])
                    .join("")}
                </div>
                <div className="ml-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm opacity-70">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
