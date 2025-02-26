import { AppProvider } from "@/app/provider";
import useScrollReveal from "@/hooks/useScrollReveal";
import Footer from "../ui/Footer";
import ContactForm from "../ui/Forms/Contact";
import Hero from "../ui/Hero";
import Navbar from "../ui/NavBar";
import Services from "../ui/Services";
import Stats from "../ui/Stats";
import Testimonials from "../ui/Testimonials";

const ContentLayout = () => {
  useScrollReveal();

  return (
    <AppProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </AppProvider>
  );
};

export default ContentLayout;
