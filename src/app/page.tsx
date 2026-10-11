import Hero from "@/components/Hero";
import {
  Possibilities,
  Curriculum,
  Projects,
  Roadmap,
  WhyOptera,
  Experience,
  Requirements,
  Audience,
  Pricing,
  FAQ,
  FinalCTA,
} from "@/components/Sections";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/config";
export const metadata = {
  alternates: siteUrl() ? { canonical: siteUrl() } : undefined,
};
export default function Page() {
  return (
    <>
      <main id="main">
        <Hero />
        <Possibilities />
        <Curriculum />
        <Projects />
        <Roadmap />
        <WhyOptera />
        <Experience />
        <Requirements />
        <Audience />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
