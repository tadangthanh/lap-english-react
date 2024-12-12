import { useContext, useState } from "react";
import { Word } from "../../modal/Word";
import { PageResponse } from "../../modal/PageResponse";
import { Paging } from "../common/Paging";
import ConfirmationModal from "../common/ConfirmationModal";
import { PageSize } from "../common/PageSize";
import { DataContext } from "../context/DataContext";
import { baseUrlBlob } from "../../api/ApiUtils";

interface TableWordProps {
    words: Word[];
    pageResponse: PageResponse<Word>;
    setPage: (page: number) => void;
    page: number;
    handleDeleteWord: (id: number) => void;
    wordEdit: Word | null;
    setWordEdit: (word: Word | null) => void;
}

export const WordManagerTable: React.FC<TableWordProps> = ({
    words,
    pageResponse,
    setPage,
    page,
    handleDeleteWord,
    wordEdit,
    setWordEdit,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [wordId, setWordId] = useState(-1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State lưu URL của ảnh phóng to
    const context = useContext(DataContext);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const playAudio = (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <div className="overflow-x-auto mt-4 zoom-in">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase">
                    <tr>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">ID</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Word</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Meaning</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Pronunciation (UK)</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Pronunciation (US)</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Image</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Audio</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Example</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Type</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Level</th>
                        <th className="px-4 py-3 border-b text-left text-xs font-semibold">Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                    {words.length > 0 ? (
                        words.map((word) => (
                            <tr key={word.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                                <td className="px-4 py-3 text-sm text-gray-600">{word.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{word.word}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{word.meaning}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{word.pronounceUK}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{word.pronounceUS}</td>

                                {/* Image */}
                                <td className="px-4 py-3 text-center">
                                    {word.imageBlobName && (
                                        <img
                                            src={baseUrlBlob + word.imageBlobName}
                                            alt={word.word}
                                            className="w-12 h-12 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => handleImageClick(baseUrlBlob + word.imageBlobName)}
                                        />
                                    )}
                                </td>

                                {/* Audio */}
                                <td className="px-4 py-3 text-gray-600">
                                    {word.audioUkBlobName && (
                                        <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 cursor-pointer transition">
                                            <span>UK</span>
                                            <i
                                                className="fa-solid fa-volume-high"
                                                onClick={() => playAudio(baseUrlBlob + word.audioUkBlobName)}
                                            ></i>
                                        </div>
                                    )}
                                    {word.audioUsBlobName && (
                                        <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 cursor-pointer transition">
                                            <span>US</span>
                                            <i
                                                className="fa-solid fa-volume-high"
                                                onClick={() => playAudio(baseUrlBlob + word.audioUsBlobName)}
                                            ></i>
                                        </div>
                                    )}
                                </td>

                                <td className="px-4 py-3 text-sm text-gray-600">{word.example}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{word.type}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{word.level}</td>

                                {/* Actions */}
                                <td className="px-4 py-3 flex items-center space-x-2">
                                    {wordEdit?.id !== word.id ? (
                                        <button
                                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                                            onClick={() => setWordEdit(word)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square ml-1"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="px-2 py-1 text-xs text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                                            onClick={() => setWordEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 transition"
                                        onClick={() => {
                                            setShowModal(true);
                                            setWordId(word.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11} className="px-4 py-3 text-center text-gray-500">
                                No words found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {words.length > 0 && (
                <div className="mt-4">
                    <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                title="Confirm Deletion"
                message="Are you sure you want to delete this word? This action cannot be undone."
                labelConfirm="Delete"
                labelCancel="Cancel"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => {
                    handleDeleteWord(wordId);
                    setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
            />

            {/* Page size adjustment */}
            {words.length > 0 && (
                <div className="mt-4">
                    <PageSize size={context.size} handlePageSizeChange={context.handleChangePageSize} />
                </div>
            )}

            {/* Modal for image preview */}
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
