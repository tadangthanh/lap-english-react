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
    setWordEdit: (word: Word | null) => void;
    wordEdit: Word | null;
    handleDeleteWord: (id: number) => void;
}

export const WordManagerTable: React.FC<TableWordProps> = ({
    words,
    pageResponse,
    setPage,
    page,
    setWordEdit,
    wordEdit,
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
        <div className="table-responsive mt-4">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Word</th>
                        <th>Meaning</th>
                        <th>Pronunciation (UK)</th>
                        <th>Pronunciation (US)</th>
                        <th>Image</th>
                        <th>Audio</th>
                        <th>Example</th>
                        <th>Type</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {words.length > 0 ? (
                        words.map((word) => (
                            <tr key={word.id}>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.id}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.word}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.meaning}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.pronounceUK}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.pronounceUS}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.imageBlobName && (
                                        <img
                                            src={baseUrlBlob + word.imageBlobName}
                                            alt={word.word}
                                            style={{ width: "50px", height: "50px", cursor: "pointer" }}
                                            onClick={() => handleImageClick(baseUrlBlob + word.imageBlobName)}
                                        />
                                    )}
                                </td>
                                {/* Cột Audio */}
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.audioUkBlobName && (
                                        <div className="d-flex align-items-center mb-2">
                                            <span>UK</span>
                                            <i
                                                className="fa-solid fa-volume-high ms-2" title="Click to play audio"
                                                style={{ cursor: "pointer", color: "grey" }}
                                                onClick={() => playAudio(baseUrlBlob + word.audioUkBlobName)}
                                            ></i>
                                        </div>
                                    )}
                                    {word.audioUsBlobName && (
                                        <div className="d-flex align-items-center">
                                            <span>US</span>
                                            <i title="Click to play audio"
                                                className="fa-solid fa-volume-high ms-2"
                                                style={{ cursor: "pointer", color: "grey" }}
                                                onClick={() => playAudio(baseUrlBlob + word.audioUsBlobName)}
                                            ></i>
                                        </div>
                                    )}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.example}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.type}
                                </td>
                                <td style={{ background: wordEdit?.id === word.id ? "grey" : "white" }}>
                                    {word.level}
                                </td>
                                <td>
                                    {wordEdit?.id !== word.id && (
                                        <button
                                            className="btn btn-sm btn-secondary me-2"
                                            onClick={() => setWordEdit(word)}
                                        >
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    )}
                                    {wordEdit?.id === word.id && (
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => setWordEdit(null)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-sm btn-danger"
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
                            <td colSpan={11} className="text-center">
                                No words found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
            {/* Modal xác nhận xóa */}
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
