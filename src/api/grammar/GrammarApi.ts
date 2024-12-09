import { Grammar } from "../../modal/Grammar";
import { apiUrl, del, get, post, put } from "../ApiUtils";

export const getGrammarPage = async (page = 0, size = 10, sortBy?: String, direction?: String, grammar?: String) => {
    return await get(`${apiUrl}/grammar?page=${page}&size=${size}&sort=${sortBy},${direction}&grammar=${grammar}`);
};
export const createGrammar = async (grammar: Grammar) => {
    return await post(`${apiUrl}/grammar`, 0, grammar);
};
export const deleteGrammar = async (id: number) => {
    return await del(`${apiUrl}/grammar/${id}`);
};
export const updateGrammar = async (id: number, grammar: Grammar) => {
    return await put(`${apiUrl}/grammar/${id}`, 0, grammar);
};
export const getGrammarById = (id: number) => {
    return get(`${apiUrl}/grammar/${id}`);
}
