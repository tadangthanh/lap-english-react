import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrammaticalStructure } from "../../modal/GrammaticalStructure";
import { PageResponse } from "../../modal/PageResponse";
import { Loading } from "../common/LoadingSpinner";
import Breadcrumb from "../common/Breadcrumb";
import SearchBar from "../common/SearchBar";
import { Paging } from "../common/Paging";
import { toast, ToastContainer } from "react-toastify";
import { createGrammaticalStructure, deleteGrammaticalStructure, getGrammaticalStructurePage, updateGrammaticalStructure } from "../../api/grammaticalStructure/GrammaticalStructureApi";
import { updateGrammar } from "../../api/grammar/GrammarApi";
import { GrammaticalStructureForm } from "./GrammaticalStructureForm";
import { GrammaticalStructureList } from "./GrammaticalStructureList";

export const GrammaticalStructurePage = () => {
    const { grammarId } = useParams<{ grammarId: string }>();
    const { typeId } = useParams<{ typeId: string }>();

    const [structures, setStructures] = useState<GrammaticalStructure[]>([]);
    const [structureEdit, setStructureEdit] = useState<GrammaticalStructure | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [pageResponse, setPageResponse] = useState<PageResponse<GrammaticalStructure>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: [],
    });

    // Fetch the Grammatical Structures
    const fetchStructures = (pageNo: number) => {
        setIsLoading(true);
        getGrammaticalStructurePage(pageNo, size, "structure", "asc", `grammar.id:${grammarId}`)
            .then((response: any) => {
                if (response.status === 200) {
                    setStructures(response.data.items);
                    setPageResponse(response.data);
                } else {
                    toast.error(response.message, { containerId: "structure" });
                }
            })
            .catch((error) => {
                toast.error(error.message, { containerId: "structure" });
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchStructures(page);
    }, [page]);

    useEffect(() => {
        if (searchQuery.trim() === "") fetchStructures(0);
    }, [searchQuery]);

    const handleSearchByStructure = () => {
        setIsLoading(true);
        getGrammaticalStructurePage(page, size, "structure", "asc", `grammarId:${grammarId},structure~${searchQuery}`)
            .then((response) => {
                if (response.status === 200) {
                    setStructures(response.data.items);
                    setPageResponse(response.data);
                } else {
                    toast.error(response.message, { containerId: "structure" });
                }
            })
            .catch((error) => {
                toast.error(error.message, { containerId: "structure" });
            })
            .finally(() => setIsLoading(false));
    };

    const handleAddOrUpdateStructure = (structure: GrammaticalStructure) => {
        if (structure.id > 0) {
            updateGrammaticalStructure(structure.id, structure)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success(response.message, { containerId: "structure" });
                        fetchStructures(page);
                    } else {
                        toast.error(response.message, { containerId: "structure" });
                    }
                })
                .catch((error) => toast.error(error.message, { containerId: "structure" }));
        } else {
            createGrammaticalStructure(structure)
                .then((response) => {
                    if (response.status === 201) {
                        toast.success(response.message, { containerId: "structure" });
                        fetchStructures(page);
                    } else {
                        toast.error(response.message, { containerId: "structure" });
                    }
                })
                .catch((error) => toast.error(error.message, { containerId: "structure" }));
        }
    };

    const handleDeleteStructure = (id: number) => {
        deleteGrammaticalStructure(id)
            .then((response) => {
                if (response.status === 204) {
                    fetchStructures(page);
                } else {
                    toast.error(response.message, { containerId: "structure" });
                }
            })
            .catch((error) => toast.error(error.message, { containerId: "structure" }));
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <Loading loading={isLoading} />
            <ToastContainer containerId="structure" />
            <Breadcrumb />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Manage Grammatical Structures</h1>

                <GrammaticalStructureForm
                    grammarId={+grammarId!}
                    onSubmit={handleAddOrUpdateStructure}
                    existingStructure={structureEdit}
                    setExistingStructure={setStructureEdit}
                />

                <SearchBar
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onSearch={() => {
                        setPage(0);
                        handleSearchByStructure();
                    }}
                />

                <GrammaticalStructureList
                    structures={structures}
                    setGrammaticalStructureEdit={setStructureEdit}
                    grammaticalStructureEdit={structureEdit}
                    onDelete={handleDeleteStructure}
                    typeGrammarId={+typeId!}
                    grammarId={+grammarId!}
                />

                <Paging pageResponse={pageResponse} setPage={setPage} page={page} />
            </div>
        </div>
    );
};
