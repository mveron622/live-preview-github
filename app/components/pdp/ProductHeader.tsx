"use client";

import { useEffect, useState } from "react";

interface ProductHeaderProps {
  product_header: {
    product_header: {
      title: string;
    }[];
  };
}

const ProductHeader = ({ product_header }: ProductHeaderProps) => {
  const [productTitle, setProductTitle] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (product_header?.product_header?.[0]?.title) {
      setProductTitle(product_header?.product_header?.[0]?.title || "");
    }
  }, [product_header]);

  return (
    <div>
      {productTitle && (
        <h1 className="text-3xl font-bold mb-4">{productTitle}</h1>
      )}
    </div>
  );
};

export default ProductHeader;
