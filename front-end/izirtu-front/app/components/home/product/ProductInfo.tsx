// app/components/products/ProductInfo.tsx
'use client';

import { Package, Info, Phone, MessageCircle, Truck, Shield, Clock, CheckCircle, Copy, Check } from 'lucide-react';
import { Product } from '@/app/services/product.service';
import ProductSizes from './ProductSizes';
import ProductActions from './ProductActions';
import ProductFeatures from './ProductFeatures';
import ProductShare from './ProductShare';
import { JSX } from 'react';

interface ProductInfoProps {
  product: Product;
  getBrandLabel: (brand: string) => string;
  getBrandColor: (brand: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
  getTypeLabel: (type: string) => string;
  getSizeLabel: (size: string) => string;
  onCopyLink: () => void;
  copied: boolean;
}

export default function ProductInfo({
  product,
  getBrandLabel,
  getBrandColor,
  getTypeIcon,
  getTypeLabel,
  getSizeLabel,
  onCopyLink,
  copied
}: ProductInfoProps) {
  return (
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
      <ProductSizes sizes={product.sizes} getSizeLabel={getSizeLabel} />

      {/* دکمه‌های اقدام */}
      <ProductActions productName={product.name} />

      {/* ویژگی‌ها */}
      <ProductFeatures />

      {/* اشتراک‌گذاری */}
      <ProductShare onCopyLink={onCopyLink} copied={copied} productName={product.name} />
    </div>
  );
}