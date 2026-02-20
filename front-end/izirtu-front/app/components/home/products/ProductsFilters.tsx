// app/components/products/ProductsFilters.tsx
'use client';

import { Search, FlaskConical, Droplets } from 'lucide-react';

interface ProductsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedBrand: 'all' | 'izirtuland' | 'khakshimi';
  onBrandChange: (brand: 'all' | 'izirtuland' | 'khakshimi') => void;
  selectedType: 'all' | 'solid' | 'liquid';
  onTypeChange: (type: 'all' | 'solid' | 'liquid') => void;
}

export default function ProductsFilters({
  searchTerm,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  selectedType,
  onTypeChange
}: ProductsFiltersProps) {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* فیلتر برند */}
          <div className="flex gap-3">
            <button
              onClick={() => onBrandChange('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedBrand === 'all'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              همه برندها
            </button>
            <button
              onClick={() => onBrandChange('izirtuland')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedBrand === 'izirtuland'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              ایزیرتولند
            </button>
            <button
              onClick={() => onBrandChange('khakshimi')}
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
              onClick={() => onTypeChange('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedType === 'all'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              همه
            </button>
            <button
              onClick={() => onTypeChange('solid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${selectedType === 'solid'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <FlaskConical className="w-4 h-4" />
              جامد
            </button>
            <button
              onClick={() => onTypeChange('liquid')}
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
  );
}