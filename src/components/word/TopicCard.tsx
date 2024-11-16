import React from "react";
import "../css/TopicCard.css";
import { Link } from "react-router-dom";

interface TopicCardProps {
    topicName: string; // Tên chủ đề
    imageUrl: string;  // Đường dẫn ảnh
    wordCount: number; // Số lượng từ
}

const TopicCard: React.FC<TopicCardProps> = ({ topicName, imageUrl, wordCount }) => {
    return (
        <Link to="/sub-topic" className="topic-card">
            <div className="topic-card">
                <div className="topic-card-inner">
                    {/* Mặt trước */}
                    <div
                        className="topic-card-front"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                        <h3 className="topic-name">{topicName}</h3>
                    </div>
                    {/* Mặt sau */}
                    <div className="topic-card-back">
                        <h4>{topicName}</h4>
                        <p>{wordCount} từ</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TopicCard;
