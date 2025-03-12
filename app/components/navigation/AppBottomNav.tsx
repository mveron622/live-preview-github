"use client";

import { getEntry } from "@/app/sdk/entry";
import App from "next/app";
import { use, useEffect, useState } from "react";

interface AppBottomEndNav {
  title: string;
  selected_icon: {
    image_file: {
      asset: {
        url: string;
      };
    };
  };
  unselected_icon: {
    image_file: {
      asset: {
        url: string;
      };
    };
  };
  nav_label: string;
  internal_link_pages: Array<{
    page: {
      slug: string;
    };
  }>;
}

interface Nav {
  title: string;
  selected_icon: {
    image_file: {
      asset: {
        url: string;
      };
    };
  };
  unselected_icon: {
    image_file: {
      asset: {
        url: string;
      };
    };
  };
  nav_label: string;
  internal_link_pages: Array<{
    page: {
      slug: string;
    };
  }>;
  external_overlay_link: string;
  external_browser_link: string;
  child_nav_items: ChildNavItem[];
  uid: string;
}

interface ChildNavItem {
  nav?: Nav;
  end_nav?: EndNav;
}

interface EndNav {
  title: string;
  nav_label: string;
  internal_link_pages: Array<{
    page: {
      slug: string;
    };
  }>;
  external_overlay_link: string;
  external_browser_link: string;
  product_image_override: {
    image_file: {
      asset: {
        url: string;
      };
    };
  };
}

const AppBottomNav = () => {
  const [childItems, setChildItems] = useState<ChildNavItem[] | undefined>(
    undefined
  );
  const [childNavItems, setChildNavItems] = useState<
    (Nav | AppBottomEndNav)[] | undefined
  >(undefined);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const app_bottom_nav_entries: any = await getEntry({
        contentTypeUid: "app_bottom_nav",
        referenceFieldPath: [
          "app_bottom_nav_items",
          "app_bottom_nav_items.child_nav_items",
          "app_bottom_nav_items.child_nav_items.nav",
          "app_bottom_nav_items.child_nav_items.end_nav",
        ],
        jsonRtePath: undefined,
      });

      if (app_bottom_nav_entries[0][0]?.app_bottom_nav_items) {
        setChildNavItems(app_bottom_nav_entries[0][0].app_bottom_nav_items);
      }

      console.log("HELOO", app_bottom_nav_entries[0][0].app_bottom_nav_items);
    };

    fetchData();
  }, []);

  const handleClick = (index: number) => {
    setSelectedItem(index);
    const clickedItem = childNavItems?.[index];
    console.log("clickedItem:", clickedItem);
    if (clickedItem) {
      if ("child_nav_items" in clickedItem) {
        setChildItems(clickedItem.child_nav_items);
        console.log("weee: ", clickedItem.child_nav_items);
      } else {
        setChildItems(undefined);
      }
    } else {
      setChildItems(undefined);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {childNavItems?.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 7px",
            }}
            onClick={() => handleClick(index)}
          >
            <img
              src={
                selectedItem === index
                  ? item.selected_icon.image_file?.asset?.url
                  : item.unselected_icon.image_file?.asset?.url
              }
              alt={item.nav_label}
              style={{
                marginTop: "25px",
                marginBottom: "5px",
                cursor: "pointer",
              }}
            />
            <p
              style={{
                color: selectedItem === index ? "#005699" : "inherit",
              }}
            >
              {item.nav_label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppBottomNav;
