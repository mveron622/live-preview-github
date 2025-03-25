"use client";

import { useEffect, useState } from "react";
import { getEntryByUrl } from "../sdk/entry";
import { useParams } from "next/navigation";
import ProductImages from "./pdp/ProductImages";
import ProductHeader from "./pdp/ProductHeader";
import ScentNotes from "./pdp/ScentNotes";
import ProductInformationRow from "./pdp/ProductInformationRow";
import DeliveryOptions from "./pdp/DeliveryOptions";
import StorytellingVideo from "./pdp/StorytellingVideo";
import Navigation from "./navigation/Navigation";
import AppBottomNav from "./navigation/AppBottomNav";

const DisplayPage = () => {
  const [components, setComponents] = useState<any[]>([]);

  // URL params
  const params = useParams(); // This returns the parameters from the route
  const slug = params.slug ?? []; // `slug` is an array of path segments
  const slugForUseInQuery = Array.isArray(slug)
    ? slug.join("/").toString()
    : slug.toString();

  useEffect(() => {
    const fetchData = async () => {
      // Set the Content Type UID
      const contentTypeUid = "mobile_app_pdp";

      // Get a mobile app pdp page entry by url
      const entry: any = await getEntryByUrl({
        contentTypeUid: "mobile_app_pdp",
        entryUrl: slugForUseInQuery,
        referenceFieldPath: [
          "pdp_page_components.product_images.product_images",
          "pdp_page_components.product_header.product_header",
          "pdp_page_components.scent_notes.scent_notes",
          "pdp_page_components.product_information_row.product_information_row",

          // Product information row.
          "pdp_page_components.product_information_row.product_information_row.product_information_row.overview.overview_reference_cta",
          "pdp_page_components.product_information_row.product_information_row.product_information_row.usage.overview_reference_cta",
          "pdp_page_components.product_information_row.product_information_row.product_information_row.ingredients.ingredients_reference_cta",

          // Aligns with ACN sandbox.
          "pdp_page_components.product_information_row.product_information_row.modular_blocks.overview.reference",
          "pdp_page_components.product_information_row.product_information_row.modular_blocks.usage.reference",
          "pdp_page_components.product_information_row.product_information_row.modular_blocks.ingredients.reference",

          "pdp_page_components.delivery_options.delivery_options",
          "pdp_page_components.storytelling_video.storytelling_video",
          "pdp_page_components.product_carousel.pdp_product_carousel",
          "pdp_page_components.highlights.highlights",
          "pdp_page_components.by_social_content.by_social_content",
        ],
        jsonRtePath: undefined,
      });

      // Iterate over each component in pdp_page_components and dynamically push to state
      const newComponents: any[] = [];

      entry?.[0]?.pdp_page_components?.forEach((component: any) => {
        if (
          component?.product_images?.product_images?.[0]?.pdp_product_images
        ) {
          newComponents.push({
            type: "product_images",
            data: component?.product_images?.product_images?.[0]
              .pdp_product_images,
          });
        }
        if (component?.product_header) {
          newComponents.push({
            type: "product_header",
            data: component?.product_header,
          });
        }
        if (component?.scent_notes) {
          newComponents.push({
            type: "scent_notes",
            data: component?.scent_notes,
          });
        }
        if (component?.product_information_row?.product_information_row) {
          component?.product_information_row?.product_information_row?.[0]?.product_information_row?.forEach(
            (item: any) => {
              if (item?.overview) {
                newComponents.push({ type: "overview", data: item?.overview });
              }
              if (item?.usage) {
                newComponents.push({ type: "usage", data: item?.usage });
              }
              if (item?.ingredients) {
                newComponents.push({
                  type: "ingredients",
                  data: item?.ingredients,
                });
              }
            }
          );
        }
        if (component?.product_information_row?.product_information_row) {
          component?.product_information_row?.product_information_row?.[0]?.modular_blocks?.forEach(
            (item: any) => {
              if (item?.overview) {
                newComponents.push({ type: "overview", data: item?.overview });
              }
              if (item?.usage) {
                newComponents.push({ type: "usage", data: item?.usage });
              }
              if (item?.ingredients) {
                newComponents.push({
                  type: "ingredients",
                  data: item?.ingredients,
                });
              }
            }
          );
        }
        if (component?.delivery_options) {
          newComponents.push({
            type: "delivery_options",
            data: component?.delivery_options,
          });
        }
        if (component?.storytelling_video) {
          newComponents.push({
            type: "storytelling_video",
            data: component?.storytelling_video,
          });
        }
      });

      // Set the components array in state
      setComponents(newComponents);
    };

    fetchData();
  }, [slugForUseInQuery]);

  return (
    <div>
      {/* Render each component dynamically */}
      {components.map((component, index) => {
        switch (component.type) {
          case "product_images":
            return (
              <ProductImages key={index} product_images={component.data} />
            );
          case "product_header":
            return (
              <ProductHeader key={index} product_header={component.data} />
            );
          case "scent_notes":
            return <ScentNotes key={index} scent_notes={component.data} />;
          case "overview":
            return (
              <ProductInformationRow
                key={index}
                product_information={component.data}
                type="overview"
              />
            );
          case "usage":
            return (
              <ProductInformationRow
                key={index}
                product_information={component.data}
                type="usage"
              />
            );
          case "ingredients":
            return (
              <ProductInformationRow
                key={index}
                product_information={component.data}
                type="ingredients"
              />
            );
          case "delivery_options":
            return (
              <DeliveryOptions key={index} delivery_options={component.data} />
            );
          case "storytelling_video":
            return (
              <StorytellingVideo
                key={index}
                storytelling_video={component.data}
              />
            );
          default:
            return null;
        }
      })}
      <div className="pt-8"></div>
      {/* <Navigation /> */}
      <AppBottomNav />
    </div>
  );
};

export default DisplayPage;
