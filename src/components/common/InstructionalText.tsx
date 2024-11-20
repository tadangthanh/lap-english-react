import React, { useState } from "react";

interface InstructionalTextProps {
    // văn bản hướng dẫn
    instructionalText: string;
}

const InstructionalText: React.FC<InstructionalTextProps> = ({ instructionalText }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    return (
        <div className="flex text-gray-600 items-center">
            <i className="fas fa-info-circle text-blue-500 mr-2" title="Intructional for import file, click show more for details"></i>
            <div>
                <p
                    dangerouslySetInnerHTML={{
                        __html: isExpanded
                            ? instructionalText
                            : `${instructionalText.slice(0, 100)}...`, // Giới hạn nội dung nếu không mở rộng
                    }}
                />
                <button
                    onClick={toggleExpanded}
                    className="text-blue-500 hover:underline text-sm mt-1"
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
};

export default InstructionalText;
