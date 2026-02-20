// app/components/products/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { Product } from '@/app/services/product.service';
import { JSX } from 'react';

interface ProductCardProps {
  product: Product;
  getProductImage: (product: Product) => string | null;
  getBrandLabel: (brand: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
  getSizeLabel: (size: string) => string;
}

export default function ProductCard({
  product,
  getProductImage,
  getBrandLabel,
  getTypeIcon,
  getSizeLabel
}: ProductCardProps) {
  const imageUrl = getProductImage(product);

  return (
    <Link
      href={`/products/${product.slug || product._id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* تصویر محصول */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-gray-100 to-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
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
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
          product.brand === 'izirtuland' ? 'bg-blue-500' : 'bg-orange-500'
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
          {product.sizes.slice(0, 3).map((size, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{getSizeLabel(size.size)}</span>
              {size.stock > 0 ? (
                <span className="text-emerald-600 font-medium">{size.stock} عدد</span>
              ) : (
                <span className="text-red-500 text-xs">ناموجود</span>
              )}
            </div>
          ))}
          {product.sizes.length > 3 && (
            <div className="text-xs text-gray-500 text-center">
              +{product.sizes.length - 3} سایز دیگر
            </div>
          )}
        </div>

        {/* دکمه مشاهده */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="w-full py-2 text-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
            مشاهده و استعلام قیمت
          </div>
        </div>
      </div>
    </Link>
  );
}