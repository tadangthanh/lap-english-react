import React, { useState } from "react";
import { QuizAnswerRequest } from "../../modal/QuizAnswerRequest";
import { TypeQuiz } from "../../modal/TypeQuiz";
import { CustomQuizRequest } from "../../modal/CustomQuizRequest";

interface QuizModalProps {
    quiz: CustomQuizRequest | null;
    onSave: (quiz: CustomQuizRequest) => void;
    onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, onSave, onClose }) => {
    const [question, setQuestion] = useState<string>(quiz?.question || "");
    const [imageQuestion, setImageQuestion] = useState<File | null>(null); // State cho ảnh câu hỏi
    const [typeQuiz, setTypeQuiz] = useState<TypeQuiz>(
        quiz?.typeQuiz || TypeQuiz.CHOOSE_ONE
    );
    const [answers, setAnswers] = useState<QuizAnswerRequest[]>(
        quiz?.quizAnswers || []
    );

    // Thêm đáp án mới
    const handleAddAnswer = () => {
        setAnswers([
            ...answers,
            new QuizAnswerRequest(
                answers.length + 1,
                "",
                false,
                0,
                new Date(),
                new Date(),
                "admin",
                "admin"
            ),
        ]);
    };

    // Xóa đáp án
    const handleDeleteAnswer = (index: number) => {
        setAnswers((prev) => prev.filter((_, i) => i !== index));
    };

    // Xử lý thay đổi file ảnh của đáp án
    const handleFileChange = (index: number, file: File | null) => {
        setAnswers((prev) =>
            prev.map((a, i) =>
                i === index ? { ...a, imgAnswer: file || undefined } : a
            )
        );
    };

    // Xử lý thay đổi file ảnh câu hỏi
    const handleImageQuestionChange = (file: File | null) => {
        setImageQuestion(file);
    };

    // Lưu quiz
    const handleSave = () => {
        const newQuiz = new CustomQuizRequest(
            quiz?.id || 0,
            typeQuiz,
            question,
            new Date(),
            new Date(),
            "admin",
            "admin",
            answers
        );

        // Gắn thêm ảnh câu hỏi vào quiz
        if (imageQuestion) {
            newQuiz.imageQuestion = imageQuestion;
        }

        console.log(newQuiz);
        onSave(newQuiz);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl mb-4">{quiz ? "Edit Quiz" : "Add Quiz"}</h2>

                {/* Câu hỏi */}
                <div className="mb-4">
                    <label className="block text-gray-700">Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    />
                </div>

                {/* Upload ảnh câu hỏi */}
                <div className="mb-4">
                    <label className="block text-gray-700">Question Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            handleImageQuestionChange(e.target.files?.[0] || null)
                        }
                        className="w-full p-2 border rounded mt-1"
                    />
                </div>

                {/* Loại quiz */}
                <div className="mb-4">
                    <label className="block text-gray-700">Quiz Type:</label>
                    <select
                        value={typeQuiz}
                        onChange={(e) => setTypeQuiz(e.target.value as TypeQuiz)}
                        className="w-full p-2 border rounded mt-1"
                    >
                        {Object.values(TypeQuiz).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Danh sách đáp án */}
                <div className="mb-4">
                    <label className="block text-gray-700">Answers:</label>
                    {answers.map((answer, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap items-center gap-2 mb-2 border-b pb-2"
                        >
                            {/* Nội dung đáp án */}
                            <input
                                type="text"
                                placeholder="Enter answer"
                                value={answer.answer}
                                onChange={(e) =>
                                    setAnswers((prev) =>
                                        prev.map((a, i) =>
                                            i === index ? { ...a, answer: e.target.value } : a
                                        )
                                    )
                                }
                                className="p-2 border rounded flex-1"
                            />

                            {/* Check đáp án đúng */}
                            <input
                                type="checkbox"
                                checked={answer.correct}
                                onChange={(e) =>
                                    setAnswers((prev) =>
                                        prev.map((a, i) =>
                                            i === index ? { ...a, correct: e.target.checked } : a
                                        )
                                    )
                                }
                                title="Mark as correct"
                            />
                            <span>Correct</span>

                            {/* Upload ảnh */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleFileChange(index, e.target.files?.[0] || null)
                                }
                                className="p-2"
                            />

                            {/* Nút xóa đáp án */}
                            <button
                                onClick={() => handleDeleteAnswer(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete Answer
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={handleAddAnswer}
                        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                    >
                        Add Answer
                    </button>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
