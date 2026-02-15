// components/navItem.tsx
'use client'

import Link from "next/link";
import { NavItemProps } from "./type/NavItemProps";

export default function NavItem({ item, isActive }: NavItemProps) {
    return (
        <Link
            href={item.href}
            className={`
                relative px-4 py-2 font-medium transition-all duration-300
                group
                ${isActive 
                    ? 'text-emerald-600' 
                    : 'text-gray-600 hover:text-emerald-600'
                }
            `}
        >
            {item.text}
            
            {/* خط زیر متن - برای هاور و حالت فعال */}
            <span className={`
                absolute -bottom-1 left-0 w-0 h-0.5 
                bg-linear-to-r from-emerald-500 to-teal-400 
                transition-all duration-300
                group-hover:w-full
                ${isActive ? 'w-full' : ''}
            `}></span>
        </Link>
    );
}