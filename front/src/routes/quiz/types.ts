import {QuestionData} from "./question/view";

export type QuizData = {
    quiz_id: number,
    user_id: number,
    name: string,
    questions: QuestionData[]
}
