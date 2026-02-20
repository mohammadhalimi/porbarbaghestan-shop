// app/components/products/ProductsHeader.tsx
import { Sparkles, Package, Award, Users, TrendingUp } from 'lucide-react';

export default function ProductsHeader() {
  const stats = [
    { icon: Package, value: '۱۰۰+', label: 'محصولات متنوع' },
    { icon: Award, value: '۱۵+', label: 'گواهی کیفیت' },
    { icon: Users, value: '۵۰۰۰+', label: 'کشاورزان همراه' },
    { icon: TrendingUp, value: '۹۸٪', label: 'رضایت مشتریان' },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-700">
      {/* افکت‌های پس‌زمینه */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* نشانگر */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/20">
            <Sparkles className="w-4 h-4" />
            محصولات تخصصی کشاورزی
          </div>

          {/* عنوان اصلی */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            محصولات <span className="text-emerald-200">کشاورزی</span>
            <br />
            با کیفیت تضمینی
          </h1>

          {/* توضیحات */}
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            با کیفیت‌ترین محصولات کود و سموم کشاورزی با استانداردهای بین‌المللی،
            مناسب برای انواع محصولات زراعی و باغی
          </p>

          {/* آمار */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-6 h-6 text-emerald-200 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* موج پایین */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1" />
          <path d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 82.5C840 90 960 105 1080 112.5C1200 120 1320 120 1380 120L1440 120V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.2" />
        </svg>
      </div>
    </section>
  );
}