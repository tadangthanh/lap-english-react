import { BaseModal } from "./BaseModal";

export class QuizAnswerResponse {
    id: number;
    answer: string;
    correct: boolean;
    imgAnswer: string;

    constructor(id: number, answer: string, correct: boolean, imgAnswer: string) {
        this.id = id;
        this.answer = answer;
        this.correct = correct;
        this.imgAnswer = imgAnswer;
    }

}