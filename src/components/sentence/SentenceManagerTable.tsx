import { useContext, useState } from "react";
import { Sentence } from "../../modal/Sentence";
import { PageResponse } from "../../modal/PageResponse";
import { Paging } from "../common/Paging";
import ConfirmationModal from "../common/ConfirmationModal";
import { PageSize } from "../common/PageSize";
import { DataContext } from "../context/DataContext";
import "../css/common.css";

interface TableSentenceProps {
    sentences: Sentence[];
    pageResponse: PageResponse<Sentence>;
    setPage: (page: number) => void;
    page: number;
    setSentenceEdit: (sentence: Sentence | null) => void;
    sentenceEdit: Sentence | null;
    handleDeleteSentence: (id: number) => void;
}

export const SentenceManagerTable: React.FC<TableSentenceProps> = ({
    sentences,
    pageResponse,
    setPage,
    page,
    setSentenceEdit,
    sentenceEdit,
    handleDeleteSentence,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [sentenceId, setSentenceId] = useState(-1);
    const [showContentModal, setShowContentModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", content: "" });
    const context = useContext(DataContext);

    const handleContentClick = (title: string, content: string) => {
        setModalContent({ title, content });
        setShowContentModal(true);
    };

    return (
        <div className="overflow-x-auto mt-4 zoom-in">
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">ID</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Sentence</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Translation</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Created Date</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Last Modified</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sentences.length > 0 ? (
                        sentences.map((sentence) => (
                            <tr key={sentence.id} className="hover:bg-gray-50">
                                <td
                                    className={`px-4 py-2 border-b ${sentenceEdit?.id === sentence.id ? "bg-gray-200" : "bg-white"
                                        }`}
                                >
                                    {sentence.id}
                                </td>
                                <td
                                    className={`px-4 py-2 border-b cursor-pointer ${sentenceEdit?.id === sentence.id ? "bg-gray-200" : "bg-white"
                                        }`}
                                    onClick={() =>
                                        handleContentClick("Sentence", sentence.sentence)
                                    }
                                >
                                    {sentence.sentence.length > 30
                                        ? sentence.sentence.slice(0, 30) + "..."
                                        : sentence.sentence}
                                </td>
                                <td
                                    className={`px-4 py-2 border-b cursor-pointer ${sentenceEdit?.id === sentence.id ? "bg-gray-200" : "bg-white"
                                        }`}
                                    onClick={() =>
                                        handleContentClick("Translation", sentence.translation)
                                    }
                                >
                                    {sentence.translation.length > 30
                                        ? sentence.translation.slice(0, 30) + "..."
                                        : sentence.translation}
                                </td>
                                <td
                                    className={`px-4 py-2 border-b ${sentenceEdit?.id === sentence.id ? "bg-gray-200" : "bg-white"
                                        }`}
                                >
                                    {new Date(sentence.createdAt).toLocaleDateString()}
                                </td>
                                <td
                                    className={`px-4 py-2 border-b ${sentenceEdit?.id === sentence.id ? "bg-gray-200" : "bg-white"
                                        }`}
                                >
                                    {new Date(sentence.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {sentenceEdit?.id !== sentence.id ? (
                                        <button
                                            className="mr-2 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                            onClick={() => setSentenceEdit(sentence)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square ml-1"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="mr-2 px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                                            onClick={() => setSentenceEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                        onClick={() => {
                                            setShowModal(true);
                                            setSentenceId(sentence.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center px-4 py-2 text-gray-500">
                                No sentences yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paging */}
            {sentences.length > 0 && (
                <div className="mt-4">
                    <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
                </div>
            )}

            {/* Modal xác nhận xóa */}
            <ConfirmationModal
                title="Confirm"
                message="Are you sure you want to delete this sentence?"
                labelConfirm="Delete"
                labelCancel="Cancel"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => {
                    handleDeleteSentence(sentenceId);
                    setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
            />

            {/* Page size */}
            {sentences.length > 0 && (
                <div className="mt-4">
                    <PageSize size={context.size} handlePageSizeChange={context.handleChangePageSize} />
                </div>
            )}

            {showContentModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setShowContentModal(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold mb-4">{modalContent.title}</h3>
                        <p className="text-gray-700 flex break-words">{modalContent.content}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setShowContentModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};
