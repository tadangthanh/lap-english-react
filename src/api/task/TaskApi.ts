import { Task } from "../../modal/Task";
import { apiUrl, del, get, post, put } from "../ApiUtils";

export const createTask = async (task: Task) => {
    return await post(`${apiUrl}/task`, 0, task);
};
export const deleteTask = async (id: number) => {
    return await del(`${apiUrl}/task/${id}`);
};
export const updateTask = async (
    task: Task
) => {
    return await put(`${apiUrl}/task/${task.id}`, 0, task);
};
export const getPageTask = async (page: number, size: number) => {
    return await get(`${apiUrl}/task?page=${page}&size=${size}`);
}