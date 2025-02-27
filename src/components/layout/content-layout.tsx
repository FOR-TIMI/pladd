import useScrollReveal from "@/hooks/useScrollReveal";
import { AppProvider } from "@/providers/AppProvider";
import Footer from "../ui/Footer";
import ContactForm from "../ui/Forms/Contact";
import Hero from "../ui/Hero";
import Navbar from "../ui/NavBar";
import Services from "../ui/Services";
import Stats from "../ui/Stats";
import Testimonials from "../ui/Testimonials";
import { TracingBeam } from "../ui/Trace/tracing-beam";

const ContentLayout = () => {
  useScrollReveal();

  return (
    <AppProvider>
      <Navbar />
      <main>
        <Hero />
        <TracingBeam className="px-6 py-3">
          <Services />
          <Stats />
          <Testimonials />
          <ContactForm />
        </TracingBeam>
      </main>
      <Footer />
    </AppProvider>
  );
};

export default ContentLayout;
