import { BaseModal } from "./BaseModal";
// chủ đề con
export class MdlSubVocabularyTopic extends BaseModal {
    name: string;
    imageUrl: string;
    isLearned: boolean;
    idMainTopic: number;

    constructor(id: number, name: string, imageUrl: string, isLearned: boolean, idMainTopic: number, createdAt: Date, updatedAt: Date, updateBy: string) {
        super(id, createdAt, updatedAt, updateBy);
        this.name = name;
        this.imageUrl = imageUrl;
        this.isLearned = isLearned;
        this.idMainTopic = idMainTopic;
    }
}