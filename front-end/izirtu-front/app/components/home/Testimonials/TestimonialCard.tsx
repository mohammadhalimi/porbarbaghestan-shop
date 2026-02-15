import { TestimonialCardProps } from "./type/TestimonialCardProps";

export default function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <div className={`p-8 transition-all duration-500 ${isActive ? 'scale-100' : 'scale-95'}`}>
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="shrink-0">
          </div>
          <div className="flex-1">
            <p className="text-gray-700 text-lg mb-6">{testimonial.content}</p>
            <div>
              <div className="font-bold text-gray-900">{testimonial.name}</div>
              <div className="text-gray-500">{testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}