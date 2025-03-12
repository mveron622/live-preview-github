import { useEffect, useState } from "react";

interface ContentCardProps {
    content_card: {
        content_card: {
            title: string;
            image_file: {
                image_file:{
                    asset: {
                        url: string;
                    }
                }
            };
            buttons: Array<{
                button: {
                    link_label: string;
                    internal_link: string;
                    external_link: string;
                }
            }>;
            margin_card: Array<{
                color_palette: {
                    color_palette: string;
                }
            }>
        }[];
    };
}

const ContentCard = ({ content_card }: ContentCardProps) => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [buttons, setButtons] = useState<Array<{ link: string; label: string }>>([]);
    const [colorPalette, setColorPalette] = useState<string | undefined>(undefined);
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (content_card?.content_card?.[0]) {
            setTitle(content_card.content_card[0].title || "");
            setImageUrl(content_card.content_card[0].image_file.image_file.asset.url || "");
            const btns = content_card.content_card[0].buttons.map(btn => ({
                link: btn.button.internal_link || btn.button.external_link,
                label: btn.button.link_label
            }));
            setColorPalette(content_card.content_card[0].margin_card[0].color_palette.color_palette || "");
            const colors = content_card.content_card[0].margin_card[0].color_palette.color_palette.split(",");
            setBackgroundColor(colors[0]);
            //One button is linking to an internal page (not configured)
            //Other button has no link
            console.log("btns", btns);
            setButtons(btns);
        }

        
    }, [content_card]);

    return (
        <div style={{ backgroundColor, paddingBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {imageUrl && <img src={imageUrl} alt={title} />}
            <h2 className="mt-2 font-bold p-2 pb-4 text-lg">{title}</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {buttons.map((btn, index) => (
            <a 
                key={index} 
                href={btn.link} 
                className="btn rounded border border-gray-500 p-2 mt-2 mb-2 mr-1"
                style={{ marginLeft: '7px' }}
                >
                {btn.label}
                </a>
                ))}
            </div>
        </div>
    );
};

export default ContentCard;