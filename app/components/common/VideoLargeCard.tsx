import React from 'react';
import { VideoLargeCardProps } from './types';

const VideoLargeCard: React.FC<{ cardData: Omit<VideoLargeCardProps, '_content_type_uid'> }> = ({ cardData }) => {
  const { title, video, card_type } = cardData;
  const isFullAsset = card_type === 'Full Asset';

  // Add color palette and contrast logic
  const colors = !isFullAsset ? cardData.shoppable_video.color_palette.color_palette.split(',') : [];
  let bgColor: string = '', txtColor: string = '';

  if (!isFullAsset) {
    const extendedColorContrast = cardData.shoppable_video.extended_color_contrast.extended_color_contrast;
    if (extendedColorContrast === 'dark-background-light-text') {
      bgColor = colors[2];
      txtColor = 'white';
    } else if (extendedColorContrast === 'medium-background-light-text') {
      bgColor = colors[1];
      txtColor = 'white';
    } else if (extendedColorContrast === 'light-background-dark-text') {
      bgColor = colors[0];
      txtColor = colors[2];
    } else {
      bgColor = colors[0];
      txtColor = colors[2];
    }
  }

  // Calculate gradient overlay
  const getGradientOverlay = (bgColor: string) => {
    return `linear-gradient(to top, ${bgColor} 25%, rgba(0, 0, 0, 0) 55%)`;
  };

  const gradientOverlay = getGradientOverlay(bgColor);

  return (
    <div className={`relative ${!isFullAsset ? 'bg-red-600 text-white' : ''}`} style={{ background: !isFullAsset ? gradientOverlay : 'none' }}>
      <div className="overflow-hidden shadow-md relative">
        {/* Top right buttons */}
        {isFullAsset && (<div className="absolute top-4 right-4 flex gap-2 z-10">
          <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="text-inverted">
              <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="text-inverted">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>)}

        {/* Video thumbnail */}
        <img 
          src={video?.video_file[0]?.images.poster.src} 
          alt={title} 
          className={`w-full ${!isFullAsset ? 'h-full object-cover' : 'h-auto'} min-h-[400px]`}
        />

        {/* Bottom center button */}
        {!isFullAsset ? (
          <div className="absolute z-10 bottom-2 w-full px-[16px] flex gap-2">
            <div>
              <h2 className="text-md font-bold" style={{ color: txtColor }}>{cardData.shoppable_video.headline}</h2>
              <p className="text-sm" style={{ color: txtColor }}>{cardData.shoppable_video.body}</p>
            </div>
            <div>
              <button className="w-3 h-3 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="text-inverted">
                  <path fillRule="evenodd" d="M4.5 3.5a1 1 0 011.5-.866l10 6a1 1 0 010 1.732l-10 6A1 1 0 014.5 15.5v-12z" clipRule="evenodd" fill='white' />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-[24px] left-1/2 transform -translate-x-1/2">
            <button className="px-[20px] py-[12px] rounded-lg font-medium" style={{ backgroundColor: 'white', color: 'black' }}>
              {cardData.full_asset.cta_label.cta_label}
            </button>
          </div>
        )}

        {/* Gradient overlay for Full Asset */}
        {!isFullAsset && <div className="absolute inset-0" style={{ background: gradientOverlay }} />}
      </div>
    </div>
  );
};

export default VideoLargeCard; 