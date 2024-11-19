import React, { useEffect, useRef, useState } from 'react';
import { MainTopic } from '../../modal/MainTopic';
import { verifyToken } from '../../api/ApiUtils';
import { useNavigate } from 'react-router-dom';
import { createMainTopic, deleteMainTopic, getMainTopicPage, updateMainTopic } from '../../api/maintopic/MainTopicApi';
import { Loading } from '../common/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';
import { TableMainTopic } from './MainTopicTable';
import { PageResponse } from '../../modal/PageResponse';
import { DataContext } from '../context/DataContext';
const MainTopicPage: React.FC = () => {
    const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [mainTopicName, setMainTopicName] = useState<string>(''); // State cho tên chủ đề chinh
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [mainTopicEdit, setMainTopicEdit] = useState<MainTopic | null>(null);
    const [pageResponse, setPageResponse] = useState<PageResponse<MainTopic>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: []
    });
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(false);
        verifyToken().then((response: any) => {
            if (response.status !== 200) {
                navigate('/login');
            }
            setIsLoading(false);
        })
        setIsLoading(false);
    }, []);
    useEffect(() => {
        setMainTopicEdit(null);
        getMainTopicPage(page, size).then((response: any) => {
            if (response.status === 200) {
                setMainTopics(response.data.items);
                setPageResponse(response.data);
            } else {
                toast.error(response.message, { containerId: 'page-main-topic' });
            }
        }).catch((error) => {
            toast.error(error.message, { containerId: 'page-main-topic' });
        });
    }, [page, size]);

    useEffect(() => {
        inputMainTopicName?.current?.focus();
        inputMainTopicName.current?.scrollIntoView();
        if (mainTopicEdit) {
            setMainTopicName(mainTopicEdit.name);
        } else {
            setMainTopicName('');
        }
    }, [mainTopicEdit]);
    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            if (mainTopicEdit) {
                handleUpdateMainTopic();
            } else {
                handleAddMainTopic();
            }
        }
    };
    const handleAddMainTopic = () => {
        if (mainTopicName.trim() === '') {
            setError('Name not blank');
            return;
        }
        setError('');
        const newMainTopic: MainTopic = {
            id: 0,
            name: mainTopicName,
            createdAt: new Date(),
            updatedAt: new Date(),
            updateBy: ''
        };
        createMainTopic(newMainTopic).then((response: any) => {
            console.log(response);
            if (response.status === 201) {
                setMainTopics((prev) => [...prev, response.data]);
                setMainTopicName('');
                toast.success(response.message, { containerId: 'page-main-topic' });
            } else {
                setError(response.message);
                toast.error(response.message, { containerId: 'page-main-topic' });
            }
        })
    }
    const handleDeleteMainTopic = (id: number) => {
        deleteMainTopic(id).then((response: any) => {
            if (response.status === 204) {
                setMainTopics((prev) => prev.filter((topic) => topic.id !== id));
                toast.success(response.message, { containerId: 'page-main-topic' });
            } else {
                toast.error(response.message, { containerId: 'page-main-topic' });
            }
        });
    }
    const handleUpdateMainTopic = () => {
        if (mainTopicEdit) {
            const newMainTopic: MainTopic = {
                id: mainTopicEdit.id,
                name: mainTopicName,
                createdAt: mainTopicEdit.createdAt,
                updatedAt: new Date(),
                updateBy: ''
            };
            updateMainTopic(newMainTopic).then((response: any) => {
                if (response.status === 200) {
                    setMainTopics((prev) => prev.map((topic) => {
                        if (topic.id === mainTopicEdit.id) {
                            return response.data;
                        }
                        return topic;
                    }));
                    setMainTopicEdit(null);
                    setMainTopicName('');
                    toast.success(response.message, { containerId: 'page-main-topic' });
                } else {
                    toast.error(response.message, { containerId: 'page-main-topic' });
                }
            });
        }
    }
    const inputMainTopicName = useRef<HTMLInputElement>(null);
    const handleChangePageSize = (size: number) => {
        setSize(size);
        setPage(0);
    }
    return (
        <DataContext.Provider value={{ size, handleChangePageSize }}>
            <div className="p-4">
                <h2>Main topic</h2>
                <Loading loading={isLoading} />
                <ToastContainer containerId='page-main-topic' />
                {/* Form nhập thông tin Chủ đề chính */}
                <div className="mb-4 col-md-6">
                    <label htmlFor="mainTopicName" className="form-label">
                        Main Topic name
                    </label>
                    <input
                        ref={inputMainTopicName}
                        type="text"
                        id="mainTopicName"
                        className="form-control mb-2"
                        placeholder="Enter main topic name"
                        value={mainTopicName}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            setMainTopicName(e.target.value);
                            setError('');
                        }}
                    />
                    <div className='text-danger mb-2'>{error}</div>
                    {!mainTopicEdit && <button className="btn btn-primary" onClick={handleAddMainTopic}>
                        Add
                    </button>}
                    {mainTopicEdit && <button className="btn btn-secondary" onClick={handleUpdateMainTopic}>
                        Update
                    </button>}
                </div>
                <TableMainTopic mainTopics={mainTopics} pageResponse={pageResponse} setMainTopicEdit={setMainTopicEdit}
                    mainTopicEdit={mainTopicEdit}
                    handleDeleteMainTopic={handleDeleteMainTopic}
                    page={page} setPage={setPage}
                />

            </div>
        </DataContext.Provider>
    );
};

export default MainTopicPage;
