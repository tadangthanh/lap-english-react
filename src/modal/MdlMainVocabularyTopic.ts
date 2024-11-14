import { BaseModal } from "./BaseModal";
import { MdlSubVocabularyTopic } from "./MdlSubVocabularyTopic";

// Chủ đề chính
export class MdlMainVocabularyTopic extends BaseModal {
    name: string;
    subTopics: MdlSubVocabularyTopic[];  // Danh sách các chủ đề con

    constructor(id: number, name: string, subTopics: MdlSubVocabularyTopic[] = [], createdAt: Date, updatedAt: Date, updateBy: string) {
        super(id, createdAt, updatedAt, updateBy);
        this.name = name;
        this.subTopics = subTopics;
    }

    // Thêm một chủ đề con vào chủ đề chính
    addSubTopic(subTopic: MdlSubVocabularyTopic) {
        this.subTopics.push(subTopic);
    }
}
