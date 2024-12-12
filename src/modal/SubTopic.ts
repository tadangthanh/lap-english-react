import { BaseModal } from "./BaseModal";
// chủ đề con
export class SubTopic extends BaseModal {
    name: string;
    blobName: string;
    mainTopicName: string;
    mainTopicId: number;
    wordCount?: number;
    word: boolean;
    diamond: number;
    gold: number;

    constructor(id: number, name: string, word: boolean, blobName: string, mainTopicId: number, mainTopicName: string, diamond: number, gold: number, createdAt: Date, updatedAt: Date, updateBy: string, createdBy: string) {
        super(id, createdAt, updatedAt, updateBy, createdBy);
        this.name = name;
        this.blobName = blobName;
        this.word = word;
        this.mainTopicName = mainTopicName;
        this.mainTopicId = mainTopicId;
        this.diamond = diamond;
        this.gold = gold;

    }
}