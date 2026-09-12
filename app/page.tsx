import Hero from '@/components/sections/Hero';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <main>

        <HowItWorks />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
