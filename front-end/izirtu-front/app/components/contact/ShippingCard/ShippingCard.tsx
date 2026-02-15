import { ShippingCardProps } from "../type/ShippingCardProps";

export function ShippingCard({ item }: ShippingCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl`}></div>
      <div className="text-3xl mb-3">{item.icon}</div>
      <h5 className="font-bold text-gray-900 mb-2">{item.title}</h5>
      <p className="text-gray-600 text-sm">{item.details}</p>
    </div>
  );
}