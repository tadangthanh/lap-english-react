import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { MainTopic } from "../../modal/MainTopic";

interface MainTopicSelectProps {
    mainTopics: MainTopic[];
}
const MainTopicSelect: React.FC<MainTopicSelectProps> = ({ mainTopics }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (selectedOption: any) => {
        console.log("Chủ đề đã chọn:", selectedOption);
    };

    const handleInputChange = (inputValue: any) => {
        setIsLoading(true);
        // Giả lập tìm kiếm, có thể thay thế bằng API tìm kiếm
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };



    // Tuỳ chỉnh MenuList để thêm nút Xem thêm
    const MenuList = (props: any) => {
        return (
            <components.MenuList {...props}>
                {props.children}
            </components.MenuList>
        );
    };

    return (
        <div>
            <label htmlFor="mainTopicSelect" className="form-label">
                Chọn Chủ đề chính
            </label>
            <Select
                id="mainTopicSelect"
                options={mainTopics.map((topic) => ({ value: topic.id, label: topic.name }))}
                onChange={handleChange}
                onInputChange={handleInputChange}
                placeholder="Tìm kiếm và chọn chủ đề..."
                className="mb-2"
                isLoading={isLoading}
                components={{ MenuList }}
            />
        </div>
    );
};

export default MainTopicSelect;
