import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { BrandStrip } from "@/components/home/BrandStrip";
import { AboutSection, CallToAction } from "@/components/home/CallToAction";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <FeaturedServices />
        <BrandStrip />
        <AboutSection />
        <TestimonialsCarousel />
        <CallToAction />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
