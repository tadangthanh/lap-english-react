import { ExerciseRequest } from "../../modal/ExerciseRequest";
import { Grammar } from "../../modal/Grammar";
import { apiUrl, createExerciseFormData, del, get, post, put } from "../ApiUtils";


export const createExercise = async (exerciseRequest: ExerciseRequest) => {
    const formData = createExerciseFormData(exerciseRequest);
    return await post(`${apiUrl}/exercise-grammar`, 0, formData);
};
export const deleteExercise = async (id: number) => {
    return await del(`${apiUrl}/exercise-grammar/${id}`);
};
export const updateExercise = async (id: number, grammar: Grammar) => {
    return await put(`${apiUrl}/exercise-grammar/${id}`, 0, grammar);
};
export const getExercisePageByGrammaticalStructureId = async (page = 0, size = 10, grammaticalStructureId?: String) => {
    return await get(`${apiUrl}/exercise-grammar/grammatical-structure/${grammaticalStructureId}?page=${page}&size=${size}`);
}