import HeroContent from './hero/HeroContent';
import HeroImage from './hero/HeroImage';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent  />
          <HeroImage />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white via-white to-transparent"></div>
    </section>
  );
}



