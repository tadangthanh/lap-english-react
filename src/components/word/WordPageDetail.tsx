import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WordType } from "../../modal/WordType";
import { WordLevel } from "../../modal/WordLevel";
import { WordManagerTable } from "./WordManagerTable";
import { Word } from "../../modal/Word";
import { PageResponse } from "../../modal/PageResponse";
import { SearchOperation } from "../../modal/SearchOperation";
import { baseUrlBlob, verifyToken } from "../../api/ApiUtils";
import { createWord, deleteWord, getWordPage, importWordExcel, updateWord } from "../../api/word/WordApi";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "../common/LoadingSpinner";
import { DataContext } from '../context/DataContext';
import ConfirmationModal from "../common/ConfirmationModal";
import { getSubTopicById } from "../../api/subtopic/SubTopicApi";
import { SubTopic } from "../../modal/SubTopic";
import '../css/common.css';
import WebSocketService from "../../service/WebSocketService";
import { WebSocketContext } from "../websocket/WebSocketProvider";
import ExcelImportComponent from "../common/ExcelImportComponent";

interface WordPageDetailProps {
    subTopicId?: string;
}
export const WordPageDetail: React.FC<WordPageDetailProps> = ({ subTopicId }) => {
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
    const [file, setFile] = useState<File | undefined>(undefined);
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
    const [fileImport, setFileImport] = useState<File | null>(null);
    const [selectedType, setSelectedType] = useState<String>("ALL");
    const [wordEdit, setWordEdit] = useState<Word | null>(null);

    useEffect(() => {
        if (subTopicId) {
            setSubTopicIdMdl(parseInt(subTopicId));
            getSubTopicById(parseInt(subTopicId)).then((response: any) => {
                if (response.status !== 200) {
                    navigate('/login');
                }
            });
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
    // xác thực token còn hiệu lực hay k
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

    // lấy page dựa trên sự thay đổi của page,size,direction (chiều sắp xếp: asc-desc)
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
        setWordSearch("subTopic.id:" + subTopicId + "," + searchField + searchOperation + searchValue);
    }, [searchField, searchOperation, searchValue]);
    useEffect(() => {
        if (selectedType === "ALL") {
            getWordPage(page, 10, sortBy, direction, "subTopic.id:" + subTopicId + "," + searchField + searchOperation + searchValue).then((response) => {
                if (response.status === 200) {
                    setWords(response.data.items);
                    setPageResponse(response.data);
                }
            });
            return;
        }
        getWordPage(page, 10, sortBy, direction, "subTopic.id:" + subTopicId + "," + searchField + searchOperation + searchValue + ",type:" + selectedType).then((response) => {
            if (response.status === 200) {
                setWords(response.data.items);
                setPageResponse(response.data);
            }
        });
    }, [selectedType]);
    const [isShowForm, setIsShowForm] = useState(false);
    const handleDeleteWord = (id: number) => {
        deleteWord(id).then((response: any) => {
            if (response.status === 204) {
                setWords((prev) => prev.filter((word) => word.id !== id));
            } else {
                toast.error(response.message, { containerId: 'word' });
            }
        });
    }
    const handleChangePageSize = (size: number) => {
        setSize(size);
        setPage(0);
    }

    const buttonFormRef = React.useRef<HTMLButtonElement>(null);
    // modal xác nhận xóa
    const [showModal, setShowModal] = useState(false);
    // Xử lý khi người dùng chọn ảnh
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setFile(undefined);
        setImagePreview(null);
        if (wordEdit) {
            wordEdit.imageBlobName = '';
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Đặt lại giá trị của input file
        }
    };
    // xóa hết ảnh đã upload,clear input file
    const clearForm = () => {
        setWord('');
        setMeaning('');
        setPronounceUK('');
        setPronounceUS('');
        setType(WordType.NOUN);
        setLevel(WordLevel.A1);
        setExample('');
        setFile(undefined);
        setImagePreview(null);
        handleClearImageInput();
        setFileImport(null);
        setWordEdit(null);
    }
    // xử lý thêm từ mới
    const handleAddWord = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const wordAdd = new Word(0, word, meaning, pronounceUK, pronounceUS, type, level, example, subTopicIdMdl, '', '', '', '', new Date(), new Date(), '');
        createWord(wordAdd, file ?? undefined).then((response: any) => {
            if (response.status === 201) {
                toast.success(response.message, { containerId: 'word' });
                setWords((prev) => [...prev, response.data]);
                clearForm();
                handleImageDelete();
                setPage(0);
            } else {
                toast.error(response.message, { containerId: 'word' });
            }
        })
        clearForm();
    }
    // đặt lại page về ban đầu
    const handleInitPageWord = () => {
        setIsLoading(true);
        getWordPage(page, size, sortBy, direction, "subTopic.id:" + subTopicId).then((response: any) => {
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
    }
    //  khi searchValue thay đổi, nếu value rỗng thì reset lại page
    useEffect(() => {
        if (searchValue === '') {
            handleInitPageWord();
            return;
        }
    }, [searchValue]);
    const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchValue('');
            setPage(0);
            return;
        }
        setSearchValue(e.target.value);
    }



    const handleCheckboxChange = (type: WordType) => {
        setSelectedType(type);
    };
    useEffect(() => {
        setWord(wordEdit?.word ?? '');
        setMeaning(wordEdit?.meaning ?? '');
        setPronounceUK(wordEdit?.pronounceUK ?? '');
        setPronounceUS(wordEdit?.pronounceUS ?? '');
        setType(wordEdit?.type ?? WordType.NOUN);
        setLevel(wordEdit?.level ?? WordLevel.A1);
        setExample(wordEdit?.example ?? '');
        const imageUrl = wordEdit?.imageBlobName ? baseUrlBlob + wordEdit?.imageBlobName : null;
        setImagePreview(imageUrl);
    }, [wordEdit]);
    const handleUpdateWord = (e: any) => {
        e.preventDefault();
        if (wordEdit) {
            updateWord({
                id: wordEdit.id,
                word,
                meaning,
                pronounceUK,
                pronounceUS,
                type,
                level,
                example,
                subTopicId: subTopicIdMdl,
                subTopicName: '',
                audioUkBlobName: wordEdit.audioUkBlobName,
                audioUsBlobName: wordEdit.audioUsBlobName,
                imageBlobName: wordEdit.imageBlobName,
                createdAt: wordEdit.createdAt,
                createdBy: wordEdit.createdBy,
                updatedAt: new Date(),
                updatedBy: wordEdit.updatedBy
            }, file).then((response: any) => {
                if (response.status === 200) {
                    toast.success(response.message, { containerId: 'word' });
                    setWords((prev) => prev.map((word) => {
                        if (word.id === response.data.id) {
                            return response.data;
                        }
                        return word;
                    }));
                    clearForm();
                    handleImageDelete();
                    setPage(0);
                    setIsShowForm(false);
                } else {
                    toast.error(response.message, { containerId: 'word' });
                }
            });
            clearForm();
        }
    }
    // tìm kiếm theo word
    const handleSearchByName = () => {
        setPage(0);
        getWordPage(page, 10, sortBy, direction, wordSearch).then((response) => {
            if (response.status === 200) {
                if (response.data.items.length === 0) {
                    alert(`Not found topic with name: ${searchValue}`);
                    setSearchValue('');
                    return;
                }
                setWords(response.data.items);
                setPageResponse(response.data);
            }
        });
    }
    // xử lý sắp xếp
    const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value);
        setPage(0);
    }
    const handleImportWords = () => {
        importWordExcel(subTopicIdMdl, fileImport as File).then((response: any) => {
            clearForm();
            if (response.status === 200) {
                toast.info(response.message, { containerId: 'word' });
            } else {
                toast.error(response.message, { containerId: 'word' });
            }
        });
    }
    const { lastMessage } = useContext(WebSocketContext)!;
    useEffect(() => {
        if (lastMessage) {
            const { status, message } = lastMessage;
            if (status === 201) {
                handleInitPageWord();
            } else {
                toast.error(message, { containerId: 'word' });
            }
        }
    }, [lastMessage]); // Lắng nghe thay đổi của lastMessage
    const instructionalText = `
        Ensure your Excel file has the following format: <br />
        <strong>Columns:</strong> Word, Meaning, PronounceUK, PronounceUS, Type, Level, Example <br />
        <strong>Type:</strong> One of the following values: NOUN, VERB, ADJECTIVE, ADVERB, PREPOSITION, CONJUNCTION, INTERJECTION, PRONOUN, DETERMINER, EXCLAMATION. <br />
        <strong>Level:</strong> One of the following values: A1, A2, B1, B2, C1, C2.
    `;

    return (
        <DataContext.Provider value={{ size, handleChangePageSize }}>
            <div className="container mx-auto mt-4 p-4">
                <Loading loading={isLoading} />
                <ToastContainer containerId="word" />

                {/* Nút Add New Word */}
                {!isShowForm && (
                    <button
                        ref={buttonFormRef}
                        onClick={() => setIsShowForm(true)}
                        className="mb-3 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    >
                        {wordEdit === null ? <div>Add New Word <i className="fas fa-plus ml-2"></i></div> : <div>
                            Edit Word <i className="fas fa-pen ml-2"></i>
                        </div>}
                    </button>
                )}



                {/* Form Add New Word */}
                {isShowForm && (
                    <div className="border rounded shadow p-4">
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Cột 1 */}
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="word" className="block text-sm font-medium text-gray-700">
                                            Word
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) => setWord(e.target.value)}
                                            value={word}
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="word"
                                            placeholder="Enter word"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="meaning" className="block text-sm font-medium text-gray-700">
                                            Meaning
                                        </label>
                                        <input
                                            onChange={(e) => setMeaning(e.target.value)}
                                            value={meaning}
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="meaning"
                                            placeholder="Enter meaning"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pronounceUK" className="block text-sm font-medium text-gray-700">
                                            Pronunciation (UK)
                                        </label>
                                        <input
                                            value={pronounceUK}
                                            onChange={(e) => setPronounceUK(e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="pronounceUK"
                                            placeholder="Enter UK pronunciation"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pronounceUS" className="block text-sm font-medium text-gray-700">
                                            Pronunciation (US)
                                        </label>
                                        <input
                                            value={pronounceUS}
                                            onChange={(e) => setPronounceUS(e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="pronounceUS"
                                            placeholder="Enter US pronunciation"
                                        />
                                    </div>
                                </div>

                                {/* Cột 2 */}
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                            Type
                                        </label>
                                        <select
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="type"
                                            value={type}
                                            onChange={(e) => setType(WordType[e.target.value as keyof typeof WordType])}
                                        >
                                            {Object.keys(WordType)
                                                .filter((key) => isNaN(Number(key)))
                                                .map((key) => (
                                                    <option key={key} value={key}>
                                                        {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                                            Level
                                        </label>
                                        <select
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="level"
                                            value={level}
                                            onChange={(e) => setLevel(WordLevel[e.target.value as keyof typeof WordLevel])}
                                        >
                                            {Object.keys(WordLevel)
                                                .filter((key) => isNaN(Number(key)))
                                                .map((key) => (
                                                    <option key={key} value={key}>
                                                        {key.toUpperCase()}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="example" className="block text-sm font-medium text-gray-700">
                                            Example
                                        </label>
                                        <textarea
                                            value={example}
                                            onChange={(e) => setExample(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="example"
                                            rows={3}
                                            placeholder="Enter example sentence"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="imageBlobName" className="block text-sm font-medium text-gray-700">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                            className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            id="imageBlobName"
                                            accept="image/*"
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="relative mt-3 w-48">
                                            <label className="block text-sm font-medium text-gray-700">Image preview:</label>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="rounded shadow"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleImageDelete}
                                                className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Nút Submit */}
                            <div className="mt-4 flex space-x-4">
                                {wordEdit === null ? <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                    onClick={(e: any) => handleAddWord(e)}
                                >
                                    Save Word
                                </button> : <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-grey-600"
                                    onClick={(e: any) => (handleUpdateWord(e))}
                                >
                                    Update
                                </button>}
                                <button
                                    onClick={() => {
                                        clearForm();
                                        setIsShowForm(false);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                                    type="button"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                        {/* Import file */}
                        <ExcelImportComponent
                            fileImport={fileImport}
                            setFileImport={setFileImport}
                            handleImport={handleImportWords}
                            instructionalText={instructionalText}
                        />
                    </div>
                )}



                {/* Sắp xếp và tìm kiếm */}
                <div className="flex flex-col mt-4 space-y-4">
                    {/* Sort and Search Input */}
                    <div className="flex items-center space-x-4">
                        <select className="p-2 border rounded" onChange={handleChangeSort}>
                            <option value="asc">Sort</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                        <div className="flex items-center">
                            <input
                                value={searchValue}
                                type="text"
                                placeholder="Search word"
                                className="p-2 border rounded mr-2"
                                onChange={handleInputSearchChange}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleSearchByName}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex flex-wrap items-center space-x-3 fz">
                        {[
                            "ALL",
                            "NOUN",
                            "VERB",
                            "ADJECTIVE",
                            "ADVERB",
                            "PREPOSITION",
                            "CONJUNCTION",
                            "INTERJECTION",
                            "PRONOUN",
                            "DETERMINER",
                            "EXCLAMATION",
                        ].map((type) => (
                            <label key={type} className="flex items-center space-x-2 text-sm">
                                <input
                                    type="radio"
                                    value={type}
                                    checked={selectedType === type} // Chỉ checked khi trùng với selectedType
                                    onChange={() => handleCheckboxChange(type as WordType)}
                                    className="h-4 w-4 text-blue-500"
                                />
                                <span className="text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <WordManagerTable
                    words={words}
                    wordEdit={wordEdit}
                    setWordEdit={setWordEdit}
                    handleDeleteWord={handleDeleteWord}
                    page={page}
                    setPage={setPage}
                    pageResponse={pageResponse}
                />

                {/* Modal xác nhận xóa */}
                <ConfirmationModal
                    title="Confirm"
                    message="This will replace the current image. Are you sure you want to continue?"
                    labelConfirm="Continue"
                    labelCancel="Cancel"
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
            </div>
        </DataContext.Provider>
    );

};
