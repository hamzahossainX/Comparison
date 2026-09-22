import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import ScrollDriver from '@/components/ScrollDriver';
import ScrollShowcase from '@/components/ScrollShowcase';
import SpecSection from '@/components/SpecSection';
import SceneLayer from '@/components/three/SceneLayer';

export default function Page() {
  return (
    <>
      <a
        href="#specs"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:text-[13px] focus:font-medium focus:text-ink"
      >
        Skip to product details
      </a>

      <ScrollDriver />
      <SceneLayer />
      <Navbar />

      {/* The hero and showcase share the fixed canvas behind them, so they stay
          transparent. Every section after this one is opaque. */}
      <main className="relative z-10">
        <Hero />
        <ScrollShowcase />
        <SpecSection />
        <ProductGrid />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
