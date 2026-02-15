export interface SliderControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSlideTo: (index: number) => void;
}
