import { BaseModal } from "./BaseModal";
import { WordLevel } from "./WordLevel";
import { WordType } from "./WordType";

export class Word extends BaseModal {
    word: string;
    meaning: string;
    pronounceUK: string;
    pronounceUS: string;
    type: WordType;
    level: WordLevel;
    example: string;
    idSubTopic: number;
    topicName: string;
    audioUkBlobName: string;
    audioUsBlobName: string;
    imageBlobName: string;

    constructor(
        id: number,
        word: string,
        meaning: string,
        pronounceUK: string,
        pronounceUS: string,
        type: WordType,
        level: WordLevel,
        example: string,
        idSubTopic: number,
        topicName: string,
        audioUkBlobName: string,
        audioUsBlobName: string,
        imageBlobName: string,
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
        this.audioUkBlobName = audioUkBlobName;
        this.audioUsBlobName = audioUsBlobName;
        this.imageBlobName = imageBlobName;
    }
}
