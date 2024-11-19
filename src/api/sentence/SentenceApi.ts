import { Sentence } from "../../modal/Sentence";
import { apiUrl, del, get, post, postFormData, put } from "../ApiUtils";

export const getSentencePage = async (page = 0, size = 10, sortBy?: String, direction = "asc", sentence?: String) => {
    return await get(`${apiUrl}/sentence?page=${page}&size=${size}&sort=${sortBy},${direction}&sentence=${sentence}`);
}
export const createSentence = async (sentence: Sentence) => {
    return await post(`${apiUrl}/sentence`, 0, sentence);
}
export const deleteSentence = async (id: number) => {
    return await del(`${apiUrl}/sentence/${id}`);
}
export const updateSentence = async (sentence: Sentence) => {
    return await put(`${apiUrl}/sentence/${sentence.id}`, 0, sentence);
}