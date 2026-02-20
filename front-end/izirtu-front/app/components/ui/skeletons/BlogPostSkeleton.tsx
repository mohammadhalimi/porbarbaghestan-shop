export default function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* هدر اسکلتون */}
      <div className="relative h-96 bg-gray-200 animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            {/* دکمه بازگشت */}
            <div className="w-24 h-6 bg-gray-300 rounded mb-4"></div>
            
            {/* عنوان */}
            <div className="w-3/4 h-12 bg-gray-300 rounded mb-4"></div>
            <div className="w-1/2 h-12 bg-gray-300 rounded mb-6"></div>
            
            {/* متا اطلاعات */}
            <div className="flex gap-6">
              <div className="w-32 h-5 bg-gray-300 rounded"></div>
              <div className="w-32 h-5 bg-gray-300 rounded"></div>
              <div className="w-32 h-5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* بخش اصلی */}
          <div className="lg:col-span-3 space-y-6">
            {/* خلاصه */}
            <div className="bg-gray-100 h-24 rounded-lg animate-pulse"></div>
            
            {/* پاراگراف‌ها */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            {/* بخش محصولات مرتبط */}
            <div className="mt-8">
              <div className="w-48 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* سایدبار */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
              <div className="flex flex-wrap gap-2">
                <div className="w-16 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-20 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-14 h-8 bg-gray-300 rounded-full"></div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
                <div className="w-4/6 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}