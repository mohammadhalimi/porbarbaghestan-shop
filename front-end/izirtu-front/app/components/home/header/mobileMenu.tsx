// components/mobileMenu.tsx
'use client'

import Link from "next/link";
import { NavItemType } from "./type/NavItemType";
import { Phone, X } from "lucide-react";
import { useEffect } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    navItems: NavItemType[];
    onClose: () => void;
    activePath: string;
}

export default function MobileMenu({ isOpen, navItems, onClose, activePath }: MobileMenuProps) {
    // جلوگیری از اسکرول وقتی منو باز است
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const isActive = (href: string) => {
        if (href === '/') {
            return activePath === href;
        }
        return activePath.startsWith(href);
    };

    return (
        <div className="lg:hidden">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            
            {/* Menu Panel */}
            <div className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300">
                <div className="p-6">
                    {/* Navigation Items */}
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.text}
                                href={item.href}
                                onClick={onClose}
                                className={`
                                    flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200
                                    ${isActive(item.href)
                                        ? 'text-emerald-600 bg-emerald-50 border-r-4 border-emerald-500'
                                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
                                    }
                                `}
                            >
                                <span>{item.text}</span>
                                {isActive(item.href) && (
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}