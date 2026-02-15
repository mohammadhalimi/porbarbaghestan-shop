'use client'

import { ArrowLeft, Calendar } from "lucide-react";
import { StatItem } from "./type/StatItem";
import { useState } from "react";

export default function HeroContent() {
    const [stats] = useState<StatItem[]>([
        { value: '۵۰۰+', label: 'مشاوره موفق' },
        { value: '۹۵٪', label: 'رضایت مشتریان' },
        { value: '۲۴/۷', label: 'پشتیبانی' },
        { value: '۵۰+', label: 'کارشناس متخصص' }
    ]);
    return (
        <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                پیشرو در مشاوره کودهای کشاورزی
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    حاصلخیزی
                </span>
                <br />
                مزرعه‌تان را
                <br />
                متحول کنید
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                با دانش تخصصی و راهکارهای نوین کوددهی، بهره‌وری زمین کشاورزی خود را تا ۶۰٪ افزایش دهید.
                ما فروشنده نیستیم، ما متخصص مشاوره هستیم.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-semibold overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        رزرو مشاوره تخصصی
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors">
                    <span className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <ArrowLeft className="w-4 h-4" />
                        </span>
                        مشاهده خدمات
                    </span>
                </button>
            </div>

            {/* آمار */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {stats.map((stat: StatItem, index: number) => (
                    <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}