import { BaseModal } from "./BaseModal";
// chủ đề con
export class SubTopic extends BaseModal {
    name: string;
    blobName: string;
    mainTopicName: string;
    mainTopicId: number;
    wordCount?: number;
    word: boolean;

    constructor(id: number, name: string, word: boolean, blobName: string, mainTopicId: number, mainTopicName: string, createdAt: Date, updatedAt: Date, updateBy: string, createdBy: string) {
        super(id, createdAt, updatedAt, updateBy, createdBy);
        this.name = name;
        this.blobName = blobName;
        this.word = word;
        this.mainTopicName = mainTopicName;
        this.mainTopicId = mainTopicId;

    }
}