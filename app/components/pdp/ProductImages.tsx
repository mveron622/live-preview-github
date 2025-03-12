"use client";

import { useEffect, useState } from "react";

interface ProductImage {
  url: string;
}

interface ProductImagesProps {
  product_images: {
    product_image: ProductImage; // Array of product images
  }[];
}

const ProductImages = ({ product_images }: ProductImagesProps) => {
  const [productImage, setProductImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    // Debugging.
    // console.log("product_images", product_images);
    if (product_images?.[0]?.product_image?.url) {
      setProductImage(product_images?.[0]?.product_image?.url || "");
    }
  }, [product_images]);

  return <div>{productImage && <img src={productImage} alt="Product" />}</div>;
};

export default ProductImages;
