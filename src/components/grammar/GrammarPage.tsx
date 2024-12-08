import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grammar } from "../../modal/Grammar";
import { Paging } from "../common/Paging";
import { PageResponse } from "../../modal/PageResponse";
import { GrammarForm } from "./GrammarForm";
import { GrammarList } from "./GrammarList";
import Breadcrumb from "../common/Breadcrumb";
import { createGrammar, deleteGrammar, getGrammarPage, updateGrammar } from "../../api/grammar/GrammarApi";
import { Loading } from "../common/LoadingSpinner";
import SearchBar from "../common/SearchBar"; // Import SearchBar component
import { TypeGrammar } from "../../modal/TypeGrammar";
import { getTypeGrammarPage } from "../../api/typegrammar/TypeGrammarApi";
import { toast, ToastContainer } from "react-toastify";

export const GrammarPage = () => {
    const { typeId } = useParams<{ typeId: string }>();
    // State quản lý danh sách Grammar và phân trang
    const [grammars, setGrammars] = useState<Grammar[]>([]);
    const [typeGrammar, setTypeGrammar] = useState<TypeGrammar | null>(null);
    const [grammarEdit, setGrammarEdit] = useState<Grammar | null>(null);
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [pageResponse, setPageResponse] = useState<PageResponse<Grammar>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: [],
    });

    // Function khởi tạo Grammar page
    const initGrammarPage = (pageNo: number) => {
        getGrammarPage(pageNo, size, "name", "asc", "typeGrammar.id:" + typeId)
            .then((response) => {
                setIsLoading(true);
                if (response.status === 200) {
                    setGrammars(response.data.items);
                    setPageResponse(response.data);
                } else {
                    toast.error(response.message, { containerId: "grammar" });
                }
            })
            .catch((error) => {
                toast.error(error.message, { containerId: "grammar" });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        // Get type grammar by id
        getTypeGrammarPage(0, 1, "id", "asc", "id:" + typeId)
            .then((response) => {
                if (response.status === 200) {
                    setTypeGrammar(response.data.items[0]);
                } else {
                    toast.error(response.message, { containerId: "grammar" });
                }
            })
            .catch((error) => {
                toast.error(error.message, { containerId: "grammar" });
            });
    }, []);

    useEffect(() => {
        initGrammarPage(page);
    }, [page]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            initGrammarPage(0);
        }
    }, [searchQuery]);


    const handleSearchByName = () => {
        setIsLoading(true);
        getGrammarPage(page, size, "name", "asc", "typeGrammar.id:" + typeId + ",name~" + searchQuery)
            .then((response) => {
                if (response.status === 200) {
                    setGrammars(response.data.items);
                    setPageResponse(response.data);
                } else {
                    toast.error(response.message, { containerId: "grammar" });
                }
            })
            .catch((error) => {
                toast.error(error.message, { containerId: "grammar" });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Thêm hoặc cập nhật Grammar
    const handleAddOrUpdateGrammar = (grammar: Grammar) => {
        //id lon hon 0 la cap nhat
        if (grammar.id > 0) {
            console.log("grammar", grammar)
            updateGrammar(grammar.id, grammar)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success(response.message, { containerId: "grammar" });
                        initGrammarPage(page);
                    } else {
                        toast.error(response.message, { containerId: "grammar" });
                    }
                })
                .catch((error) => {
                    toast.error(error.message, { containerId: "grammar" });
                });
            // update
            return;
        }
        // add
        createGrammar(grammar)
            .then((response) => {
                if (response.status === 201) {
                    toast.success(response.message, { containerId: "grammar" });
                    initGrammarPage(page);
                } else {
                    toast.error(response.message, { containerId: "grammar" });
                }
            })
            .catch((error) => {
                toast.error(error.message, { containerId: "grammar" });
            });
    };

    // Xóa Grammar
    const handleDeleteGrammar = (id: number) => {
        deleteGrammar(id)
            .then((response) => {
                if (response.status === 200) {
                    initGrammarPage(page);
                } else {
                    toast.error(response.message, { containerId: "grammar" });
                }
            })
            .catch((error) => {
                toast.error(error.message, { containerId: "grammar" });
            });
    };


    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <Loading loading={isLoading} />
            <ToastContainer containerId="grammar" />
            <Breadcrumb /> {/* Hiển thị Breadcrumb */}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">
                    Manage Grammar for Type Grammar : {typeGrammar?.name}
                </h1>

                {/* Form thêm hoặc chỉnh sửa Grammar */}
                <GrammarForm
                    typeGrammarId={+typeId!}
                    onSubmit={handleAddOrUpdateGrammar}
                    existingGrammar={grammarEdit}
                    setExistingGrammar={setGrammarEdit}
                />

                {/* Thanh tìm kiếm */}
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onSearch={() => {
                        setPage(0); // Reset page khi tìm kiếm
                        handleSearchByName();
                    }}
                />

                {/* Danh sách các Grammar */}
                <GrammarList
                    grammars={grammars}
                    typeGrammarId={+typeId!}
                    setGrammarEdit={setGrammarEdit}
                    grammarEdit={grammarEdit}
                    onDelete={handleDeleteGrammar}
                />

                {/* Phân trang */}
                <Paging pageResponse={pageResponse} setPage={setPage} page={page} />
            </div>
        </div>
    );
};
