import { BaseModal } from "./BaseModal";

export class Sentence extends BaseModal {
    sentence: string;
    translation: string;
    subTopicId: number;
    subTopicName: string;
    constructor(
        id: number,
        sentence: string,
        translation: string,
        subTopicId: number,
        subTopicName: string,
        createdBy: string,
        createdAt: Date,
        updatedAt: Date,
        updateBy: string
    ) {
        super(id, createdAt, updatedAt, updateBy, createdBy);
        this.sentence = sentence;
        this.translation = translation;
        this.subTopicId = subTopicId;
        this.subTopicName = subTopicName;
    }


}