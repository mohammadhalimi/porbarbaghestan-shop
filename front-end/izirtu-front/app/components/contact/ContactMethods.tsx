// components/contact/ContactMethods.tsx
'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactMethod } from './type/ContactMethod';

export default function ContactMethods() {
  const contactMethods: ContactMethod[] = [
    {
      icon: Phone,
      title: 'تلفن تماس',
      details: ['021-33370954'],
      description: 'پاسخگویی ۲۴ ساعته',
      gradient: 'bg-linear-to-r from-blue-500 to-cyan-400'
    },
    {
      icon: Phone,
      title: 'موبایل',
      details: ['09128928769', '09107838556'],
      description: 'پاسخگویی ۲۴ ساعته',
      gradient: 'bg-linear-to-r from-emerald-500 to-teal-400'
    },
    {
      icon: Mail,
      title: 'ایمیل',
      details: ['jamal.sufiyan90@gmail.com'],
      description: 'پاسخ در کمتر از ۲۴ ساعت',
      gradient: 'bg-linear-to-r from-amber-500 to-yellow-400'
    },
    {
      icon: MapPin,
      title: 'آدرس',
      details: ['تهران، خیابان شهید بهشتی ، خیابان اندیشه اصلی ، بین اندیشه ۱و۲ ، پلاک ۵۲ ، واحد ۲ '],
      description: 'دفتر مرکزی',
      gradient: 'bg-linear-to-r from-purple-500 to-pink-400'
    },
    {
      icon: Clock,
      title: 'ساعات کاری',
      details: ['شنبه تا چهارشنبه: ۸:۰۰ - ۱۷:۰۰', 'پنجشنبه: ۸:۰۰ - ۱۴:۰۰'],
      description: 'جمعه‌ها تعطیل',
      gradient: 'bg-linear-to-r from-orange-500 to-red-400'
    }
  ];

  return (
    <section className="py-20 bg-linear-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              روش‌های ارتباطی
            </span>
            متنوع
          </h2>
          <p className="text-gray-600 text-lg">
            از طریق راه‌های مختلف با ما در ارتباط باشید
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className={`absolute top-0 left-0 right-0 h-1 ${method.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl`}></div>
              
              <div className={`w-14 h-14 ${method.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="font-bold text-gray-900 mb-3 text-sm">{method.title}</h3>
              
              <div className="space-y-1 mb-3">
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-xs">{detail}</p>
                ))}
              </div>
              
              <p className="text-emerald-600 text-xs font-semibold">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}