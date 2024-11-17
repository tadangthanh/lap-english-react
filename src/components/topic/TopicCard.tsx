import React from "react";
import "../css/TopicCard.css";
import { baseUrlBlob } from "../../api/ApiUtils";
import { SubTopic } from "../../modal/SubTopic";

interface TopicCardProps {
    subTopic: SubTopic;
    handleClick: (subTopicId: number) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ subTopic, handleClick }) => {
    const { id, name, blobName, wordCount, mainTopicName } = subTopic;

    return (
        <div className="topic-card" onClick={() => handleClick(id)}>
            <div className="topic-card-inner">
                {/* Mặt trước */}
                <div
                    className={`topic-card-front`}
                    style={{
                        backgroundImage: `url(${baseUrlBlob + blobName})`,
                    }}
                >
                    {!blobName && (
                        <div className="fallback-icon">
                            <i className="fa-solid fa-book"></i>
                        </div>
                    )}
                    <div className="overlay">
                        <h3 className="topic-name">{name}</h3>
                        <p className="main-topic-name">{mainTopicName}</p>
                    </div>
                </div>

                {/* Mặt sau */}
                <div className="topic-card-back d-block">
                    <h4>{name}</h4>
                    <p>{wordCount ?? 0} từ vựng</p>
                </div>
            </div>
        </div>
    );
};

export default TopicCard;
