'use client';

import { Phone, Mail,} from 'lucide-react';
import Benefits from './Benefits';
import DecorativeElements from './DecorativeElements';
import CTAButton from './CTAButton';

// تعریف interfaceها


export default function CTATopHeader() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-teal-400/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            آماده
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> تحول</span>
            در کشاورزی‌تان هستید؟
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            همین حالا با کارشناسان ما تماس بگیرید و اولین جلسه مشاوره رایگان را رزرو کنید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton 
              icon={<Phone className="w-6 h-6" />}
              text="تماس با کارشناس"
              primary={true}
            />
            
            <CTAButton 
              icon={<Mail className="w-6 h-6" />}
              text="ارسال پیام"
              primary={false}
            />
          </div>
          
          <Benefits />
        </div>
      </div>
      <DecorativeElements />
    </section>
  );
}


