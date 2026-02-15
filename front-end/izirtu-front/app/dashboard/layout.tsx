// app/admin/login/layout.tsx
import type { Metadata } from 'next';
import "../globals.css"

export const metadata: Metadata = {
    title: 'پنل مدیریت - پربار باغستان',
    description: 'پنل مدیریت پربار باغستان',
};

export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}