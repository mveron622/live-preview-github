import React from 'react';

interface FeaturedProductLargeCardProps {
  title: string;
  image: string;
  product: any;
  description: string;
  color_palette: string;
  extended_color_contrast: string;
}

const FeaturedProductLargeCard: React.FC<FeaturedProductLargeCardProps> = ({
  title,
  image,
  product,
  description,
  color_palette,
  extended_color_contrast
}) => {
  const colors = color_palette.split(',');
  let bgColor: string, txtColor: string;

  if (extended_color_contrast === 'dark-background-light-text') {
    bgColor = colors[2];
    txtColor = 'white';
  } else if (extended_color_contrast === 'medium-background-light-text') {
    bgColor = colors[1];
    txtColor = 'white';
  } else if (extended_color_contrast === 'light-background-dark-text') {
    bgColor = colors[0];
    txtColor = colors[2];
  } else {
    // Default fallback
    bgColor = colors[0];
    txtColor = colors[2];
  }

  // Calculate gradient overlay
  const getGradientOverlay = (bgColor: string) => {
    return `linear-gradient(to top, ${bgColor} 25%, rgba(0, 0, 0, 0) 55%)`;
  };

  const gradientOverlay = getGradientOverlay(bgColor);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md my-[24px]">
      <img src={image} alt={title} className="w-full h-auto object-cover" />
      <div className="absolute inset-0" style={{ background: gradientOverlay }} />
      <div className="absolute bottom-4 left-0 text-white w-full px-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-bold" style={{ color: txtColor, textAlign: 'left' }}>{product.c_descriptiveName}</h2>
          <p className="text-sm" style={{ textAlign: 'right' }}>${product.price.toFixed(2)}</p>
        </div>
        <button className="w-full mt-2 px-4 py-[10px] rounded-lg font-bold" style={{ backgroundColor: txtColor, color: bgColor }}>Add to bag</button>
      </div>
    </div>
  );
};

export default FeaturedProductLargeCard; 