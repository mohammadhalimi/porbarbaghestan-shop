import { Leaf, Award, Calendar, Users, MapPin, Phone, Mail, CheckCircle, Sprout, Shield, Droplets } from 'lucide-react';
import Image from 'next/image';
import logoC from '../../../public/porbar.webp';

export default function AboutPage() {
    const stats = [
        { number: '۱۸+', label: 'سال تجربه', icon: Award },
        { number: '۵۰۰+', label: 'محصول تخصصی', icon: Leaf },
        { number: '۱۰,۰۰۰+', label: 'کشاورز راضی', icon: Users },
        { number: '۳۱', label: 'استان تحت پوشش', icon: MapPin }
    ];

    const certifications = [
        { name: 'ISO 9001', description: 'سیستم مدیریت کیفیت', icon: Award },
        { name: 'ISO 14001', description: 'سیستم مدیریت محیط زیست', icon: Leaf },
        { name: 'گواهی سلامت', description: 'سازمان غذا و دارو', icon: Shield },
        { name: 'استاندارد ملی', description: 'ایران', icon: Award },
    ];

    const facilities = [
        { 
            title: 'سه واحد تولیدی', 
            description: 'مجهز به مدرن‌ترین خطوط تولید کودهای گرانوله، مایع و پودری',
            icon: '🏭',
            gradient: 'from-emerald-500 to-teal-400'
        },
        { 
            title: 'آزمایشگاه مجهز', 
            description: 'آزمایشگاه کنترل کیفی پیشرفته برای آنالیز خاک و گیاه',
            icon: '🔬',
            gradient: 'from-blue-500 to-cyan-400'
        },
        { 
            title: 'مزارع پایلوت', 
            description: 'مزارع تحقیقاتی برای تست محصولات در شرایط واقعی',
            icon: '🌾',
            gradient: 'from-amber-500 to-yellow-400'
        },
        { 
            title: 'تیم تحقیق و توسعه', 
            description: 'تیم متخصص برای توسعه محصولات جدید',
            icon: '🧪',
            gradient: 'from-purple-500 to-pink-400'
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-white via-emerald-50/30 to-white">
            {/* هیرو */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                درباره شرکت ما
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                    پربار باغستان
                                </span>
                                <br />
                                پیشرو در تولید
                                <br />
                                کودهای کشاورزی
                            </h1>
                            
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                با بیش از ۱۸ سال تجربه در تولید کودهای کشاورزی با کیفیت جهانی، 
                                همراه شما در مسیر کشاورزی پایدار و برداشت‌های پربار هستیم.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href='/Products'
                                    className="group relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-semibold overflow-hidden text-center"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <Leaf className="w-5 h-5" />
                                        مشاهده محصولات
                                    </span>
                                    <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                                
                                <a 
                                    href='/Contact'
                                    className="px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors text-center"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        تماس با ما
                                    </span>
                                </a>
                            </div>
                            
                            {/* آمار */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                            <stat.icon className="w-5 h-5 text-emerald-500" />
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* تصویر */}
                        <div className="relative">
                            <div className="relative h-125 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-linear-to-br from-emerald-400/20 to-teal-300/20"></div>
                                <Image
                                    src={logoC}
                                    alt="پربار باغستان"
                                    fill
                                    priority
                                    quality={90}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                
                                {/* عناصر شناور */}
                                <div className="absolute top-10 left-10 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl rotate-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-emerald-400 to-teal-300 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Leaf className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-800">۱۸ سال</div>
                                        <div className="text-xs text-gray-500">تجربه</div>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-10 right-10 w-28 h-28 bg-linear-to-br from-amber-400 to-orange-300 rounded-2xl p-4 shadow-2xl -rotate-6">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-center text-white">
                                        <div className="font-bold">استاندارد</div>
                                        <div className="text-xs opacity-90">ISO Certified</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* کارت اطلاعات */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl w-64">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">کیفیت تضمینی</h3>
                                        <p className="text-sm text-gray-500">با گواهی‌های بین‌المللی</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white via-white to-transparent"></div>
            </section>

            {/* تاریخچه و ماموریت */}
            <section className="py-20 bg-linear-to-b from-white to-emerald-50/30">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                تاریخچه و ماموریت
                            </span>
                            ما
                        </h2>
                        <p className="text-gray-600 text-lg">
                            از سال ۱۳۸۵ تاکنون، در مسیر تولید کودهای با کیفیت
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl"></div>
                            
                            <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">تاریخچه شرکت</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                شرکت تولیدی پربار باغستان در سال ۱۳۸۵ با تولید کودهای گرانوله شیمیایی و ارگانیک فعالیت خود را آغاز نمود. 
                                با توجه به رضایت مشتریان و نیاز بازار کشاورزی ایران، با استفاده از تکنولوژی روز دنیا، 
                                کودهای گرانوله آلی مایع و پودری و همچنین اسید فسفریک به سبد کالایی شرکت اضافه گردید.
                            </p>
                            
                            <div className="flex items-center gap-3 text-emerald-600 font-semibold">
                                <CheckCircle className="w-5 h-5" />
                                <span>پیشرو در تکنولوژی کودهای کشاورزی</span>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl"></div>
                                
                                <div className="w-16 h-16 bg-linear-to-r from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                                    <Sprout className="w-8 h-8 text-white" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 ماموریت ما</h3>
                                <p className="text-gray-600">
                                    تولید محصولات مطابق با استانداردهای جهانی جهت نیل به محصولات سالم و با کیفیت کشاورزی 
                                    در راستای حفاظت خاک، محیط زیست و سلامت انسان
                                </p>
                            </div>
                            
                            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl"></div>
                                
                                <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-3">👁️ چشم‌انداز</h3>
                                <p className="text-gray-600">
                                    تبدیل شدن به برترین تولیدکننده کودهای کشاورزی در خاورمیانه و حضور فعال در بازارهای جهانی 
                                    با تکیه بر نوآوری و کیفیت
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* امکانات و تجهیزات */}
            <section className="py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                امکانات و تجهیزات
                            </span>
                            پیشرفته
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            مجهز به مدرن‌ترین تجهیزات تولید و کنترل کیفیت
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {facilities.map((facility, index) => (
                            <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${facility.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl`}></div>
                                
                                <div className="text-4xl mb-4">{facility.icon}</div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                                <p className="text-gray-600 text-sm">{facility.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* گواهی‌ها */}
            <section className="py-20 bg-linear-to-b from-white to-emerald-50/30">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                گواهی‌ها و استانداردها
                            </span>
                            بین‌المللی
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            تضمین کیفیت با استانداردهای جهانی
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications.map((cert, index) => (
                            <div key={index} className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mb-4">
                                    <cert.icon className="w-6 h-6 text-white" />
                                </div>
                                
                                <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                                <p className="text-gray-600 text-sm">{cert.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-teal-400/5 to-transparent"></div>
                
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                            آماده
                            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> همکاری</span>
                            با پربار باغستان هستید؟
                        </h2>
                        
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                            برای دریافت مشاوره رایگان و اطلاعات بیشتر درباره محصولات با ما تماس بگیرید
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href='/Contact'
                                className="group relative px-10 py-5 bg-linear-to-r from-emerald-500 to-teal-400 text-white text-lg font-semibold rounded-2xl overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <Phone className="w-6 h-6" />
                                    تماس با کارشناس
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                            
                            <a 
                                href='/Products'
                                className="px-10 py-5 border-2 border-emerald-200 text-emerald-700 text-lg font-semibold rounded-2xl hover:bg-emerald-50 transition-colors"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <Droplets className="w-6 h-6" />
                                    مشاهده محصولات
                                </span>
                            </a>
                        </div>
                        
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="flex items-center justify-center gap-3 text-gray-600">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span>مشاوره کاملاً رایگان</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 text-gray-600">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span>پاسخگویی ۲۴ ساعته</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 text-gray-600">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span>تضمین کیفیت محصولات</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute top-10 left-10 w-32 h-32 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-linear-to-r from-amber-400 to-yellow-300 rounded-full opacity-10 blur-3xl"></div>
            </section>
        </div>
    );
}