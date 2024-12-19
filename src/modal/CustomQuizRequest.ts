import { BaseModal } from "./BaseModal";
import { QuizAnswerRequest } from "./QuizAnswerRequest";
import { TypeQuiz } from "./TypeQuiz";

export class CustomQuizRequest extends BaseModal {
    typeQuiz: TypeQuiz;
    question: string;
    quizAnswers: QuizAnswerRequest[];
    imageQuestion?: File;
    constructor(id: number, typeQuiz: TypeQuiz, question: string, createdAt: Date, updatedAt: Date, createdBy: string, updatedBy: string, quizAnswers: QuizAnswerRequest[], imageQuestion?: File) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.typeQuiz = typeQuiz;
        this.question = question;
        this.imageQuestion = imageQuestion;
        this.quizAnswers = quizAnswers;
    }
}