"use client";

import { useEffect, useState } from "react";
import { jsonToHtml } from "@contentstack/json-rte-serializer";
import { EntryEmbedable, jsonToHTML } from "@contentstack/utils";

interface ProductInformationRowProps {
  product_information: {
    overview_reference_cta: {
      description: any;
    }[];
    ingredients_reference_cta: {
      description: any;
    }[];
    reference: {
      description: any;
    }[];
  };
  type: string;
}

const ProductInformationRow = ({
  product_information,
  type,
}: ProductInformationRowProps) => {
  const [rteContent, setRteContent] = useState<any>(undefined);
  const [sectionHeading, setSectionHeading] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    // Set section heading.
    if (type === "overview") {
      setSectionHeading("Overview");
    }
    if (type === "usage") {
      setSectionHeading("Usage");
    }
    if (type === "ingredients") {
      setSectionHeading("Ingredients");
    }

    if (
      (type == "overview" || type == "usage") &&
      product_information?.overview_reference_cta?.[0]?.description
    ) {
      setRteContent(
        product_information?.overview_reference_cta?.[0]?.description
      );
    }
    if (
      type == "ingredients" &&
      product_information?.ingredients_reference_cta?.[0]?.description
    ) {
      // Set RTE content.
      setRteContent(
        product_information?.ingredients_reference_cta?.[0]?.description
      );
    }
    if (
      type == "ingredients" &&
      product_information?.ingredients_reference_cta?.[0]?.description
    ) {
      // Set RTE content.
      setRteContent(
        product_information?.ingredients_reference_cta?.[0]?.description
      );
    }
    
    // Acn Stack.
    if (
      (type == "overview" || type == "usage" || type == "ingredients") &&
      product_information?.reference?.[0]?.description
    ) {
      setRteContent(
        product_information?.reference?.[0]?.description
      );
    }
  }, [product_information]);

  return (
    <div>
      {rteContent && (
        <div className="mt-6 mb-2">
          <h2 className="text-lg font-bold">
            {sectionHeading && sectionHeading}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: jsonToHtml(rteContent) }} />
        </div>
      )}
    </div>
  );
};

export default ProductInformationRow;
