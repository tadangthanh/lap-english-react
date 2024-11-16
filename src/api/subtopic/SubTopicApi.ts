import { SubTopic } from './../../modal/SubTopic';
import { apiUrl, del, get, post, postFormData, put, putFormData } from "../ApiUtils";

export const getSubTopicPage = async (page = 0, size = 10) => {
    return await get(`${apiUrl}/sub-topic?page=${page}&size=${size}`);
}
export const getAllSubTopic = async () => {
    return await get(`${apiUrl}/sub-topic/list`);
}
export const createSubTopic = async (SubTopic: SubTopic, file?: File) => {
    return await postFormData(`${apiUrl}/sub-topic`, 0, SubTopic, file = file);
}

export const deleteSubTopic = async (id: number) => {
    return await del(`${apiUrl}/sub-topic/${id}`, 0);
}
export const updateSubTopic = async (SubTopic: SubTopic, file?: File) => {
    return await putFormData(`${apiUrl}/sub-topic/${SubTopic.id}`, 0, SubTopic, file = file);
}
