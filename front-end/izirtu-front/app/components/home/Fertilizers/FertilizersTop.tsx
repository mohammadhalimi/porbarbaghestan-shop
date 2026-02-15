'use client';

import { useState } from 'react';
import imp1 from '../../../../public/compost.webp';
import imp2 from '../../../../public/organicPhosphate.jpg';
import imp3 from '../../../../public/granule-fertilizer.jpg';
import imp4 from '../../../../public/red-potash-pile-small-jereeb.jpg';
import FertilizerContent from './FertilizerContent';
import { Fertilizer } from './type/Fertilizer';
import { TabButtonProps } from './type/TabButtonProps';




export default function FertilizersTop() {
  const [activeTab, setActiveTab] = useState<string>('organic');

  const fertilizers: Fertilizer[] = [
    {
      id: 'organic',
      title: 'کودهای ارگانیک',
      description: 'مناسب برای کشاورزی پایدار و محصولات سالم',
      features: ['100% طبیعی', 'حفظ محیط زیست', 'بهبود ساختار خاک'],
      color: 'from-emerald-500 to-green-400',
      image: imp1 // کود ارگانیک
    },
    {
      id: 'nitrogen',
      title: 'کودهای نیتروژنه',
      description: 'افزایش رشد رویشی و شادابی گیاهان',
      features: ['سرعت جذب بالا', 'قابل استفاده در آبیاری', 'تاثیر سریع'],
      color: 'from-blue-500 to-cyan-400',
      image: imp3 // کود گرانوله (برای نیتروژن)
    },
    {
      id: 'phosphate',
      title: 'کودهای فسفاته',
      description: 'تقویت ریشه و افزایش گلدهی',
      features: ['افزایش مقاومت ریشه', 'بهبود کیفیت میوه', 'مقاومت در سرما'],
      color: 'from-purple-500 to-pink-400',
      image: imp2 // کود فسفاته آلی
    },
    {
      id: 'potassium',
      title: 'کودهای پتاسیمی',
      description: 'افزایش مقاومت به خشکی و آفات',
      features: ['افزایش کیفیت محصول', 'مقاومت به تنش‌ها', 'عمر انباری بیشتر'],
      color: 'from-amber-500 to-yellow-400',
      image: imp4 // پتاسیم
    }
  ];

  const activeFertilizer = fertilizers.find(f => f.id === activeTab);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            دسته‌بندی
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> کودهای تخصصی</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            هر نوع کود، کاربرد خاص خود را دارد. کارشناسان ما به شما کمک می‌کنند بهترین انتخاب را داشته باشید.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {fertilizers.map((fert) => (
              <TabButton
                key={fert.id}
                fertilizer={fert}
                isActive={activeTab === fert.id}
                onClick={() => setActiveTab(fert.id)}
              />
            ))}
          </div>

          <FertilizerContent fertilizer={activeFertilizer} />
        </div>
      </div>
    </section>
  );
}

function TabButton({ fertilizer, isActive, onClick }: TabButtonProps) {
  const handleClick = () => {
    onClick(fertilizer.id);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${isActive
          ? 'bg-linear-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
      {fertilizer.title}
    </button>
  );
}

