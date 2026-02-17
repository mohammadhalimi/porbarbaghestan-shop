// app/components/admin/dashboard/sections/SettingsSection.tsx
'use client';

import { useState } from 'react';
import { 
  Save, RefreshCw, Globe, Mail, Phone, MapPin, 
  Shield, Bell, Moon, Sun, Lock, Key, Camera
} from 'lucide-react';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  email: string;
  phone: string;
  address: string;
  maintenanceMode: boolean;
  darkMode: boolean;
  emailNotifications: boolean;
  twoFactorAuth: boolean;
}

export default function SettingsSection() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'پربار باغستان',
    siteDescription: 'فروشگاه تخصصی محصولات کشاورزی و باغداری',
    email: 'info@parbarbaghestan.com',
    phone: '021-33370954',
    address: 'تهران، خیابان ولیعصر',
    maintenanceMode: false,
    darkMode: false,
    emailNotifications: true,
    twoFactorAuth: false,
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تنظیمات با موفقیت ذخیره شد!');
  };

  const tabs = [
    { id: 'general', label: 'عمومی', icon: Globe },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'appearance', label: 'ظاهر', icon: Moon },
  ];

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">تنظیمات سایت</h1>
        <p className="text-gray-600">مدیریت تنظیمات کلی سایت</p>
      </div>

      {/* تب‌ها */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex gap-2 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <form onSubmit={handleSaveSettings} className="p-6">
          {activeTab === 'general' && (
            <GeneralSettings settings={settings} setSettings={setSettings} />
          )}
          
          {activeTab === 'security' && (
            <SecuritySettings settings={settings} setSettings={setSettings} />
          )}
          
          {activeTab === 'notifications' && (
            <NotificationSettings settings={settings} setSettings={setSettings} />
          )}
          
          {activeTab === 'appearance' && (
            <AppearanceSettings settings={settings} setSettings={setSettings} />
          )}

          <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              ذخیره تغییرات
            </button>
            
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              بازنشانی
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// تنظیمات عمومی
interface GeneralSettingsProps {
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
}

function GeneralSettings({ settings, setSettings }: GeneralSettingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">اطلاعات عمومی سایت</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline ml-1" />
            نام سایت
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline ml-1" />
            ایمیل
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({...settings, email: e.target.value})}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline ml-1" />
            تلفن تماس
          </label>
          <input
            type="text"
            value={settings.phone}
            onChange={(e) => setSettings({...settings, phone: e.target.value})}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline ml-1" />
            آدرس
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({...settings, address: e.target.value})}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            توضیحات سایت
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
            rows={3}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <h4 className="font-medium text-gray-900">حالت تعمیرات</h4>
            <p className="text-sm text-gray-500">در این حالت سایت برای کاربران غیرفعال می‌شود</p>
          </div>
          <ToggleSwitch
            checked={settings.maintenanceMode}
            onChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
          />
        </label>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <h4 className="font-medium text-gray-900">فعال بودن سایت</h4>
            <p className="text-sm text-gray-500">سایت برای همه کاربران قابل دسترسی است</p>
          </div>
          <ToggleSwitch
            checked={!settings.maintenanceMode}
            onChange={(checked) => setSettings({...settings, maintenanceMode: !checked})}
          />
        </label>
      </div>
    </div>
  );
}

// تنظیمات امنیتی
function SecuritySettings({ settings, setSettings }: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">تنظیمات امنیتی</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">احراز هویت دو مرحله‌ای</h4>
                <p className="text-sm text-gray-500">افزایش امنیت حساب کاربری با کد تایید</p>
              </div>
            </div>
            <ToggleSwitch
              checked={settings.twoFactorAuth}
              onChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
            />
          </label>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">تغییر رمز عبور</h4>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="رمز عبور فعلی"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <input
              type="password"
              placeholder="رمز عبور جدید"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <input
              type="password"
              placeholder="تکرار رمز عبور جدید"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
              <Key className="w-4 h-4 inline ml-1" />
              تغییر رمز عبور
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// تنظیمات اعلان‌ها
function NotificationSettings({ settings, setSettings }: GeneralSettingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">تنظیمات اعلان‌ها</h3>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">اعلان‌های ایمیلی</h4>
              <p className="text-sm text-gray-500">دریافت اعلان‌های مهم از طریق ایمیل</p>
            </div>
          </div>
          <ToggleSwitch
            checked={settings.emailNotifications}
            onChange={(checked) => setSettings({...settings, emailNotifications: checked})}
          />
        </label>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">اعلان‌های دریافتی</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded text-emerald-500" defaultChecked />
            <span className="text-sm text-gray-700">سفارش جدید</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded text-emerald-500" defaultChecked />
            <span className="text-sm text-gray-700">ثبت‌نام کاربر جدید</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded text-emerald-500" defaultChecked />
            <span className="text-sm text-gray-700">نظر جدید</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded text-emerald-500" />
            <span className="text-sm text-gray-700">بروزرسانی سیستم</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// تنظیمات ظاهری
function AppearanceSettings({ settings, setSettings }: GeneralSettingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">تنظیمات ظاهری</h3>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-start gap-3">
            <Moon className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">حالت تاریک</h4>
              <p className="text-sm text-gray-500">استفاده از تم تاریک در پنل مدیریت</p>
            </div>
          </div>
          <ToggleSwitch
            checked={settings.darkMode}
            onChange={(checked) => setSettings({...settings, darkMode: checked})}
          />
        </label>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4">لوگوی سایت</h4>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Camera className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
              تغییر لوگو
            </button>
            <p className="text-xs text-gray-500 mt-2">حداکثر حجم: 2MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// کامپوننت Toggle Switch
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
    </label>
  );
}