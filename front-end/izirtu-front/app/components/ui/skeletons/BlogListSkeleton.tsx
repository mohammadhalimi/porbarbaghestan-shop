export default function BlogListSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* هدر */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-500 py-16">
        <div className="container mx-auto px-4">
          <div className="w-96 h-12 bg-white/20 rounded-lg animate-pulse mb-4"></div>
          <div className="w-2/3 h-6 bg-white/20 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* سایدبار اسکلتون */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 space-y-6 animate-pulse">
              {/* جستجو */}
              <div>
                <div className="w-24 h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
              
              {/* تگ‌ها */}
              <div>
                <div className="w-20 h-6 bg-gray-200 rounded mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-14 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </aside>

          {/* لیست مقالات اسکلتون */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                  {/* تصویر */}
                  <div className="h-48 bg-gray-200"></div>
                  
                  {/* محتوا */}
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    
                    {/* متا */}
                    <div className="flex gap-4 pt-2">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                    
                    {/* تگ‌ها */}
                    <div className="flex gap-2 pt-2">
                      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                      <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}