import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WordType } from "../../modal/WordType";
import { WordLevel } from "../../modal/WordLevel";
import { WordManagerTable } from "./WordManagerTable";
import { Word } from "../../modal/Word";
import { PageResponse } from "../../modal/PageResponse";
import { SearchOperation } from "../../modal/SearchOperation";
import { baseUrlBlob, verifyToken } from "../../api/ApiUtils";
import { createWord, getWordPage } from "../../api/word/WordApi";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "../common/LoadingSpinner";
import { DataContext } from '../context/DataContext';
import ConfirmationModal from "../common/ConfirmationModal";

interface WordPageDetailProps { }

export const WordPageDetail: React.FC<WordPageDetailProps> = () => {
    const { subTopicId } = useParams<{ subTopicId: string }>(); // Lấy tham số id từ URL
    const navigate = useNavigate(); // Sử dụng để điều hướng "Quay lại"
    const [words, setWords] = useState<Word[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [direction, setDirection] = useState<string>('asc');
    const [sortBy, setSortBy] = useState<string>('word');
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchField, setSearchField] = useState<string>('word');
    const [wordSearch, setWordSearch] = useState<string>('subTopic.id:' + subTopicId);
    const [isLoading, setIsLoading] = useState(false);
    const [searchOperation, setSearchOperation] = useState<SearchOperation>(SearchOperation.LIKE);
    const [wordEdit, setWordEdit] = useState<Word | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref cho input ảnh\
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [word, setWord] = useState<string>('');
    const [meaning, setMeaning] = useState<string>('');
    const [pronounceUK, setPronounceUK] = useState<string>('');
    const [pronounceUS, setPronounceUS] = useState<string>('');
    const [type, setType] = useState<WordType>(WordType.NOUN);
    const [level, setLevel] = useState<WordLevel>(WordLevel.A1);
    const [example, setExample] = useState<string>('');
    const [subTopicIdMdl, setSubTopicIdMdl] = useState<number>(0);
    useEffect(() => {
        if (subTopicId) {
            setSubTopicIdMdl(parseInt(subTopicId));
        } else {
            navigate(-1)
        }
    }, []);
    const [pageResponse, setPageResponse] = useState<PageResponse<Word>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: []
    })
    useEffect(() => {
        setIsLoading(true);
        verifyToken().then((response: any) => {
            if (response.status !== 200) {
                navigate('/login');
            }
            setIsLoading(false);
        })
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getWordPage(page, size, sortBy, direction, wordSearch).then((response: any) => {
            if (response.status === 200) {
                setWords(response.data.items);
                setPageResponse(response.data);
            } else {
                toast.error(response.message, { containerId: 'word' });
            }
        }).catch((error) => {
            toast.error(error.message, { containerId: 'word' });
        });
        setIsLoading(false);
    }, [page, direction, size]);

    // nếu thay đổi searchField, searchOperation, searchValue thì cập nhật lại wordSearch
    useEffect(() => {
        //word search là kết hợp của 3 trường search
        // ví dụ: word~abc (tìm từ vựng chứa abc)

        setWordSearch("subTopic.id:" + subTopicId + "," + searchField + searchOperation + searchValue);
    }, [searchField, searchOperation, searchValue]);
    const [isShowForm, setIsShowForm] = useState(false);
    const handleDeleteWord = (id: number) => {

    }
    const handleChangePageSize = (size: number) => {
        setSize(size);
        setPage(0);
    }
    useEffect(() => {
        if (wordEdit) {
            buttonFormRef.current?.click();
            setIsShowForm(true);
            setWord(wordEdit.word);
            setMeaning(wordEdit.meaning);
            setPronounceUK(wordEdit.pronounceUK);
            setPronounceUS(wordEdit.pronounceUS);
            setType(wordEdit.type);
            setLevel(wordEdit.level);
            setExample(wordEdit.example);
            setImagePreview(baseUrlBlob + wordEdit.imageBlobName);
        } else {
            clearForm();
        }
    }, [wordEdit]);
    const buttonFormRef = React.useRef<HTMLButtonElement>(null);
    // modal xác nhận xóa
    const [showModal, setShowModal] = useState(false);
    // Xử lý khi người dùng chọn ảnh
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (wordEdit?.imageBlobName) {
            setShowModal(true);
        }
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setFile(file);
        }
    };
    // xóa hết ảnh đã upload,clear input file
    const handleClearImageInput = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
    // Xử lý khi người dùng xóa ảnh và reset input
    const handleImageDelete = () => {
        setFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Đặt lại giá trị của input file
        }
    };
    const clearForm = () => {
        setWord('');
        setMeaning('');
        setPronounceUK('');
        setPronounceUS('');
        setType(WordType.NOUN);
        setLevel(WordLevel.A1);
        setExample('');
        setFile(null);
        setImagePreview(null);
        setWordEdit(null);
        handleClearImageInput();
    }
    // xử lý thêm từ mới
    const handleAddWord = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const wordAdd = new Word(0, word, meaning, pronounceUK, pronounceUS, type, level, example, subTopicIdMdl, '', '', '', '', new Date(), new Date(), '');
        createWord(wordAdd, file ?? undefined).then((response: any) => {
            if (response.status === 201) {
                toast.success(response.message, { containerId: 'word' });
                setWords((prev) => [...prev, response.data]);
                clearForm();
                setIsShowForm(false);
                handleImageDelete();
                setWordEdit(null);
                setIsLoading(false);
                setPage(0);
            } else {
                setIsLoading(false);
                toast.error(response.message, { containerId: 'word' });
            }
        });
    }
    return (
        <DataContext.Provider value={{ size, handleChangePageSize }}>
            <div className="container mt-4">
                <Loading loading={isLoading} />
                <ToastContainer containerId='word' />
                <div className="d-flex align-items-center mb-5">
                    <button
                        className="btn btn-secondary me-3"
                        onClick={() => navigate(-1)} // Quay lại trang trước đó
                    >
                        <i className="fas fa-arrow-left me-2"></i>Back
                    </button>
                    <div style={{ margin: "auto" }}> <h1 className="">Word Management</h1></div>
                </div>

                {/* Nút Add New Word */}
                {!isShowForm && <button
                    ref={buttonFormRef}
                    onClick={() => setIsShowForm(true)}
                    className="btn btn-primary mb-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#addWordForm"
                    aria-expanded="false"
                    aria-controls="addWordForm"
                >
                    Add New Word <i className="fas fa-plus ms-2"></i>
                </button>}

                {/* Form Add New Word */}
                <div className="collapse" id="addWordForm">
                    <form>
                        <div className="row">
                            {/* Cột 1 */}
                            <div className="col-md-6">
                                {/* Từ vựng */}
                                <div className="mb-3">
                                    <label htmlFor="word" className="form-label">
                                        Word
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setWord(e.target.value)}
                                        value={word}
                                        className="form-control"
                                        id="word"
                                        placeholder="Enter word"
                                    />
                                </div>

                                {/* Nghĩa */}
                                <div className="mb-3">
                                    <label htmlFor="meaning" className="form-label">
                                        Meaning
                                    </label>
                                    <input
                                        onChange={(e) => setMeaning(e.target.value)}
                                        value={meaning}
                                        type="text"
                                        className="form-control"
                                        id="meaning"
                                        placeholder="Enter meaning"
                                    />
                                </div>

                                {/* Phát âm UK */}
                                <div className="mb-3">
                                    <label htmlFor="pronounceUK" className="form-label">
                                        Pronunciation (UK)
                                    </label>
                                    <input
                                        value={pronounceUK}
                                        onChange={(e) => setPronounceUK(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="pronounceUK"
                                        placeholder="Enter UK pronunciation"
                                    />
                                </div>

                                {/* Phát âm US */}
                                <div className="mb-3">
                                    <label htmlFor="pronounceUS" className="form-label">
                                        Pronunciation (US)
                                    </label>
                                    <input
                                        value={pronounceUS}
                                        onChange={(e) => setPronounceUS(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="pronounceUS"
                                        placeholder="Enter US pronunciation"
                                    />
                                </div>
                            </div>

                            {/* Cột 2 */}
                            <div className="col-md-6">
                                {/* Loại từ (Enum: WordType) */}
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">
                                        Type
                                    </label>
                                    <select
                                        className="form-select"
                                        id="type"
                                        value={type} // Đặt giá trị hiện tại
                                        onChange={(e) => setType(WordType[e.target.value as keyof typeof WordType])} // Cập nhật giá trị
                                    >
                                        {Object.keys(WordType)
                                            .filter((key) => isNaN(Number(key))) // Lọc ra tên enum
                                            .map((key) => (
                                                <option key={key} value={key}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Trình độ (Enum: WordLevel) */}
                                <div className="mb-3">
                                    <label htmlFor="level" className="form-label">
                                        Level
                                    </label>
                                    <select className="form-select" id="level"
                                        value={level} // Đặt giá trị hiện tại
                                        onChange={(e) => setLevel(WordLevel[e.target.value as keyof typeof WordLevel])} // Cập nhật giá trị
                                    >
                                        {Object.keys(WordLevel)
                                            .filter((key) => isNaN(Number(key))) // Lọc ra tên enum
                                            .map((key) => (
                                                <option key={key} value={key}>
                                                    {key.toUpperCase()}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Ví dụ */}
                                <div className="mb-3">
                                    <label htmlFor="example" className="form-label">
                                        Example
                                    </label>
                                    <textarea
                                        value={example}
                                        onChange={(e) => setExample(e.target.value)}
                                        className="form-control"
                                        id="example"
                                        rows={3}
                                        placeholder="Enter example sentence"
                                    ></textarea>
                                </div>

                                {/* Ảnh minh họa */}
                                <div className="mb-3">
                                    <label htmlFor="imageBlobName" className="form-label">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        className="form-control"
                                        id="imageBlobName"
                                        accept="image/*"
                                    />
                                </div>
                                {/* Hiển thị ảnh xem trước nếu có */}
                                {imagePreview && (
                                    <div className="mt-3 position-relative" style={{ width: "200px" }}>
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
                            </div>
                        </div>

                        {/* Nút submit */}
                        <div className="mt-4">
                            <button type="submit" className="btn btn-success" onClick={(e: any) => handleAddWord(e)}>
                                Save Word
                            </button>
                            {/* Nút Add New Word */}
                            <button
                                onClick={() => {
                                    clearForm();
                                    setIsShowForm(false);
                                    setWordEdit(null);
                                }}
                                className="btn btn-secondary ms-2"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#addWordForm"
                                aria-expanded="false"
                                aria-controls="addWordForm"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
                <WordManagerTable
                    words={words}
                    handleDeleteWord={handleDeleteWord}
                    setWordEdit={setWordEdit}
                    wordEdit={wordEdit}
                    page={page}
                    setPage={setPage}
                    pageResponse={pageResponse}
                />
            </div>
            {/* Modal xác nhận xóa */}
            <ConfirmationModal
                title="Thông báo"
                message="Việc này sẽ thay thế ảnh hiện tại. Bạn có chắc chắn muốn tiếp tục không?"
                labelConfirm="Tiếp tục"
                labelCancel="Hủy"
                colorConfirm="green"
                show={showModal}
                onConfirm={() => {
                    setShowModal(false);
                }}
                onCancel={() => {
                    setShowModal(false);
                    handleClearImageInput();
                }}
            />
        </DataContext.Provider>
    );
};
