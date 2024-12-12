import React, { useEffect, useRef, useState } from "react";
import { MainTopic } from "../../modal/MainTopic";
import { verifyToken } from "../../api/ApiUtils";
import { useNavigate } from "react-router-dom";
import {
  createMainTopic,
  deleteMainTopic,
  getMainTopicPage,
  updateMainTopic,
} from "../../api/maintopic/MainTopicApi";
import { Loading } from "../common/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import { TableMainTopic } from "./MainTopicTable";
import { PageResponse } from "../../modal/PageResponse";
import { DataContext } from "../context/DataContext";
import "../css/common.css";
import { SearchOperation } from "../../modal/SearchOperation";

const MainTopicPage: React.FC = () => {
  const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [mainTopicName, setMainTopicName] = useState<string>(""); // State cho tên chủ đề chinh
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [mainTopicEdit, setMainTopicEdit] = useState<MainTopic | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [mainTopicSearch, setMainTopicSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [searchField, setSearchField] = useState<string>("name");
  const [typeMainTopic, setTypeMainTopic] = useState<string>("word");
  const [diamond, setDiamond] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);
  const [searchOperation, setSearchOperation] = useState<SearchOperation>(
    SearchOperation.LIKE
  );

  const [pageResponse, setPageResponse] = useState<PageResponse<MainTopic>>({
    pageNo: 0,
    pageSize: 10,
    totalPage: 0,
    hasNext: true,
    totalItems: 0,
    items: [],
  });
  const [direction, setDirection] = useState<string>("asc");
  useEffect(() => {
    setMainTopicSearch(searchField + searchOperation + searchValue);
  }, [searchField, searchOperation, searchValue]);
  const navigate = useNavigate();
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
    setMainTopicEdit(null);
    getMainTopicPage(page, size, sortBy, direction, mainTopicSearch)
      .then((response: any) => {
        if (response.status === 200) {
          setMainTopics(response.data.items);
          setPageResponse(response.data);
        } else {
          toast.error(response.message, { containerId: "page-main-topic" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "page-main-topic" });
      });
  }, [page, size, direction]);

  useEffect(() => {
    inputMainTopicName?.current?.focus();
    inputMainTopicName.current?.scrollIntoView();
    if (mainTopicEdit) {
      setMainTopicName(mainTopicEdit.name);
      setTypeMainTopic(mainTopicEdit.word ? "word" : "sentence");
      setDiamond(mainTopicEdit.diamond);
      setGold(mainTopicEdit.gold);
    } else {
      setMainTopicName("");
    }
  }, [mainTopicEdit]);
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (mainTopicEdit) {
        handleUpdateMainTopic();
      } else {
        handleAddMainTopic();
      }
    }
  };
  const handleAddMainTopic = () => {
    if (mainTopicName.trim() === "") {
      setError("Name not blank");
      return;
    }
    setError("");
    const newMainTopic: MainTopic = {
      id: 0,
      name: mainTopicName,
      word: typeMainTopic === "word" ? true : false,
      diamond: diamond,
      gold: gold,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: "",
      createdBy: "",
    };
    createMainTopic(newMainTopic).then((response: any) => {
      console.log(response);
      if (response.status === 201) {
        setMainTopics((prev) => [...prev, response.data]);
        setMainTopicName("");
        toast.success(response.message, { containerId: "page-main-topic" });
      } else {
        setError(response.message);
        toast.error(response.message, { containerId: "page-main-topic" });
      }
    });
  };
  const handleDeleteMainTopic = (id: number) => {
    deleteMainTopic(id).then((response: any) => {
      if (response.status === 204) {
        setMainTopics((prev) => prev.filter((topic) => topic.id !== id));
      } else {
        toast.error(response.message, { containerId: "page-main-topic" });
      }
    });
  };
  const handleUpdateMainTopic = () => {
    if (mainTopicEdit) {
      const newMainTopic: MainTopic = {
        id: mainTopicEdit.id,
        name: mainTopicName,
        word: typeMainTopic === "word" ? true : false,
        diamond: diamond,
        gold: gold,
        createdAt: mainTopicEdit.createdAt,
        updatedAt: new Date(),
        updatedBy: "",
        createdBy: "",
      };
      updateMainTopic(newMainTopic).then((response: any) => {
        if (response.status === 200) {
          setMainTopics((prev) =>
            prev.map((topic) => {
              if (topic.id === mainTopicEdit.id) {
                return response.data;
              }
              return topic;
            })
          );
          setMainTopicEdit(null);
          setMainTopicName("");
          toast.success(response.message, { containerId: "page-main-topic" });
        } else {
          toast.error(response.message, { containerId: "page-main-topic" });
        }
      });
    }
  };
  const inputMainTopicName = useRef<HTMLInputElement>(null);
  const handleChangePageSize = (size: number) => {
    setSize(size);
    setPage(0);
  };
  const handleChangeSort = (e: any) => {
    setDirection(e.target.value);
    setPage(0);
  };
  const handleInitPageMainTopic = () => {
    getMainTopicPage(0, size, sortBy, direction)
      .then((response: any) => {
        if (response.status === 200) {
          setMainTopics(response.data.items);
          setPageResponse(response.data);
        } else {
          toast.error(response.message, { containerId: "page-main-topic" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "page-main-topic" });
      });
  };
  const handleInputSearchChange = (e: any) => {
    if (e.target.value === "") {
      setSearchValue("");
      setPage(0);
      handleInitPageMainTopic();
      return;
    }
    setSearchValue(e.target.value);
  };
  const handleSearchByName = () => {
    setPage(0);
    getMainTopicPage(page, 10, sortBy, direction, mainTopicSearch).then(
      (response) => {
        if (response.status === 200) {
          if (response.data.items.length === 0) {
            alert(`Not found topic with name ${mainTopicSearch}`);
            setSearchValue("");
            return;
          }
          setMainTopics(response.data.items);
          setPageResponse(response.data);
        }
      }
    );
  };
  const [typeMainTopicSearch, setTypeMainTopicSearch] = useState<string>("all");
  const handleChangeType = (e: any) => {
    setTypeMainTopicSearch(e.target.value);
    let type;
    if (e.target.value === "all") {
      type = "";
    } else {
      if (e.target.value === "word") {
        type = `isWord:true`;
      }
      else {
        type = `isWord:false`;
      }
    }
    getMainTopicPage(page, size, sortBy, direction, type)
      .then((response: any) => {
        if (response.status === 200) {
          setMainTopics(response.data.items);
          setPageResponse(response.data);
        } else {
          toast.error(response.message, { containerId: "main-topic" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "main-topic" });
      });
  }
  return (
    <DataContext.Provider value={{ size, handleChangePageSize }}>
      <div className="p-4 transform transition-transform scale-100">
        <h2 className="text-2xl font-bold mb-4">Main Topic</h2>
        <Loading loading={isLoading} />
        <ToastContainer containerId="page-main-topic" />

        {/* Form nhập thông tin Chủ đề chính */}
        <div className="mb-4 max-w-lg">
          <label
            htmlFor="mainTopicName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Main Topic name
          </label>
          <input
            ref={inputMainTopicName}
            type="text"
            id="mainTopicName"
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 mb-2"
            placeholder="Enter main topic name"
            value={mainTopicName}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setMainTopicName(e.target.value);
              setError("");
            }}
          />
          <div className="mb-4 flex items-center space-x-2">
            <label className="font-medium text-gray-700">Diamond:</label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={diamond || 0}
                onChange={(e) => setDiamond(parseInt(e.target.value))}
                className="w-24 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <i className="fa-regular fa-gem absolute right-2 text-gray-400"></i>
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <label className="font-medium text-gray-700">Gold:</label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={gold || 0}
                onChange={(e) => setGold(parseInt(e.target.value))}
                className="w-24 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <i className="fa-solid fa-coins  absolute right-2 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-4">Type: <select value={typeMainTopic} onChange={(e) => setTypeMainTopic(e.target.value)} name="typeMainTopic" id="typeMainTopic">
            <option value="word">Word</option>
            <option value="sentence">Sentence</option>
          </select></div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {!mainTopicEdit ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddMainTopic}
            >
              Add
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={handleUpdateMainTopic}
            >
              Update
            </button>
          )}
        </div>
        {/* Bộ lọc và tìm kiếm */}
        <div className="flex items-center mb-4">
          <select
            className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 mr-4"
            onChange={handleChangeSort}
          >
            <option value="asc">Sort</option>
            <option value="asc">a-z</option>
            <option value="desc">z-a</option>
          </select>
          <select
            className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 mr-4"
            onChange={handleChangeType}
          >
            <option value="all">Type</option>
            <option value="sentence">Sentence</option>
            <option value="word">Word</option>
          </select>
          <div className="flex items-center">
            <input
              value={searchValue}
              type="text"
              placeholder="Topic name"
              className="p-2 border border-gray-300 rounded mr-2"
              onChange={handleInputSearchChange}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSearchByName}
            >
              Search
            </button>
          </div>
        </div>
        {/* Bảng hiển thị danh sách Chủ đề chính */}
        <TableMainTopic
          mainTopics={mainTopics}
          pageResponse={pageResponse}
          setMainTopicEdit={setMainTopicEdit}
          mainTopicEdit={mainTopicEdit}
          handleDeleteMainTopic={handleDeleteMainTopic}
          page={page}
          setPage={setPage}
        />
      </div>
    </DataContext.Provider>
  );
};

export default MainTopicPage;
