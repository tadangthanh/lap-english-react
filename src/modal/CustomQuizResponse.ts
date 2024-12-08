import { QuizAnswerResponse } from "./QuizAnswerResponse";
import { TypeQuiz } from "./TypeQuiz";

export class CustomQuizResponse {
    id: number;
    typeQuiz: TypeQuiz;
    question: string;
    imageQuestion: string;
    quizAnswers: QuizAnswerResponse[];

    constructor(
        id: number,
        typeQuiz: TypeQuiz,
        question: string,
        imageQuestion: string,
        quizAnswers: QuizAnswerResponse[]
    ) {
        this.id = id;
        this.typeQuiz = typeQuiz;
        this.question = question;
        this.imageQuestion = imageQuestion;
        this.quizAnswers = quizAnswers;
    }

}