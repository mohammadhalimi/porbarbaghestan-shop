// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Package, Search, Filter, Droplets,
    Leaf, TrendingUp, Phone, Truck,
    Clock, Shield, Award, CheckCircle,
    Sparkles, FlaskConical, Flower2,
    Sprout, Sun, Wind,
    Users
} from 'lucide-react';
import productService, { Product } from '@/app/services/product.service';

// کامپوننت اسکلتون برای محصولات
function ProductsSkeleton() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* هدر اسکلتون */}
            <div className="bg-linear-to-r from-emerald-600 to-teal-500 py-16">
                <div className="container mx-auto px-4">
                    <div className="w-96 h-12 bg-white/20 rounded-lg animate-pulse mb-4"></div>
                    <div className="w-2/3 h-6 bg-white/20 rounded-lg animate-pulse"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* فیلتر اسکلتون */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8">
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* محصولات اسکلتون */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<'all' | 'solid' | 'liquid'>('all');
    const [selectedBrand, setSelectedBrand] = useState<'all' | 'izirtuland' | 'khakshimi'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const { data } = await productService.getProducts({ limit: 100 });
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    // فیلتر محصولات
    const filteredProducts = products.filter(product => {
        const matchesType = selectedType === 'all' || product.type === selectedType;
        const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
        const matchesSearch = product.name.includes(searchTerm) ||
            product.description.includes(searchTerm);
        return matchesType && matchesBrand && matchesSearch;
    });

    const getProductImage = (product: Product) => {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
        if (!product.images?.length) return null;
        const imagePath = product.images[0];
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('/')) return `${BASE_URL}${imagePath}`;
        return `${BASE_URL}/uploads/products/${imagePath}`;
    };

    const getBrandLabel = (brand: string) => {
        return brand === 'izirtuland' ? 'ایزیرتولند' : 'خاک‌شیمی';
    };

    const getTypeIcon = (type: string) => {
        return type === 'solid' ? <FlaskConical className="w-5 h-5" /> : <Droplets className="w-5 h-5" />;
    };

    const getSizeLabel = (size: string) => {
        const labels: Record<string, string> = {
            '1kg': '۱ کیلوگرمی',
            '10kg': '۱۰ کیلوگرمی',
            '1L': '۱ لیتری',
            '5L': '۵ لیتری',
            '20L': '۲۰ لیتری',
        };
        return labels[size] || size;
    };

    if (loading) {
        return <ProductsSkeleton />;
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* هدر اصلی */}
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
                            {[
                                { icon: Package, value: '۱۰۰+', label: 'محصولات متنوع' },
                                { icon: Award, value: '۱۵+', label: 'گواهی کیفیت' },
                                { icon: Users, value: '۵۰۰۰+', label: 'کشاورزان همراه' },
                                { icon: TrendingUp, value: '۹۸٪', label: 'رضایت مشتریان' },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <stat.icon className="w-6 h-6 text-emerald-200 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-white/80">{stat.label}</div>
                                </div>
                            ))}
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
            {/* بخش نحوه سفارش */}
            <section className="py-16 bg-linear-to-br from-emerald-50 via-white to-teal-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* عنوان */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-4">
                                <Truck className="w-4 h-4" />
                                نحوه سفارش
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                سفارش آسان، دریافت سریع
                            </h2>
                            <p className="text-lg text-gray-600">
                                در کمترین زمان ممکن محصول خود را دریافت کنید
                            </p>
                        </div>

                        {/* مراحل سفارش */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {/* ستون راست - مراحل */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">📋</span>
                                    مراحل سفارش
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { step: 1, title: 'انتخاب محصول', desc: 'محصول مورد نظر خود را از لیست محصولات انتخاب کنید' },
                                        { step: 2, title: 'مشاوره تلفنی', desc: 'با کارشناسان ما تماس بگیرید یا درخواست مشاوره دهید' },
                                        { step: 3, title: 'تایید سفارش', desc: 'پس از مشاوره، سفارش خود را نهایی کنید' },
                                        { step: 4, title: 'ارسال محصول', desc: 'محصول در اسرع وقت برای شما ارسال می‌شود' },
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{item.title}</h4>
                                                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ستون چپ - نحوه ارسال */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">🚚</span>
                                    نحوه ارسال
                                </h3>

                                <div className="space-y-6 mb-8">
                                    <div className="bg-gray-50 rounded-xl p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">ارسال در تهران</h4>
                                                <p className="text-sm text-gray-600">تحویل در کمتر از ۲۴ ساعت</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Truck className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">ارسال به شهرستان</h4>
                                                <p className="text-sm text-gray-600">تحویل در ۴۸ تا ۷۲ ساعت</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* پشتیبانی */}
                                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-emerald-800">پشتیبانی ۲۴ ساعته</h4>
                                            <p className="text-sm text-emerald-600">
                                                همکاران ما ۲۴ ساعته آماده پاسخگویی هستند
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href="tel:09128928769"
                                        className="inline-flex items-center justify-center w-full mt-3 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                                    >
                                        <Phone className="w-4 h-4 ml-2" />
                                        ۰۹۱۲۸۹۲۸۷۶۹
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* متن پایانی */}
                        <div className="text-center">
                            <p className="text-gray-700 font-medium">
                                تمامی محصولات پربار باغستان با بهترین کیفیت و مناسب‌ترین قیمت عرضه می‌شوند
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>تضمین اصالت کالا</span>
                                <span className="mx-2">•</span>
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>مشاوره تخصصی</span>
                                <span className="mx-2">•</span>
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>پشتیبانی دائمی</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* بخش فیلتر و جستجو */}
            <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* جستجو */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="جستجوی محصول..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* فیلتر برند */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedBrand('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedBrand === 'all'
                                        ? 'bg-emerald-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                همه برندها
                            </button>
                            <button
                                onClick={() => setSelectedBrand('izirtuland')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedBrand === 'izirtuland'
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                ایزیرتولند
                            </button>
                            <button
                                onClick={() => setSelectedBrand('khakshimi')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedBrand === 'khakshimi'
                                        ? 'bg-orange-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                خاک‌شیمی
                            </button>
                        </div>

                        {/* فیلتر نوع */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedType === 'all'
                                        ? 'bg-emerald-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                همه
                            </button>
                            <button
                                onClick={() => setSelectedType('solid')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${selectedType === 'solid'
                                        ? 'bg-amber-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <FlaskConical className="w-4 h-4" />
                                جامد
                            </button>
                            <button
                                onClick={() => setSelectedType('liquid')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${selectedType === 'liquid'
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Droplets className="w-4 h-4" />
                                مایع
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* لیست محصولات */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* تعداد محصولات */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-600">
                            <span className="font-bold text-emerald-600">{filteredProducts.length}</span> محصول یافت شد
                        </p>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">محصولی یافت نشد</h3>
                            <p className="text-gray-500">با معیارهای انتخاب شده محصولی وجود ندارد</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <Link
                                    key={product._id}
                                    href={`/products/${product.slug || product._id}`}
                                    className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* تصویر محصول */}
                                    <div className="relative h-48 overflow-hidden bg-linear-to-br from-gray-100 to-gray-50">
                                        {getProductImage(product) ? (
                                            <Image
                                                src={getProductImage(product)!}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package className="w-16 h-16 text-gray-300" />
                                            </div>
                                        )}

                                        {/* برچسب برند */}
                                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${product.brand === 'izirtuland' ? 'bg-blue-500' : 'bg-orange-500'
                                            }`}>
                                            {getBrandLabel(product.brand)}
                                        </div>

                                        {/* برچسب نوع */}
                                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-700 flex items-center gap-1">
                                            {getTypeIcon(product.type)}
                                            <span>{product.type === 'solid' ? 'جامد' : 'مایع'}</span>
                                        </div>
                                    </div>

                                    {/* اطلاعات محصول */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                            {product.name}
                                        </h3>

                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.description}
                                        </p>

                                        {/* سایزها و موجودی */}
                                        <div className="space-y-2 mb-4">
                                            {product.sizes.map((size, index) => (
                                                <div key={index} className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-700">{getSizeLabel(size.size)}</span>
                                                    {size.stock > 0 ? (
                                                        <span className="text-emerald-600 font-medium">{size.stock} عدد</span>
                                                    ) : (
                                                        <span className="text-red-500 text-xs">ناموجود</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* دکمه مشاهده */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="w-full py-2 text-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
                                                مشاهده و استعلام قیمت
                                            </div>
                                        </div>

                                        {/* قیمت (مخفی) */}
                                        <div className="hidden">تماس بگیرید</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}