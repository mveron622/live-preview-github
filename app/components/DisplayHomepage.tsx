"use client";

import { use, useEffect, useState } from "react";
import { getEntryByUrl } from "../sdk/entry";
import { useParams } from "next/navigation";
import AccountGreeting from "./homepage/AccountGreeting";
import HomeEnding from "./homepage/HomeEnding";
import AppBottomNav from "./navigation/AppBottomNav";
import PageComponents from "./homepage/PageComponents";

const DisplayHomepage = () => {
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
      const contentTypeUid = "app_homepage";

      // Get a mobile app pdp page entry by url
      const entry: any = await getEntryByUrl({
        contentTypeUid: "app_homepage",
        entryUrl: slugForUseInQuery,
        referenceFieldPath: [
          "account_greeting",
          "home_ending",
          "page_components",
        ],
        jsonRtePath: undefined,
      });

      console.log("entry:", entry);

      // Iterate over each component in homepage_components and dynamically push to state
      const newComponents: any[] = [];
      if (entry?.[0]?.account_greeting) {
        newComponents.push({
          type: "account_greeting",
          data: entry[0].account_greeting,
          audience: entry[0].audience?.audience || 'guest'
        });
      }

      if (entry?.[0]?.page_components) {
        entry[0].page_components.forEach((pageComponent: any) => {
          newComponents.push({
            type: pageComponent._content_type_uid,
            data: pageComponent,
          });
        });
      }

      if (entry?.[0]?.home_ending) {
        newComponents.push({
          type: "home_ending",
          data: entry[0].home_ending,
        });
      }

      setComponents(newComponents);
    };

    fetchData();
  }, [slugForUseInQuery]);

  return (
    <div>
      {components.map((component, index) => {
        switch (component.type) {
          case "account_greeting":{
            return (
              <AccountGreeting 
                key={index} 
                account_greeting={component.data} 
                audience={component.audience}
              />
            );
          }
          case "asset_with_text_block_large_card":
          case "top_offers_carousel":
          case "recommendation_carousel":
          case "video_large_card":
          case "visual_navigation_carousel":
            return <PageComponents key={index} component={component.data} />;
          case "home_ending":
            return (
              <HomeEnding
                key={index}
                home_ending_image={component.data.home_ending_image}
                button={component.data.button}
                home_ending_text={component.data.home_ending_text}
              />
            );
          default:
            return null;
        }
      })}
      <AppBottomNav />
    </div>
  );
};

export default DisplayHomepage;
