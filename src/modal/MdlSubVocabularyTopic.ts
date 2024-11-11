import { BaseModal } from "./BaseModal";
// chủ đề con
export class MdlSubVocabularyTopic extends BaseModal {
    name: string;
    imageUrl: string;
    isLearned: boolean;
    idMainTopic: number;

    constructor(id: number, name: string, imageUrl: string, isLearned: boolean, idMainTopic: number) {
        super(id);
        this.name = name;
        this.imageUrl = imageUrl;
        this.isLearned = isLearned;
        this.idMainTopic = idMainTopic;
    }
}