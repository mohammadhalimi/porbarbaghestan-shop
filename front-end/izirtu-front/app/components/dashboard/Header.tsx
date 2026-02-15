'use client';

import { Search, Bell, Shield, Menu } from 'lucide-react';
import UserProfile from './UserProfile';
import { AdminUser } from '@/app/services/auth.service';

interface HeaderProps {
  user: AdminUser | null;
  onLogout: () => Promise<void>;
  onMenuClick: () => void;
}

export default function Header({ user, onLogout, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* سمت راست: لوگو و دکمه منو */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              <span className="font-bold text-gray-900">پنل مدیریت</span>
            </div>
          </div>

          {/* سمت چپ: جستجو، نوتیفیکیشن و پروفایل */}
          <div className="flex items-center gap-4">
            <SearchBox />
            <NotificationBell />
            <UserProfile user={user} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}

// کامپوننت جستجو
function SearchBox() {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="جستجو..."
        className="w-48 px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
      />
    </div>
  );
}

// کامپوننت نوتیفیکیشن
function NotificationBell() {
  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-lg">
      <Bell className="w-5 h-5 text-gray-600" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  );
}