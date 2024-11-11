import { BaseModal } from "./BaseModal";

// Từ vựng
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
    imageUrl: string;  // Thêm thuộc tính imageUrl

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
        imageUrl: string  // Thêm imageUrl vào constructor
    ) {
        super(id);
        this.word = word;
        this.meaning = meaning;
        this.pronounceUK = pronounceUK;
        this.pronounceUS = pronounceUS;
        this.type = type;
        this.level = level;
        this.example = example;
        this.idSubTopic = idSubTopic;
        this.topicName = topicName;
        this.imageUrl = imageUrl;  // Khởi tạo giá trị imageUrl
    }
}
