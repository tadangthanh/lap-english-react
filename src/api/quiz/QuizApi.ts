import { CustomQuizRequest } from "../../modal/CustomQuizRequest";
import { ExerciseRequest } from "../../modal/ExerciseRequest";
import { Grammar } from "../../modal/Grammar";
import { apiUrl, createQuizFormData, del, get, post, put } from "../ApiUtils";


export const createQuiz = async (quizRequest: CustomQuizRequest) => {
    const formData = createQuizFormData(quizRequest);
    return await post(`${apiUrl}/custom-quiz`, 0, formData);
};
export const getPageQuiz = async (page = 0, size = 10) => {
    return await get(`${apiUrl}/custom-quiz?page=${page}&size=${size}`);
}
export const getQuizDetails = async (id: number) => {
    return await get(`${apiUrl}/custom-quiz/${id}`);
}
export const deleteQuiz = async (id: number) => {
    return await del(`${apiUrl}/custom-quiz/${id}`);
};
export const updateExercise = async (id: number, grammar: Grammar) => {
    return await put(`${apiUrl}/exercise-grammar/${id}`, 0, grammar);
};
export const getExercisePageByGrammaticalStructureId = async (page = 0, size = 10, grammaticalStructureId?: String) => {
    return await get(`${apiUrl}/exercise-grammar/grammatical-structure/${grammaticalStructureId}?page=${page}&size=${size}`);
}