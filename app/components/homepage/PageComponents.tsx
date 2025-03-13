import React from 'react';
import { 
  PageComponent, 
  AssetWithTextBlockLargeCardProps,
  TopOffersCarouselProps,
  RecommendationCarouselProps,
  VideoLargeCardProps,
  VisualNavigationCarouselProps
} from '../common/types';
import AssetWithTextBlockLargeCard from '../common/AssetWithTextBlockLargeCard';
import TopOffersCarousel from '../common/TopOffersCarousel';
import VideoLargeCard from '../common/VideoLargeCard';
import VisualNavigationCarousel from '../common/VisualNavigationCarousel';

const PageComponents = ({ component }: { component: PageComponent }) => {
  switch (component._content_type_uid) {
    case "asset_with_text_block_large_card": {
      const assetCard = component as AssetWithTextBlockLargeCardProps;
      return (
        <AssetWithTextBlockLargeCard 
          title={assetCard.title}
          card_type={assetCard.card_type}
          thematic_card_type_fields={assetCard.thematic_card_type_fields}
          multi_price_promotion={assetCard.multi_price_promotion}
          promotion={assetCard.promotion}
          cta_label={assetCard.cta_label}
          image={assetCard.image}
          color_palette={assetCard.color_palette}
          color_contrast={assetCard.color_contrast}
        />
      );
    }

    case "top_offers_carousel": {
      const topOffers = component as TopOffersCarouselProps;
      return (
        <TopOffersCarousel
          _content_type_uid={topOffers._content_type_uid}
          title={topOffers.title}
          top_offers_carousel_headline={topOffers.top_offers_carousel_headline}
          background_with_image_cards={topOffers.background_with_image_cards}
        />
      );
    }

    case "recommendation_carousel": {
      const recommendations = component as RecommendationCarouselProps;
      return (
        <div className="px-[16px] py-[24px]">
          <h2 className="text-2xl font-bold mb-[16px] text-inverted">{recommendations.recommendation_headline}</h2>
          <div className='rounded-md overflow-hidden border border-[#0002] h-[200px]'>
            <p className='text-inverted text-lg text-center'>Recommendation Carousel</p>
          </div>
        </div>
      );
    }

    case "video_large_card": {
      const videoCard = component as VideoLargeCardProps;
      return (
        <VideoLargeCard
          title={videoCard.title}
          card_type={videoCard.card_type}
          video={videoCard.video}
          description={videoCard.description}
          thumbnail={videoCard.thumbnail}
        />
      );
    }

    case "visual_navigation_carousel": {
      const visualNav = component as VisualNavigationCarouselProps;
      return (
        <VisualNavigationCarousel
          title={visualNav.title}
          visual_navigation_carousel={visualNav.visual_navigation_carousel}
          headline={visualNav.headline}
        />
      );
    }

    default:
      return null;
  }
};

export default PageComponents;
