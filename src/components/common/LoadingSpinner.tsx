import React from 'react';
import '../css/LoadingSpinner.css'; // Đảm bảo file CSS đã được cập nhật
import { PuffLoader } from 'react-spinners'; // Sử dụng PuffLoader thay cho ClipLoader

interface LoadingProps {
    loading: boolean;
    size?: number; // Cho phép tùy chỉnh kích thước
    color?: string; // Cho phép tùy chỉnh màu sắc
}

export const Loading: React.FC<LoadingProps> = ({ loading, size = 100, color = "#4A90E2" }) => {
    if (!loading) return null;
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <PuffLoader size={size} color={color} loading={loading} />
            </div>
        </div>
    );
};
