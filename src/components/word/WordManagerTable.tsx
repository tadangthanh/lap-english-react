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
}

export const WordManagerTable: React.FC<TableWordProps> = ({
    words,
    pageResponse,
    setPage,
    page,
    handleDeleteWord,
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
            <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">ID</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Word</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Meaning</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Pronunciation (UK)</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Pronunciation (US)</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Image</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Audio</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Example</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Type</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Level</th>
                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {words.length > 0 ? (
                        words.map((word) => (
                            <tr key={word.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{word.id}</td>
                                <td className="px-4 py-2 border-b">{word.word}</td>
                                <td className="px-4 py-2 border-b">{word.meaning}</td>
                                <td className="px-4 py-2 border-b">{word.pronounceUK}</td>
                                <td className="px-4 py-2 border-b">{word.pronounceUS}</td>
                                <td className="px-4 py-2 border-b">
                                    {word.imageBlobName && (
                                        <img
                                            src={baseUrlBlob + word.imageBlobName}
                                            alt={word.word}
                                            className="w-12 h-12 cursor-pointer rounded"
                                            onClick={() => handleImageClick(baseUrlBlob + word.imageBlobName)}
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {word.audioUkBlobName && (
                                        <div className="flex items-center space-x-2">
                                            <span>UK</span>
                                            <i
                                                className="fa-solid fa-volume-high text-gray-500 cursor-pointer hover:text-gray-700"
                                                title="Click to play audio"
                                                onClick={() => playAudio(baseUrlBlob + word.audioUkBlobName)}
                                            ></i>
                                        </div>
                                    )}
                                    {word.audioUsBlobName && (
                                        <div className="flex items-center space-x-2">
                                            <span>US</span>
                                            <i
                                                className="fa-solid fa-volume-high text-gray-500 cursor-pointer hover:text-gray-700"
                                                title="Click to play audio"
                                                onClick={() => playAudio(baseUrlBlob + word.audioUsBlobName)}
                                            ></i>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2 border-b">{word.example}</td>
                                <td className="px-4 py-2 border-b">{word.type}</td>
                                <td className="px-4 py-2 border-b">{word.level}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        className="px-3 py-1 text-sm text-red-600 bg-red-200 rounded hover:bg-red-300"
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
                            <td colSpan={11} className="px-4 py-2 text-center text-gray-500">
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
                        className="max-w-3/4 max-h-3/4 rounded shadow-lg"
                    />
                </div>
            )}
        </div>
    );

};
