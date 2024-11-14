import { BaseModal } from "./BaseModal";

export class MdlWord extends BaseModal {
    word: string;
    meaning: string;
    pronounceUK: string;
    pronounceUS: string;
    type: string;
    level: string;
    example: string;
    idSubTopic: number;
    topicName: string;
    imageUrl: string;

    constructor(
        id: number,
        word: string,
        meaning: string,
        pronounceUK: string,
        pronounceUS: string,
        type: string,
        level: string,
        example: string,
        idSubTopic: number,
        topicName: string,
        imageUrl: string,
        createdAt: Date,
        updatedAt: Date,
        updateBy: string
    ) {
        super(id, createdAt, updatedAt, updateBy);
        this.word = word;
        this.meaning = meaning;
        this.pronounceUK = pronounceUK;
        this.pronounceUS = pronounceUS;
        this.type = type;
        this.level = level;
        this.example = example;
        this.idSubTopic = idSubTopic;
        this.topicName = topicName;
        this.imageUrl = imageUrl;
    }
}
