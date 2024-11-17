import { Word } from "../../modal/Word";
import { apiUrl, get, postFormData } from "../ApiUtils";

export const getWordPage = async (page = 0, size = 10, sortBy?: String, direction = "asc", word?: String) => {
    return await get(`${apiUrl}/word?page=${page}&size=${size}&sort=${sortBy},${direction}&word=${word}`);
}
export const createWord = async (word: Word, file?: File) => {
    return await postFormData(`${apiUrl}/word`, 0, word, file = file);
}