// components/contact/ContactHero.tsx
'use client';

import { Phone, MessageCircle, Shield, Award, Leaf } from 'lucide-react';
import { BenefitItem } from './type/BenefitItem';
import { ContactHeroProps } from './type/ContactHeroProps';
import { ContactHeroImage } from './ContactHeroImage/ContactHeroImage';

export default function ContactHero({ onScrollToForm }: ContactHeroProps) {
  const benefits: BenefitItem[] = [
    {
      icon: Shield,
      title: 'پاسخگویی ۲۴ ساعته',
      description: 'همیشه در کنار شما هستیم'
    },
    {
      icon: Award,
      title: 'مشاوره رایگان',
      description: 'تخصصی و کارشناسی شده'
    },
    {
      icon: Leaf,
      title: 'پشتیبانی فنی',
      description: 'پس از فروش و کاشت'
    }
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              در تماس باشید
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                تماس
              </span>
              <br />
              با کارشناسان
              <br />
              پربار باغستان
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              ما اینجا هستیم تا به سوالات شما پاسخ دهیم و در زمینه کشاورزی و باغداری همراهتان باشیم.
              مشاوره کاملاً رایگان و تخصصی ما منتظر شماست.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-semibold overflow-hidden cursor-pointer">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  تماس فوری
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={onScrollToForm}
                className="px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors text-center cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  ارسال پیام
                </span>
              </button>
            </div>
            
            {/* مزایا */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{benefit.title}</div>
                </div>
              ))}
            </div>
          </div>
          
          <ContactHeroImage />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white via-white to-transparent"></div>
    </section>
  );
}