import { useEffect, useRef, useState } from "react";
import { MainTopic } from "../../modal/MainTopic";
import MainTopicSelect from "./MainTopicSelect";
import { getAllMainTopic } from "../../api/maintopic/MainTopicApi";
import { toast, ToastContainer } from "react-toastify";


export const SubTopic: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [subTopicName, setSubTopicName] = useState<string>(''); // State cho tên chủ đề con
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref cho input ảnh\
    const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
    useEffect(() => {
        getAllMainTopic().then((response: any) => {
            if (response.status === 200) {
                setMainTopics((prev) => [...prev, ...response.data]);
            } else {
                toast.error(response.message, { containerId: 'sub-topic' });
            }
        }).catch((error) => {
            toast.error(error.message, { containerId: 'sub-topic' });
        });
    }, []);
    // Xử lý khi người dùng chọn ảnh
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };
    // Xử lý khi người dùng xóa ảnh và reset input
    const handleImageDelete = () => {
        setImagePreview(null);
        setSubTopicName(''); // Đặt lại tên chủ đề con về chuỗi rỗng
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Đặt lại giá trị của input file
        }
    };
    const handleAddSubTopic = () => {

    }
    return (
        <div className="mb-4 mt-5" >
            <ToastContainer containerId='sub-topic' />
            <h5>Chủ đề con</h5>
            <div className=" p-3 mb-3">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <label htmlFor="subTopicName" className="form-label">
                            Tên Chủ đề con
                        </label>
                        <input
                            type="text"
                            id="subTopicName"
                            className="form-control mb-2"
                            placeholder="Nhập tên chủ đề con"
                            value={subTopicName}
                            onChange={(e) => setSubTopicName(e.target.value)}
                        />

                        <label htmlFor="subTopicImage" className="form-label">
                            Tải lên ảnh
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
                            <MainTopicSelect mainTopics={mainTopics} />

                            <div className="d-flex mt-3">
                                <button className="btn btn-success" onClick={handleAddSubTopic}>
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    );
}