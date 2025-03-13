import React, { useEffect, useState } from 'react';
import { AssetWithTextBlockLargeCardProps, MultiPricePromoFields, PromotionFields } from './types';
import { getEntryByUID } from '../../sdk/entry';

const AssetWithTextBlockLargeCard: React.FC<Omit<AssetWithTextBlockLargeCardProps, '_content_type_uid'>> = ({
  title,
  card_type,
  thematic_card_type_fields,
  multi_price_promotion,
  promotion,
  cta_label,
  image,
  color_palette,
  color_contrast
}) => {
  const [promoDetails, setPromoDetails] = useState<MultiPricePromoFields | null>(null);
  const [promotionDetails, setPromotionDetails] = useState<PromotionFields | null>(null);

  useEffect(() => {
    const fetchPromoDetails = async () => {
      if (card_type === 'multi-price promo' && multi_price_promotion && multi_price_promotion.length > 0) {
        try {
          const details = await getEntryByUID({
            contentTypeUid: 'multi_price_promotion',
            entryUid: multi_price_promotion[0].uid,
            referenceFieldPath: undefined,
            jsonRtePath: undefined
          });
          setPromoDetails(details as MultiPricePromoFields);
        } catch (error) {
          console.error('Error fetching promotion details:', error);
        }
      }

      if (card_type === 'promo' && promotion && promotion.length > 0) {
        try {
          const details = await getEntryByUID({
            contentTypeUid: 'promotion',
            entryUid: promotion[0].uid,
            referenceFieldPath: undefined,
            jsonRtePath: undefined
          });
          setPromotionDetails(details as PromotionFields);
        } catch (error) {
          console.error('Error fetching promotion details:', error);
        }
      }
    };

    fetchPromoDetails();
  }, [card_type, multi_price_promotion, promotion]);

  // Parse color palette and determine colors based on contrast setting
  const colors = color_palette.color_palette.split(',');
  const isLightBackground = color_contrast.color_contrast === 'light-background-dark-text';
  
  const backgroundColor = isLightBackground ? colors[0] : colors[2];
  const textColor = isLightBackground ? 'text-inverted' : 'text-white';
  const linkBackgroundColor = isLightBackground ? 'bg-inverted' : 'bg-white';
  const linkTextColor = isLightBackground ? 'text-white' : 'text-inverted';

  const renderThematicContent = () => (
    <>
      <p className="text-2xl font-bold mb-[8px]">{title}</p>
      <p className="mb-[24px]">{thematic_card_type_fields?.body}</p>
      <a 
        href={thematic_card_type_fields?.link_type?.link_type || '#'} 
        className={`inline-block px-[20px] py-[12px] rounded-md font-medium transition-colors ${linkBackgroundColor} ${linkTextColor}`}
      >
        {cta_label.cta_label}
      </a>
    </>
  );

  const renderMultiPricePromoContent = () => {
    if (!promoDetails) return null;
    
    return (
      <>
        {promoDetails.urgency.urgency && (
          <p className="text-sm mb-[8px]">{promoDetails.urgency.urgency}</p>
        )}
        <h2 className="text-2xl font-bold mb-[24px]">{promoDetails.promotion_headline}</h2>
        <div className="grid grid-cols-2 gap-6 mb-[24px]">
          {promoDetails.price_point.map((price) => (
            <div key={price._metadata.uid} className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl font-bold leading-none mb-auto" style={{ verticalAlign: 'super' }}>$</span>
                <span className="text-5xl font-bold leading-none">{price.price_point_dollars}</span>
                {price.price_point_cents > 0 && (
                  <span className="text-xl font-bold leading-none mb-auto" style={{ verticalAlign: 'super' }}>{price.price_point_cents}</span>
                )}
              </div>
              <p className="mt-2">{price.form}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <a 
            href="#" 
            className={`inline-block px-[20px] py-[12px] rounded-md font-medium transition-colors ${linkBackgroundColor} ${linkTextColor}`}
          >
            Shop now
          </a>
          <a 
            href="#" 
            className={`inline-block px-[20px] py-[12px] rounded-md font-medium transition-colors border-2 ${textColor}`}
          >
            Details
          </a>
        </div>
      </>
    );
  };

  const renderPromotionContent = () => {
    if (!promotionDetails) return null;
    
    return (
      <>
        {promotionDetails.urgency.urgency && (
          <p className="text-sm mb-[8px]">{promotionDetails.urgency.urgency}</p>
        )}
        <h2 className="text-2xl font-bold mb-[8px]">{promotionDetails.promotion_headline}</h2>
        <div className="mb-[24px]">
          <div className="flex items-center mb-[8px]">
            <span className="text-xl font-bold leading-none mb-auto" style={{ verticalAlign: 'super' }}>$</span>
            <span className="text-5xl font-bold leading-none">3</span>
            <span className="text-xl font-bold leading-none mb-auto" style={{ verticalAlign: 'super' }}>95</span>
          </div>
          <p className={`${textColor}`}>{promotionDetails.global_field.promotion_details}</p>
        </div>
        <div className="flex gap-4">
          <a 
            href="#" 
            className={`inline-block px-[20px] py-[12px] rounded-md font-medium transition-colors ${linkBackgroundColor} ${linkTextColor}`}
          >
            Shop now
          </a>
          <a 
            href="#" 
            className={`inline-block px-[20px] py-[12px] rounded-md font-medium transition-colors border-2 ${textColor}`}
          >
            Details
          </a>
        </div>
      </>
    );
  };

  return (
    <div className="mx-[16px] my-[48px] rounded-2xl overflow-hidden" style={{ backgroundColor }}>
      <div className="overflow-hidden">
        {image?.image_file && (
          <img
            src={image.image_file.asset.url}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className={`px-[24px] py-[32px] ${textColor}`}>
        {card_type === 'thematic' 
          ? renderThematicContent() 
          : card_type === 'multi-price promo'
          ? renderMultiPricePromoContent()
          : renderPromotionContent()}
      </div>
    </div>
  );
};

export default AssetWithTextBlockLargeCard; 