// app/admin/login/layout.tsx
import { Vazirmatn } from 'next/font/google';
import "./globals.css"

const vazir = Vazirmatn({
    subsets: ['arabic', 'latin'],
    display: 'swap',
});
export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <html lang="fa" dir="rtl" className={vazir.className}>
                <head>
                    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
                    <meta name="theme-color" content="#10b981" />
                </head>
                <body className="antialiased">
                    {children}
                </body>
            </html>
        </>
    );
}