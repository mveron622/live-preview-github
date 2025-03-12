"use client";

import { getEntry } from "@/app/sdk/entry";
import { useEffect, useState } from "react";

// Define the types for the objects
interface SubNavItem {
  title: string;
  mobile_nav_item_icon: {
    url: string;
  };
  sub_nav_items?: SubNavItem[];
  uid: string;
}

interface NavItem {
  title: string;
  mobile_nav_item_icon: {
    url: string;
  };
  sub_nav_items: SubNavItem[];
  uid: string;
}

// A reusable component to render navigation items (sub-level or top-level)
const NavItemComponent = ({
  item,
  level = 0,
}: {
  item: SubNavItem;
  level?: number;
}) => {
  return (
    <div
      className={`space-y-4 mt-2 hidden`}
      data-menu-level={level + 1}
      key={item.title}
      data-type="submenu"
      data-uid={item?.uid}
    >
      <div className="flex items-center space-x-4 clickable-menu-item border-b border-solid border-gray-200 pb-4">
        {item?.mobile_nav_item_icon?.url && (
          <div className="w-8 h-8">
            <img
              src={item?.mobile_nav_item_icon?.url}
              alt={item.title}
              className="w-16 h-16 object-cover menu-item-icon"
            />
          </div>
        )}
        <div className="text-lg font-semibold">
          <p className="mt-2">{item.title}</p>
        </div>
      </div>
      {item.sub_nav_items && item.sub_nav_items?.length > 0 && (
        <div data-menu-level={level + 2} data-type="submenu" className="hidden">
          {item.sub_nav_items.map((subNavItem, index) => (
            <NavItemComponent item={subNavItem} level={level + 1} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

const Navigation = () => {
  const [navigationItems, setNavigationItems] = useState<NavItem[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const bbw_mobile_nav_entries: any = await getEntry({
        contentTypeUid: "bbw_mobile_nav",
        referenceFieldPath: [
          "mobile_nav_item",
          "mobile_nav_item.sub_navigation_item",
          "mobile_nav_item.sub_navigation_item.sub_navigation_item",
        ],
        jsonRtePath: undefined,
      });

      let nav_items: NavItem[] = [];

      if (bbw_mobile_nav_entries?.[0]?.[0]?.mobile_nav_item) {
        bbw_mobile_nav_entries[0][0].mobile_nav_item.forEach((item: any) => {
          let nav_item_object: NavItem = {
            title: item?.mobile_nav_item_label || "",
            mobile_nav_item_icon: item?.mobile_nav_item_icon || "",
            sub_nav_items: [],
            uid: item?.uid,
          };

          // Override title and icon if sub_navigation is present
          if (item?.sub_navigation_item_label) {
            nav_item_object.title = item?.sub_navigation_item_label;
          }
          if (item?.sub_navigation_item_icon) {
            nav_item_object.mobile_nav_item_icon =
              item?.sub_navigation_item_icon;
          }

          // Get sub-navigation items
          if (item?.sub_navigation_item) {
            item.sub_navigation_item.forEach((sub_item: any) => {
              let sub_nav_item_object: SubNavItem = {
                title: sub_item?.sub_navigation_item_label || "",
                mobile_nav_item_icon: sub_item?.sub_navigation_item_icon || "",
                uid: sub_item?.uid,
              };

              if (sub_item?.sub_navigation_item) {
                sub_item?.sub_navigation_item.forEach((sub_sub_item: any) => {
                  let sub_sub_nav_item_object: SubNavItem = {
                    title: sub_sub_item?.sub_navigation_item_label || "",
                    mobile_nav_item_icon:
                      sub_sub_item?.sub_navigation_item_icon || "",
                    uid: sub_sub_item?.uid,
                  };

                  if (!sub_nav_item_object.sub_nav_items) {
                    sub_nav_item_object.sub_nav_items = [];
                  }
                  sub_nav_item_object.sub_nav_items.push(
                    sub_sub_nav_item_object
                  );
                });
              }

              nav_item_object.sub_nav_items.push(sub_nav_item_object);
            });
          }

          nav_items.push(nav_item_object);
        });
        setNavigationItems(nav_items);
      }
    };

    fetchData();
  }, []);

  const handleClick = (event: { target: any; currentTarget: any }) => {
    // Get the target menu item
    let clickedItem = event.target;
    if (!clickedItem.classList.contains("clickable-menu-item")) {
      // find parent with class "clickable-menu-item"
      clickedItem = clickedItem.closest(".clickable-menu-item");
    }
    // Set the data-clicked-item uid on the back button
    document
      .getElementById("menu-back-button")
      ?.setAttribute(
        "data-clicked-item",
        clickedItem.parentElement.dataset.uid
      );

    // Get menu level
    const menuLevel = clickedItem.parentElement.getAttribute("data-menu-level");
    // Hide all other menu items
    const otherMenuItemsToHide = document.querySelectorAll("[data-menu-level]");
    // Iterate over the NodeList and add the "hidden" class
    otherMenuItemsToHide.forEach((subMenu) => {
      // We can safely assume subMenu is an Element, so we can access classList
      if (subMenu instanceof HTMLElement) {
        subMenu.classList.add("hidden");
      }
    });

    clickedItem.parentElement.classList.remove("hidden"); // Remove class "hidden" from clickedItem's parentElement
    clickedItem.classList.add("hidden"); // Add hidden class to the clickedItem

    // Remove hidden class from all parent elements.
    if (clickedItem) {
      let parent = clickedItem.parentElement;
      while (parent) {
        parent.classList.remove("hidden");
        parent = parent.parentElement;
      }
    }

    // Find sibling elements with data-type="submenu", but not their children
    const subMenus = clickedItem.parentElement.querySelectorAll(
      '[data-type="submenu"][data-menu-level="' +
        (parseInt(menuLevel) + 1) +
        '"]'
    );
    // Remove class "hidden" from subMenus
    subMenus.forEach(
      (subMenu: { classList: { toggle: (arg0: string) => void } }) => {
        subMenu.classList.toggle("hidden");
      }
    );
  };

  const handleBackButtonClick = (event: {
    target: any;
    currentTarget: any;
  }) => {
    const menuBackButton = document.getElementById("menu-back-button");
    if (!menuBackButton) return;
    // Return to parent menu
    const parentItem = document.querySelector(
      "[data-uid='" + menuBackButton.getAttribute("data-clicked-item") + "']"
    );
    if (parentItem) {
      // Hide all "clickable-menu-items"
      const clickableMenuItems = document.querySelectorAll("[data-menu-level]");
      clickableMenuItems.forEach((item) => {
        item.classList.add("hidden");
      });

      // Set new uid on back button
      const closestParentMenuItem = parentItem.closest(
        ':not([data-uid="' +
          parentItem.getAttribute("data-uid") +
          '"][data-uid]'
      );
      const parentUid = closestParentMenuItem?.getAttribute("data-uid");
      if (parentUid) {
        menuBackButton.setAttribute("data-clicked-item", parentUid);
      }

      // Find siblings of parentItem with same data-menu-level
      parentItem.parentElement?.childNodes.forEach((sibling) => {
        // Remove class "hidden" from direct child of sibling that has class "clickable-menu-item"
        if (sibling instanceof HTMLElement) {
          sibling.classList.remove("hidden");
        }
      });

      // Remove hidden class from all parent elements.
      if (parentItem) {
        let parent = parentItem.parentElement;
        while (parent) {
          parent.classList.remove("hidden");
          parent = parent.parentElement;
        }
      }

      // Remove hidden from any clickable-menu-items
      document.querySelectorAll(".clickable-menu-item").forEach((item) => {
        item.classList.remove("hidden");
      });
    }
  };

  useEffect(() => {
    const menuBackButton = document.getElementById("menu-back-button");
    if (menuBackButton) {
      menuBackButton.addEventListener("click", handleBackButtonClick);
    }

    const clickableMenuItems = document.querySelectorAll(
      ".clickable-menu-item"
    );
    // Add event listeners
    clickableMenuItems.forEach((item) => {
      item.addEventListener("click", handleClick);
    });

    // Cleanup function to remove event listeners
    return () => {
      clickableMenuItems.forEach((item) => {
        item.removeEventListener("click", handleClick);
      });
      menuBackButton?.removeEventListener("click", handleBackButtonClick);
    };
  }, [navigationItems]);

  return (
    <div>
      <div className="space-y-4 flex flex-row w-full">
        <div
          className="flex items-center space-x-4 border-b border-solid border-gray-200 pb-4 flex-1"
          id="menu-back-button"
        >
          Back
        </div>
        {navigationItems?.map((navItem, index) => (
          <div
            key={`navitem-${index}`}
            data-menu-level="0"
            data-uid={navItem?.uid}
            className="flex-1"
          >
            <div className="flex items-center space-x-4 clickable-menu-item border-b border-solid border-gray-200 pb-4">
              <div className="w-8 h-8">
                {navItem?.mobile_nav_item_icon?.url && (
                  <img
                    src={navItem?.mobile_nav_item_icon?.url}
                    alt={`${index + 1}`}
                    className="w-16 h-16 object-cover menu-item-icon"
                  />
                )}
              </div>
              {/* <div className="font-semibold">
                <p className="mt-2">{navItem.title}</p>
              </div> */}
            </div>
            {/* Render sub-navigation items */}
            {navItem.sub_nav_items?.map(
              (subNavItemLevel1, subNavItemLevel1Index) => (
                <NavItemComponent
                  key={`subnavitem-${index}-${subNavItemLevel1Index}`}
                  item={subNavItemLevel1}
                />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
