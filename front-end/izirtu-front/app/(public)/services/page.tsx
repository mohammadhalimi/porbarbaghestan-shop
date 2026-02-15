// app/services/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { Shield, Sprout, Leaf, Droplets, Sun, Award } from 'lucide-react';
import HeroSection from '../../components/ServicePage/HeroSection';
import ServicesSection from '../../components/ServicePage/ServicesSection';
import FAQSection from '../../components/ServicePage/FAQSection';
import CTASection from '../../components/ServicePage/CTASection';
import { ServiceItem } from '../../components/ServicePage/type/ServiceItem';
import { FAQItems } from '../../components/ServicePage/type/FAQItem';
export default function ServicesPage() {
  const [activeService, setActiveService] = useState<number>(1);

  // data/services.ts
   const services: ServiceItem[] = [
    {
      id: 1,
      Icon: Shield,
      title: 'مشاوره تخصصی خاک',
      description: 'تشخیص دقیق کمبودهای خاک و ارائه راهکارهای هدفمند',
      gradient: 'from-emerald-500 to-teal-400',
      details: [
        'آنالیز کامل خاک و آب',
        'تشخیص کمبود عناصر غذایی',
        'بررسی pH و شوری خاک',
        'توصیه اصلاحات خاک'
      ],
      features: ['دقت ۹۵٪', 'گزارش کامل', 'راهکار عملی'],
      imageUrl: '/soil-analysis.webp',
      imageAlt: 'آزمایش خاک و کود'
    },
    {
      id: 2,
      Icon: Sprout,
      title: 'برنامه کوددهی هوشمند',
      description: 'برنامه‌ریزی فصلی متناسب با نوع محصول و منطقه',
      gradient: 'from-blue-500 to-cyan-400',
      details: [
        'برنامه‌ریزی فصلی کوددهی',
        'متناسب با نوع محصول',
        'بر اساس شرایط منطقه',
        'تغییرات آب و هوایی'
      ],
      features: ['کاملاً سفارشی', 'منعطف', 'قابل پیگیری'],
      imageUrl: '/Smart-fertilization-program.jpg',
      imageAlt: 'برنامه کوددهی هوشمند'
    },
    {
      id: 3,
      Icon: Leaf,
      title: 'مشاوره ارگانیک',
      description: 'کامل‌ترین راهنمایی برای کشاورزی پایدار و سالم',
      gradient: 'from-amber-500 to-yellow-400',
      details: [
        'راهکارهای کشاورزی ارگانیک',
        'کودهای طبیعی و بیولوژیک',
        'کنترل آفات ارگانیک',
        'گواهی محصول سالم'
      ],
      features: ['طبیعی و سالم', 'پایدار', 'دوستدار محیط زیست'],
      imageUrl: '/Organic-consulting.webp',
      imageAlt: 'کشاورزی ارگانیک'
    },
    {
      id: 4,
      Icon: Droplets,
      title: 'مدیریت آبیاری',
      description: 'بهینه‌سازی مصرف آب همراه با کوددهی',
      gradient: 'from-purple-500 to-pink-400',
      details: [
        'طراحی سیستم آبیاری',
        'محاسبه نیاز آبی',
        'بهینه‌سازی مصرف',
        'کوددهی همراه آبیاری'
      ],
      features: ['صرفه‌جویی ۴۰٪', 'کارآمد', 'هوشمند'],
      imageUrl: '/Irrigation-management.png',
      imageAlt: 'سیستم آبیاری هوشمند'
    },
    {
      id: 5,
      Icon: Sun,
      title: 'مقاوم‌سازی محصول',
      description: 'افزایش مقاومت گیاهان در برابر تنش‌های محیطی',
      gradient: 'from-orange-500 to-red-400',
      details: [
        'مقاومت به خشکی',
        'تحمل شوری',
        'مقاومت به سرما',
        'ایمنی در برابر آفات'
      ],
      features: ['مقاوم‌سازی', 'پیشگیری', 'محصول باکیفیت'],
      imageUrl: '/Strengthening-agricultural-products.jpg',
      imageAlt: 'محصول مقاوم'
    },
    {
      id: 6,
      Icon: Award,
      title: 'گواهی کیفیت',
      description: 'صدور گواهی استاندارد برای محصولات کشاورزی',
      gradient: 'from-indigo-500 to-purple-400',
      details: [
        'گواهی استاندارد ملی',
        'گواهی سلامت',
        'گواهی ارگانیک',
        'گواهی صادراتی'
      ],
      features: ['معتبر', 'بین‌المللی', 'قابل استناد'],
      imageUrl: '/Agricultural-quality-certificate.webp',
      imageAlt: 'گواهی کیفیت محصولات'
    }
  ];

  const faqs: FAQItems[] = [
    {
      question: 'مشاوره تخصصی چگونه انجام می‌شود؟',
      answer: 'کارشناسان ما پس از بررسی نمونه خاک و اطلاعات مزرعه شما، برنامه کاملی شامل آنالیز خاک، برنامه کوددهی و راهکارهای اصلاحی ارائه می‌دهند.'
    },
    {
      question: 'آیا مشاوره اولیه رایگان است؟',
      answer: 'بله، اولین جلسه مشاوره کاملاً رایگان است و در آن نیازهای اولیه شما بررسی و راهنمایی کلی ارائه می‌شود.'
    },
    {
      question: 'چه مدت طول می‌کشد تا نتایج مشاوره را ببینم؟',
      answer: 'نتایج اولیه معمولاً در یک فصل کشاورزی قابل مشاهده است و بهبود کامل در طول یک سال زراعی محسوس خواهد بود.'
    },
    {
      question: 'آیا برای محصولات خاص هم مشاوره دارید؟',
      answer: 'بله، ما برای تمامی محصولات کشاورزی شامل غلات، صیفی‌جات، باغات میوه، گلخانه‌ها و گیاهان زینتی مشاوره تخصصی ارائه می‌دهیم.'
    }
  ];

  const handleScrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-emerald-50/30 to-white">
      <HeroSection onScrollToServices={handleScrollToServices} />
      <ServicesSection
        services={services}
        activeService={activeService}
        onServiceChange={setActiveService}
      />
      <FAQSection faqs={faqs} />
      <CTASection />
    </div>
  );
}