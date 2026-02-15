'use client';

import { useState, useEffect } from 'react';
import { Testimonial } from './type/Testimonial';
import TestimonialCard from './TestimonialCard';
import SliderControls from './SliderControls';

export default function TestimonialsTop() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      name: 'محمد کریمی',
      role: 'باغدار مرکبات',
      content: 'با راهنمایی کارشناسان کودکار، عملکرد باغم ۴۰٪ افزایش یافت.',
      avatar: 'MK'
    },
    {
      name: 'فاطمه احمدی',
      role: 'کشاورز گندم',
      content: 'برنامه کوددهی اختصاصی واقعاً تحول‌آفرین بود.',
      avatar: 'FA'
    },
    {
      name: 'علی نظری',
      role: 'تولیدکننده سبزیجات',
      content: 'مشاوره رایگان اولیه مسیر کارم رو کاملاً تغییر داد.',
      avatar: 'AN'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-linear-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            آنچه
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> کشاورزان می‌گویند</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            صدها کشاورز موفق به خانواده کودکار پیوسته‌اند
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl min-h-75">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ease-in-out ${currentSlide === index ? 'opacity-100 block' : 'opacity-0 hidden'
                  }`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={currentSlide === index}
                />
              </div>
            ))}
          </div>

          <SliderControls
            currentSlide={currentSlide}
            totalSlides={testimonials.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onSlideTo={setCurrentSlide}
          />
        </div>
      </div>
    </section>
  );
}