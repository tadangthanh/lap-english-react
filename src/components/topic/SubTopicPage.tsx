import { useEffect, useRef, useState } from "react";
import { MainTopic } from "../../modal/MainTopic";
import MainTopicSelect from "./MainTopicSelect";
import { getAllMainTopic } from "../../api/maintopic/MainTopicApi";
import { toast, ToastContainer } from "react-toastify";
import { SubTopicTable } from "./SubTopicTable";
import { SubTopic } from "../../modal/SubTopic";
import { PageResponse } from "../../modal/PageResponse";
import { DataContext } from '../context/DataContext';
import { createSubTopic, deleteSubTopic, getSubTopicPage, updateSubTopic } from "../../api/subtopic/SubTopicApi";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../api/ApiUtils";
import { Loading } from "../common/LoadingSpinner";
import ConfirmationModal from "../common/ConfirmationModal";


export const SubTopicPage: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [subTopicName, setSubTopicName] = useState<string>(''); // State cho tên chủ đề con
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref cho input ảnh\
    const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
    const [mainTopicIdSelected, setMainTopicIdSelected] = useState<number>(-1);
    const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
    const [page, setPage] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [size, setSize] = useState<number>(10);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string>('');
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

    const [subTopicEdit, setSubTopicEdit] = useState<SubTopic | null>(null);

    const [pageResponse, setPageResponse] = useState<PageResponse<SubTopic>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: []
    })
    const handleDeleteSubTopic = (id: number) => {
        deleteSubTopic(id).then((response: any) => {
            if (response.status === 204) {
                setSubTopics((prev) => prev.filter((item) => item.id !== id));
                toast.success('Xóa thành công', { containerId: 'sub-topic' });
            } else {
                toast.error(response.message, { containerId: 'sub-topic' });
            }
        });
    }
    useEffect(() => {
        setSubTopicEdit(null);
        getSubTopicPage(page, size).then((response: any) => {
            if (response.status === 200) {
                setSubTopics(response.data.items);
                setPageResponse(response.data);
            } else {
                toast.error(response.message, { containerId: 'sub-topic' });
            }
        }).catch((error) => {
            toast.error(error.message, { containerId: 'sub-topic' });
        });
    }, [page, size]);
    useEffect(() => {
        getAllMainTopic().then((response: any) => {
            if (response.status === 200) {
                setMainTopics(response.data);
            } else {
                toast.error(response.message, { containerId: 'sub-topic' });
            }
        }).catch((error) => {
            toast.error(error.message, { containerId: 'sub-topic' });
        });
    }, []);
    // Xử lý khi người dùng chọn ảnh
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (subTopicEdit?.imageUrl) {
            setShowModal(true);
        }
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setFile(file);
        }
    };
    // Xử lý khi người dùng xóa ảnh và reset input
    const handleImageDelete = () => {
        setFile(null);
        setImagePreview(null);
        setSubTopicName(''); // Đặt lại tên chủ đề con về chuỗi rỗng
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Đặt lại giá trị của input file
        }

    };
    const handleAddSubTopic = () => {
        setIsLoading(true);
        if (!subTopicName || mainTopicIdSelected === -1) {
            setIsLoading(false);
            toast.error('Vui lòng nhập đủ thông tin', { containerId: 'sub-topic' });
            return
        }
        const newSubTopic: SubTopic = {
            id: 0,
            name: subTopicName,
            imageUrl: '',
            mainTopicId: mainTopicIdSelected,
            mainTopicName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            updateBy: ''
        }

        createSubTopic(newSubTopic, file ?? undefined).then((response: any) => {
            if (response.status === 201) {
                toast.success('Thêm thành công', { containerId: 'sub-topic' });
                setSubTopics((prev) => [...prev, response.data]);
                handleImageDelete();
                setSubTopicName('');
                setIsLoading(false);
            } else {
                setIsLoading(false);
                toast.error(response.message, { containerId: 'sub-topic' });
            }
        })
    }
    const handleChangePageSize = (size: number) => {
        setSize(size);
        setPage(0);
    }
    useEffect(() => {
        if (subTopicEdit) {
            setSubTopicName(subTopicEdit.name);
            setMainTopicIdSelected(subTopicEdit.mainTopicId);
        } else {
            setSubTopicName('');
            setMainTopicIdSelected(-1);
        }
    }, [subTopicEdit]);
    const handleSelectMainTopic = (mainTopic?: MainTopic) => {
        if (mainTopic) {
            setMainTopicIdSelected(mainTopic.id);
        }
    }
    const handleClearImageInput = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
    const handleUpdateSubTopic = () => {
        setIsLoading(true);
        if (subTopicEdit) {
            updateSubTopic({
                ...subTopicEdit,
                name: subTopicName
            }, file ?? undefined).then((response: any) => {
                setIsLoading(false);
                if (response.status === 200) {
                    toast.success('Cập nhật thành công', { containerId: 'sub-topic' });
                    setSubTopics((prev) => prev.map((item) => {
                        if (item.id === response.data.id) {
                            return response.data;
                        }
                        return item;
                    }));
                    setSubTopicEdit(null);
                    handleClearImageInput();
                    setSubTopicName('');
                } else {
                    toast.error(response.message, { containerId: 'sub-topic' });
                }
            });
        }
        setFile(null);
    }
    return (
        <DataContext.Provider value={{ size, handleChangePageSize }}>
            <div className="mb-4 mt-5" >
                <Loading loading={isLoading} />
                <ToastContainer containerId='sub-topic' />
                <h5>Chủ đề phụ</h5>
                <div className=" p-3 mb-3">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <label htmlFor="subTopicName" className="form-label">
                                Tên Chủ đề <span style={{ color: "red" }}>*</span>
                            </label>

                            <input
                                type="text"
                                id="subTopicName"
                                className="form-control mb-2"
                                placeholder="Nhập tên chủ đề phụ"
                                value={subTopicName}
                                onChange={(e) => setSubTopicName(e.target.value)}
                            />

                            <label htmlFor="subTopicImage" className="form-label">
                                Ảnh minh họa
                            </label>
                            <input
                                type="file"
                                id="subTopicImage"
                                className="form-control mb-2"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />

                            {/* Hiển thị ảnh xem trước nếu có */}
                            {imagePreview && (
                                <div className="mt-3 position-relative">
                                    <label className="form-label">Xem trước ảnh:</label>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="img-thumbnail"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger position-absolute top-0 end-0 m-2"
                                        onClick={handleImageDelete}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            )}
                            <div className="col-md-6">
                                <MainTopicSelect handleSelectMainTopic={handleSelectMainTopic} mainTopics={mainTopics}
                                    isRequired={true}
                                    idMainTopicSelected={mainTopicIdSelected}
                                />
                                <div className="d-flex mt-3">
                                    {subTopicEdit ? <button className="btn btn-secondary" onClick={handleUpdateSubTopic}>
                                        Cập nhật
                                    </button> : <button className="btn btn-success" onClick={handleAddSubTopic}>
                                        Thêm
                                    </button>}
                                </div>
                            </div>
                        </div>
                        <SubTopicTable
                            subTopics={subTopics}
                            handleDeleteSubTopic={handleDeleteSubTopic}
                            setSubTopicEdit={setSubTopicEdit}
                            subTopicEdit={subTopicEdit}
                            page={page}
                            setPage={setPage}
                            pageResponse={pageResponse}
                        />

                    </div>
                </div>
                {/* Modal xác nhận xóa */}
                <ConfirmationModal
                    title="Thông báo"
                    message="Việc này sẽ thay thế ảnh hiện tại. Bạn có chắc chắn muốn tiếp tục không?"
                    labelConfirm="Tiếp tục"
                    labelCancel="Hủy"
                    colorConfirm="green"
                    show={showModal}
                    onConfirm={() => {
                        setShowModal(false);
                    }}
                    onCancel={() => {
                        setShowModal(false);
                        handleClearImageInput();
                    }}
                />
            </div >
        </DataContext.Provider>
    );
}