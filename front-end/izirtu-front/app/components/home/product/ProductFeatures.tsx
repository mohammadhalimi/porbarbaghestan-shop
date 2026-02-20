// app/components/products/ProductFeatures.tsx
'use client';

import { Truck, Shield, Clock, CheckCircle } from 'lucide-react';

export default function ProductFeatures() {
  const features = [
    { icon: Truck, title: 'ارسال سریع', desc: 'به سراسر کشور' },
    { icon: Shield, title: 'تضمین کیفیت', desc: 'اصل بودن کالا' },
    { icon: Clock, title: 'پشتیبانی', desc: '۲۴ ساعته' },
    { icon: CheckCircle, title: 'مشاوره', desc: 'تخصصی و رایگان' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Icon className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="font-medium text-gray-900">{feature.title}</p>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}