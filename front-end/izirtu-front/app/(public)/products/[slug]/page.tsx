'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Package, Phone, Truck,
    Clock, Shield, CheckCircle, Droplets,
    FlaskConical, ChevronLeft, Copy, Check,
    MessageCircle, Info,
} from 'lucide-react';
import productService, { Product } from '@/app/services/product.service';
import BlogPostSkeleton from '@/app/components/ui/skeletons/BlogPostSkeleton';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadProduct();
    }, [slug]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const data = await productService.getProduct(slug);
            setProduct(data);
        } catch (error: any) {
            setError(error.message || 'خطا در بارگذاری محصول');
            console.error('Error loading product:', error);
        } finally {
            setLoading(false);
        }
    };

    // اول تابع getProductImage رو اصلاح کن
    const getProductImage = (index: number = 0): string => {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
        if (!product?.images?.length) return '/images/placeholder-product.jpg';

        const imagePath = product.images[index] || product.images[0];
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('/')) return `${BASE_URL}${imagePath}`;
        return `${BASE_URL}/uploads/products/${imagePath}`;
    };

    // بعد array رو بساز

    const getBrandLabel = (brand: string) => {
        return brand === 'izirtuland' ? 'ایزیرتولند' : 'خاک‌شیمی';
    };

    const getBrandColor = (brand: string) => {
        return brand === 'izirtuland' ? 'bg-blue-500' : 'bg-orange-500';
    };

    const getTypeLabel = (type: string) => {
        return type === 'solid' ? 'جامد' : 'مایع';
    };

    const getTypeIcon = (type: string) => {
        return type === 'solid' ? <FlaskConical className="w-5 h-5" /> : <Droplets className="w-5 h-5" />;
    };

    const getSizeLabel = (size: string) => {
        const labels: Record<string, string> = {
            '1kg': '۱ کیلوگرم',
            '10kg': '۱۰ کیلوگرم',
            '1L': '۱ لیتر',
            '5L': '۵ لیتر',
            '20L': '۲۰ لیتر',
        };
        return labels[size] || size;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return <BlogPostSkeleton />;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-xl mb-4">{error || 'محصول یافت نشد'}</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        بازگشت به محصولات
                    </button>
                </div>
            </div>
        );
    }

    const coverImage = getProductImage(selectedImage);
    const allImages = product.images?.map((_, i) => getProductImage(i)) || [];

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* مسیریابی (Breadcrumb) */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">
                            خانه
                        </Link>
                        <ChevronLeft className="w-4 h-4" />
                        <Link href="/products" className="hover:text-emerald-600 transition-colors">
                            محصولات
                        </Link>
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* محتوای اصلی محصول */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* گالری تصاویر - سمت راست */}
                        <div className="lg:col-span-5">
                            <div className="flex flex-col-reverse lg:flex-row gap-4">
                                {/* تصاویر کوچک (thumbnail) */}
                                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                                    {allImages.filter(img => img !== '/images/placeholder-product.jpg').map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`w-20 h-20 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${selectedImage === index
                                                ? 'border-emerald-500 shadow-md'
                                                : 'border-gray-200 hover:border-emerald-300'
                                                }`}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={img}
                                                    alt={`${product.name} - ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* تصویر اصلی */}
                                <div className="flex-1">
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                        {coverImage ? (
                                            <Image
                                                src={coverImage}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                priority
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/images/placeholder-product.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <Package className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}

                                        {/* برچسب برند روی تصویر */}
                                        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white ${getBrandColor(product.brand)}`}>
                                            {getBrandLabel(product.brand)}
                                        </div>

                                        {/* برچسب نوع */}
                                        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-700 flex items-center gap-1">
                                            {getTypeIcon(product.type)}
                                            {getTypeLabel(product.type)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* اطلاعات محصول - سمت چپ */}
                        <div className="lg:col-span-7">
                            {/* عنوان و برند */}
                            <div className="mb-4">
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getBrandColor(product.brand)}`}>
                                        {getBrandLabel(product.brand)}
                                    </span>

                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Package className="w-4 h-4" />
                                        <span>کد محصول: {product._id.slice(-6)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* توضیحات کوتاه */}
                            <p className="text-gray-600 text-base leading-relaxed mb-6 border-b border-gray-100 pb-6">
                                {product.description}
                            </p>

                            {/* سایزها و موجودی */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">سایزها و موجودی</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {product.sizes.map((size, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-xl border-2 transition-all ${size.stock > 0
                                                ? 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400'
                                                : 'border-gray-200 bg-gray-50 opacity-60'
                                                }`}
                                        >
                                            <div className="text-center">
                                                <div className="font-bold text-gray-900 mb-2">
                                                    {getSizeLabel(size.size)}
                                                </div>
                                                {size.stock > 0 ? (
                                                    <>
                                                        <div className="text-emerald-600 font-semibold text-sm mb-1">
                                                            {size.stock} عدد
                                                        </div>
                                                        <div className="text-xs text-emerald-500">موجود</div>
                                                    </>
                                                ) : (
                                                    <div className="text-red-500 text-sm">ناموجود</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* دکمه‌های اقدام */}
                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Info className="w-5 h-5 text-emerald-500" />
                                        <span className="text-sm text-gray-700">برای استعلام قیمت و سفارش:</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href="tel:09107838556"
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                                    >
                                        <Phone className="w-5 h-5" />
                                        تماس با فروشنده
                                    </a>

                                    <a
                                        href="https://wa.me/989107838556?text=سلام،%20درباره%20محصول%20${product.name}%20سوال%20دارم"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        واتساپ
                                    </a>
                                </div>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    پاسخگویی ۲۴ ساعته، ۷ روز هفته
                                </p>
                            </div>

                            {/* ویژگی‌ها */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <Truck className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">ارسال سریع</p>
                                        <p className="text-xs text-gray-500">به سراسر کشور</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <Shield className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">تضمین کیفیت</p>
                                        <p className="text-xs text-gray-500">اصل بودن کالا</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <Clock className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">پشتیبانی</p>
                                        <p className="text-xs text-gray-500">۲۴ ساعته</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">مشاوره</p>
                                        <p className="text-xs text-gray-500">تخصصی و رایگان</p>
                                    </div>
                                </div>
                            </div>

                            {/* اشتراک‌گذاری */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">اشتراک‌گذاری:</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                                        title="کپی لینک"
                                    >
                                        {copied ? (
                                            <Check className="w-5 h-5 text-emerald-500" />
                                        ) : (
                                            <Copy className="w-5 h-5 text-gray-600" />
                                        )}
                                    </button>
                                    <a
                                        href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <span className="text-xl">📱</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* بخش مشاوره */}
            <section className="py-12 bg-linear-to-r from-emerald-50 to-teal-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            نیاز به مشاوره دارید؟
                        </h2>
                        <p className="text-gray-600 mb-6">
                            کارشناسان ما آماده پاسخگویی به سوالات شما هستند
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:09128928769"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                تماس با کارشناس
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-200 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                            >
                                فرم مشاوره
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}