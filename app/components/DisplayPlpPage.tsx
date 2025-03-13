"use client";

import { useEffect, useState } from "react";
import { getEntryByUrl } from "../sdk/entry";
import { useParams } from "next/navigation";
import StandardPlpHeader from "./plp/StandardPlpHeader";
import ContentCard from "./plp/ContentCard";
import GridPageCard from "./plp/GridPageCard";

const DisplayPlpPage = () => {
  const [components, setComponents] = useState<any[]>([]);
  console.log("PLP");

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
          "page_title",
          "grid_page_cards",
          "grid_page_cards.grid_page_card",
          "header",
        ],
        jsonRtePath: undefined,
      });

      console.log("Entry:", entry);

      // Iterate over each component in plp_page_components and dynamically push to state
      const newComponents: any[] = [];
      if (entry?.[0]?.page_title) {
        newComponents.push({
          type: "page_title",
          data: entry[0].page_title,
        });
      }

      entry?.[0]?.grid_page_cards?.forEach((component: any) => {
        if (component?.grid_page_card) {
          newComponents.push({
            type: "grid_page_card",
            data: component?.grid_page_card,
          });
        }
      });

      setComponents(newComponents);

      console.log("plp entry: ", entry);
    };

    fetchData();
  }, [slugForUseInQuery]);

  return (
    <>
      {components.map((component, index) => {
        switch (component.type) {
          case "page_title":
            return (
              <div key={index}>
                <h1>{component.data}</h1>
              </div>
            );
          case "grid_page_card":
            return <GridPageCard key={index} grid_page_card={component.data} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default DisplayPlpPage;
