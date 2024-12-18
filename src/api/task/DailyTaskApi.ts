import { Task } from "../../modal/Task";
import { apiUrl, del, get, post, put } from "../ApiUtils";

export const createDailyTask = async (task: Task) => {
    return await post(`${apiUrl}/daily-task`, 0, task);
};
export const deleteDailyTask = async (id: number) => {
    return await del(`${apiUrl}/daily-task/${id}`);
};
export const updateDailyTask = async (
    task: Task
) => {
    return await put(`${apiUrl}/daily-task/${task.id}`, 0, task);
};
export const getPageDailyTask = async (page: number, size: number) => {
    return await get(`${apiUrl}/daily-task?page=${page}&size=${size}`);
}