'use client';

import { useState } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import { AdminUser } from '@/app/services/auth.service';
import profileService from '@/app/services/profile.service';

interface GeneralInfoTabProps {
  profile: AdminUser;
  onUpdate: (profile: AdminUser) => void;
}

export default function GeneralInfoTab({ profile, onUpdate }: GeneralInfoTabProps) {
  const [formData, setFormData] = useState({
    username: profile.username,
    email: profile.email,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const updatedProfile = await profileService.updateProfile(formData);
      onUpdate(updatedProfile);
      setSuccess('اطلاعات با موفقیت بروزرسانی شد');

      // پاک کردن پیام موفقیت بعد از ۳ ثانیه
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'خطا در بروزرسانی');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hasChanges = formData.username !== profile.username || formData.email !== profile.email;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">اطلاعات عمومی</h2>

      {/* پیام خطا */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* پیام موفقیت */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-emerald-600 text-sm">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* نام کاربری */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نام کاربری
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="نام کاربری"
            required
            minLength={3}
          />
          <p className="text-xs text-gray-500 mt-1">حداقل ۳ کاراکتر</p>
        </div>

        {/* ایمیل */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ایمیل
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="example@email.com"
            required
          />
        </div>

        {/* دکمه ذخیره */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading || !hasChanges}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${loading || !hasChanges
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer'
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
                ذخیره تغییرات
              </>
            )}
          </button>
        </div>

        {/* نمایش وضعیت تغییرات */}
        {!hasChanges && !loading && (
          <p className="text-sm text-gray-500 text-center pt-2">
            هیچ تغییری اعمال نشده است
          </p>
        )}
      </form>
    </div>
  );
} 