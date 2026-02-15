// components/contact/ContactFormSection.tsx
'use client';

import { Send, Shield, Award, Leaf } from 'lucide-react';
import { ContactFormSectionProps } from './type/ContactFormSectionProps';
import { FormBenefit } from './FormBenefit/FormBenefit';
import { ContactForm } from './ContactForm/ContactForm';


export default function ContactFormSection({ onFormSubmit }: ContactFormSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFormSubmit) {
      // در اینجا می‌توانید داده‌های فرم را جمع‌آوری کنید
      onFormSubmit({});
    }
  };

  return (
    <section id="form" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* اطلاعات فرم */}
          <div className="relative">
            <div className="sticky top-24">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  پیام
                </span>
                <br />
                به ما
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                فرم زیر را پر کنید تا کارشناسان ما در سریع‌ترین زمان ممکن با شما تماس بگیرند.
                ما متعهدیم در کمتر از ۲ ساعت کاری پاسخ شما را بدهیم.
              </p>
              
              {/* شرایط */}
              <div className="space-y-4 mb-8">
                <FormBenefit
                  icon={Shield}
                  title="پاسخگویی تضمینی"
                  description="در کمتر از ۲ ساعت کاری"
                />
                
                <FormBenefit
                  icon={Award}
                  title="مشاوره رایگان"
                  description="تخصصی و کارشناسی شده"
                />
                
                <FormBenefit
                  icon={Leaf}
                  title="پشتیبانی دائمی"
                  description="پس از فروش و کاشت"
                />
              </div>
              
              {/* وکتور کوچک */}
              <div className="relative h-48 rounded-2xl overflow-hidden bg-linear-to-br from-emerald-400/10 to-teal-300/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">💬</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* فرم */}
          <ContactForm onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
}






// کامپوننت داخلی برای فیلدهای فرم



// کامپوننت داخلی برای دکمه ارسال
