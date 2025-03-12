import { useEffect, useState } from "react";

interface StorytellingVideoProps {
    storytelling_video: {
        storytelling_video: Array<{
            storytelling_video: {
                url: string;
            }
            title: string;
        }>;
    }
}

const StorytellingVideo = ({ storytelling_video }: StorytellingVideoProps) => {

    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string | null>(null);

    useEffect(() => {
        if (storytelling_video?.storytelling_video?.[0]?.storytelling_video?.url) {
            setVideoUrl(storytelling_video?.storytelling_video?.[0]?.storytelling_video?.url);
            setVideoTitle(storytelling_video?.storytelling_video?.[0]?.title);
        }
    }, [storytelling_video]);

    return (
        <div>
            {videoTitle && <h2 className="mt-2 font-bold">{videoTitle}</h2>}
            {videoUrl && (
                <iframe
                    src={videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64 md:h-96"
                ></iframe>
            )}
        </div>
    );
};

export default StorytellingVideo;