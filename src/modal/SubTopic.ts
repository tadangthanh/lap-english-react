import { BaseModal } from "./BaseModal";
// chủ đề con
export class SubTopic extends BaseModal {
    name: string;
    imageUrl: string;
    mainTopicName: string;
    mainTopicId: number;

    constructor(id: number, name: string, imageUrl: string, mainTopicId: number, mainTopicName: string, createdAt: Date, updatedAt: Date, updateBy: string) {
        super(id, createdAt, updatedAt, updateBy);
        this.name = name;
        this.imageUrl = imageUrl;
        this.mainTopicName = mainTopicName;
        this.mainTopicId = mainTopicId;
    }
}