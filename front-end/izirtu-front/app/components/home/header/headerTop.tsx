'use client'

import { Menu, Phone, X } from "lucide-react";
import { NavItemType } from "./type/NavItemType";
import Logo from "./logo";
import NavItem from "./navItem"
import { useState } from "react";
import MobileMenu from "./mobileMenu";
import { usePathname } from "next/navigation";

export const navItems: NavItemType[] = [
    { text: 'خانه', href: '/', id: 1 },
    { text: 'خدمات', href: '/services', id: 2 },
    { text: 'محصولات', href: '/product', id: 3 },
    { text: 'مقالات', href: '/articles', id: 4 },
    { text: 'درباره ما', href: '/about', id: 5 },
    { text: 'تماس', href: '/contact', id: 6 }
];

export default function HeaderTop() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname(); // گرفتن مسیر فعلی
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // تابع برای بررسی اینکه آیا آیتم فعال است یا نه
    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-emerald-100/50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* لوگو */}
                        <Logo />

                        {/* ناوبری اصلی دسکتاپ */}
                        <nav className="hidden lg:flex items-center gap-2">
                            {navItems.map((item) => (
                                <NavItem 
                                    key={item.text} 
                                    item={item} 
                                    isActive={isActive(item.href)} // ارسال وضعیت فعال بودن
                                />
                            ))}
                        </nav>

                        {/* دکمه‌های اقدام */}
                        <div className="flex items-center gap-4">
                            <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all hover:scale-105">
                                <Phone className="w-4 h-4" />
                                مشاوره رایگان
                            </button>

                            {/* دکمه منوی همبرگر برای موبایل */}
                            <button
                                onClick={toggleMobileMenu}
                                className="lg:hidden p-3 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer"
                                aria-label="منو"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={isMobileMenuOpen}
                navItems={navItems}
                onClose={() => setIsMobileMenuOpen(false)}
                activePath={pathname} // ارسال مسیر فعلی به موبایل منو
            />
        </>
    )
}