import { Word } from "../../modal/Word";
import { apiUrl, del, get, postFormData, putFormData } from "../ApiUtils";

export const getWordPage = async (page = 0, size = 10, sortBy?: String, direction = "asc", word?: String) => {
    return await get(`${apiUrl}/word?page=${page}&size=${size}&sort=${sortBy},${direction}&word=${word}`);
}
export const createWord = async (word: Word, file?: File) => {
    return await postFormData(`${apiUrl}/word`, 0, word, file = file);
}
export const updateWord = async (word: Word, file?: File) => {
    return await putFormData(`${apiUrl}/word/${word.id}`, 0, word, file = file);
}
export const deleteWord = async (id: number) => {
    return await del(`${apiUrl}/word/${id}`);
}
export const importWordExcel = async (subTopicId: number, file: File) => {
    return await postFormData(`${apiUrl}/word/import/${subTopicId}`, 0, {}, file = file);
}