"use client";

import { useEffect, useState } from "react";
import { getEntryByUrl, getEntryByUID } from "../sdk/entry";
import { useParams } from "next/navigation";
import PLPHeader from './plp/PLPHeader';
import React from "react";
import VideoLargeCard from './common/VideoLargeCard';
import AssetWithTextBlockLargeCard from './common/AssetWithTextBlockLargeCard';
import FeaturedProductLargeCard from './common/FeaturedProductLargeCard';

const DisplayPlpPage = () => {
  const [components, setComponents] = useState<any[]>([]);
  const [header, setHeader] = useState<any>(null);
  const [entry, setEntry] = useState<any>(null);

  // URL params
  const params = useParams(); // This returns the parameters from the route
  const slug = params.slug ?? []; // `slug` is an array of path segments
  const slugForUseInQuery = Array.isArray(slug)
    ? slug.join("/").toString()
    : slug.toString();

  useEffect(() => {
    const fetchData = async () => {
      // Set the Content Type UID
      const contentTypeUid = "plp";

      // Get a mobile app pdp page entry by url
      const entry: any = await getEntryByUrl({
        contentTypeUid: "plp",
        entryUrl: slugForUseInQuery,
        referenceFieldPath: [
          "child_plps",
          "grid_page_cards.grid_page_card",
          "header",
        ],
        jsonRtePath: undefined,
      });

      if (entry?.[0]?.header && entry[0].header.length > 0) {
        const headerEntry = await getEntryByUID({
          contentTypeUid: entry[0].header[0]._content_type_uid,
          entryUid: entry[0].header[0].uid,
          referenceFieldPath: undefined,
          jsonRtePath: undefined,
        });
        setHeader(headerEntry);
      } else {
        setHeader([]);
      }

      // Iterate over each component in plp_page_components and dynamically push to state
      const newComponents: any[] = [];
      if (entry?.[0]?.grid_page_cards.length > 0) {
        for (const component of entry[0].grid_page_cards) {
          if (component?.grid_page_card.length > 0) {
            newComponents.push({
              data: component.grid_page_card,
              grid_page_card_placement: component.grid_page_card_placement,
            });
          }
        }
      }

      setComponents(newComponents);
      setEntry(entry);
    };

    fetchData();
  }, [slugForUseInQuery]);

  const headerType = entry?.[0]?.header?.[0]?._content_type_uid;
  const headerImageUrl = headerType === 'background_with_image_card' ? header?.foreground_images?.plp_header_image?.image_file?.asset?.url : headerType === 'nav_featured_card' ? header?.foreground_image?.image_file?.asset?.url : header?.images?.plp_header_image?.image_file?.asset?.url || header?.images?.nav_image?.image_file?.asset?.url || '';

  const imagePlacement = headerType === 'nav_featured_card' ? 'bottom right' : header?.foreground_image_placement || 'right';

  const isFullAssetCard = headerType === 'full_asset_card';
  const colorContrast = isFullAssetCard ? header?.extended_color_contrast?.extended_color_contrast : header?.color_contrast?.color_contrast;

  const headerHeight = isFullAssetCard ? 'auto' : '300px';

  const textColor = entry?.[0]?.header.length === 0 ? 'black' : (colorContrast === 'light-background-dark-text' ? header?.color_palette?.color_palette.split(',')[2] : 'white');

  // Sort components by grid_page_card_placement
  components.sort((a, b) => a.grid_page_card_placement - b.grid_page_card_placement);

  let lastPlacement = 0;

  return (
    <>
      {entry && header ? (
        <PLPHeader
          title={entry?.[0]?.page_title || 'Untitled Page'}
          headerImageUrl={headerImageUrl}
          backgroundColor={header?.color_palette?.color_palette || 'white'}
          textColor={textColor}
          imagePlacement={imagePlacement}
          color_contrast={colorContrast}
          headerHeight={headerHeight}
          headerType={headerType}
        />
      ) : entry === null ? (
        <div>Loading...</div>
      ) : (
        <div>Error loading page</div>
      )}
      <div className="px-[16px] py-[24px]">
      {components.map((component, index) => {
        const placement = component.grid_page_card_placement || 0;
        const gap = placement - lastPlacement - 1;
        const divs = Array.from({ length: gap }, (_, i) => (
          <div key={`gap-${index}-${i}`} className="h-[200px] w-full my-[24px] rounded-lg border-[1px] border-gray-300 shadow-md text-gray-300">
            <div className="p-4">Product Placeholder</div>
          </div>
        ));

        lastPlacement = placement;

        let cardComponent;
        const card = component.data[0]; // Assuming component.data is a single element

        switch (card._content_type_uid) {
          case "video_large_card":
            const colorPalette = card.card_type === 'Shoppable Video' ? card.shoppable_video.color_palette.color_palette : card.color_palette.color_palette;
            const extendedColorContrast = card.card_type === 'Shoppable Video' ? card.shoppable_video.extended_color_contrast.extended_color_contrast : card.extended_color_contrast.extended_color_contrast;
            cardComponent = <VideoLargeCard key={card.uid} cardData={{ ...card, color_palette: colorPalette, extended_color_contrast: extendedColorContrast }} />;
            break;
          case "asset_with_text_block_large_card":
            cardComponent = <AssetWithTextBlockLargeCard key={card.uid} 
              title={card.title}
              card_type={card.card_type}
              thematic_card_type_fields={card.thematic_card_type_fields}
              multi_price_promotion={card.multi_price_promotion}
              promotion={card.promotion}
              cta_label={card.cta_label}
              image={card.image}
              color_palette={card.color_palette}
              color_contrast={card.color_contrast}
            />;
            break;
          case "featured_product_large_card":
            cardComponent = (
              <div style={{ position: 'relative' }}>
                <FeaturedProductLargeCard key={card.uid} 
                  title={card.title}
                  image={card.image.image_file.asset.url}
                  product={card.product_picker.data[0]}
                  description={card.description}
                  color_palette={card.color_palette.color_palette}
                  extended_color_contrast={card.extended_color_contrast.extended_color_contrast} 
                />
              </div>
            );
            break;
          default:
            cardComponent = <div className="bg-gray-200 h-32 w-full"></div>; // Default rectangular color box
        }

        return (
          <React.Fragment key={`card-${index}`}>
            {divs}
            {cardComponent}
          </React.Fragment>
        );
      })}
      </div>
    </>
  );
};

export default DisplayPlpPage;
