import { GrammaticalStructure } from "../../modal/GrammaticalStructure";
import { apiUrl, del, get, post, put } from "../ApiUtils";

export const getGrammaticalStructurePage = async (page = 0, size = 10, sortBy?: String, direction?: String, grammaticalStructure?: String) => {
    return await get(`${apiUrl}/grammatical-structure?page=${page}&size=${size}&sort=${sortBy},${direction}&grammaticalStructure=${grammaticalStructure}`);
};
export const createGrammaticalStructure = async (grammaticalStructure: GrammaticalStructure) => {
    return await post(`${apiUrl}/grammatical-structure`, 0, grammaticalStructure);
};
export const deleteGrammaticalStructure = async (id: number) => {
    return await del(`${apiUrl}/grammatical-structure/${id}`);
};
export const updateGrammaticalStructure = async (id: number, grammaticalStructure: GrammaticalStructure) => {
    return await put(`${apiUrl}/grammatical-structure/${id}`, 0, grammaticalStructure);
};
export const getGrammaticalStructureById = async (id: number) => {
    return await get(`${apiUrl}/grammatical-structure/${id}`);
}
