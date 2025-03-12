import { useEffect, useState } from "react";

interface AssetWithTextBlockLargeCardProps {
  _content_type_uid: "asset_with_text_block_large_card";
  title: string;
  image?: {
    image_file: {
      asset: {
        url: string;
      };
    };
  };
  video?: {
    video_file: {
      url: string;
    };
  };
  thematic_card_type_fields: {
    headline: string;
    body: string;
  };
}

interface TopOffersCarouselProps {
  _content_type_uid: "top_offers_carousel";
  title: string;
  top_offers_carousel_headline: string;
  background_with_image_cards: any[];
}

interface RecommendationCarouselProps {
  _content_type_uid: "recommendation_carousel";
  title: string;
  recommendation_headline: string;
}

interface VideoLargeCardProps {
  _content_type_uid: "video_large_card";
  title: string;
  card_type: string;
  video: { video_file_link: { url: string } };
}

interface VisualNavigationCarouselProps {
  _content_type_uid: "visual_navigation_carousel";
  headline: string;
  visual_navigation_carousel: any[];
}

type PageComponent =
  | AssetWithTextBlockLargeCardProps
  | TopOffersCarouselProps
  | RecommendationCarouselProps
  | VideoLargeCardProps
  | VisualNavigationCarouselProps;

const PageComponents = ({ component }: { component: PageComponent }) => {
  switch (component._content_type_uid) {
    case "asset_with_text_block_large_card":
      return (
        <div>
          {component.image?.image_file?.asset?.url && (
            <img
              src={component.image.image_file.asset.url}
              alt={component.title}
            />
          )}
          {component.video?.video_file?.url && (
            <video
              src={component.video.video_file.url}
              controls
              width="320"
              height="240"
            />
          )}
          <h2>{component.thematic_card_type_fields.headline}</h2>
          <p>{component.thematic_card_type_fields.body}</p>
        </div>
      );

    case "top_offers_carousel":
      return (
        <div>
          <h2>{component.top_offers_carousel_headline}</h2>
        </div>
      );

    case "recommendation_carousel":
      return (
        <div>
          <h2>{component.recommendation_headline}</h2>
        </div>
      );

    case "video_large_card":
      return (
        <div>
          <video
            src={component?.video?.video_file_link?.url}
            controls
            width="320"
            height="240"
          />
          <h2>{component.title}</h2>
        </div>
      );

    case "visual_navigation_carousel":
      return (
        <div>
          <h2>{component.headline}</h2>
        </div>
      );

    default:
      return null;
  }
};

export default PageComponents;
