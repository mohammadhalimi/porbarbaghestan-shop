import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: 'ورود به پنل مدیریت',
  description: 'ورود به پنل مدیریت پر بابر باغستان',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
