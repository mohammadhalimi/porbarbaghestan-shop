// app/components/products/ConsultationSection.tsx
'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function ConsultationSection() {
  return (
    <section className="py-12 bg-linear-to-r from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            نیاز به مشاوره دارید؟
          </h2>
          <p className="text-gray-600 mb-6">
            کارشناسان ما آماده پاسخگویی به سوالات شما هستند
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:09128928769"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              تماس با کارشناس
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-200 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              فرم مشاوره
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}