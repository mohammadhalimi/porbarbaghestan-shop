'use client';

import { useState } from 'react';
import { 
  Package, Plus, Edit, Trash2, CheckCircle, 
  Upload, Search, Filter, X, Save
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: number;
  description?: string;
  image?: string;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'کود مخصوص درختان میوه', price: '۱۵۰,۰۰۰', category: 'کودها', stock: 45, description: 'کود مخصوص درختان میوه با کیفیت عالی' },
    { id: 2, name: 'بذر گوجه فرنگی', price: '۸۵,۰۰۰', category: 'بذرها', stock: 12, description: 'بذر گوجه فرنگی هیبرید' },
    { id: 3, name: 'سم مخصوص شته‌ها', price: '۲۱۰,۰۰۰', category: 'سموم', stock: 0, description: 'سم مؤثر برای دفع شته' },
    { id: 4, name: 'بیل باغبانی', price: '۳۲۰,۰۰۰', category: 'ادوات', stock: 23, description: 'بیل باغبانی حرفه‌ای' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'کودها',
    stock: '',
    description: '',
  });

  const categories = ['همه', 'کودها', 'بذرها', 'سموم', 'ادوات', 'گیاهان دارویی'];

  // فیلتر محصولات
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.includes(searchTerm) || 
                         product.description?.includes(searchTerm);
    const matchesCategory = selectedCategory === 'همه' || 
                          product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category,
        stock: parseInt(newProduct.stock) || 0,
        description: newProduct.description,
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '', category: 'کودها', stock: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock.toString(),
      description: product.description || '',
    });
    setShowAddForm(true);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct && newProduct.name && newProduct.price) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              name: newProduct.name,
              price: newProduct.price,
              category: newProduct.category,
              stock: parseInt(newProduct.stock) || 0,
              description: newProduct.description,
            }
          : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', category: 'کودها', stock: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت محصولات</h1>
          <p className="text-gray-600">افزودن و ویرایش محصولات فروشگاه</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setNewProduct({ name: '', price: '', category: 'کودها', stock: '', description: '' });
            setShowAddForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          افزودن محصول جدید
        </button>
      </div>

      {/* فیلتر و جستجو */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-600 flex items-center justify-end">
            {filteredProducts.length} محصول یافت شد
          </div>
        </div>
      </div>

      {/* فرم افزودن/ویرایش محصول */}
      {showAddForm && (
        <ProductForm
          product={newProduct}
          setProduct={setNewProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
            setNewProduct({ name: '', price: '', category: 'کودها', stock: '', description: '' });
          }}
          isEditing={!!editingProduct}
        />
      )}

      {/* لیست محصولات */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">لیست محصولات</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">محصول</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">دسته‌بندی</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">قیمت (تومان)</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">موجودی</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// کامپوننت فرم محصول
interface ProductFormProps {
  product: any;
  setProduct: (product: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

function ProductForm({ product, setProduct, onSubmit, onCancel, isEditing }: ProductFormProps) {
  const categories = ['کودها', 'بذرها', 'سموم', 'ادوات', 'گیاهان دارویی'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {isEditing ? 'ویرایش محصول' : 'افزودن محصول جدید'}
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نام محصول
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="نام محصول را وارد کنید"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              قیمت (تومان)
            </label>
            <input
              type="text"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="مثال: ۱۵۰,۰۰۰"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              دسته‌بندی
            </label>
            <select
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              موجودی
            </label>
            <input
              type="number"
              value={product.stock}
              onChange={(e) => setProduct({...product, stock: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="تعداد موجودی"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات
            </label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              placeholder="توضیحات محصول..."
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تصویر محصول
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-300 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">برای آپلود تصویر کلیک کنید یا فایل را بکشید</p>
            <p className="text-xs text-gray-500">فرمت‌های مجاز: JPG, PNG, WebP (حداکثر ۵MB)</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>
        
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'بروزرسانی محصول' : 'افزودن محصول'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

// کامپوننت ردیف محصول
interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <span className="font-medium text-gray-900">{product.name}</span>
            {product.description && (
              <p className="text-xs text-gray-500 mt-1">{product.description}</p>
            )}
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {product.category}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="font-medium text-gray-900">{product.price} تومان</span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          {product.stock > 0 ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600">{product.stock} عدد</span>
            </>
          ) : (
            <span className="text-red-600">ناموجود</span>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            title="ویرایش"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}