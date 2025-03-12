import { useEffect, useState } from "react";


interface StandardPlpHeaderProps {
    standard_plp_header: Array<{
        title: string;
    }>;
}

const StandardPlpHeader = ({ standard_plp_header }: StandardPlpHeaderProps) => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        if (standard_plp_header?.[0].title) {
            setTitle(standard_plp_header?.[0].title || "");
        }
    }, [standard_plp_header]);

    return (
        <div>
            {title && (
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
            )}
        </div>
    );
};

export default StandardPlpHeader;