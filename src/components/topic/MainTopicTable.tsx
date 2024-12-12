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
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase">
                    <tr>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">ID</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Name</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Diamond</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Gold</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                    {mainTopics.length > 0 ? (
                        mainTopics.map((topic) => (
                            <tr
                                key={topic.id}
                                className={`${mainTopicEdit?.id === topic.id ? "bg-yellow-50" : "bg-white"} 
                        hover:bg-gray-50 transition duration-200 ease-in-out`}
                            >
                                <td className="px-4 py-3 text-sm text-gray-600">{topic.id}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-800">{topic.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {topic.diamond}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {topic.gold}
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3 flex items-center space-x-3">
                                    {mainTopicEdit?.id !== topic.id ? (
                                        <button
                                            className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                                            onClick={() => setMainTopicEdit(topic)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square ml-1"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                                            onClick={() => setMainTopicEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
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
                            <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                No topics yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {mainTopics.length > 0 && (
                <div className="mt-4">
                    <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                title="Confirm Deletion"
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

            {/* Page size adjustment */}
            {mainTopics.length > 0 && (
                <div className="mt-4">
                    <PageSize size={context.size} handlePageSizeChange={context.handleChangePageSize} />
                </div>
            )}
        </div>

    );

}