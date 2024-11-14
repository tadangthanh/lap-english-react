import React, { useEffect, useRef, useState } from 'react';
import MainTopicSelect from './MainTopicSelect';
import { MainTopic } from '../../modal/MainTopic';
import { verifyToken } from '../../api/ApiUtils';
import { useNavigate } from 'react-router-dom';
import { createMainTopic, deleteMainTopic, getAllMainTopic, getMainTopicPage, updateMainTopic } from '../../api/maintopic/MainTopicApi';
import { Loading } from '../common/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';
import { SubTopic } from './SubTopicPage';
import { TableMainTopic } from './MainTopicTable';
import { PageResponse } from '../../modal/PageResponse';
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
                toast.error(response.message, { containerId: 'sub-topic' });
            }
        }).catch((error) => {
            toast.error(error.message, { containerId: 'sub-topic' });
        });
    }, [page]);

    useEffect(() => {
        inputMainTopicName?.current?.focus();
        inputMainTopicName.current?.scrollIntoView();
        if (mainTopicEdit) {
            setMainTopicName(mainTopicEdit.name);
        } else {
            setMainTopicName('');
        }
    }, [mainTopicEdit]);
    const handleAddMainTopic = () => {
        if (mainTopicName.trim() === '') {
            setError('Tên không được để trống');
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
                toast.success('Thêm thành công', { containerId: 'page-main-topic' });
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
                toast.success('Xóa thành công', { containerId: 'page-main-topic' });
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
                    toast.success('Cập nhật thành công', { containerId: 'page-main-topic' });
                } else {
                    toast.error(response.message, { containerId: 'page-main-topic' });
                }
            });
        }
    }
    const inputMainTopicName = useRef<HTMLInputElement>(null);

    return (
        <div className="p-4">
            <h2>Chủ đề</h2>
            <Loading loading={isLoading} />
            <ToastContainer containerId='page-main-topic' />
            {/* Form nhập thông tin Chủ đề chính */}
            <div className="mb-4 col-md-6">
                <label htmlFor="mainTopicName" className="form-label">
                    Tên Chủ đề chính
                </label>
                <input
                    ref={inputMainTopicName}
                    type="text"
                    id="mainTopicName"
                    className="form-control mb-2"
                    placeholder="Nhập tên chủ đề chính"
                    value={mainTopicName}
                    onChange={(e) => {
                        setMainTopicName(e.target.value);
                        setError('');
                    }}
                />
                <div className='text-danger mb-2'>{error}</div>
                {!mainTopicEdit && <button className="btn btn-primary" onClick={handleAddMainTopic}>
                    Thêm Chủ đề chính
                </button>}
                {mainTopicEdit && <button className="btn btn-secondary" onClick={handleUpdateMainTopic}>
                    Cập nhật
                </button>}
            </div>
            <TableMainTopic mainTopics={mainTopics} pageResponse={pageResponse} setMainTopicEdit={setMainTopicEdit}
                mainTopicEdit={mainTopicEdit}
                handleDeleteMainTopic={handleDeleteMainTopic}
                page={page} setPage={setPage}
            />

        </div>
    );
};

export default MainTopicPage;
