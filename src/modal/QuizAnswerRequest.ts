import { BaseModal } from "./BaseModal";

export class QuizAnswerRequest extends BaseModal {
    answer: string;
    correct: boolean;
    imgAnswer?: File;
    customQuizId: number;

    constructor(
        id: number,
        answer: string,
        correct: boolean,
        customQuizId: number,
        createdAt: Date,
        updatedAt: Date,
        createdBy: string,
        updatedBy: string,
        imgAnswer?: File
    ) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.answer = answer;
        this.correct = correct;
        this.imgAnswer = imgAnswer;
        this.customQuizId = customQuizId;
        this.imgAnswer = imgAnswer;
    }

}