import React, { useRef, useState } from 'react';
import { MdlMainVocabularyTopic } from '../../modal/MdlMainVocabularyTopic';

const MainTopic: React.FC = () => {
    const mainTopics = [
        new MdlMainVocabularyTopic(1, 'Chủ đề Sức khỏe'),
        new MdlMainVocabularyTopic(2, 'Chủ đề Giáo dục'),
        new MdlMainVocabularyTopic(3, 'Chủ đề Du lịch')
    ];

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [subTopicName, setSubTopicName] = useState<string>(''); // State cho tên chủ đề con
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref cho input ảnh

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

    return (
        <div className="p-4">
            <h2>Chủ đề</h2>

            {/* Form nhập thông tin Chủ đề chính */}
            <div className="mb-4">
                <label htmlFor="mainTopicName" className="form-label">
                    Tên Chủ đề chính
                </label>
                <input
                    type="text"
                    id="mainTopicName"
                    className="form-control mb-2"
                    placeholder="Nhập tên chủ đề chính"
                />
                <button className="btn btn-primary">
                    Thêm Chủ đề chính
                </button>
            </div>

            {/* Form nhập thông tin Chủ đề con */}
            <div className="mb-4">
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
                                <label htmlFor="mainTopicSelect" className="form-label">
                                    Chọn Chủ đề chính
                                </label>
                                <select id="mainTopicSelect" className="form-select mb-2">
                                    {mainTopics.map((topic) => (
                                        <option key={topic.id} value={topic.id}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="d-flex mt-3">
                                    <button className="btn btn-success">
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainTopic;
