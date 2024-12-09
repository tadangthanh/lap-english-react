import { useEffect, useState } from "react";
import { TypeGrammar } from "../../modal/TypeGrammar";
import { TypeGrammarList } from "./TypeGrammarList";
import { TypeGrammarForm } from "./TypeGrammarForm";
import { PageResponse } from "../../modal/PageResponse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Paging } from "../common/Paging";
import {
  createTypeGrammar,
  deleteTypeGrammar,
  getTypeGrammarPage,
  updateTypeGrammar,
} from "../../api/typegrammar/TypeGrammarApi";
import { Type } from "react-toastify/dist/utils";
import { Loading } from "../common/LoadingSpinner";
import SearchBar from "../common/SearchBar";
import { verifyToken } from "../../api/ApiUtils";
import { useNavigate } from "react-router-dom";

export const TypeGrammarPage: React.FC = () => {
  const [typeGrammars, setTypeGrammars] = useState<TypeGrammar[]>([]);
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageResponse, setPageResponse] = useState<PageResponse<TypeGrammar>>({
    pageNo: 0,
    pageSize: 10,
    totalPage: 0,
    hasNext: true,
    totalItems: 0,
    items: [],
  });
  const [typeGrammarEdit, setTypeGrammarEdit] = useState<TypeGrammar | null>(
    null
  );
  const navigate = useNavigate();
  useEffect(() => {
    verifyToken().then((response: any) => {
      if (response.status !== 200) {
        navigate('/login');
      }

    })
  }, []);
  const initTypeGrammarPage = (pageNo: number) => {
    getTypeGrammarPage(pageNo, size, "name", "asc", "name")
      .then((response) => {
        setIsLoading(true);
        if (response.status === 200) {
          setTypeGrammars(response.data.items);
          setPageResponse(response.data);
        } else {
          console.log(response.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    initTypeGrammarPage(page);
  }, [page]);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      initTypeGrammarPage(0);
    }
  }, [searchQuery]);

  // tao moi hoac cap nhat
  const handleCreateOrUpdateTypeGrammar = (typeGrammar: TypeGrammar) => {
    //id = 0 là tạo mới
    if (typeGrammar.id > 0) {
      updateTypeGrammar(typeGrammar.id, typeGrammar).then((response) => {
        if (response.status === 200) {
          setTypeGrammars((prev) =>
            prev.map((tg) => (tg.id === response.data.id ? response.data : tg))
          );
          toast.success(response.message, { containerId: "type-grammar" });
        } else {
          toast.error(response.message, { containerId: "type-grammar" });
        }
      });
      return;
    }
    createTypeGrammar(typeGrammar)
      .then((response) => {
        if (response.status === 201) {
          setTypeGrammars((prev) => [...prev, response.data]);
          toast.success(response.message, { containerId: "type-grammar" });
        } else {
          toast.error(response.message, { containerId: "type-grammar" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "type-grammar" });
      });
  };

  // Xóa Type Grammar
  const handleDeleteTypeGrammar = (id: number) => {
    deleteTypeGrammar(id)
      .then((response) => {
        if (response.status === 204) {
          setTypeGrammars((prev) =>
            prev.filter((typeGrammar) => typeGrammar.id !== id)
          );
        } else {
          toast.error(response.message, { containerId: "type-grammar" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "type-grammar" });
      });
  };

  const handleSearchByName = () => {
    setIsLoading(true);
    getTypeGrammarPage(page, size, "name", "asc", "name~" + searchQuery)
      .then((response) => {
        if (response.status === 200) {
          setTypeGrammars(response.data.items);
          setPageResponse(response.data);
        } else {
          toast.error(response.message, { containerId: "type-grammar" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "type-grammar" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Loading loading={isLoading} />
      <ToastContainer containerId="type-grammar" />
      <div className="max-w-4xl mx-auto">
        {/* Form thêm hoặc chỉnh sửa Type Grammar */}
        <TypeGrammarForm
          onSubmit={handleCreateOrUpdateTypeGrammar}
          existingTypeGrammar={typeGrammarEdit}
          setExistingTypeGrammar={setTypeGrammarEdit}
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
        {/* Danh sách các Type Grammar */}
        <TypeGrammarList
          typeGrammars={typeGrammars}
          setTypeGrammarEdit={setTypeGrammarEdit}
          typeGrammarEdit={typeGrammarEdit}
          onDelete={handleDeleteTypeGrammar}
        />

        {/* Component phân trang */}
        <Paging pageResponse={pageResponse} setPage={setPage} page={page} />
      </div>
    </div>
  );
};
