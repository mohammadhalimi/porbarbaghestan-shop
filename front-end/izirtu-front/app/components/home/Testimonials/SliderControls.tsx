import { ChevronLeft, ChevronRight } from "lucide-react";
import { SliderControlsProps } from "./type/SliderControlsProps";

export default function SliderControls({ currentSlide, totalSlides, onPrev, onNext, onSlideTo }: SliderControlsProps) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 cursor-pointer"
        aria-label="اسلاید قبلی"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 cursor-pointer"
        aria-label="اسلاید بعدی"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideTo(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${currentSlide === index
              ? 'bg-linear-to-r from-emerald-500 to-teal-400 w-8'
              : 'bg-gray-300'
              }`}
            aria-label={`رفتن به اسلاید ${index + 1}`}
            aria-current={currentSlide === index ? 'true' : 'false'}
          />
        ))}
      </div>
    </>
  );
}