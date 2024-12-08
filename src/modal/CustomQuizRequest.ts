import { BaseModal } from "./BaseModal";
import { QuizAnswerRequest } from "./QuizAnswerRequest";
import { TypeQuiz } from "./TypeQuiz";

export class CustomQuizRequest extends BaseModal {
    typeQuiz: TypeQuiz;
    question: string;
    exerciseGrammarId: number;
    quizAnswers: QuizAnswerRequest[];
    imageQuestion?: File;



    constructor(id: number, typeQuiz: TypeQuiz, question: string, exerciseGrammarId: number, createdAt: Date, updatedAt: Date, createdBy: string, updatedBy: string, quizAnswers: QuizAnswerRequest[], imageQuestion?: File) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.typeQuiz = typeQuiz;
        this.question = question;
        this.exerciseGrammarId = exerciseGrammarId;
        this.imageQuestion = imageQuestion;
        this.quizAnswers = quizAnswers;
    }
}