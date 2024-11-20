import { useContext, useState } from "react";
import { SubTopic } from "../../modal/SubTopic";
import { PageResponse } from "../../modal/PageResponse";
import { Paging } from "../common/Paging";
import ConfirmationModal from "../common/ConfirmationModal";
import { PageSize } from "../common/PageSize";
import { DataContext } from "../context/DataContext";
import { baseUrlBlob } from "../../api/ApiUtils";
import { useNavigate } from "react-router-dom";

interface TableSubTopicProps {
    subTopics: SubTopic[];
    pageResponse: PageResponse<SubTopic>;
    setPage: (page: number) => void;
    page: number;
    setSubTopicEdit: (subTopic: SubTopic | null) => void;
    subTopicEdit: SubTopic | null;
    handleDeleteSubTopic: (id: number) => void;
}

export const SubTopicManagerTable: React.FC<TableSubTopicProps> = ({
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
    const navigate = useNavigate();

    const handleClickExtractMore = (subTopicId: number) => {
        navigate(`/sub-topic/${subTopicId}`);
    }

    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">ID</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Name</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Image preview</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Main Topic</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Total word</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Created date</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Last modified date</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subTopics.length > 0 ? (
                        subTopics.map((topic) => (
                            <tr key={topic.id} className="hover:bg-gray-50">
                                <td
                                    className={`px-4 py-2 border-b ${subTopicEdit?.id === topic.id ? "bg-gray-200" : "bg-white"
                                        }`}
                                >
                                    {topic.id}
                                </td>
                                <td
                                    className={`px-4 py-2 border-b ${subTopicEdit?.id === topic.id ? "bg-gray-200" : "bg-white"
                                        }`}
                                >
                                    {topic.name}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {topic.blobName && (
                                        <img
                                            src={baseUrlBlob + topic.blobName}
                                            alt={topic.name}
                                            className="w-12 h-12 cursor-pointer rounded"
                                            onClick={() => handleImageClick(baseUrlBlob + topic.blobName)}
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-2 border-b">{topic.mainTopicName}</td>
                                <td className="px-4 py-2 border-b">{topic.wordCount}</td>
                                <td className="px-4 py-2 border-b">{new Date(topic.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b">{new Date(topic.updatedAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b flex items-center space-x-2">
                                    {subTopicEdit?.id !== topic.id ? (
                                        <button
                                            className="px-2 py-1 text-sm text-blue-600 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => setSubTopicEdit(topic)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square ml-1"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="px-2 py-1 text-sm text-yellow-600 bg-yellow-200 rounded hover:bg-yellow-300"
                                            onClick={() => setSubTopicEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="px-2 py-1 text-sm text-red-600 bg-red-200 rounded hover:bg-red-300"
                                        onClick={() => {
                                            setShowModal(true);
                                            setSubTopicId(topic.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline"
                                        onClick={() => handleClickExtractMore(topic.id)}
                                    >
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                                No topics yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {subTopics.length > 0 && (
                <div className="mt-4">
                    <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
                </div>
            )}

            {/* Modal xác nhận xóa */}
            <ConfirmationModal
                title="Confirm"
                message="Are you sure you want to delete this topic? This action will delete all objects that depend on this topic."
                labelConfirm="Delete"
                labelCancel="Cancel"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => {
                    handleDeleteSubTopic(subTopicId);
                    setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
            />

            {/* Điều chỉnh số lượng hiển thị */}
            {subTopics.length > 0 && (
                <div className="mt-4">
                    <PageSize size={context.size} handlePageSizeChange={context.handleChangePageSize} />
                </div>
            )}

            {/* Modal hiển thị ảnh */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Zoomed"
                        className="max-w-3/4 max-h-3/4 rounded shadow-lg"
                    />
                </div>
            )}
        </div>
    );

};