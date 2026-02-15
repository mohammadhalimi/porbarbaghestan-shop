// components/HeroSection.tsx
import { Award, Sprout, Users, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { StatItem } from './type/StatItem';
import { HeroSectionProps } from './type/HeroSectionProps';
import { HeroImage } from './HeroImage/HeroImageService';

export default function HeroSection({ onScrollToServices }: HeroSectionProps) {
    const stats: StatItem[] = [
        { value: '۹۵٪', label: 'رضایت مشتریان', icon: Award },
        { value: '۴۰٪', label: 'افزایش عملکرد', icon: Sprout },
        { value: '۲۴/۷', label: 'پشتیبانی', icon: Clock },
        { value: '۱۰۰۰+', label: 'پرونده موفق', icon: Users }
    ];

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            خدمات تخصصی ما
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                خدمات
                            </span>
                            <br />
                            کاملاً تخصصی
                            <br />
                            برای موفقیت شما
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            با دانش تخصصی و راهکارهای نوین، همراه شما در مسیر کشاورزی پایدار و اقتصادی هستیم.
                            هر خدمت به صورت کاملاً سفارشی و متناسب با نیاز شما طراحی می‌شود.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-semibold overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    رزرو مشاوره رایگان
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={onScrollToServices}
                                className="px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors text-center"
                            >
                                <span className="flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    مشاهده خدمات
                                </span>
                            </button>
                        </div>

                        {/* آمار */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                        <stat.icon className="w-5 h-5 text-emerald-500" />
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <HeroImage />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white via-white to-transparent"></div>
        </section>
    );
}

