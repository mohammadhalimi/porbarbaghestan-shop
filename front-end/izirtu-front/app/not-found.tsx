// app/not-found.tsx
'use client';

import { Home, ArrowLeft, Search, Mail, Phone, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    { href: '/', label: 'صفحه اصلی', icon: Home },
    { href: '/services', label: 'خدمات ما', icon: Leaf },
    { href: '/product', label: 'محصولات', icon: Search },
    { href: '/contact', label: 'تماس با ما', icon: Phone },
  ];

  const errorMessages = [
    'صفحه مورد نظر یافت نشد!',
    'آدرس وارد شده معتبر نمی‌باشد.',
    'محتوای مورد نظر حذف یا منتقل شده است.',
    'خطای ۴۰۴ - صفحه پیدا نشد.'
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % errorMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [errorMessages.length]);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* افکت‌های پس‌زمینه */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1), transparent 80%)`,
        }}
      />
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl" />

      {/* محتوای اصلی */}
      <div className="relative container mx-auto px-4 lg:px-8 min-h-screen flex flex-col">
        {/* هدر */}
        <header className="pt-8 pb-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <div className="w-10 h-10 bg-linear-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">پربار باغستان</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              خطای ۴۰۴
            </div>
          </div>
        </header>

        {/* محتوای مرکزی */}
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* عدد ۴۰۴ */}
            <div className="relative mb-8">
              <div className="text-[180px] md:text-[240px] font-bold text-gray-900/10 select-none">
                ۴۰۴
              </div>
              
              {/* آیکون گم شده */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-linear-to-br from-emerald-400/20 to-teal-300/20 rounded-3xl flex items-center justify-center rotate-45">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center -rotate-45">
                      <Search className="w-12 h-12 text-emerald-500 opacity-60" />
                    </div>
                  </div>
                  
                  {/* افکت‌های دایره‌ای */}
                  <div className="absolute -top-4 -left-4 w-40 h-40 border-2 border-emerald-200/30 rounded-full animate-ping" />
                  <div className="absolute -top-8 -left-8 w-48 h-48 border-2 border-emerald-200/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

            {/* پیام خطا */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  {errorMessages[currentMessage]}
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا آدرس آن تغییر کرده است.
                می‌توانید از طریق لینک‌های زیر به بخش‌های مختلف سایت دسترسی پیدا کنید.
              </p>
            </div>

            {/* لینک‌های سریع */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 to-teal-400/0 group-hover:from-emerald-500/5 group-hover:to-teal-400/5 rounded-2xl transition-all duration-300" />
                    
                    <div className="relative">
                      <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/"
                className="group relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-semibold overflow-hidden hover:shadow-lg hover:shadow-emerald-200 transition-all"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  بازگشت به صفحه اصلی
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  بازگشت به صفحه قبل
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}