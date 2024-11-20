import React, { useContext, useEffect, useState } from "react";
import { Sentence } from "../../modal/Sentence";
import { PageResponse } from "../../modal/PageResponse";
import { SentenceManagerTable } from "./SentenceManagerTable";
import { createSentence, deleteSentence, getSentencePage, importSentenceExcel, updateSentence } from "../../api/sentence/SentenceApi";
import { Loading } from "../common/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import { DataContext } from '../context/DataContext';
import { SearchOperation } from "../../modal/SearchOperation";
import ExcelImportComponent from "../common/ExcelImportComponent";
import { WebSocketContext } from "../websocket/WebSocketProvider";
interface SentencePageProps {
    subTopicIdParam?: string;
}

export const SentencePage: React.FC<SentencePageProps> = ({ subTopicIdParam }) => {
    const [sentence, setSentence] = useState<string>('');
    const [translation, setTranslation] = useState<string>('');
    const [subTopicId, setSubTopicId] = useState<number>(subTopicIdParam ? Number(subTopicIdParam) : 0);
    const [subTopicName, setSubTopicName] = useState<string>('');
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [pageResponse, setPageResponse] = useState<PageResponse<Sentence>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: []
    });
    const [page, setPage] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('sentence');
    const [direction, setDirection] = useState<string>('asc');
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchField, setSearchField] = useState<string>('sentence');
    const [size, setSize] = useState<number>(10);
    const [sentenceEdit, setSentenceEdit] = useState<Sentence | null>(null);
    const [searchOperation, setSearchOperation] = useState<string>(SearchOperation.LIKE);
    const [sentenceSearch, setSentenceSearch] = useState<string>('subTopic.id:' + subTopicId);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        setSentenceSearch("subTopic.id:" + subTopicIdParam + "," + searchField + searchOperation + searchValue)
    }, [searchField, searchOperation, searchValue]);
    useEffect(() => {
        getSentencePage(page, size, sortBy, direction, sentenceSearch).then((response) => {
            if (response.status === 200) {
                setSentences(response.data.items);
                setPageResponse(response.data);
            }
        });
    }, [page, direction, size]);
    const buttonFormRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (sentenceEdit) {
            buttonFormRef.current?.click();
            setSentence(sentenceEdit.sentence);
            setTranslation(sentenceEdit.translation);
        }
    }, [sentenceEdit]);
    const handleAddSentence = (e: React.FormEvent) => {
        e.preventDefault();
        const newSentence = new Sentence(
            0,
            sentence,
            translation,
            subTopicId,
            subTopicName,
            '',
            new Date(),
            new Date(),
            ''
        );
        createSentence(newSentence).then((response) => {
            if (response.status === 201) {
                setSentences((pre) => [response.data, ...pre]);
                toast.success(response.message, { containerId: 'sentence' });
            } else {
                toast.error(response.message, { containerId: 'sentence' });
            }
        });
        // Reset form fields
        clearForm();
    };
    const [isShowForm, setIsShowForm] = useState(false);
    const clearForm = () => {
        setSentence('');
        setTranslation('');
        setSubTopicName('');
    }
    const handleDeleteSentence = (id: number) => {
        deleteSentence(id).then((response) => {
            if (response.status === 204) {
                setSentences((pre) => pre.filter((sentence) => sentence.id !== id));
            } else {
                toast.error(response.message, { containerId: 'sentence' });
            }
        });

    }
    const handleChangePageSize = (size: number) => {
        setSize(size);
        setPage(0);
    }
    const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value);
        setPage(0);
    }
    const handleInitPageSentence = () => {
        getSentencePage(page, size, sortBy, direction, "subTopic.id").then((response) => {
            if (response.status === 200) {
                setSentences(response.data.items);
                setPageResponse(response.data);
            }
        });
    }
    const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchValue('');
            setPage(0);
            handleInitPageSentence();
            return;
        }
        setSearchValue(e.target.value);
    }
    const handleSearchBySentence = () => {
        setPage(0);
        getSentencePage(page, size, sortBy, direction, sentenceSearch).then((response) => {
            if (response.status === 200) {
                if (response.data.items.length === 0) {
                    alert(`Not found topic with name ${sentenceSearch}`);
                    setSearchValue('');
                    return;
                }
                setSentences(response.data.items);
                setPageResponse(response.data);
            }
        });
    }
    const handleUpdateSentence = (e: React.FormEvent) => {
        e.preventDefault();
        updateSentence(
            new Sentence(
                sentenceEdit?.id!,
                sentence,
                translation,
                subTopicId,
                subTopicName,
                '',
                new Date(),
                new Date(),
                ''
            )
        ).then((response) => {
            if (response.status === 200) {
                setSentences((pre) => pre.map((sentence) => sentence.id === sentenceEdit?.id ? response.data : sentence));
                toast.success(response.message, { containerId: 'sentence' });
            } else {
                toast.error(response.message, { containerId: 'sentence' });
            }
        });
        clearForm();
        setSentenceEdit(null);
    }
    const [fileImport, setFileImport] = useState<File | null>(null);
    const instructionalText = `
        Ensure your Excel file has the following format: <br />
        <strong>Columns:</strong> Sentence, Translation <br />`;
    const handleImportSentence = () => {
        importSentenceExcel(subTopicId, fileImport as File).then((response: any) => {
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
                handleInitPageSentence();
            } else {
                toast.error(message, { containerId: 'sentence' });
            }
        }
    }, [lastMessage]); // Lắng nghe thay đổi của lastMessage
    return (
        <DataContext.Provider value={{ size, handleChangePageSize }}>
            <div className="container mx-auto mt-4">
                <Loading loading={isLoading} />
                <ToastContainer containerId="sentence" />
                {!isShowForm && (
                    <button
                        ref={buttonFormRef}
                        onClick={() => setIsShowForm(true)}
                        className="mb-3 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        type="button"
                    >
                        Add new sentence <i className="fas fa-plus ms-2"></i>
                    </button>
                )}

                {isShowForm && (
                    <div className="p-4 border rounded shadow">
                        <form onSubmit={sentenceEdit ? handleUpdateSentence : handleAddSentence}>
                            <div className="mb-3">
                                <label htmlFor="sentence" className="block text-sm font-medium text-gray-700">
                                    Sentence
                                </label>
                                <textarea
                                    cols={30}
                                    rows={5}
                                    id="sentence"
                                    value={sentence}
                                    onChange={(e) => setSentence(e.target.value)}
                                    className="w-full p-4 text-base text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                    required
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="translation" className="block text-sm font-medium text-gray-700">
                                    Translation
                                </label>
                                <textarea
                                    cols={30}
                                    rows={5}
                                    id="translation"
                                    value={translation}
                                    onChange={(e) => setTranslation(e.target.value)}
                                    className="w-full p-4 text-base text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    {sentenceEdit ? 'Update Sentence' : 'Create Sentence'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        clearForm();
                                        setIsShowForm(false);
                                        setSentenceEdit(null);
                                    }}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                        <ExcelImportComponent
                            instructionalText={instructionalText}
                            handleImport={handleImportSentence}
                            setFileImport={setFileImport}
                            fileImport={fileImport}
                        />
                    </div>
                )}

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <select
                            className="border rounded p-2"
                            onChange={handleChangeSort}
                        >
                            <option value="asc">Sort</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={searchValue}
                            placeholder="Search sentence..."
                            className="p-2 border rounded mr-2"
                            onChange={handleInputSearchChange}
                        />
                        <button
                            className="p-2 bg-blue-500 text-white rounded"
                            onClick={handleSearchBySentence}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <SentenceManagerTable
                    sentences={sentences}
                    pageResponse={pageResponse}
                    setPage={setPage}
                    page={page}
                    setSentenceEdit={setSentenceEdit}
                    sentenceEdit={sentenceEdit}
                    handleDeleteSentence={handleDeleteSentence}
                />
            </div>
        </DataContext.Provider>
    );
};
