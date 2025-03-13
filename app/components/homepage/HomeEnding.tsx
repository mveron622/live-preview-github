"use client";

import { useEffect, useState } from "react";

interface HomeEndingProps {
  button: {
    cta_label: string;
  };
  home_ending_image: {
    image_file: {
      asset: {
        url: string;
      };
    };
  };
  home_ending_text: string;
}

const HomeEnding = ({
  button,
  home_ending_image,
  home_ending_text,
}: HomeEndingProps) => {
  const [homeEndingImage, setHomeEndingImage] = useState<string | undefined>(
    undefined
  );
  const [homeEndingText, setHomeEndingText] = useState<string | undefined>(
    undefined
  );
  const [homeEndingButton, setHomeEndingButton] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (home_ending_image) {
      setHomeEndingImage(home_ending_image?.image_file?.asset.url || "");
    }
    if (home_ending_text) {
      setHomeEndingText(home_ending_text);
    }
    if (button) {
      setHomeEndingButton(button.cta_label);
    }
  }, [home_ending_image, home_ending_text, button]);

  return (
    <div className="text-center">
      {homeEndingImage && (
        <img
          src={homeEndingImage}
          alt="home ending"
          className="w-16 h-16 object-cover mx-auto mt-8"
        />
      )}
      {homeEndingText && <p className="text-brand font-bold text-xl mt-4">{homeEndingText}</p>}
      {homeEndingButton && (
        <button className="btn rounded-md border border-[#0002] p-2 mt-4 mx-auto text-inverted">
          {homeEndingButton}
        </button>
      )}
    </div>
  );
};

export default HomeEnding;
