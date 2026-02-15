import { ServiceCardProps } from "./type/ServiceCardProps";

export default function ServiceCard({ gradient, Icon, title, description }: ServiceCardProps) {
    return (
        <div className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer`}>
            <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}></div>
            <div className={`w-16 h-16 bg-linear-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}