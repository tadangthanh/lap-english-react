import React, { useEffect, useState } from 'react';
import { Word } from '../../modal/Word';
import { PageResponse } from '../../modal/PageResponse';
import { useNavigate } from 'react-router-dom';
import TopicCard from '../topic/TopicCard';
import { SubTopic } from '../../modal/SubTopic';
import { getSubTopicByName, getSubTopicPage } from '../../api/subtopic/SubTopicApi';
import { Paging } from '../common/Paging';
import { SearchOperation } from '../../modal/SearchOperation';

const WordPage: React.FC = () => {
    const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
    const [page, setPage] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('name');
    const [direction, setDirection] = useState<string>('asc');
    const [subTopicSearch, setSubTopicSearch] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchField, setSearchField] = useState<string>('name');
    const [searchOperation, setSearchOperation] = useState<SearchOperation>(SearchOperation.LIKE);
    const [pageResponse, setPageResponse] = useState<PageResponse<Word>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: []
    });
    useEffect(() => {
        setSubTopicSearch(searchField + searchOperation + searchValue)
    }, [searchField, searchOperation, searchValue]);
    useEffect(() => {
        getSubTopicPage(page, 10, sortBy, direction, subTopicSearch).then((response) => {
            if (response.status === 200) {
                setSubTopics(response.data.items);
                setPageResponse(response.data);
            }
        });
    }, [page, direction]);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.value === '') {
            setSearchValue('');
            setPage(0);
            handleInitPageSubTopic();
            return;
        }
        setSearchValue(e.target.value);
    };
    const handleSubTopicClick = (subTopicId: number) => {
        // Logic khi click vào chủ đề con
        navigate(`/word/${subTopicId}`);
    }
    const handleInitPageSubTopic = () => {
        getSubTopicPage(page, 10, sortBy, direction, '').then((response) => {
            if (response.status === 200) {
                setSubTopics(response.data.items);
                setPageResponse(response.data);
            }
        });
    }
    const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value);
        setPage(0);
    }
    const handleSearchByName = () => {
        setPage(0);
        getSubTopicPage(page, 10, sortBy, direction, subTopicSearch).then((response) => {
            if (response.status === 200) {
                if (response.data.items.length === 0) {
                    alert(`Không tìm thấy chủ đề với tên ${subTopicSearch}`);
                    setSearchValue('');
                    return;
                }
                setSubTopics(response.data.items);
                setPageResponse(response.data);
            }
        });
    }
    return (
        <div className="p-4">
            <h2>Chủ đề hiện có</h2>
            <div className='d-flex align-items-center'>
                {/* Sắp xếp theo vần A-Z */}
                <div className='me-2'>
                    <select className="form-select" onChange={handleChangeSort}>
                        <option >Sắp xếp</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <div>
                    <div className="flex items-center">
                        <input
                            value={searchValue}
                            type="text"
                            placeholder="Tên chủ đề"
                            className="p-2 border border-gray-300 rounded mr-2 me-2"
                            onChange={handleInputChange}
                        />
                        <button className="p-2 bg-blue text-black rounded" onClick={handleSearchByName}>Tìm kiếm</button>
                    </div>

                </div>
            </div>

            {
                subTopics.map((topic) => (
                    <TopicCard
                        key={topic.id}
                        subTopic={topic}
                        handleClick={handleSubTopicClick}
                    />
                ))
            }
            <Paging
                page={page}
                setPage={setPage}
                pageResponse={pageResponse}
            />
        </div >
    );
};

export default WordPage;
