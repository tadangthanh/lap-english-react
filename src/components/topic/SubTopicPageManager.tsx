import { useEffect, useRef, useState } from "react";
import { MainTopic } from "../../modal/MainTopic";
import MainTopicSelect from "./MainTopicSelect";
import { getAllMainTopic, getAllMainTopicIsSentence, getAllMainTopicIsWord } from "../../api/maintopic/MainTopicApi";
import { toast, ToastContainer } from "react-toastify";
import { SubTopicManagerTable } from "./SubTopicManagerTable";
import { SubTopic } from "../../modal/SubTopic";
import { PageResponse } from "../../modal/PageResponse";
import { DataContext } from "../context/DataContext";
import {
  createSubTopic,
  deleteSubTopic,
  getSubTopicPage,
  updateSubTopic,
} from "../../api/subtopic/SubTopicApi";
import { useNavigate } from "react-router-dom";
import { baseUrlBlob, verifyToken } from "../../api/ApiUtils";
import { Loading } from "../common/LoadingSpinner";
import ConfirmationModal from "../common/ConfirmationModal";
import { SearchOperation } from "../../modal/SearchOperation";
import "../css/common.css";

export const SubTopicPageManager: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [subTopicName, setSubTopicName] = useState<string>(""); // State cho tên chủ đề con
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref cho input ảnh\
  const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
  const [mainTopicIdSelected, setMainTopicIdSelected] = useState<number>(-1);
  const [direction, setDirection] = useState<string>("asc");
  const [sortBy, setSortBy] = useState<string>("name");
  const [searchValue, setSearchValue] = useState<string>("");
  const [subTopicSearch, setSubTopicSearch] = useState<string>("");
  const [searchField, setSearchField] = useState<string>("name");
  const [searchOperation, setSearchOperation] = useState<SearchOperation>(
    SearchOperation.LIKE
  );
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [size, setSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeSubTopicAdd, setTypeSubTopicAdd] = useState<string>("word");
  const [typeSubTopicSearch, setTypeSubTopicSearch] = useState<string>("all");
  const [diamond, setDiamond] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setSubTopicSearch(searchField + searchOperation + searchValue);
  }, [searchField, searchOperation, searchValue]);
  const [subTopicEdit, setSubTopicEdit] = useState<SubTopic | null>(null);

  const [pageResponse, setPageResponse] = useState<PageResponse<SubTopic>>({
    pageNo: 0,
    pageSize: 10,
    totalPage: 0,
    hasNext: true,
    totalItems: 0,
    items: [],
  });

  // xác thực token còn hiệu lực hay k
  useEffect(() => {
    verifyToken().then((response: any) => {
      if (response.status !== 200) {
        navigate('/login');
      }
    })
  }, []);
  const handleDeleteSubTopic = (id: number) => {
    deleteSubTopic(id).then((response: any) => {
      if (response.status === 204) {
        setSubTopics((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(response.message, { containerId: "sub-topic" });
      }
    });
  };
  useEffect(() => {
    setSubTopicEdit(null);
    getSubTopicPage(page, size, sortBy, direction, subTopicSearch)
      .then((response: any) => {
        if (response.status === 200) {
          setSubTopics(response.data.items);
          setPageResponse(response.data);
        } else {
          toast.error(response.message, { containerId: "sub-topic" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "sub-topic" });
      });
  }, [page, size, direction]);
  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeSubTopicSearch(e.target.value);
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
    getSubTopicPage(page, size, sortBy, direction, type)
      .then((response: any) => {
        if (response.status === 200) {
          setSubTopics(response.data.items);
          setPageResponse(response.data);
        } else {
          toast.error(response.message, { containerId: "sub-topic" });
        }
      })
      .catch((error) => {
        toast.error(error.message, { containerId: "sub-topic" });
      });
  }

  useEffect(() => {
    if (typeSubTopicAdd === "word") {
      getAllMainTopicIsWord()
        .then((response: any) => {
          if (response.status === 200) {
            setMainTopics(response.data);
          } else {
            toast.error(response.message, { containerId: "sub-topic" });
          }
        })
        .catch((error) => {
          toast.error(error.message, { containerId: "sub-topic" });
        });
    } else {
      getAllMainTopicIsSentence()
        .then((response: any) => {
          if (response.status === 200) {
            setMainTopics(response.data);
          } else {
            toast.error(response.message, { containerId: "sub-topic" });
          }
        })
        .catch((error) => {
          toast.error(error.message, { containerId: "sub-topic" });
        });
    }

  }, [typeSubTopicAdd]);
  // Xử lý khi người dùng chọn ảnh
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (subTopicEdit?.blobName) {
      setShowModal(true);
    }
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFile(file);
    }
  };
  // Xử lý khi người dùng xóa ảnh và reset input
  const handleImageDelete = () => {
    setFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Đặt lại giá trị của input file
    }
  };
  const handleAddSubTopic = () => {
    setIsLoading(true);
    if (!subTopicName || mainTopicIdSelected === -1) {
      setIsLoading(false);
      toast.error("Please enter complete information", {
        containerId: "sub-topic",
      });
      return;
    }
    const newSubTopic: SubTopic = {
      id: 0,
      name: subTopicName,
      blobName: "",
      word: typeSubTopicAdd === "word" ? true : false,
      mainTopicId: mainTopicIdSelected,
      mainTopicName: "",
      diamond: diamond,
      gold: gold,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: "",
      createdBy: "",
    };

    createSubTopic(newSubTopic, file ?? undefined).then((response: any) => {
      if (response.status === 201) {
        toast.success(response.message, { containerId: "sub-topic" });
        setSubTopics((prev) => [...prev, response.data]);
        handleImageDelete();
        setSubTopicName("");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.message, { containerId: "sub-topic" });
      }
    });
  };
  const handleChangePageSize = (size: number) => {
    setSize(size);
    setPage(0);
  };
  useEffect(() => {
    if (subTopicEdit) {
      setSubTopicName(subTopicEdit.name);
      setTypeSubTopicAdd(subTopicEdit.word ? "word" : "sentence");
      setMainTopicIdSelected(subTopicEdit.mainTopicId);
      setDiamond(subTopicEdit.diamond);
      setGold(subTopicEdit.gold);
      const imagePreviewUrl = subTopicEdit.blobName ? baseUrlBlob + subTopicEdit.blobName : null;
      setImagePreview(imagePreviewUrl);
    } else {
      setSubTopicName("");
      clearForm();
      setMainTopicIdSelected(-1);
    }
    setIsShowForm(true);
  }, [subTopicEdit]);


  const handleSelectMainTopic = (mainTopic?: MainTopic) => {
    if (mainTopic) {
      setMainTopicIdSelected(mainTopic.id);
    }
  };
  const handleClearImageInput = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleUpdateSubTopic = () => {
    setIsLoading(true);
    if (subTopicEdit) {
      updateSubTopic(
        {
          ...subTopicEdit,
          name: subTopicName,
          word: typeSubTopicAdd === "word" ? true : false,
          mainTopicId: mainTopicIdSelected,
          diamond: diamond,
          gold: gold
        },
        file ?? undefined
      ).then((response: any) => {
        setIsLoading(false);
        if (response.status === 200) {
          toast.success(response.message, { containerId: "sub-topic" });
          setSubTopics((prev) =>
            prev.map((item) => {
              if (item.id === response.data.id) {
                return response.data;
              }
              return item;
            })
          );
          setSubTopicEdit(null);
          handleClearImageInput();
          setSubTopicName("");
        } else {
          toast.error(response.message, { containerId: "sub-topic" });
        }
      });
    }
    clearForm();
    setFile(null);
  };
  const handleSearchByName = () => {
    setPage(0);
    getSubTopicPage(page, 10, sortBy, direction, subTopicSearch).then(
      (response) => {
        if (response.status === 200) {
          if (response.data.items.length === 0) {
            alert(`Not found topic with name ${subTopicSearch}`);
            setSearchValue("");
            return;
          }
          setSubTopics(response.data.items);
          setPageResponse(response.data);
        }
      }
    );
  };
  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDirection(e.target.value);
    setPage(0);
  };
  const handleInitPageSubTopic = () => {
    getSubTopicPage(page, size, sortBy, direction, "").then((response) => {
      if (response.status === 200) {
        setSubTopics(response.data.items);
        setPageResponse(response.data);
      }
    });
  };
  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setSearchValue("");
      setPage(0);
      handleInitPageSubTopic();
      return;
    }
    setSearchValue(e.target.value);
  };
  const [isShowForm, setIsShowForm] = useState(false);
  const buttonFormRef = useRef<HTMLButtonElement | null>(null);
  const clearForm = () => {
    setSubTopicName("");
    setMainTopicIdSelected(-1);
    setSubTopicEdit(null);
    setDiamond(0);
    setGold(0);
    setImagePreview(null);
    handleClearImageInput();
  };

  return (
    <DataContext.Provider value={{ size, handleChangePageSize }}>
      <div className="p-4 mb-4 mt-5 transition-transform transform scale-100">
        <Loading loading={isLoading} />
        <ToastContainer containerId="sub-topic" />
        <h5 className="text-lg font-semibold mb-4">Sub Topic</h5>
        {isShowForm ? (
          <div className="p-4 bg-white shadow-md rounded mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột bên trái */}
              <div>
                <label
                  htmlFor="subTopicName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Topic name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subTopicName"
                  className="block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 mb-4"
                  placeholder="Enter sub topic name"
                  value={subTopicName}
                  onChange={(e) => setSubTopicName(e.target.value)}
                />

                <label
                  htmlFor="subTopicImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image preview
                </label>
                <input
                  type="file"
                  id="subTopicImage"
                  className="block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 mb-4"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />

                {/* Hiển thị ảnh xem trước nếu có */}
                {imagePreview && (
                  <div className="relative mt-4 w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image preview:
                    </label>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto rounded shadow-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      onClick={handleImageDelete}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Cột bên phải */}
              <div>
                <MainTopicSelect
                  handleSelectMainTopic={handleSelectMainTopic}
                  mainTopics={mainTopics}
                  isRequired={true}
                  idMainTopicSelected={mainTopicIdSelected}
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


              </div>
              <div className="mb-4">Type: <select value={typeSubTopicAdd} onChange={(e) => setTypeSubTopicAdd(e.target.value)} name="typeSubTopic" id="typeSubTopic">
                <option value="word">Word</option>
                <option value="sentence">Sentence</option>
              </select></div>
            </div>
            <div className="flex mt-4">
              {subTopicEdit ? (
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handleUpdateSubTopic}
                >
                  Update
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleAddSubTopic}
                >
                  Add
                </button>
              )}
              <button
                onClick={() => {
                  clearForm();
                  setIsShowForm(false);
                }}
                className="bg-gray-500 ms-2 text-white px-4 py-2 rounded hover:bg-gray-600"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <button
            ref={buttonFormRef}
            onClick={() => setIsShowForm(true)}
            className="mb-3 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            {subTopicEdit == null ? <div>Add New SubTopic <i className="fas fa-plus ml-2"></i></div> : <div>Edit SubTopic <i className="fas fa-edit ml-2"></i></div>}
          </button>
        )}

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

        {/* Bảng quản lý sub-topic */}
        <SubTopicManagerTable
          subTopics={subTopics}
          handleDeleteSubTopic={handleDeleteSubTopic}
          setSubTopicEdit={setSubTopicEdit}
          subTopicEdit={subTopicEdit}
          page={page}
          setPage={setPage}
          pageResponse={pageResponse}
        />

        {/* Modal xác nhận xóa */}
        <ConfirmationModal
          title="Warning"
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
