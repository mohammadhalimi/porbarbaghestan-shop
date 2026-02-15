import Hero from '../components/home/Hero';
import ServiceTop from '../components/home/service/ServiceTop';
import Fertilizers from '../components/home/Fertilizers';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-emerald-50/30 to-white">
      <Hero />
      <ServiceTop />
      <Fertilizers />
      <Testimonials />
      <CTA />
    </div>
  );
}