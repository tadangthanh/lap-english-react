import { BaseModal } from "./BaseModal";
import { CustomQuizRequest } from "./CustomQuizRequest";

export class ExerciseRequest extends BaseModal {
    grammaticalStructureId: number;
    customQuiz: CustomQuizRequest;

    constructor(
        id: number,
        grammaticalStructureId: number,
        customQuiz: CustomQuizRequest,
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