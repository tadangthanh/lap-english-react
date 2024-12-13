import { useState } from "react";
import { ExerciseResponse } from "../../modal/ExerciseResponse";
import ConfirmationModal from "../common/ConfirmationModal";
import { baseUrlBlob } from "../../api/ApiUtils";

interface ExerciseListProps {
    exercises: ExerciseResponse[];
    onDelete: (id: number) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onDelete }) => {
    const [showAnswers, setShowAnswers] = useState<boolean>(false);

    // Trạng thái lưu trữ câu hỏi có mở rộng hay không
    const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

    // Hàm để toggle việc hiển thị đáp án
    const toggleAnswers = () => setShowAnswers(!showAnswers);

    // Hàm để toggle việc mở rộng câu hỏi
    const toggleQuestionExpansion = (id: number) => {
        const updatedSet = new Set(expandedQuestions);
        if (updatedSet.has(id)) {
            updatedSet.delete(id);
        } else {
            updatedSet.add(id);
        }
        setExpandedQuestions(updatedSet);
    };
    const [showModal, setShowModal] = useState(false);
    const [exerciseDeleteId, setExerciseDeleteId] = useState<number>(-1);
    return (
        <div className="exercise-list">
            <h2 className="text-2xl font-semibold">Quizzes</h2>
            {exercises.length === 0 ? (
                <p>Empty list</p>
            ) : (
                <table className="table-auto w-full mt-4 border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Question</th>
                            <th className="px-4 py-2 border">Type</th>
                            <th className="px-4 py-2 border">Image</th>
                            <th className="px-4 py-2 border">Answers</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => (
                            <tr key={exercise.id}>
                                <td className="px-4 py-2 border">{exercise.id}</td>

                                {/* Câu hỏi */}
                                <td className="px-4 py-2 border">
                                    <div className="flex items-center">
                                        <div
                                            className={`w-48 ${expandedQuestions.has(exercise.id) ? 'line-clamp-none' : 'line-clamp-1'}`}
                                        >
                                            {exercise.customQuiz.question}
                                        </div>
                                        <button
                                            onClick={() => toggleQuestionExpansion(exercise.id)}
                                            className="text-blue-500 ml-2"
                                        >
                                            {expandedQuestions.has(exercise.id) ? 'Show less' : 'Show more'}
                                        </button>
                                    </div>
                                </td>

                                {/* Loại câu hỏi */}
                                <td className="px-4 py-2 border">{exercise.customQuiz.typeQuiz}</td>

                                {/* Hình ảnh câu hỏi */}
                                <td className="px-4 py-2 border">
                                    {exercise.customQuiz.imageQuestion ? (
                                        <img
                                            src={baseUrlBlob + exercise.customQuiz.imageQuestion}
                                            alt="Câu hỏi"
                                            className="w-16 h-16 object-cover"
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </td>

                                {/* Đáp án */}
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={toggleAnswers}
                                        className="text-blue-500 mb-2"
                                    >
                                        {showAnswers ? 'Hide Answers' : 'Show Answers'}
                                    </button>
                                    {showAnswers &&
                                        exercise.customQuiz.quizAnswers.map((answer) => (
                                            <div key={answer.id} className="mb-2">
                                                <p>{answer.answer}</p>
                                                {answer.imgAnswer && (
                                                    <img
                                                        src={baseUrlBlob + answer.imgAnswer}
                                                        alt="Answer Image"
                                                        className="w-8 h-8 object-cover"
                                                    />
                                                )}
                                                <p
                                                    className={answer.correct ? 'text-green-500' : 'text-red-500'}
                                                >
                                                    {answer.correct ? 'Correct' : 'Incorrect'}
                                                </p>
                                            </div>
                                        ))}
                                </td>

                                {/* Action */}
                                <td className="px-4 py-2 border">
                                    <button
                                        className="text-red-500"
                                        onClick={() => {
                                            setExerciseDeleteId(exercise.id);
                                            setShowModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Confirmation Modal */}
            <ConfirmationModal
                title="Confirm Deletion"
                message="Are you sure you want to delete this quiz? This action cannot be undone."
                labelConfirm="Delete"
                labelCancel="Cancel"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => {
                    onDelete(exerciseDeleteId);
                    setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
};
