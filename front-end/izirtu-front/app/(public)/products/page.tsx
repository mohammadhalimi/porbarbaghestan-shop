// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FlaskConical, Droplets } from 'lucide-react';
import productService, { Product } from '@/app/services/product.service';
import ProductsHeader from '@/app/components/home/products/ProductsHeader';
import ProductsFilters from '@/app/components/home/products/ProductsFilters';
import ProductsGrid from '@/app/components/home/products/ProductsGrid';
import OrderGuide from '@/app/components/home/products/OrderGuide';
import { ProductsSkeleton } from '@/app/components/home/products/ProductsSkeleton';

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
    const matchesSearch = searchTerm === '' || 
      product.name.includes(searchTerm) ||
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
      <ProductsHeader />
      <OrderGuide />
      <ProductsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {/* لیست محصولات */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* تعداد محصولات */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-bold text-emerald-600">{filteredProducts.length}</span> محصول یافت شد
            </p>
          </div>

          <ProductsGrid
            products={filteredProducts}
            getProductImage={getProductImage}
            getBrandLabel={getBrandLabel}
            getTypeIcon={getTypeIcon}
            getSizeLabel={getSizeLabel}
          />
        </div>
      </section>
    </div>
  );
}