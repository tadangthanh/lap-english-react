import { useContext, useState } from "react";
import { MainTopic } from "../../modal/MainTopic";
import { PageResponse } from "../../modal/PageResponse";
import { Paging } from "../common/Paging";
import ConfirmationModal from "../common/ConfirmationModal";
import { PageSize } from "../common/PageSize";
import { DataContext } from "../context/DataContext";

interface TableMainTopicProps {
    mainTopics: MainTopic[];
    pageResponse: PageResponse<MainTopic>;
    setPage: (page: number) => void;
    page: number;
    setMainTopicEdit: (mainTopic: MainTopic | null) => void;
    mainTopicEdit: MainTopic | null;
    handleDeleteMainTopic: (id: number) => void;
}
export const TableMainTopic: React.FC<TableMainTopicProps> = ({ mainTopics, pageResponse, setPage, page, setMainTopicEdit, mainTopicEdit, handleDeleteMainTopic }) => {
    const [showModal, setShowModal] = useState(false);
    const [mainTopicId, setMainTopicId] = useState(-1);
    const context = useContext(DataContext);
    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">ID</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Name</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Created date</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Last modified date</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mainTopics.length > 0 ? (
                        mainTopics.map((topic) => (
                            <tr
                                key={topic.id}
                                className={`${mainTopicEdit?.id === topic.id ? "bg-gray-200" : "bg-white"
                                    } hover:bg-gray-50`}
                            >
                                <td className="px-4 py-2 border-b">{topic.id}</td>
                                <td className="px-4 py-2 border-b">{topic.name}</td>
                                <td className="px-4 py-2 border-b">{new Date(topic.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b">{new Date(topic.updatedAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b flex items-center space-x-2">
                                    {mainTopicEdit?.id !== topic.id ? (
                                        <button
                                            className="px-3 py-1 text-sm text-blue-600 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => setMainTopicEdit(topic)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square ml-1"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="px-3 py-1 text-sm text-yellow-600 bg-yellow-200 rounded hover:bg-yellow-300"
                                            onClick={() => setMainTopicEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="px-3 py-1 text-sm text-red-600 bg-red-200 rounded hover:bg-red-300"
                                        onClick={() => {
                                            setShowModal(true);
                                            setMainTopicId(topic.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                                No topics yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
                <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
            </div>

            {/* Modal xác nhận xóa */}
            <ConfirmationModal
                title="Confirm"
                message="Are you sure you want to delete this topic? This will delete all objects that depend on this topic."
                labelConfirm="Delete"
                labelCancel="Cancel"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => {
                    handleDeleteMainTopic(mainTopicId);
                    setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
            />

            {/* Điều chỉnh số lượng hiển thị */}
            <div className="mt-4">
                <PageSize size={context.size} handlePageSizeChange={context.handleChangePageSize} />
            </div>
        </div>
    );

}