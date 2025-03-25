import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface PLPHeaderProps {
  title: string;
  headerImageUrl: string;
  backgroundColor: string;
  textColor: string;
  imagePlacement: string;
  color_contrast: string;
  headerHeight: string;
  headerType: string;
}

const PLPHeader: React.FC<PLPHeaderProps> = ({ title, headerImageUrl, backgroundColor, textColor, imagePlacement, color_contrast, headerHeight, headerType }) => {
  const isFullAssetCard = headerType === 'full_asset_card';

  const imageStyle = {
    width: isFullAssetCard ? '100%' : 'auto',
    height: isFullAssetCard ? '100%' : 'auto',
    objectFit: isFullAssetCard ? 'cover' as 'cover' : 'none' as 'none',
    position: headerType === 'nav_featured_card' ? 'absolute' as 'absolute' : 'static' as 'static',
    right: headerType === 'nav_featured_card' ? '0' : 'auto',
    bottom: headerType === 'nav_featured_card' ? '0' : 'auto',
  };

  const contrast = isFullAssetCard ? color_contrast : color_contrast;

  let bgColor, txtColor;

  if (contrast === 'dark-background-light-text') {
    bgColor = backgroundColor.split(',')[2];
    txtColor = 'white';
  } else if (contrast === 'medium-background-light-text') {
    bgColor = backgroundColor.split(',')[1];
    txtColor = 'white';
  } else if (contrast === 'light-background-dark-text') {
    bgColor = backgroundColor.split(',')[0];
    txtColor = backgroundColor.split(',')[2];
  }

  const titleColor = headerType === undefined ? textColor : (contrast === 'light-background-dark-text' ? 'black' : 'white');
  const titlePosition = isFullAssetCard ? 'bottom-2 right-2' : 'bottom-2 left-2';

  const gradientOverlay = isFullAssetCard ? `linear-gradient(to top, ${bgColor} 30%, rgba(0, 0, 0, 0) 100%)` : 'none';

  return (
    <div className="relative">
      <div className="absolute top-4 left-4" style={{ zIndex: 2 }}>
        <button className="rounded-full px-[10px] py-[5px] border border-transparent" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <i className="fas fa-arrow-left text-black"></i>
        </button>
      </div>
      <div className="absolute top-4 right-4" style={{ zIndex: 2 }}>
        <button className="rounded-full px-[10px] py-[5px] border border-transparent" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <i className="fas fa-search text-black"></i>
        </button>
      </div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 rounded-full py-[5px] px-[10px]" style={{ zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <span className="text-black text-xs font-bold">King of Prussia Mall</span>
      </div>

      <div
        className="relative header"
        style={{
          backgroundColor: bgColor,
          color: txtColor,
          minHeight: headerHeight,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {headerImageUrl && (
          <>
            <img src={headerImageUrl} alt="Header Image" style={imageStyle} className="object-cover" />
            {isFullAssetCard && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: gradientOverlay }} />}
          </>
        )}
        <h1 className={`text-2xl font-bold absolute left-2 ${titlePosition}`} style={{ color: titleColor, zIndex: 3 }}>{title}</h1>
      </div>
    </div>
  );
};

export default PLPHeader;
