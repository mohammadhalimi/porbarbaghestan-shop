// components/CTASection.tsx
import { Phone, Calendar, CheckCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-teal-400/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            آماده
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> شروع</span>
            همکاری هستید؟
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            همین حالا با کارشناسان ما تماس بگیرید و اولین جلسه مشاوره رایگان را رزرو کنید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-10 py-5 bg-linear-to-r from-emerald-500 to-teal-400 text-white text-lg font-semibold rounded-2xl overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                تماس با کارشناس
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-10 py-5 border-2 border-emerald-200 text-emerald-700 text-lg font-semibold rounded-2xl hover:bg-emerald-50 transition-colors">
              <span className="flex items-center justify-center gap-3">
                <Calendar className="w-6 h-6" />
                رزرو مشاوره
              </span>
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>مشاوره کاملاً رایگان</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>پاسخگویی ۲۴ ساعته</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>تضمین افزایش عملکرد</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-linear-to-r from-amber-400 to-yellow-300 rounded-full opacity-10 blur-3xl"></div>
    </section>
  );
}