import { Task } from "../../modal/Task";
import { Title } from "../../modal/Title";
import { apiUrl, del, get, post, postFormData, put } from "../ApiUtils";

export const createTitleTask = async (title: Title, file: File | undefined) => {
    return await postFormData(`${apiUrl}/title`, 0, title, file);
};
export const deleteTitleTask = async (id: number) => {
    return await del(`${apiUrl}/title/${id}`);
};
export const updateTitleTask = async (
    title: Title
) => {
    return await put(`${apiUrl}/title/${title.id}`, 0, title);
};
export const getPageTitleTask = async (page: number, size: number) => {
    return await get(`${apiUrl}/title?page=${page}&size=${size}`);
}