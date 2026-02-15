import Link from 'next/link';

export default function BackToSite() {
  return (
    <Link
      href="/"
      className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-white transition-all shadow-sm hover:shadow-md z-10"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      بازگشت به سایت
    </Link>
  );
}