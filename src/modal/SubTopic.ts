import { BaseModal } from "./BaseModal";
// chủ đề con
export class SubTopic extends BaseModal {
    name: string;
    blobName: string;
    mainTopicName: string;
    mainTopicId: number;
    wordCount?: number;

    constructor(id: number, name: string, blobName: string, mainTopicId: number, mainTopicName: string, createdAt: Date, updatedAt: Date, updateBy: string) {
        super(id, createdAt, updatedAt, updateBy);
        this.name = name;
        this.blobName = blobName;
        this.mainTopicName = mainTopicName;
        this.mainTopicId = mainTopicId;

    }
}