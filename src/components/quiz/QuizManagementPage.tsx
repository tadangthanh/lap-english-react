import React, { useEffect, useState } from "react";
import { CustomQuizRequest } from "../../modal/CustomQuizRequest";
import { QuizModal } from "./QuizModal";
import { CustomQuizResponse } from "../../modal/CustomQuizResponse";
import { PageResponse } from "../../modal/PageResponse";
import { createQuiz, deleteQuiz, getPageQuiz, getQuizDetails } from "../../api/quiz/QuizApi";
import { toast, ToastContainer } from "react-toastify";
import QuizDetailsModal from "./QuizDetailsModal";

const QuizManagementPage: React.FC = () => {
    const [quizzes, setQuizzes] = useState<CustomQuizRequest[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<CustomQuizRequest | null>(null);
    const [quizDetails, setQuizDetails] = useState<CustomQuizResponse | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false); // Trạng thái xem chi tiết
    const [pageResponse, setPageResponse] = useState<PageResponse<CustomQuizResponse>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: [],
    });

    // Mở modal Thêm/Sửa
    const handleOpenModal = (quiz?: CustomQuizRequest) => {
        setSelectedQuiz(quiz || null);
        setIsModalOpen(true);
    };

    // Đóng modal Thêm/Sửa
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedQuiz(null);
    };

    // Xử lý lưu quiz
    const handleSaveQuiz = (quiz: CustomQuizRequest) => {
        if (quiz.id) {
            // Cập nhật quiz
            setQuizzes((prev) =>
                prev.map((q) => (q.id === quiz.id ? { ...quiz } : q))
            );
        } else {
            // Thêm mới quiz
            createQuiz(quiz).then((res) => {
                if (res.status === 201) {
                    setQuizzes((prev) => [...prev, res.data]);
                } else {
                    toast.error(res.message, { containerId: "quiz" });
                }
            });
        }
        handleCloseModal();
    };

    // Xử lý xóa quiz
    const handleDeleteQuiz = (quizId: number) => {
        deleteQuiz(quizId).then((res) => {
            if (res.status === 204) {
                setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
            } else {
                toast.error(res.message, { containerId: "quiz" });
            }
        });
    };

    // Xử lý xem chi tiết quiz
    const handleViewDetails = (quizId: number) => {
        getQuizDetails(quizId).then((res) => {
            if (res.status === 200) {
                setQuizDetails(res.data);
                setIsDetailsOpen(true);
            } else {
                toast.error(res.message, { containerId: "quiz" });
            }
        });
    };

    // Đóng modal chi tiết
    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
        setQuizDetails(null);
    };

    // Lấy danh sách quiz
    useEffect(() => {
        getPageQuiz(page, size).then((res) => {
            if (res.status === 200) {
                setQuizzes(res.data.items);
                setPageResponse(res.data);
            } else {
                toast.error(res.message, { containerId: "quiz" });
            }
        });
    }, [page, size]);

    return (
        <div className="container mx-auto p-6">
            <ToastContainer containerId="quiz" />
            <h1 className="text-3xl font-bold mb-4">Quiz manager</h1>
            <button
                onClick={() => handleOpenModal()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Thêm Quiz
            </button>

            {/* Danh sách Quiz */}
            <div className="mt-6">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Question</th>
                            <th className="border p-2">Type quiz</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((quiz, index) => (
                            <tr key={quiz.id} className="hover:bg-gray-50">
                                <td className="border p-2">{index + 1}</td>
                                <td
                                    className="border p-2 text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => handleViewDetails(quiz.id)} // Xem chi tiết
                                >
                                    {quiz.question}
                                </td>
                                <td className="border p-2">{quiz.typeQuiz}</td>
                                <td className="border p-2 flex gap-2">
                                    {/* <button
                                        onClick={() => handleOpenModal(quiz)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button> */}
                                    <button
                                        onClick={() => handleDeleteQuiz(quiz.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm/Sửa Quiz */}
            {isModalOpen && (
                <QuizModal
                    quiz={selectedQuiz}
                    onSave={handleSaveQuiz}
                    onClose={handleCloseModal}
                />
            )}

            {/* Modal Chi Tiết Quiz */}
            {isDetailsOpen && quizDetails && (
                <QuizDetailsModal
                    quiz={quizDetails}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
};

export default QuizManagementPage;
