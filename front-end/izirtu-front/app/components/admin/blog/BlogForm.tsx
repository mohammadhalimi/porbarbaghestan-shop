// app/components/admin/blog/BlogForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Save, X, Upload, AlertCircle, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import blogService, { BlogPost, InternalLink } from '@/app/services/blog.service';
import productService, { Product } from '@/app/services/product.service';

interface BlogFormProps {
  post: BlogPost | null;
  onClose: () => void;
  onSuccess: (post: BlogPost) => void;
  onError: (message: string) => void;
}

export default function BlogForm({ post, onClose, onSuccess, onError }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    tags: post?.tags?.join(', ') || '',
    metaTitle: post?.metaTitle || '',
    metaDescription: post?.metaDescription || '',
    metaKeywords: post?.metaKeywords || '',
  });

  const [internalLinks, setInternalLinks] = useState<InternalLink[]>(post?.internalLinks || []);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [anchorText, setAnchorText] = useState('');
  
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>(post?.coverImage || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  // بارگذاری محصولات برای لینک‌دهی داخلی
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await productService.getProducts({ limit: 100 });
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    }
  };

  const getFullImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return `${BASE_URL}${imagePath}`;
    return `${BASE_URL}/uploads/blog/${imagePath}`;
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('حجم تصویر نباید بیشتر از ۵ مگابایت باشد');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('فقط فایل‌های تصویری مجاز هستند');
      return;
    }

    setCoverImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddInternalLink = () => {
    if (!selectedProduct || !anchorText) {
      setError('لطفاً محصول و متن لینک را وارد کنید');
      return;
    }

    const product = products.find(p => p._id === selectedProduct);
    if (!product) return;

    const newLink: InternalLink = {
      productId: product._id,
      productName: product.name,
      anchorText,
    };

    setInternalLinks([...internalLinks, newLink]);
    setSelectedProduct('');
    setAnchorText('');
  };

  const handleRemoveInternalLink = (index: number) => {
    setInternalLinks(internalLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // اعتبارسنجی
      if (!formData.title.trim()) {
        throw new Error('عنوان مقاله الزامی است');
      }

      if (!formData.excerpt.trim()) {
        throw new Error('خلاصه مقاله الزامی است');
      }

      if (!formData.content.trim()) {
        throw new Error('محتوای مقاله الزامی است');
      }

      if (!coverImage && !post?.coverImage) {
        throw new Error('تصویر شاخص الزامی است');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      
      // پردازش تگ‌ها
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      formDataToSend.append('tags', JSON.stringify(tagsArray));

      // پردازش لینک‌های داخلی
      formDataToSend.append('internalLinks', JSON.stringify(internalLinks));

      // متا دیتا
      if (formData.metaTitle) formDataToSend.append('metaTitle', formData.metaTitle);
      if (formData.metaDescription) formDataToSend.append('metaDescription', formData.metaDescription);
      if (formData.metaKeywords) formDataToSend.append('metaKeywords', formData.metaKeywords);

      // تصویر شاخص
      if (coverImage) {
        formDataToSend.append('image', coverImage);
      }

      let result: BlogPost;
      if (post) {
        result = await blogService.updatePost(post._id, formDataToSend);
      } else {
        result = await blogService.createPost(formDataToSend);
      }

      onSuccess(result);
    } catch (err: any) {
      const message = err.message || 'خطا در ذخیره مقاله';
      setError(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {post ? 'ویرایش مقاله' : 'نوشتن مقاله جدید'}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* عنوان */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان مقاله <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="عنوان مقاله را وارد کنید"
            required
          />
        </div>

        {/* خلاصه */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            خلاصه مقاله <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            placeholder="خلاصه‌ای از مقاله (حداکثر ۲۰۰ کاراکتر)"
            maxLength={200}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.excerpt.length}/200 کاراکتر
          </p>
        </div>

        {/* محتوا */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            محتوای مقاله <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={12}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none font-mono"
            placeholder="متن مقاله را اینجا بنویسید..."
            required
          />
        </div>

        {/* تگ‌ها */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            برچسب‌ها
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="کشاورزی, کود, باغداری"
          />
          <p className="text-xs text-gray-500 mt-1">
            برچسب‌ها را با کاما از هم جدا کنید
          </p>
        </div>

        {/* لینک‌های داخلی */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">لینک‌دهی داخلی به محصولات</h3>

          {/* فرم افزودن لینک */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">انتخاب محصول</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={anchorText}
              onChange={(e) => setAnchorText(e.target.value)}
              placeholder="متن لینک (مثال: خرید کود گوجه)"
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />

            <button
              type="button"
              onClick={handleAddInternalLink}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              افزودن لینک
            </button>
          </div>

          {/* لیست لینک‌ها */}
          {internalLinks.length > 0 && (
            <div className="space-y-2 mb-4">
              {internalLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{link.anchorText}</p>
                    <p className="text-sm text-gray-500">محصول: {link.productName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveInternalLink(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* تصویر شاخص */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تصویر شاخص <span className="text-red-500">*</span>
          </label>

          {coverImagePreview && (
            <div className="mb-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={coverImagePreview.startsWith('data:') ? coverImagePreview : getFullImageUrl(coverImagePreview)}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-300 transition-colors">
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
            />
            <label htmlFor="coverImage" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                برای آپلود تصویر شاخص کلیک کنید
              </p>
              <p className="text-xs text-gray-500">
                فرمت‌های مجاز: JPG, PNG, WebP (حداکثر ۵ مگابایت)
              </p>
            </label>
          </div>
        </div>

        {/* متا دیتا (برای سئو) */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">تنظیمات سئو</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان متا
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="عنوان برای موتورهای جستجو (حداکثر ۶۰ کاراکتر)"
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.metaTitle.length}/60 کاراکتر
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                توضیحات متا
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                placeholder="توضیحات برای موتورهای جستجو (حداکثر ۱۶۰ کاراکتر)"
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.metaDescription.length}/160 کاراکتر
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                کلمات کلیدی
              </label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="کشاورزی, کود, باغداری"
              />
              <p className="text-xs text-gray-500 mt-1">
                کلمات کلیدی را با کاما جدا کنید
              </p>
            </div>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
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
                {post ? 'بروزرسانی مقاله' : 'انتشار مقاله'}
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
    </div>
  );
}