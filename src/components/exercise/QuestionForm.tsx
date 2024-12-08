import React, { useEffect, useState } from "react";
import { TypeQuiz } from "../../modal/TypeQuiz";
import { QuizAnswerRequest } from "../../modal/QuizAnswerRequest";
import { CustomQuizRequest } from "../../modal/CustomQuizRequest";
import { ExerciseRequest } from "../../modal/ExerciseRequest";
import { createExercise } from "../../api/exercise/ExerciseApi";
import { CustomQuizResponse } from "../../modal/CustomQuizResponse";
import { ExerciseResponse } from "../../modal/ExerciseResponse";
interface QuestionFormProps {
    grammaticalStructureId: number;
    exerciseResponses: ExerciseResponse[];
    setExerciseResponses: (exerciseResponses: ExerciseResponse[]) => void;
}
const QuestionForm: React.FC<QuestionFormProps> = ({ grammaticalStructureId, setExerciseResponses, exerciseResponses }) => {
    const [customQuizRequest, setCustomQuizRequest] = useState<CustomQuizRequest>({
        id: 0,
        typeQuiz: TypeQuiz.CHOOSE_ONE,
        question: "",
        exerciseGrammarId: 0,
        imageQuestion: undefined,
        createdAt: new Date(),
        createdBy: "",
        updatedAt: new Date(),
        updatedBy: "",
        quizAnswers: [],
    });
    const [exerciseGrammarRequest, setExerciseGrammarRequest] = useState<ExerciseRequest>({
        id: 0,
        grammaticalStructureId: grammaticalStructureId,
        customQuiz: customQuizRequest,
        createdAt: new Date(),
        createdBy: "",
        updatedAt: new Date(),
        updatedBy: "",
    }

    );
    const [answers, setAnswers] = useState<QuizAnswerRequest[]>([]);
    // const [quizType, setQuizType] = useState<TypeQuiz>(TypeQuiz.CHOOSE_ONE);
    // Lấy danh sách các giá trị của enum
    const quizTypes = Object.values(TypeQuiz);

    // Hàm thêm câu trả lời mới
    const addAnswer = () => {
        setAnswers([
            ...answers,
            { id: 0, answer: "", correct: false, imgAnswer: undefined, customQuizId: 0, createdAt: new Date(), createdBy: "", updatedAt: new Date(), updatedBy: "" },
        ]);
    };

    // Hàm thay đổi giá trị câu trả lời
    const handleAnswerChange = (index: number, key: string, value: any) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = { ...updatedAnswers[index], [key]: value };
        setAnswers(updatedAnswers);
    };
    // Hàm thay đổi giá trị câu hỏi
    const handleCustomQuizRequestChange = (key: string, value: any) => {
        setCustomQuizRequest((prev) => ({
            ...prev,
            [key]: value,
        } as CustomQuizRequest));
    };


    // Hàm xóa câu trả lời
    const deleteAnswer = (index: number) => {
        const updatedAnswers = answers.filter((_, i) => i !== index);
        setAnswers(updatedAnswers);
    };
    const handleQuizTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomQuizRequest((prev) => ({
            ...prev,
            typeQuiz: e.target.value as TypeQuiz,
        }));
    };
    const imageQuestionRef = React.useRef<HTMLInputElement>(null);
    const questionRef = React.useRef<HTMLInputElement>(null);
    const clearForm = () => {
        setCustomQuizRequest({
            id: 0,
            typeQuiz: TypeQuiz.CHOOSE_ONE,
            question: "",
            exerciseGrammarId: 0,
            imageQuestion: undefined,
            createdAt: new Date(),
            createdBy: "",
            updatedAt: new Date(),
            updatedBy: "",
            quizAnswers: [],
        });
        setAnswers([]);
        imageQuestionRef.current!.value = "";
        questionRef.current!.value = "";
    }
    const handleAddQuiz = () => {
        customQuizRequest.quizAnswers = answers;
        exerciseGrammarRequest.customQuiz = customQuizRequest;
        console.log("exerciseGrammarRequest", exerciseGrammarRequest);
        createExercise(exerciseGrammarRequest)
            .then((res) => {
                if (res.status === 201) {
                    const exerciseResponse = res.data;
                    setExerciseResponses([...exerciseResponses, exerciseResponse]);
                    clearForm();   // Xóa form sau khi thêm thành công
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add new quiz</h2>

            <div className="mb-4">
                <label className="block text-sm font-semibold">Question  <span className="text-red-500">*</span></label>
                <input
                    ref={questionRef}
                    type="text"
                    value={customQuizRequest?.question || ""}
                    onChange={(e) => handleCustomQuizRequestChange("question", e.target.value)}
                    placeholder="Enter question"
                    className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-semibold">Image (optional)</label>
                <input
                    ref={imageQuestionRef}
                    type="file"
                    onChange={(e) => handleCustomQuizRequestChange("imageQuestion", e.target.files?.[0])} // Lấy file đầu tiên
                    className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
                {customQuizRequest?.imageQuestion && (
                    <div className="mt-2 text-sm">
                        <span>Selected file: {customQuizRequest.imageQuestion.name}</span>
                        <button
                            type="button"
                            onClick={() => handleCustomQuizRequestChange("imageQuestion", null)} // Xóa file
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            Remove file
                        </button>
                    </div>
                )}
            </div>


            <div className="mb-4 w-50">
                <label className="block text-sm font-semibold">Type quiz</label>
                <select
                    value={customQuizRequest?.typeQuiz}
                    onChange={handleQuizTypeChange}
                    className="mt-2 p-2 w-full border border-gray-300 rounded"
                >
                    {quizTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Answers</h3>
                {answers.map((answer, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`isCorrect-${index}`}
                                    checked={answer.correct}
                                    onChange={(e) => handleAnswerChange(index, "correct", e.target.checked)}
                                    className="mr-2 cursor-pointer p-3 size-5"
                                />
                                <label htmlFor={`isCorrect-${index}`} className="text-sm cursor-pointer select-none">Correct</label>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={answer.answer}
                                    onChange={(e) => handleAnswerChange(index, "answer", e.target.value)}
                                    placeholder="Enter answer"
                                    className="p-2 w-full border border-gray-300 rounded"
                                />
                            </div>



                            <div className="flex-1">
                                <input
                                    type="file"
                                    onChange={(e) => handleAnswerChange(index, "imgAnswer", e.target.files?.[0])} // Lấy file đầu tiên
                                    className="p-2 w-full border border-gray-300 rounded"
                                />
                                {answer.imgAnswer && (
                                    <div className="mt-2 flex items-center">
                                        <span className="text-sm mr-2">{answer.imgAnswer.name}</span>
                                        <button
                                            onClick={() => handleAnswerChange(index, "imgAnswer", null)} // Xóa ảnh
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Xóa ảnh
                                        </button>
                                    </div>
                                )}
                            </div>


                            <button
                                onClick={() => deleteAnswer(index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <i className="fas fa-close"></i>
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={addAnswer}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v14m7-7H5"
                        />
                    </svg>
                    Add Answer
                </button>
            </div>

            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg" onClick={handleAddQuiz}>
                Save Quiz
            </button>
        </div>
    );
};

export default QuestionForm;
