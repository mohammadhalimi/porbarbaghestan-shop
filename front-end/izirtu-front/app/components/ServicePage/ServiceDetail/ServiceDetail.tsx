// components/ServiceDetail.tsx
import { CheckCircle, Phone } from "lucide-react";
import { ServiceDetailProps } from "../type/ServiceDetailProps";
import Image from "next/image";

export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="bg-linear-to-br from-white to-emerald-50/50 rounded-3xl p-8 md:p-12 shadow-xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* محتوای متنی */}
        <div>
          <div className={`w-20 h-20 bg-linear-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
            <service.Icon className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {service.title}
          </h3>

          <p className="text-gray-600 mb-8 text-lg">
            {service.description}
          </p>

          {/* جزئیات خدمات */}
          <div className="mb-8">
            <h4 className="font-bold text-gray-900 mb-4">جزئیات خدمات:</h4>
            <ul className="space-y-2">
              {service.details.map((detail, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-600">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ویژگی‌ها */}
          <div className="flex flex-wrap gap-3 mb-8">
            {service.features.map((feature, index) => (
              <span
                key={index}
                className={`px-4 py-2 bg-linear-to-r ${service.gradient} bg-opacity-10 text-white rounded-lg font-medium`}
              >
                {feature}
              </span>
            ))}
          </div>

          <button className="group relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-semibold overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              درخواست این خدمت
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* بخش تصویر - کاملاً داینامیک */}
        <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
          <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-30 z-10`}></div>
          
          {/* تصویر مرتبط با سرویس */}
          <div className="absolute inset-0">
            <Image
              src={service.imageUrl}
              alt={service.imageAlt}
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* افکت سبز برای تصویر */}
          <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-30 mix-blend-multiply`}></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold opacity-10">🌿</div>
          </div>

          {/* برچسب */}
          <div className="absolute top-6 right-6">
            <div className={`px-4 py-2 bg-linear-to-r ${service.gradient} rounded-lg text-white font-semibold text-sm backdrop-blur-sm`}>
              {service.title}
            </div>
          </div>
          
          {/* افکت تزیینی */}
          <div className="absolute bottom-4 left-4">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}