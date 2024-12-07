import { SubTopic } from './../../modal/SubTopic';
import { apiUrl, del, get, postFormData, putFormData } from "../ApiUtils";

export const getSubTopicPage = async (page = 0, size = 10, sortBy?: String, direction?: String, subtopic?: String) => {
    return await get(`${apiUrl}/sub-topic?page=${page}&size=${size}&sort=${sortBy},${direction}&subtopic=${subtopic}`);
}
export const getSubTopicByName = async (page = 0, size = 10, name: String, sort?: String) => {
    return await get(`${apiUrl}/sub-topic?page=${page}&size=${size}&sort=${sort}?name=${name}`);
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

export const getSubTopicById = async (id: number) => {
    return await get(`${apiUrl}/sub-topic/${id}`);
}