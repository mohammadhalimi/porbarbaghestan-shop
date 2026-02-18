'use client';

import { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { AdminUser } from '@/app/services/auth.service';

interface UserProfileProps {
  user: AdminUser | null;
  onLogout: () => Promise<void>;
}

export default function UserProfile({ user, onLogout }: UserProfileProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="hidden md:flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <div className="w-8 h-8 bg-linear-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {user?.username?.charAt(0) || 'ا'}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.username || 'ادمین'}</p>
          <p className="text-xs text-gray-500">{user?.email || 'admin@site.com'}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* Dropdown منو */}
      {showDropdown && (
        <>
          <div 
            className="fixed inset-0 z-30 "
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-40">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.username || 'ادمین'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@site.com'}</p>
            </div>
            <button
              onClick={async () => {
                setShowDropdown(false);
                await onLogout();
              }}
              className="w-full text-right px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              خروج از سیستم
            </button>
          </div>
        </>
      )}
    </div>
  );
}