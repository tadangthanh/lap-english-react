import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WordPageDetail } from '../word/WordPageDetail';
import { SubTopic } from '../../modal/SubTopic';
import { getSubTopicById } from '../../api/subtopic/SubTopicApi';
import { SentencePage } from '../sentence/SentencePage';

const HeaderWithTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1');
    const { subTopicId } = useParams<{ subTopicId: string }>(); // Lấy tham số id từ URL
    const toggleTab = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const navigate = useNavigate(); // Sử dụng để điều hướng "Quay lại"
    const [subTopicIdMdl, setSubTopicIdMdl] = useState<number>(0);
    const [subTopic, setSubTopic] = useState<SubTopic | null>(null);
    useEffect(() => {
        if (subTopicId) {
            setSubTopicIdMdl(parseInt(subTopicId));
            getSubTopicById(parseInt(subTopicId)).then((response: any) => {
                if (response.status !== 200) {
                    navigate('/login');
                }
                if (response.data.word) {
                    setActiveTab('1');
                } else {
                    setActiveTab('2');
                }
                setSubTopic(response.data);
            });
        } else {
            navigate(-1)
        }
    }, []);
    return (
        <div className="container mx-auto mt-4">
            {/* Tiêu đề */}
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">{subTopic?.name}</h2>
            </div>

            {/* Tab điều hướng */}
            <div className="flex border-b border-gray-300 mt-4">

                {subTopic?.word ? <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === '1'
                        ? 'border-b-2 border-blue-500 text-blue-500'
                        : 'text-gray-600 hover:text-blue-500'
                        }`}
                    onClick={() => toggleTab('1')}
                >
                    Word Manager
                </button> : <button
                    className={`ml-4 px-4 py-2 text-sm font-medium ${activeTab === '2'
                        ? 'border-b-2 border-blue-500 text-blue-500'
                        : 'text-gray-600 hover:text-blue-500'
                        }`}
                    onClick={() => toggleTab('2')}
                >
                    Sentence Manager
                </button>}


            </div>

            {/* Nội dung tab */}
            <div className="mt-4">
                {activeTab === '1' && (
                    <div className="transition-opacity duration-300 opacity-100">
                        <WordPageDetail subTopicId={subTopicId} />
                    </div>
                )}
                {activeTab === '2' && (
                    <div className="transition-opacity duration-300 opacity-100">
                        <SentencePage subTopicIdParam={subTopicId} />
                    </div>
                )}
            </div>
        </div>
    );

};

export default HeaderWithTabs;
