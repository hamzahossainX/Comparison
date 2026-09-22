import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Promo from "@/components/Promo";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink font-sans text-mist">
      <Navbar />
      <Hero />
      <Showcase />
      <Promo />
      <ProductGrid />
      <Footer />
    </main>
  );
}
