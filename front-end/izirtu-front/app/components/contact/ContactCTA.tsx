// components/contact/ContactCTA.tsx
'use client';

import { Phone, Mail } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-teal-400/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            منتظر
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> تماس</span>
            شما هستیم
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            همین حالا با کارشناسان ما تماس بگیرید و مشاوره رایگان دریافت کنید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:02133370954" className="group relative px-10 py-5 bg-linear-to-r from-emerald-500 to-teal-400 text-white text-lg font-semibold rounded-2xl overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                تماس با دفتر مرکزی
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <button className="px-10 py-5 border-2 border-emerald-200 text-emerald-700 text-lg font-semibold rounded-2xl hover:bg-emerald-50 transition-colors">
              <span className="flex items-center justify-center gap-3">
                <Mail className="w-6 h-6" />
                ارسال ایمیل
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-linear-to-r from-amber-400 to-yellow-300 rounded-full opacity-10 blur-3xl"></div>
    </section>
  );
}