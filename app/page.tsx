import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <Testimonials />
    </main>
  );
}
