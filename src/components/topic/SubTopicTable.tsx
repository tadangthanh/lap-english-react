import { useContext, useState } from "react";
import { SubTopic } from "../../modal/SubTopic";
import { PageResponse } from "../../modal/PageResponse";
import { Paging } from "../common/Paging";
import ConfirmationModal from "../common/ConfirmationModal";
import { PageSize } from "../common/PageSize";
import { DataContext } from "../context/DataContext";

interface TableSubTopicProps {
    subTopics: SubTopic[];
    pageResponse: PageResponse<SubTopic>;
    setPage: (page: number) => void;
    page: number;
    setSubTopicEdit: (subTopic: SubTopic | null) => void;
    subTopicEdit: SubTopic | null;
    handleDeleteSubTopic: (id: number) => void;
}

export const SubTopicTable: React.FC<TableSubTopicProps> = ({
    subTopics,
    pageResponse,
    setPage,
    page,
    setSubTopicEdit,
    subTopicEdit,
    handleDeleteSubTopic,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [subTopicId, setSubTopicId] = useState(-1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State lưu URL của ảnh phóng to
    const context = useContext(DataContext);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    return (
        <div className="table-responsive mt-4">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Chủ đề</th>
                        <th>Ảnh</th>
                        <th>Chủ đề chính</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subTopics.length > 0 ? (
                        subTopics.map((topic) => (
                            <tr key={topic.id}>
                                <td style={{ background: subTopicEdit?.id === topic.id ? "grey" : "white" }}>{topic.id}</td>
                                <td style={{ background: subTopicEdit?.id === topic.id ? "grey" : "white" }}>{topic.name}</td>
                                <td style={{ background: subTopicEdit?.id === topic.id ? "grey" : "white" }}>
                                    {topic.imageUrl && <img
                                        src={topic.imageUrl}
                                        alt={topic.name}
                                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                                        onClick={() => handleImageClick(topic.imageUrl)} // Bắt sự kiện click
                                    />}
                                </td>
                                <td style={{ background: subTopicEdit?.id === topic.id ? "grey" : "white" }}>{topic.mainTopicName}</td>
                                <td style={{ background: subTopicEdit?.id === topic.id ? "grey" : "white" }}>
                                    {new Date(topic.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ background: subTopicEdit?.id === topic.id ? "grey" : "white" }}>
                                    {new Date(topic.updatedAt).toLocaleDateString()}
                                </td>
                                <td>
                                    {subTopicEdit?.id !== topic.id && (
                                        <button
                                            className="btn btn-sm btn-secondary me-2"
                                            onClick={() => setSubTopicEdit(topic)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    )}
                                    {subTopicEdit?.id === topic.id && (
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => setSubTopicEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            setShowModal(true);
                                            setSubTopicId(topic.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center">
                                Không có chủ đề phụ nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
            {/* Modal xác nhận xóa */}
            <ConfirmationModal
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa chủ đề phụ này không? Việc này sẽ xóa tất cả các đối tượng phụ thuộc vào chủ đề phụ này."
                labelConfirm="Xóa"
                labelCancel="Hủy"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => {
                    handleDeleteSubTopic(subTopicId);
                    setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
            />
            <PageSize
                size={context.size}
                handlePageSizeChange={context.handleChangePageSize}
            />
            {/* Modal hiển thị ảnh */}
            {selectedImage && (
                <div
                    className="modal"
                    style={{
                        display: "block",
                        background: "rgba(0, 0, 0, 0.8)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1050,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={() => setSelectedImage(null)} // Đóng modal khi click bên ngoài
                >
                    <img
                        src={selectedImage}
                        alt="Zoomed"
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            margin: "auto",
                            display: "block",
                        }}
                    />
                </div>
            )}
        </div>
    );
};
