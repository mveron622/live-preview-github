import React, { useEffect, useState } from 'react';
import { TopOffersCarouselProps, BackgroundWithImageCardFields } from './types';
import { getEntryByUID } from '../../sdk/entry';

const TopOffersCarousel: React.FC<TopOffersCarouselProps> = ({
  title,
  top_offers_carousel_headline,
  background_with_image_cards
}) => {
  const [cardDetails, setCardDetails] = useState<BackgroundWithImageCardFields[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const details = await Promise.all(
          background_with_image_cards.map(card => 
            getEntryByUID({
              contentTypeUid: 'background_with_image_card',
              entryUid: card.uid,
              referenceFieldPath: undefined,
              jsonRtePath: undefined
            })
          )
        );
        setCardDetails(details as BackgroundWithImageCardFields[]);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCardDetails();
  }, [background_with_image_cards]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="px-[16px] py-[24px]">
      <h2 className="text-2xl font-bold mb-6 text-inverted">{top_offers_carousel_headline}</h2>
      
      <div className="relative">
        {/* Cards */}
        <div className="overflow-hidden rounded-sm">
          {cardDetails.map((card, index) => (
            <div 
              key={card.uid}
              className={`transition-opacity duration-300 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#0002]">
                <div className="flex pr-[24px] items-center gap-[16px]">
                  {/* Image */}
                  <div className="w-full">
                    <img
                      src={card.foreground_images.nav_image.image_file.asset.url}
                      alt={card.title}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-md font-bold mb-[8px] text-inverted">Buy 3, Get 3 Free</h3>
                    <p className="text-inverted text-sm">
                      All Full-Size Body, Skin & Hair Care Lowest-priced items are free
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {cardDetails.map((_, index) => (
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
      </div>
    </div>
  );
};

export default TopOffersCarousel; 