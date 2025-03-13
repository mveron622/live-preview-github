import React from 'react';
import { VideoLargeCardProps } from './types';

const VideoLargeCard: React.FC<Omit<VideoLargeCardProps, '_content_type_uid'>> = ({
  title,
  video,
  description,
  thumbnail
}) => {
  return (
    <div className="relative">
      <div className="overflow-hidden shadow-md relative">
        {/* Top right buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
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
        </div>

        {/* Video thumbnail */}
        <img 
          src={video?.video_file[0]?.images.poster.src} 
          alt={title} 
          className="w-full h-auto"
        />

        {/* Bottom center button */}
        <div className="absolute bottom-[24px] left-1/2 transform -translate-x-1/2">
          <button className="px-[20px] py-[12px] bg-white text-inverted rounded-lg font-medium">
            Shop the collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoLargeCard; 