import { BaseModal } from "./BaseModal";

export class Grammar extends BaseModal {
    name: string;
    description: string;
    typeGrammarId: number;

    constructor(id: number, name: string, description: string, typeGrammarId: number, createdAt: Date, updatedAt: Date, updateBy: string, createdBy: string) {
        super(id, createdAt, updatedAt, updateBy, createdBy);
        this.name = name;
        this.typeGrammarId = typeGrammarId;
        this.description = description;
    }
}