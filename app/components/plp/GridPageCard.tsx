import { useEffect, useState } from "react";

interface GridPageCardProps {
  grid_page_card: {
    title: string;
    badge_icon: Array<{
      image_file: string;
    }>;
    color_palette: {
      color_palette: string;
    };
    image: {
      image_file: {
        asset: {
          url: string;
        };
      };
    };
  }[];
}

const GridPageCard = ({ grid_page_card }: GridPageCardProps) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [colorPalette, setColorPalette] = useState<string | undefined>(
    undefined
  );
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("grid_page_card.grid_page_card", grid_page_card);
    if (grid_page_card) {
      setTitle(grid_page_card[0]?.title || "");
      setImageUrl(grid_page_card[0]?.image?.image_file?.asset?.url || "");

      setColorPalette(grid_page_card[0]?.color_palette?.color_palette || "");
      const colors = grid_page_card[0]?.color_palette?.color_palette.split(",");
      setBackgroundColor(colors[0]);
    }
  }, [grid_page_card]);

  return (
    <div
      style={{
        backgroundColor,
        paddingBottom: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h2 className="mt-2 font-bold p-2 pb-4 text-lg">{title}</h2>
    </div>
  );
};

export default GridPageCard;
