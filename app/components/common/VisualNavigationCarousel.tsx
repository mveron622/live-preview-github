import React, { useEffect, useState, useRef } from 'react';
import { VisualNavigationCarouselProps } from './types';
import { getEntryByUID } from '../../sdk/entry';

interface PLPDetails {
  title: string;
  page_title: string;
  url: string;
  category_picker: {
    data: Array<any>;
  };
}

const VisualNavigationCarousel: React.FC<Omit<VisualNavigationCarouselProps, '_content_type_uid'>> = ({
  headline,
  visual_navigation_carousel
}) => {
  const [plpDetails, setPlpDetails] = useState<PLPDetails[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(visual_navigation_carousel.length / itemsPerSlide);

  // Drag functionality
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchPlpDetails = async () => {
      try {
        const details = await Promise.all(
          visual_navigation_carousel.map(item => 
            getEntryByUID({
              contentTypeUid: 'plp',
              entryUid: item.plp[0].uid,
              referenceFieldPath: undefined,
              jsonRtePath: undefined
            })
          )
        );
        setPlpDetails(details as PLPDetails[]);
      } catch (error) {
        console.error('Error fetching PLP details:', error);
      }
    };

    fetchPlpDetails();
  }, [visual_navigation_carousel]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.scrollLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!carouselRef.current) return;
    const slideWidth = 132 + 8; // width + gap
    const newScrollLeft = carouselRef.current.scrollLeft;
    const slideIndex = Math.round(newScrollLeft / slideWidth);
    setCurrentSlide(Math.max(0, Math.min(slideIndex, totalSlides - 1)));
  };

  // Touch Events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    const slideWidth = carouselRef.current.offsetWidth;
    const newScrollLeft = scrollLeft - walk;
    
    // Calculate which slide to snap to
    const slideIndex = Math.round(newScrollLeft / slideWidth);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(Math.max(0, Math.min(slideIndex, totalSlides - 1)));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse events
  useEffect(() => {
    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseleave', handleMouseLeave);
      carousel.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('mouseleave', handleMouseLeave);
        carousel.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);

  return (
    <div className="pl-[16px] py-[24px]">
      <h2 className="text-2xl font-bold mb-[17px] text-inverted">{headline}</h2>
      
      <div className="relative">
        {/* Carousel Navigation Buttons */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute -left-[12px] top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute -right-[12px] top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Carousel Content */}
        <div 
          ref={carouselRef}
          className="overflow-hidden cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`flex gap-[8px] transition-transform duration-300 ease-in-out ${isDragging ? 'cursor-grabbing' : ''}`}
            style={{
              transform: `translateX(-${currentSlide * ((132 + 8) * itemsPerSlide)}px)`,
            }}
          >
            {plpDetails.map((plp, index) => (
              <div 
                key={plp.url}
                style={{ width: '132px', flexShrink: 0 }}
              >
                <a 
                  href={plp.url}
                  className="block bg-white rounded-lg py-[24px] px-[8px] overflow-hidden text-center border border-[#0002]"
                  onClick={(e) => isDragging && e.preventDefault()}
                >
                  {visual_navigation_carousel[index]?.product_image_override?.image_file?.asset?.url && (
                    <img
                      src={visual_navigation_carousel[index].product_image_override.image_file.asset.url}
                      alt={plp.title}
                      className="w-full h-32 object-contain mb-[20px]"
                      draggable={false}
                    />
                  )}
                  <h3 className="text-sm font-medium text-inverted">{plp.page_title}</h3>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-inverted' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualNavigationCarousel; 