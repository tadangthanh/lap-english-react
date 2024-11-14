import { MainTopic } from "../../modal/MainTopic";
import { apiUrl, del, get, post, put } from "../ApiUtils";

export const getMainTopicPage = async (page = 0, size = 10) => {
    return await get(`${apiUrl}/main-topic?page=${page}&size=${size}`);
}
export const getAllMainTopic = async () => {
    return await get(`${apiUrl}/main-topic/list`);
}
export const createMainTopic = async (mainTopic: MainTopic) => {
    return await post(`${apiUrl}/main-topic`, 0, mainTopic);
}

export const deleteMainTopic = async (id: number) => {
    return await del(`${apiUrl}/main-topic/${id}`, 0);
}
export const updateMainTopic = async (mainTopic: MainTopic) => {
    return await put(`${apiUrl}/main-topic/${mainTopic.id}`, 0, mainTopic);
}
