// app/components/products/OrderGuide.tsx
'use client';

import { Truck, Clock, Shield, Phone, CheckCircle } from 'lucide-react';

export default function OrderGuide() {
  const steps = [
    { step: 1, title: 'انتخاب محصول', desc: 'محصول مورد نظر خود را از لیست محصولات انتخاب کنید' },
    { step: 2, title: 'مشاوره تلفنی', desc: 'با کارشناسان ما تماس بگیرید یا درخواست مشاوره دهید' },
    { step: 3, title: 'تایید سفارش', desc: 'پس از مشاوره، سفارش خود را نهایی کنید' },
    { step: 4, title: 'ارسال محصول', desc: 'محصول در اسرع وقت برای شما ارسال می‌شود' },
  ];

  return (
    <section className="py-16 bg-linear-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* عنوان */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-4">
              <Truck className="w-4 h-4" />
              نحوه سفارش
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              سفارش آسان، دریافت سریع
            </h2>
            <p className="text-lg text-gray-600">
              در کمترین زمان ممکن محصول خود را دریافت کنید
            </p>
          </div>

          {/* مراحل سفارش */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* ستون راست - مراحل */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">📋</span>
                مراحل سفارش
              </h3>
              <div className="space-y-6">
                {steps.map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ستون چپ - نحوه ارسال */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">🚚</span>
                نحوه ارسال
              </h3>

              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">ارسال در تهران</h4>
                      <p className="text-sm text-gray-600">تحویل در کمتر از ۲۴ ساعت</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">ارسال به شهرستان</h4>
                      <p className="text-sm text-gray-600">تحویل در ۴۸ تا ۷۲ ساعت</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* پشتیبانی */}
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800">پشتیبانی ۲۴ ساعته</h4>
                    <p className="text-sm text-emerald-600">
                      همکاران ما ۲۴ ساعته آماده پاسخگویی هستند
                    </p>
                  </div>
                </div>
                <a
                  href="tel:09128928769"
                  className="inline-flex items-center justify-center w-full mt-3 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 ml-2" />
                  09107838556
                </a>
              </div>
            </div>
          </div>

          {/* متن پایانی */}
          <div className="text-center">
            <p className="text-gray-700 font-medium">
              تمامی محصولات پربار باغستان با بهترین کیفیت و مناسب‌ترین قیمت عرضه می‌شوند
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>تضمین اصالت کالا</span>
              <span className="mx-2">•</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>مشاوره تخصصی</span>
              <span className="mx-2">•</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>پشتیبانی دائمی</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}