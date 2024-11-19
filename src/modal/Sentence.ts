import { BaseModal } from "./BaseModal";

export class Sentence extends BaseModal {
    sentence: string;
    translation: string;
    subTopicId: number;
    subTopicName: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;

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
        super(id, createdAt, updatedAt, updateBy);

        this.sentence = sentence;
        this.translation = translation;
        this.subTopicId = subTopicId;
        this.subTopicName = subTopicName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.updatedBy = updateBy;
    }


}