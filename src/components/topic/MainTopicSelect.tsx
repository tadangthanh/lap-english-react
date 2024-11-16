import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { MainTopic } from "../../modal/MainTopic";

interface MainTopicSelectProps {
    mainTopics: MainTopic[];
    handleSelectMainTopic: (mainTopic?: MainTopic) => void;
    idMainTopicSelected?: number;
    isRequired?: boolean;
}
const MainTopicSelect: React.FC<MainTopicSelectProps> = ({ mainTopics, handleSelectMainTopic, idMainTopicSelected, isRequired }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (selectedOption: any) => {
        handleSelectMainTopic(mainTopics.find((topic) => topic.id === selectedOption.value));
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
                Chọn Chủ đề chính {isRequired && <span className="text-danger">*</span>}
            </label>
            <Select
                id="mainTopicSelect"
                options={mainTopics.map((topic) => ({ value: topic.id, label: topic.name }))}
                onChange={handleChange}
                onInputChange={handleInputChange}
                value={idMainTopicSelected ? { value: idMainTopicSelected, label: mainTopics.find((topic) => topic.id === idMainTopicSelected)?.name } : null}
                placeholder="Tìm kiếm và chọn chủ đề..."
                className="mb-2"
                isLoading={isLoading}
                components={{ MenuList }}
            />
        </div>
    );
};

export default MainTopicSelect;
