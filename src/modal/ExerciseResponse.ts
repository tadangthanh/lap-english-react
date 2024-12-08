import { BaseModal } from "./BaseModal";
import { CustomQuizResponse } from "./CustomQuizResponse";

export class ExerciseResponse extends BaseModal {
    grammaticalStructureId: number;
    customQuiz: CustomQuizResponse;

    constructor(
        id: number,
        grammaticalStructureId: number,
        customQuiz: CustomQuizResponse,
        createdDate: Date,
        updatedDate: Date,
        createdBy: string,
        updatedBy: string
    ) {
        super(id, createdDate, updatedDate, createdBy, updatedBy);
        this.grammaticalStructureId = grammaticalStructureId;
        this.customQuiz = customQuiz;
    }
}