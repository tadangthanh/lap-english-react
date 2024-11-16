import React, { useState } from 'react';
import { Word } from '../../modal/Word';
import WordTable from './WordTable';
import { MainTopic } from '../../modal/MainTopic';
import { PageResponse } from '../../modal/PageResponse';
import { useNavigate } from 'react-router-dom';
import TopicCard from './TopicCard';





const WordPage: React.FC = () => {
    const [topics, setTopics] = useState<MainTopic[]>([]);
    const [words, setWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [pageResponse, setPageResponse] = useState<PageResponse<Word>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: []
    });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    };

    const handleAddWord = () => {

    };
    const handleEditWord = (word: Word) => {
        // Logic chỉnh sửa từ
        console.log('Editing word:', word);
    };

    const handleDeleteWord = (id: number) => {
        // Logic xóa từ
    };
    return (
        <div className="p-4">
            <h2>Quản lý từ vựng</h2>
            <TopicCard
                topicName="Chủ đề 1"
                imageUrl="https://picsum.photos/200"
                wordCount={10}
            />
            <TopicCard
                topicName="Chủ đề 2"
                imageUrl="https://picsum.photos/200"
                wordCount={20}
            />
        </div>
    );
};

export default WordPage;
