import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";

export const metadata: Metadata = {
  title: 'AgroFert - متخصص کودهای کشاورزی',
  description: 'ارائه خدمات مشاوره تخصصی کودهای کشاورزی - افزایش بهره‌وری مزارع',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
