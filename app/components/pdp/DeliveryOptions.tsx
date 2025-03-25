"use client";

import { useEffect, useState } from "react";

interface DeliveryOptionsProps {
  delivery_options: {
    delivery_options: {
      delivery_options_items: any[];
    }[];
  };
}

const DeliveryOptions = ({ delivery_options }: DeliveryOptionsProps) => {
  const [deliveryOptions, setDeliveryOptions] = useState<any>(undefined);
  useEffect(() => {
    let delivery_options_array: any = [];
    delivery_options?.delivery_options?.[0]?.delivery_options_items.forEach(
      (delivery_option: any) => {
        // Debugging.

        // Pick-up item.
        if (delivery_option?.pick_up_item) {
          if (delivery_option?.pick_up_item?.description) {
            delivery_options_array.push({
              description: delivery_option?.pick_up_item?.description,
              title: delivery_option?.pick_up_item?.title,
            });
          }
        }
        // Shipping item.
        if (delivery_option?.shipping_item) {
          if (delivery_option?.shipping_item?.title) {
            delivery_options_array.push({
              title: delivery_option?.shipping_item?.title,
            });
          }
        }
        // Purchase ressurance item.
        if (delivery_option?.purchase_reassurance_item) {
          if (delivery_option?.purchase_reassurance_item?.title) {
            delivery_options_array.push({
              title: delivery_option?.purchase_reassurance_item?.title,
              description:
                delivery_option?.purchase_reassurance_item?.description,
            });
          }
        }
        // Scent scription item.
        if (delivery_option?.scent_scription_item) {
          if (delivery_option?.scent_scription_item?.title) {
            delivery_options_array.push({
              title: delivery_option?.scent_scription_item?.title,
              description: delivery_option?.scent_scription_item?.description,
            });
          }
        }
      }
    );
    if (delivery_options_array.length > 0) {
      setDeliveryOptions(delivery_options_array);
    }
  }, [delivery_options]); // Re-run effect if `product_images` changes

  return (
    <div>
      {deliveryOptions && deliveryOptions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Delivery Options</h2>
          {deliveryOptions.map((delivery_option: any, index: number) => (
            <div key={index} className="mb-2">
              {delivery_option.title && (
                <p className="mt-2 font-bold">{delivery_option.title}</p>
              )}
              {delivery_option.description && (
                <p>{delivery_option.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;
