// app/components/admin/products/ProductRow.tsx
'use client';

import { useState } from 'react';
import { Package, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/app/services/product.service';

interface ProductRowProps {
  product: Product;
  onEdit: () => void;
  onDelete: (product: Product) => void;  // تغییر: کل product رو می‌گیره
}

export default function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
  const [imageError, setImageError] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  const getBrandLabel = (brand: string) => {
    return brand === 'izirtuland' ? 'Izirtuland' : 'Khakshimi';
  };

  const getTypeLabel = (type: string) => {
    return type === 'solid' ? 'جامد' : 'مایع';
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

  const getProductImage = () => {
    if (!product.images?.length || imageError) return null;

    const imagePath = product.images[0];
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return `${BASE_URL}${imagePath}`;
    return `${BASE_URL}/uploads/products/${imagePath}`;
  };

  const imageUrl = getProductImage();

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="48px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
      </td>
      
      <td className="py-3 px-4">
        <div>
          <span className="font-medium text-gray-900">{product.name}</span>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>
        </div>
      </td>
      
      <td className="py-3 px-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {getBrandLabel(product.brand)}
        </span>
      </td>
      
      <td className="py-3 px-4">
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
          {getTypeLabel(product.type)}
        </span>
      </td>
      
      <td className="py-3 px-4">
        <div className="space-y-1">
          {product.sizes.map((size) => (
            <div key={size.size} className="flex items-center gap-2 text-sm">
              <span className="text-gray-700">{getSizeLabel(size.size)}</span>
              {size.stock > 0 ? (
                <span className="text-emerald-600">{size.stock} عدد</span>
              ) : (
                <span className="text-red-500">ناموجود</span>
              )}
            </div>
          ))}
        </div>
      </td>
      
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors cursor-pointer"
            title="ویرایش"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product)}  // تغییر: کل product رو پاس میده
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}