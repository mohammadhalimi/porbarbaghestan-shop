import { CheckCircle, Leaf } from "lucide-react";
import { FertilizerContentProps } from "./type/FertilizerContentProps";
import Image from "next/image";
export default function FertilizerContent({ fertilizer }: FertilizerContentProps) {
  // اگر fertilizer undefined باشد، fallback نمایش دهیم
  if (!fertilizer) {
    return (
      <div className="bg-linear-to-br from-white to-emerald-50/50 rounded-3xl p-8 md:p-12 shadow-xl text-center">
        <p className="text-gray-600">لطفاً یک دسته کود را انتخاب کنید</p>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-white to-emerald-50/50 rounded-3xl p-8 md:p-12 shadow-xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className={`w-20 h-20 bg-linear-to-r ${fertilizer.color} rounded-2xl flex items-center justify-center mb-6`}>
            <Leaf className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {fertilizer.title}
          </h3>

          <p className="text-gray-600 mb-8">
            {fertilizer.description}
          </p>

          <ul className="space-y-3 mb-8">
            {fertilizer.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button className={`px-6 py-3 bg-linear-to-r ${fertilizer.color} text-white rounded-xl font-medium hover:shadow-lg hover:${fertilizer.color} transition-all`}>
            دریافت برنامه کوددهی
          </button>
        </div>

        {/* بخش تصویر */}
        <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
          {/* overlay رنگی */}
          <div className={`absolute inset-0 bg-linear-to-br ${fertilizer.color} opacity-30 z-10`}></div>

          {/* تصویر پس‌زمینه */}
          <div className="absolute inset-0">
            <Image
              src={fertilizer.image}
              alt={fertilizer.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
              placeholder="blur" // اگر می‌خواهید blur placeholder داشته باشد
            />
          </div>

          {/* برچسب نوع کود */}
          <div className="absolute bottom-4 right-4 z-20">
            <div className={`px-4 py-2 bg-linear-to-r ${fertilizer.color} rounded-lg text-white font-semibold text-sm`}>
              {fertilizer.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}