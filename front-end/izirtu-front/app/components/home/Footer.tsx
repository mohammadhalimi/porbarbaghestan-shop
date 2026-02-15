import { Phone, Mail, MapPin, Leaf } from 'lucide-react';
import { ReactNode } from 'react';
interface ContactItemProps {
  icon: ReactNode;
  text: string;
}
export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <AboutSection />
          <QuickLinks />
          <ServicesList />
          <ContactInfo />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}

function AboutSection() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center">
          <Leaf className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">پربار باغستان</h2>
          <p className="text-sm text-gray-400">متخصص کودهای کشاورزی</p>
        </div>
      </div>
      <p className="text-gray-400 mb-6">
        پیشرو در ارائه خدمات مشاوره تخصصی کودهای کشاورزی. ما با دانش روز و تجربه عملی، همراه شما در مسیر کشاورزی پایدار هستیم.
      </p>
    </div>
  );
}

function QuickLinks() {
  const links = ['خدمات تخصصی', 'انواع کودها', 'مقالات آموزشی', 'درباره ما', 'تماس با ما'];

  return (
    <div>
      <h3 className="text-lg font-bold mb-6">دسترسی سریع</h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item}>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServicesList() {
  const services = ['مشاوره خاک', 'برنامه کوددهی', 'مدیریت آبیاری', 'کشاورزی ارگانیک', 'مقاوم‌سازی محصول'];

  return (
    <div>
      <h3 className="text-lg font-bold mb-6">خدمات ما</h3>
      <ul className="space-y-3">
        {services.map((item) => (
          <li key={item}>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactInfo() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6">ارتباط با ما</h3>
      <ul className="space-y-4">
        <ContactItem icon={<Phone className="w-5 h-5" />} text="۰۲۱-۱۲۳۴۵۶۷۸" />
        <ContactItem icon={<Mail className="w-5 h-5" />} text="info@agrofert.ir" />
        <ContactItem icon={<MapPin className="w-5 h-5" />} text="تهران، خیابان ولیعصر" />
      </ul>
    </div>
  );
}

function ContactItem({ icon, text } : ContactItemProps) {
  return (
    <li className="flex items-center gap-3 text-gray-400">
      {icon}
      <span>{text}</span>
    </li>
  );
}

function FooterBottom() {
  return (
    <div className="border-t border-gray-800 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} پربار باغستان. تمامی حقوق محفوظ است.
        </p>
        <p className="text-gray-500 text-sm mt-4 md:mt-0">
          این سایت فروش آنلاین ندارد و صرفاً ارائه‌دهنده خدمات مشاوره‌ای تخصصی است.
        </p>
      </div>
    </div>
  );
}