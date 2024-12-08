import { BaseModal } from "./BaseModal";

export class GrammaticalStructure extends BaseModal {
    description: string;
    structure: string;
    grammarId: number;

    constructor(id: number, description: string, structure: string, grammarId: number, createdAt: Date, updatedAt: Date, createdBy: string, updatedBy: string) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.description = description;
        this.structure = structure;
        this.grammarId = grammarId;
    }
}