'use client';

import { Sprout, Sun } from "lucide-react";
import FloatingCard from "./FloatingCard";
import ServiceCard from "./ServiceCard";
import Image from "next/image";
import bg_hero from '../../../../public/bg-hero.jpg';

export default function HeroImage() {
  return (
    <div className="relative">
      <div className="relative h-125 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-400/20 to-teal-300/20"></div>
        
        {/* استفاده از Image component */}
        <div className="absolute inset-0 mix-blend-overlay">
          <Image
            src={bg_hero}
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* عناصر شناور */}
        <FloatingCard 
          position="top-10 left-10"
          icon={<Sprout className="w-6 h-6 text-white" />}
          title="رشد ۴۰٪"
          subtitle="افزایش عملکرد"
          rotate="rotate-6"
        />
        
        <FloatingCard 
          position="bottom-10 right-10"
          icon={<Sun className="w-6 h-6 text-white" />}
          title="کود ارگانیک"
          subtitle="طبیعی و سالم"
          rotate="-rotate-6"
          colored={true}
        />
      </div>
      
      {/* کارت خدمات */}
      <ServiceCard />
    </div>
  );
}