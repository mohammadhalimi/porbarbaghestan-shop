// app/components/admin/profile/tabs/SecurityTab.tsx
'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import profileService from '@/app/services/profile.service';

export default function SecurityTab() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
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
      const result = await profileService.changePassword(
        formData.currentPassword,
        formData.newPassword,
        formData.confirmPassword
      );
      
      if (result.success) {
        setSuccess('رمز عبور با موفقیت تغییر یافت');
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        
        // پاک کردن پیام موفقیت بعد از ۳ ثانیه
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'خطا در تغییر رمز عبور');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // بررسی قدرت رمز عبور
  const getPasswordStrength = () => {
    const password = formData.newPassword;
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return strength;
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return { text: 'ضعیف', color: 'text-red-500', bg: 'bg-red-500', width: '25%' };
    if (strength <= 4) return { text: 'متوسط', color: 'text-yellow-500', bg: 'bg-yellow-500', width: '50%' };
    return { text: 'قوی', color: 'text-emerald-500', bg: 'bg-emerald-500', width: '100%' };
  };

  const passwordMatch = formData.newPassword && formData.confirmPassword && 
                        formData.newPassword === formData.confirmPassword;

  const canSubmit = formData.currentPassword && 
                   formData.newPassword && 
                   formData.confirmPassword && 
                   formData.newPassword === formData.confirmPassword &&
                   formData.newPassword.length >= 6;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">تغییر رمز عبور</h2>

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
        {/* رمز فعلی */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز عبور فعلی
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => togglePassword('current')}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* رمز جدید */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز عبور جدید
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => togglePassword('new')}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* نمایش قدرت رمز */}
          {formData.newPassword && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">قدرت رمز عبور</span>
                <span className={getPasswordStrengthText().color}>
                  {getPasswordStrengthText().text}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${getPasswordStrengthText().bg}`}
                  style={{ width: getPasswordStrengthText().width }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                رمز عبور باید حداقل ۶ کاراکتر و شامل حروف بزرگ، کوچک و اعداد باشد
              </p>
            </div>
          )}
        </div>

        {/* تکرار رمز جدید */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تکرار رمز عبور جدید
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => togglePassword('confirm')}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* نمایش تطابق رمزها */}
          {formData.newPassword && formData.confirmPassword && (
            <div className="mt-2 text-sm">
              {formData.newPassword === formData.confirmPassword ? (
                <span className="text-emerald-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  رمزهای عبور مطابقت دارند
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  رمزهای عبور مطابقت ندارند
                </span>
              )}
            </div>
          )}
        </div>

        {/* دکمه تغییر رمز */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading || !canSubmit}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors cursor-pointer ${
              loading || !canSubmit
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                در حال تغییر...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                تغییر رمز عبور
              </>
            )}
          </button>
        </div>
      </form>

      {/* نکات امنیتی */}
      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
        <h3 className="text-sm font-medium text-amber-800 mb-2">نکات امنیتی:</h3>
        <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
          <li>از رمز عبور قوی استفاده کنید (ترکیبی از حروف بزرگ، کوچک و اعداد)</li>
          <li>رمز عبور خود را به طور منظم تغییر دهید</li>
          <li>از رمز عبور تکراری برای سایت‌های مختلف استفاده نکنید</li>
        </ul>
      </div>
    </div>
  );
}