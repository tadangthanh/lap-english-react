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
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <tr>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">ID</th>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Name</th>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Image Preview</th>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Main Topic</th>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Total Word</th>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Diamond</th>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Gold</th>
                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {subTopics.length > 0 ? (
                        subTopics.map((topic) => (
                            <tr
                                key={topic.id}
                                className="hover:bg-gray-50 transition duration-150 ease-in-out"
                            >
                                <td className="px-4 py-3 text-sm text-gray-600">{topic.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{topic.name}</td>
                                <td className="px-4 py-3 text-center">
                                    {topic.blobName && (
                                        <img
                                            src={baseUrlBlob + topic.blobName}
                                            alt={topic.name}
                                            className="w-12 h-12 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => handleImageClick(baseUrlBlob + topic.blobName)}
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{topic.mainTopicName}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{topic.wordCount}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {topic.diamond}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {topic.gold}
                                </td>
                                <td className="px-4 py-3 text-sm flex items-center space-x-2">
                                    {subTopicEdit?.id !== topic.id ? (
                                        <button
                                            className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                                            onClick={() => setSubTopicEdit(topic)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square ml-1"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="px-3 py-1 text-xs text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                                            onClick={() => setSubTopicEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 transition"
                                        onClick={() => {
                                            setShowModal(true);
                                            setSubTopicId(topic.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <a
                                        href="#"
                                        className="text-blue-500 hover:text-blue-700 transition"
                                        onClick={() => handleClickExtractMore(topic.id)}
                                    >
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
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
                        className="max-w-3/4 max-h-3/4 rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>

    );

};
