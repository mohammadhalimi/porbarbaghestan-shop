// app/components/products/ProductGallery.tsx
'use client';

import { JSX, useState } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { Product } from '@/app/services/product.service';

interface ProductGalleryProps {
  product: Product;
  getProductImage: (index: number) => string;
  getBrandLabel: (brand: string) => string;
  getBrandColor: (brand: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
  getTypeLabel: (type: string) => string;
}

export default function ProductGallery({
  product,
  getProductImage,
  getBrandLabel,
  getBrandColor,
  getTypeIcon,
  getTypeLabel
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const allImages = product.images?.map((_, i) => getProductImage(i)) || [];
  const coverImage = getProductImage(selectedImage);

  return (
    <div className="lg:col-span-5">
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* تصاویر کوچک (thumbnail) */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {allImages.filter(img => img !== '/images/placeholder-product.jpg').map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${
                selectedImage === index
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
  );
}