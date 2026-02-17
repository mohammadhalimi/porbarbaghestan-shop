'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import productService, { Product, Brand, ProductType } from '@/app/services/product.service';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import Notification from '@/app/components/ui/Notification';
import ConfirmModal from '@/app/components/ui/ConfirmModal';
import ProductFilters from '@/app/components/admin/products/ProductFilters';
import ProductTable from '@/app/components/admin/products/ProductTable';
import ProductForm from '@/app/components/admin/products/ProductForm';

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<ProductType[]>([]);
  
  // مودال حذف
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    productId: string | null;
    productName: string;
  }>({
    isOpen: false,
    productId: null,
    productName: ''
  });

  // نوتیفیکیشن
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  // بارگذاری اولیه
  useEffect(() => {
    loadProducts();
    loadFilters();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await productService.getProducts();
      setProducts(data);
    } catch (err: any) {
      showNotification('error', err.message || 'خطا در بارگذاری محصولات');
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const [brandsData, typesData] = await Promise.all([
        productService.getBrands(),
        productService.getTypes(),
      ]);
      setBrands(brandsData);
      setTypes(typesData);
    } catch (err) {
      console.error('Error loading filters:', err);
    }
  };

  // فیلتر محصولات
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.includes(searchTerm) ||
      product.description.includes(searchTerm);
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    return matchesSearch && matchesBrand && matchesType;
  });

  // باز کردن مودال حذف
  const openDeleteModal = (product: Product) => {
    setDeleteModal({
      isOpen: true,
      productId: product._id,
      productName: product.name
    });
  };

  // اجرای حذف
  const handleDeleteConfirm = async () => {
    if (!deleteModal.productId) return;

    try {
      await productService.deleteProduct(deleteModal.productId);
      setProducts(products.filter(p => p._id !== deleteModal.productId));
      showNotification('success', `محصول "${deleteModal.productName}" با موفقیت حذف شد`);
    } catch (err: any) {
      showNotification('error', err.message || 'خطا در حذف محصول');
    } finally {
      setDeleteModal({ isOpen: false, productId: null, productName: '' });
    }
  };

  // بستن مودال حذف
  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, productId: null, productName: '' });
  };

  const handleProductSuccess = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map(p => p._id === product._id ? product : p));
      showNotification('success', 'محصول با موفقیت ویرایش شد');
    } else {
      setProducts([product, ...products]);
      showNotification('success', 'محصول با موفقیت اضافه شد');
    }
    setShowAddForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* نوتیفیکیشن */}
      <Notification
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      {/* مودال تایید حذف */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="حذف محصول"
        message={`آیا از حذف محصول "${deleteModal.productName}" اطمینان دارید؟ این عملیات قابل بازگشت نیست.`}
        confirmText="بله، حذف کن"
        cancelText="انصراف"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت محصولات</h1>
          <p className="text-gray-600">مدیریت محصولات فروشگاه</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowAddForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          افزودن محصول جدید
        </button>
      </div>

      {/* فیلتر و جستجو */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        brands={brands}
        types={types}
        totalCount={filteredProducts.length}
      />

      {/* فرم افزودن/ویرایش محصول */}
      {showAddForm && (
        <ProductForm
          product={editingProduct}
          brands={brands}
          types={types}
          onClose={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
          onSuccess={handleProductSuccess}
          onError={(message) => showNotification('error', message)}
        />
      )}

      {/* لیست محصولات */}
      <ProductTable
        products={filteredProducts}
        onEdit={(product) => {
          setEditingProduct(product);
          setShowAddForm(true);
        }}
        onDelete={openDeleteModal}
      />
    </div>
  );
}