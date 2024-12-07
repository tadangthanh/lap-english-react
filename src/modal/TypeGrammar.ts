
import { BaseModal } from './BaseModal';
export class TypeGrammar extends BaseModal {
    name: string;
    constructor(id: number, name: string, createdAt: Date, updatedAt: Date, createdBy: string, updatedBy: string) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.name = name;
    }
}