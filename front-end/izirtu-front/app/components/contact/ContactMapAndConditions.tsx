// components/contact/ContactMapAndConditions.tsx
'use client';

import { Truck, Award, MapPin } from 'lucide-react';
import { LeafletMap } from "./LeafletMap";
import { ShippingInfo } from './type/ShippingInfo';
import { ShippingCard } from './ShippingCard/ShippingCard';
import { RequiredDocuments } from './RequiredDocuments/RequiredDocuments';
import { AddressInfo } from './AddressInfo/AddressInfo';

export default function ContactMapAndConditions() {
  const shippingInfo: ShippingInfo[] = [
    {
      icon: '🚚',
      title: 'ارسال رایگان',
      details: 'سفارش‌های بالای ۵ میلیون تومان',
      color: 'from-emerald-500 to-teal-400'
    },
    {
      icon: '⚡',
      title: 'تحویل سریع',
      details: '۲۴ ساعته در تهران',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: '🏙️',
      title: 'شهرستان‌ها',
      details: 'تحویل ۴۸ ساعته',
      color: 'from-purple-500 to-pink-400'
    }
  ];

  const requiredDocuments = [
    'گواهی اصالت کالا',
    'پروانه بهره‌برداری',
    'گواهی استاندارد',
    'مشخصات فنی محصولات',
    'گواهی سلامت',
    'مدارک مالیاتی'
  ];

  return (
    <section className="py-20 bg-linear-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* شرایط */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                شرایط
              </span>
              ویژه
            </h3>
            
            {/* شرایط ارسال */}
            <div className="mb-12">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-emerald-500" />
                شرایط ارسال
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {shippingInfo.map((item, index) => (
                  <ShippingCard key={index} item={item} />
                ))}
              </div>
            </div>
            
            {/* مدارک مورد نیاز */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-500" />
                مدارک مورد نیاز برای همکاری
              </h4>
              <RequiredDocuments documents={requiredDocuments} />
            </div>
          </div>
          
          {/* نقشه */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                موقعیت
              </span>
              ما
            </h3>
            <div className="bg-white rounded-3xl p-6 shadow-xl overflow-hidden">
              <div className="relative h-100 rounded-2xl overflow-hidden bg-linear-to-br from-emerald-400/20 to-teal-300/20">
                <LeafletMap />
              </div>
              <AddressInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}