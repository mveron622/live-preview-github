export type MediaType = {
    media_type: 'Image' | 'Video';
};
  
export type ImageAsset = {
    uid: string;
    created_at: string;
    updated_at: string;
    content_type: string;
    file_size: string;
    filename: string;
    url: string;
    title: string;
    dimension?: {
      height: number;
      width: number;
    };
    publish_details: Array<{
      environment: string;
      locale: string;
      time: string;
      user: string;
      version: number;
    }>;
  };
  
  export type ImageFile = {
    uid: string;
    _content_type_uid: string;
    metadata: {
      extension_uid: string;
    };
    asset: ImageAsset;
  };
  
  export type Image = {
    image_file: ImageFile | null;
  };
  
  export type Video = {
    video_file: {
      url: string;
    };
  };
  
  export type BadgePlacement = {
    video_badge_placement: string | null;
    image_badge_placement: string | null;
  };
  
  export type ColorPalette = {
    color_palette: string;
  };
  
  export type ColorContrast = {
    color_contrast: string;
  };
  
  export type ThematicCardTypeFields = {
    headline: string;
    body: string;
    link_type: {
      link_type: string | null;
    };
    internal_link_pages: {
      internal_link_pages: Array<unknown>;
    };
  };
  
  export type CTALabel = {
    cta_label: string;
  };
  
  export type PricePoint = {
    price_point_dollars: number;
    price_point_cents: number;
    form: string;
    _metadata: {
      uid: string;
    };
  };
  
  export type MultiPricePromoFields = {
    title: string;
    urgency: {
      urgency: string;
    };
    channel: {
      channel: string;
    };
    promotion_headline: string;
    price_point: PricePoint[];
    promotion_details: {
      promotion_details: string;
    };
    include_disclaimer: boolean;
    disclaimer: {
      disclaimer_headline: string;
      disclaimer_body: string;
    };
    internal_link_pages: {
      internal_link_pages: any[];
    };
    uid: string;
  };
  
  export type MultiPricePromotionReference = {
    uid: string;
    _content_type_uid: "multi_price_promotion";
  };
  
  export interface PromotionFields {
    title: string;
    urgency: {
      urgency: string;
    };
    channel: {
      channel: string;
    };
    promotion_type: string;
    promotion_headline: string;
    form_headline: string;
    price_point: {
      price_point_dollars: number | null;
      price_point_cents: number | null;
    };
    global_field: {
      promotion_details: string;
    };
    include_disclaimer: boolean;
    disclaimer: {
      disclaimer_headline: string;
      disclaimer_body: string;
    };
    internal_link_pages: {
      internal_link_pages: any[];
    };
    uid: string;
  }
  
  export interface PromotionReference {
    uid: string;
    _content_type_uid: string;
  }
  
  export interface AssetWithTextBlockLargeCardProps {
    _content_type_uid: string;
    title: string;
    card_type: 'thematic' | 'multi-price promo' | 'promo';
    thematic_card_type_fields?: {
      body: string;
      link_type: {
        link_type: string;
      };
    };
    multi_price_promotion?: MultiPricePromotionReference[];
    promotion?: PromotionReference[];
    cta_label: {
      cta_label: string;
    };
    image: {
      image_file: {
        asset: {
          url: string;
        };
      };
    };
    color_palette: {
      color_palette: string;
    };
    color_contrast: {
      color_contrast: string;
    };
  }

  // Top Offers Carousel
  export interface TopOffersCarouselProps {
    _content_type_uid: "top_offers_carousel";
    title: string;
    top_offers_carousel_headline: string;
    background_with_image_cards: BackgroundWithImageCardReference[];
  }

  // Recommendation Carousel
  export interface RecommendationCarouselProps {
    _content_type_uid: "recommendation_carousel";
    title: string;
    recommendation_headline: string;
    recommendations?: Array<{
      title: string;
      image: Image;
      description: string;
      price?: string;
    }>;
  }

  // Video Large Card
  export interface VideoLargeCardProps {
    _content_type_uid: "video_large_card";
    title: string;
    card_type: string;
    video: {
      video_file: Array<any>;
    };
    description?: string;
    thumbnail?: Image;
  }

  // Visual Navigation Carousel
  export interface VisualNavigationCarouselProps {
    _content_type_uid: "visual_navigation_carousel";
    title: string;
    headline: string;
    visual_navigation_carousel: Array<{
      plp: Array<{
        uid: string;
        _content_type_uid: string;
      }>;
      _metadata: any;
      product_image_override: {
        image_file: {
          asset: {
            url: string;
          };
        };
      };
    }>;
  }

  export type PageComponent =
    | AssetWithTextBlockLargeCardProps
    | TopOffersCarouselProps
    | RecommendationCarouselProps
    | VideoLargeCardProps
    | VisualNavigationCarouselProps;

  export interface BackgroundWithImageCardFields {
    title: string;
    header_type: string;
    page_description: string;
    promotion: {
      uid: string;
      _content_type_uid: string;
    }[];
    foreground_images: {
      plp_header_image: {
        image_file: null;
      };
      nav_image: {
        image_file: {
          asset: {
            url: string;
          };
        };
      };
    };
    foreground_image_placement: string | null;
    background_type: string;
    background_image: {
      image_file: null;
    };
    color_palette: {
      color_palette: string;
    };
    color_contrast: {
      color_contrast: string;
    };
    uid: string;
  }

  export interface BackgroundWithImageCardReference {
    uid: string;
    _content_type_uid: string;
  }