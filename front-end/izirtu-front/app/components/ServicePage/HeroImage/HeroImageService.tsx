import { Award, Sprout } from "lucide-react";
import Image from "next/image";
import HeroImageService from '../../../../public/HeroImageService.jpg'

export function HeroImage() {
  return (
    <div className="relative">
      <div className="relative h-125 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-400/20 to-teal-300/20"></div>
        <div className="absolute inset-0 mix-blend-overlay">
          <Image
            src={HeroImageService}
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* عناصر شناور */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl rotate-6">
          <div className="w-12 h-12 bg-linear-to-r from-emerald-400 to-teal-300 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-800">۹۵٪</div>
            <div className="text-xs text-gray-500">رضایت</div>
          </div>
        </div>
        
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-linear-to-br from-amber-400 to-orange-300 rounded-2xl p-4 shadow-2xl -rotate-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div className="text-center text-white">
            <div className="font-bold">۴۰٪ رشد</div>
            <div className="text-xs opacity-90">افزایش عملکرد</div>
          </div>
        </div>
      </div>
      
      {/* کارت اطلاعات */}
      <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl w-64">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">تضمین کیفیت</h3>
            <p className="text-sm text-gray-500">مشاوره کاملاً رایگان</p>
          </div>
        </div>
      </div>
    </div>
  );
}