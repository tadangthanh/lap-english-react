import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import Breadcrumb from "../common/Breadcrumb";
import { useEffect, useState } from "react";
import { ExerciseResponse } from "../../modal/ExerciseResponse";
import { ExerciseList } from "./ExerciseList";
import { GrammaticalStructure } from "../../modal/GrammaticalStructure";
import { getGrammaticalStructureById } from "../../api/grammaticalStructure/GrammaticalStructureApi";
import { toast, ToastContainer } from "react-toastify";
import { PageResponse } from "../../modal/PageResponse";
import { deleteExercise, getExercisePageByGrammaticalStructureId } from "../../api/exercise/ExerciseApi";
import { Paging } from "../common/Paging";
import { verifyToken } from "../../api/ApiUtils";

export const ExercisePage: React.FC = () => {
    const { grammaticalStructureId } = useParams();
    const [exerciseResponses, setExerciseResponses] = useState<ExerciseResponse[]>([]);
    const [grammaticalStructure, setGrammaticalStructure] = useState<GrammaticalStructure>();
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false); // State để quản lý form hiển thị hay không
    useEffect(() => {
        getGrammaticalStructureById(+grammaticalStructureId!).then((response) => {
            if (response.status === 200) {
                setGrammaticalStructure(response.data);
            } else {
                toast.error(response.message, { containerId: "exercise-page" });
            }
        });
    }, [grammaticalStructureId]);

    const [pageResponse, setPageResponse] = useState<PageResponse<ExerciseResponse>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: [],
    });
    const navigate = useNavigate();
    // xác thực token còn hiệu lực hay k
    useEffect(() => {
        verifyToken().then((response: any) => {
            if (response.status !== 200) {
                navigate('/login');
            }
        })
    }, []);


    useEffect(() => {
        getExercisePageByGrammaticalStructureId(page, size, grammaticalStructureId).then((response) => {
            if (response.status === 200) {
                setPageResponse(response.data);
                setExerciseResponses(response.data.items);
            } else {
                toast.error(response.message, { containerId: "exercise-page" });
            }
        });
    }, [page, size]);
    const handleDeleteExercise = (id: number) => {
        deleteExercise(id).then((response) => {
            if (response.status === 204) {
                setExerciseResponses((prev) => prev.filter((exercise) => exercise.id !== id));
            } else {
                toast.error(response.message, { containerId: "exercise-page" });
            }
        });
    }
    return (
        <div className="max-w-7xl mx-auto p-4 bg-gray-100">
            <h2>Management exercise quiz for grammatical structure: {grammaticalStructure?.structure}</h2>
            <ToastContainer containerId="exercise-page" />
            <div className="mb-6">
                <Breadcrumb />
            </div>

            {/* Nút toggle form */}
            <div className="mb-4 text-right">
                <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {showForm ? "Hide Form" : "Show Form"}
                </button>
            </div>

            {/* Form chỉ hiển thị khi showForm là true */}
            {showForm && (
                <div className="mb-8">
                    <QuestionForm
                        exerciseResponses={exerciseResponses}
                        setExerciseResponses={setExerciseResponses}
                        grammaticalStructureId={+grammaticalStructureId!}
                    />
                </div>
            )}

            <div className="space-y-6">
                <ExerciseList
                    exercises={exerciseResponses}
                    onDelete={handleDeleteExercise}
                />
            </div>
            <Paging pageResponse={pageResponse} setPage={setPage} page={page} />
        </div>
    );
};
