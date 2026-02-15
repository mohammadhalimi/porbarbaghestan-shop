
import { Shield, Sprout, Leaf, Droplets, Sun, Award, ArrowLeft, LucideIcon } from 'lucide-react';
import ServiceCard from '../service/ServiceCard';
import { ServiceItem } from '../service/type/ServiceItem';


export default function ServiceTop() {
    const services: ServiceItem[] = [
        {
            id: 1,
            Icon: Shield,
            title: 'مشاوره تخصصی خاک',
            description: 'تشخیص دقیق کمبودهای خاک و ارائه راهکارهای هدفمند',
            gradient: 'from-emerald-500 to-teal-400',
        },
        {
            id: 2,
            Icon: Sprout,
            title: 'برنامه کوددهی هوشمند',
            description: 'برنامه‌ریزی فصلی متناسب با نوع محصول و منطقه',
            gradient: 'from-blue-500 to-cyan-400',
        },
        {
            id: 3,
            Icon: Leaf,
            title: 'مشاوره ارگانیک',
            description: 'کامل‌ترین راهنمایی برای کشاورزی پایدار و سالم',
            gradient: 'from-amber-500 to-yellow-400',
        },
        {
            id: 4,
            Icon: Droplets,
            title: 'مدیریت آبیاری',
            description: 'بهینه‌سازی مصرف آب همراه با کوددهی',
            gradient: 'from-purple-500 to-pink-400',
        },
        {
            id: 5,
            Icon: Sun,
            title: 'مقاوم‌سازی محصول',
            description: 'افزایش مقاومت گیاهان در برابر تنش‌های محیطی',
            gradient: 'from-orange-500 to-red-400',
        },
        {
            id: 6,
            Icon: Award,
            title: 'گواهی کیفیت',
            description: 'صدور گواهی استاندارد برای محصولات کشاورزی',
            gradient: 'from-indigo-500 to-purple-400',
        }
    ];
    return (
        <section className="py-20 bg-linear-to-b from-white to-emerald-50/30">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            خدمات منحصربفرد
                        </span>
                        <br />
                        ما برای موفقیت شما
                    </h2>
                    <p className="text-gray-600 text-lg">
                        از تشخیص نیازهای خاک تا برنامه‌ریزی دقیق کوددهی، همراه شما هستیم
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id} // استفاده از id به جای index
                            Icon={service.Icon}
                            title={service.title}
                            description={service.description}
                            gradient={service.gradient}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}