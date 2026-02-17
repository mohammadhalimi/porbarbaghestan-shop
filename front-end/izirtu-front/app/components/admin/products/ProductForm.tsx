'use client';

import { useState, useEffect } from 'react';
import { Save, X, Upload, AlertCircle } from 'lucide-react';
import { Product, Brand, ProductType, SizeOption } from '@/app/services/product.service';
import productService from '@/app/services/product.service';

interface ProductFormProps {
  product: Product | null;
  brands: Brand[];
  types: ProductType[];
  onClose: () => void;
  onSuccess: (product: Product) => void;
  onError: (message: string) => void;
}

export default function ProductForm({ 
  product, 
  brands, 
  types, 
  onClose, 
  onSuccess,
  onError 
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || 'izirtuland',
    type: product?.type || 'solid',
    description: product?.description || '',
  });

  const [sizes, setSizes] = useState<Array<{ size: string; stock: number }>>(
    product?.sizes || []
  );

  const [availableSizes, setAvailableSizes] = useState<SizeOption[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(product?.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSizes(formData.type);
  }, [formData.type]);

  const loadSizes = async (type: string) => {
    try {
      const sizesData = await productService.getSizesByType(type);
      setAvailableSizes(sizesData);
      setSizes(prev => prev.filter(s => sizesData.some(d => d.value === s.size)));
    } catch (err) {
      console.error('Error loading sizes:', err);
    }
  };

  const handleAddSize = () => {
    const firstAvailableSize = availableSizes.find(
      s => !sizes.some(existing => existing.size === s.value)
    );

    if (firstAvailableSize) {
      setSizes([...sizes, { size: firstAvailableSize.value as any, stock: 0 }]);
    }
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    setSizes(sizes.filter(s => s.size !== sizeToRemove));
  };

  const handleSizeChange = (size: string, field: 'stock', value: number) => {
    setSizes(sizes.map(s =>
      s.size === size ? { ...s, [field]: value } : s
    ));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم هر تصویر نباید بیشتر از ۵ مگابایت باشد');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('فقط فایل‌های تصویری مجاز هستند');
        return;
      }
    }

    setImages(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        throw new Error('نام محصول الزامی است');
      }

      if (sizes.length === 0) {
        throw new Error('حداقل یک سایز باید انتخاب شود');
      }

      if (images.length === 0 && imagePreviews.length === 0) {
        throw new Error('حداقل یک تصویر باید آپلود شود');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('sizes', JSON.stringify(sizes));
      formDataToSend.append('description', formData.description);

      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      let result: Product;
      if (product) {
        result = await productService.updateProduct(product._id, formDataToSend);
      } else {
        result = await productService.createProduct(formDataToSend);
      }

      onSuccess(result);
    } catch (err: any) {
      const message = err.message || 'خطا در ذخیره محصول';
      setError(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-lg font-bold text-gray-900 mb-4">
        {product ? 'ویرایش محصول' : 'افزودن محصول جدید'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* نام محصول */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نام محصول <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="مثال: کود مخصوص گوجه فرنگی"
            required
          />
        </div>

        {/* برند */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            برند <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value as any })}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          >
            {brands.map(brand => (
              <option key={brand.value} value={brand.value}>{brand.label}</option>
            ))}
          </select>
        </div>

        {/* نوع محصول */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع محصول <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          >
            {types.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* سایزها */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              سایزها و موجودی <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleAddSize}
              disabled={sizes.length >= availableSizes.length}
              className="text-sm text-emerald-600 hover:text-emerald-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              + افزودن سایز
            </button>
          </div>

          <div className="space-y-3">
            {sizes.map((sizeItem) => (
              <div key={sizeItem.size} className="flex items-center gap-3">
                <div className="flex-1">
                  <select
                    value={sizeItem.size}
                    onChange={(e) => {
                      const newSize = e.target.value;
                      if (!sizes.some(s => s.size === newSize)) {
                        setSizes(sizes.map(s =>
                          s.size === sizeItem.size ? { ...s, size: newSize as any } : s
                        ));
                      }
                    }}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {availableSizes.map(option => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={sizes.some(s => s.size === option.value && s.size !== sizeItem.size)}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    min="0"
                    value={sizeItem.stock}
                    onChange={(e) => handleSizeChange(sizeItem.size, 'stock', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="موجودی"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSize(sizeItem.size)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {sizes.length === 0 && (
            <p className="text-sm text-red-500 mt-2">حداقل یک سایز باید انتخاب شود</p>
          )}
        </div>

        {/* توضیحات */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            توضیحات <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            placeholder="توضیحات کامل محصول..."
            required
          />
        </div>

        {/* تصاویر */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تصاویر محصول <span className="text-red-500">*</span>
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-300 transition-colors">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="images" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                برای آپلود تصاویر کلیک کنید
              </p>
              <p className="text-xs text-gray-500">
                فرمت‌های مجاز: JPG, PNG, WebP (حداکثر ۵ مگابایت)
              </p>
            </label>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                در حال ذخیره...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {product ? 'بروزرسانی محصول' : 'افزودن محصول'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            انصراف
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
        <p className="text-sm text-amber-800">
          <span className="font-bold">توجه:</span> محصولات قیمت ندارند. مشتریان باید برای استعلام قیمت و سفارش تماس بگیرند.
        </p>
      </div>
    </div>
  );
}