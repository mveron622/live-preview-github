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
    }>;
}

const AccountGreeting = ({ account_greeting }: AccountGreetingProps) => {
    const [greetingPrimaryHeading, setGreetingPrimaryHeading] = useState<string | undefined>(undefined);
    const [greetingSecondaryHeading, setGreetingSecondaryHeading] = useState<string | undefined>(undefined);
    const [greetingBody, setGreetingBody] = useState<string | undefined>(undefined);
    const [greetingImage, setGreetingImage] = useState<string | undefined>(undefined);
    const [buttons, setButtons] = useState<Array<{ link: string; label: string }>>([]);
    
    useEffect(() => {
        if (account_greeting?.[0]) {
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
    }, [account_greeting]);

    return (
        <div>
            {greetingImage && <img src={greetingImage} alt="greeting" />}
            {greetingPrimaryHeading && <h2>{greetingPrimaryHeading}</h2>}
            {greetingSecondaryHeading && <h3>{greetingSecondaryHeading}</h3>}
            {greetingBody && <p className="mb-4">{greetingBody}</p>}
            {buttons.map((btn, index) => (
                <a 
                key={index} 
                href={btn.link} 
                className="btn rounded border border-gray-500 p-2 mt-2 mb-2 mr-1"
                >
                {btn.label}
                </a>
            ))}
        </div>
    );
};

export default AccountGreeting;