'use client';

import { X } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { AdminSection } from './type/admin';
import { AdminUser } from '@/app/services/auth.service';
import { BarChart3, Package, FileText, Settings } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  user: AdminUser | null;
}

export default function MobileSidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSectionChange,
  user 
}: MobileSidebarProps) {
  const menuItems = [
    { id: 'dashboard' as AdminSection, label: 'داشبورد', icon: BarChart3 },
    { id: 'products' as AdminSection, label: 'محصولات', icon: Package },
    { id: 'blog' as AdminSection, label: 'وبلاگ', icon: FileText },
    { id: 'settings' as AdminSection, label: 'تنظیمات', icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-gray-900">منو مدیریت</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                isActive={activeSection === item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
              />
            ))}
          </nav>
          
          {/* اطلاعات کاربر در موبایل */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.username?.charAt(0) || 'ا'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.username || 'ادمین'}</p>
                <p className="text-sm text-gray-500">{user?.email || 'admin@site.com'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}