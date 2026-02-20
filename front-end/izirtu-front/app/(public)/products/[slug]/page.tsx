// app/products/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import productService, { Product } from '@/app/services/product.service';
import BlogPostSkeleton from '@/app/components/ui/skeletons/BlogPostSkeleton';
import ProductBreadcrumb from '@/app/components/home/product/ProductBreadcrumb';
import ProductGallery from '@/app/components/home/product/ProductGallery';
import ProductInfo from '@/app/components/home/product/ProductInfo';
import ConsultationSection from '@/app/components/home/product/ConsultationSection';
import { FlaskConical, Droplets } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  const getProductImage = (index: number = 0): string => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
    if (!product?.images?.length) return '/images/placeholder-product.jpg';

    const imagePath = product.images[index] || product.images[0];
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return `${BASE_URL}${imagePath}`;
    return `${BASE_URL}/uploads/products/${imagePath}`;
  };

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

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <ProductBreadcrumb productName={product.name} />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ProductGallery
              product={product}
              getProductImage={getProductImage}
              getBrandLabel={getBrandLabel}
              getBrandColor={getBrandColor}
              getTypeIcon={getTypeIcon}
              getTypeLabel={getTypeLabel}
            />

            <ProductInfo
              product={product}
              getBrandLabel={getBrandLabel}
              getBrandColor={getBrandColor}
              getTypeIcon={getTypeIcon}
              getTypeLabel={getTypeLabel}
              getSizeLabel={getSizeLabel}
              onCopyLink={copyToClipboard}
              copied={copied}
            />
          </div>
        </div>
      </div>

      <ConsultationSection />
    </div>
  );
}