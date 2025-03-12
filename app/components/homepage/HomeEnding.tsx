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
          className="w-12 h-12 object-cover mx-auto mt-8"
        />
      )}
      {homeEndingText && <p>{homeEndingText}</p>}
      {homeEndingButton && (
        <button className="btn rounded border border-gray-500 p-2 mt-2 mb-2 mr-1 mx-auto">
          {homeEndingButton}
        </button>
      )}
    </div>
  );
};

export default HomeEnding;
