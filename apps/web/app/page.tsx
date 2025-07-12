import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Features } from "../components/landing/features";
import { Hero } from "../components/landing/hero";
import { Pricing } from "../components/landing/pricing";
import { Stats } from "../components/landing/stats";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <section id="features">
          <Features />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
      </main>
      <Footer />
    </div>
  );
}
