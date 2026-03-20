import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import AgendaSection from "@/sections/AgendaSection";
import CourseTeaserSection from "@/sections/CourseTeaserSection";
import FooterSection from "@/sections/FooterSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AgendaSection />
      <CourseTeaserSection />
      <FooterSection />
    </main>
  );
}
