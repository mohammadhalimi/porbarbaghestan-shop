// app/components/admin/dashboard/sections/DashboardSection.tsx
'use client';

import { Package, FileText, Eye, BarChart3, Plus, Settings } from 'lucide-react';

export default function DashboardSection() {
  const stats = [
    { label: 'کل محصولات', value: '۴۸', change: '+۱۲%', icon: Package, color: 'bg-emerald-100' },
    { label: 'مقالات وبلاگ', value: '۲۴', change: '+۵%', icon: FileText, color: 'bg-blue-100' },
    { label: 'بازدید امروز', value: '۱.۲K', change: '+۲۳%', icon: Eye, color: 'bg-purple-100' },
    { label: 'فروش ماه', value: '۲۸.۵M', change: '+۱۸%', icon: BarChart3, color: 'bg-amber-100' },
  ];

  const recentActivities = [
    { id: 1, text: 'محصول جدید "کود مخصوص باغ" اضافه شد', time: '۲ ساعت پیش', icon: Plus, user: 'ادمین' },
    { id: 2, text: 'مقاله "راهنمای کشاورزی مدرن" منتشر شد', time: '۵ ساعت پیش', icon: FileText, user: 'ادمین' },
    { id: 3, text: 'سفارش جدید از علی محمدی ثبت شد', time: '۱ روز پیش', icon: Package, user: 'سیستم' },
    { id: 4, text: 'تنظیمات سایت بروزرسانی شد', time: '۲ روز پیش', icon: Settings, user: 'ادمین' },
  ];

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">داشبورد مدیریت</h1>
        <p className="text-gray-600">خلاصه‌ای از وضعیت سایت</p>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              icon={Icon}
              bgColor={stat.color}
            />
          );
        })}
      </div>

      {/* فعالیت‌های اخیر */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">فعالیت‌های اخیر</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              text={activity.text}
              time={activity.time}
              icon={activity.icon}
              user={activity.user}
            />
          ))}
        </div>
      </div>

      {/* نمودارها (برای نمونه) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="آمار فروش ماهانه">
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">نمودار فروش</p>
          </div>
        </ChartCard>
        
        <ChartCard title="محصولات پرفروش">
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">لیست محصولات پرفروش</p>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// کامپوننت کارت آمار
interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: any;
  bgColor: string;
}

function StatCard({ label, value, change, icon: Icon, bgColor }: StatCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
          isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
        }`}>
          {change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
    </div>
  );
}

// کامپوننت آیتم فعالیت
interface ActivityItemProps {
  text: string;
  time: string;
  icon: any;
  user: string;
}

function ActivityItem({ text, time, icon: Icon, user }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="text-gray-900">{text}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{time}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-xs text-gray-500">{user}</span>
        </div>
      </div>
    </div>
  );
}

// کامپوننت کارت نمودار
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}