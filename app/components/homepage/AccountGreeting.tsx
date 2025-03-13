"use client";

import { useEffect, useState } from "react";

interface AccountGreetingProps {
    account_greeting: Array<{
        greeting_primary_heading: string;
        greeting_secondary_heading: string;
        greeting_body: string;
        greeting_image: {
            image_file: {
                asset: {
                    url: string;
                }
            }
        };
        button: Array<{
            cta_label: string;
        }>;
        color_palette: {
            color_palette: string;
        };
        color_contrast: {
            color_contrast: string;
        };
    }>;
    audience: string;
}

const AccountGreeting = ({ account_greeting, audience }: AccountGreetingProps) => {
    const [greetingPrimaryHeading, setGreetingPrimaryHeading] = useState<string | undefined>(undefined);
    const [greetingSecondaryHeading, setGreetingSecondaryHeading] = useState<string | undefined>(undefined);
    const [greetingBody, setGreetingBody] = useState<string | undefined>(undefined);
    const [greetingImage, setGreetingImage] = useState<string | undefined>(undefined);
    const [buttons, setButtons] = useState<Array<{ link: string; label: string }>>([]);
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('');
    
    const colors = account_greeting?.[0]?.color_palette.color_palette.split(',') || [];

    useEffect(() => {
        if (account_greeting?.[0]) {
            const { color_palette, color_contrast } = account_greeting[0];
            const colors = color_palette.color_palette.split(',');
            if (audience === 'member') {
                setBackgroundColor(colors[0]);
                setTextColor(color_contrast.color_contrast === 'light-background-dark-text' ? colors[2] : colors[1]);
            } else if (audience === 'guest') {
                setBackgroundColor('#FFFFFF');
                setTextColor('text-inverted');
            }

            setGreetingImage(account_greeting?.[0].greeting_image.image_file?.asset.url || "");
            setGreetingPrimaryHeading(account_greeting?.[0].greeting_primary_heading || "");
            setGreetingSecondaryHeading(account_greeting?.[0].greeting_secondary_heading || "");
            setGreetingBody(account_greeting?.[0].greeting_body || "");

            const btns = account_greeting[0].button.map(btn => ({
                link: "", // or provide the actual link if available
                label: btn.cta_label
            }));
            setButtons(btns);
        }
    }, [account_greeting, audience]);

    return (
        <div className="relative px-[16px] pb-[24px] pt-[48px] rounded-lg shadow-md" style={{ backgroundColor }}>
            {/* Search Bar */}
            <div className="flex items-center bg-white/80 rounded-full shadow-md p-2 mb-[64px] relative z-10">
                <svg className="w-5 h-5 text-gray-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="ml-2 bg-transparent outline-none flex-grow"
                />
            </div>
            {greetingImage && (
                <div className="absolute top-0 right-0 w-40 h-40">
                    <img src={greetingImage} alt="greeting" className="w-full h-full object-cover" />
                </div>
            )}
            {greetingPrimaryHeading && (
                <h2 className="text-3xl font-bold mt-4" style={{ color: colors[1] }}>{greetingPrimaryHeading} Abby,</h2>
            )}
            {greetingSecondaryHeading && (
                <h3 className="text-2xl" style={{ color: colors[2] }}>{greetingSecondaryHeading}</h3>
            )}
            {greetingBody && (
                <p className="mb-4 text-inverted">{greetingBody}</p>
            )}
            <div className="flex space-x-2">
                {buttons.map((btn, index) => (
                    <a 
                        key={index} 
                        href={btn.link} 
                        className="rounded-md px-[20px] py-[12px] hover:bg-opacity-80 transition"
                        style={{ backgroundColor: colors[2], color: backgroundColor }}
                    >
                        {btn.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default AccountGreeting;