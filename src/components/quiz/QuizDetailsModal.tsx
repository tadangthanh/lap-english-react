import React from "react";
import { CustomQuizResponse } from "../../modal/CustomQuizResponse";
import { baseUrlBlob } from "../../api/ApiUtils";

interface QuizDetailsModalProps {
    quiz: CustomQuizResponse;
    onClose: () => void;
}

const QuizDetailsModal: React.FC<QuizDetailsModalProps> = ({ quiz, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Quiz Details</h2>
                <p className="mb-2"><strong>Question:</strong> {quiz.question}</p>
                {quiz.imageQuestion && (
                    <img
                        src={baseUrlBlob + quiz.imageQuestion}
                        alt="Question"
                        className="mb-4 w-full h-auto"
                    />
                )}
                <p className="mb-2"><strong>Type:</strong> {quiz.typeQuiz}</p>

                <h3 className="text-lg font-semibold mt-4">Answers:</h3>
                <ul className="list-disc list-inside">
                    {quiz.quizAnswers.map((answer) => (
                        <li key={answer.id} className="mb-1">
                            {answer.answer} {answer.correct && "(Correct)"}
                            {answer.imgAnswer && (
                                <img
                                    src={baseUrlBlob + answer.imgAnswer}
                                    alt="Answer"
                                    className="w-16 h-auto inline ml-2"
                                />
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizDetailsModal;
