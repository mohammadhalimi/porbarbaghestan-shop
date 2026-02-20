export function ProductsSkeleton() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* هدر اسکلتون */}
            <div className="bg-linear-to-r from-emerald-600 to-teal-500 py-16">
                <div className="container mx-auto px-4">
                    <div className="w-96 h-12 bg-white/20 rounded-lg animate-pulse mb-4"></div>
                    <div className="w-2/3 h-6 bg-white/20 rounded-lg animate-pulse"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* فیلتر اسکلتون */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8">
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* محصولات اسکلتون */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}