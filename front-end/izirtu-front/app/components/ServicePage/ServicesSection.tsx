// components/ServicesSection.tsx
import { ServicesSectionProps } from './type/ServicesSectionProps';
import { ServiceDetail } from './ServiceDetail/ServiceDetail';

export default function ServicesSection({ 
  services, 
  activeService, 
  onServiceChange 
}: ServicesSectionProps) {
  const activeServiceData = services.find(service => service.id === activeService);

  return (
    <section id="services" className="py-20 bg-linear-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              خدمات تخصصی
            </span>
            <br />
            ما برای موفقیت شما
          </h2>
          <p className="text-gray-600 text-lg">
            از تشخیص نیازهای خاک تا برنامه‌ریزی دقیق کوددهی، همراه شما هستیم
          </p>
        </div>
        
        {/* تب‌های خدمات */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => onServiceChange(service.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  activeService === service.id
                    ? `bg-linear-to-r ${service.gradient} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <service.Icon className="w-5 h-5" />
                {service.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* محتوای خدمات فعال */}
        {activeServiceData && (
          <ServiceDetail service={activeServiceData} />
        )}
      </div>
    </section>
  );
}



