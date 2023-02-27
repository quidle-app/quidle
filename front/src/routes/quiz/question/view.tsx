import {For} from "../../../Elems/generics";
import styled from "styled-components";
import {ReactNode} from "react";
import {Card} from "./style";

type AnswerData = {
    answer_id: number,
    answer: string,
    correct: boolean
}

export type QuestionData = {
    question_id: number,
    content: string,
    answers: AnswerData[]
}

type Props = {
    questions: QuestionData[] | undefined
}

function QuestionView({questions}: Props) {
    if (!questions) {
        return null;
    }

    return (
        <Container>
            <For each={questions}>{(question, index) => (
                <Card key={question.question_id}>
                    <div className="question">
                        <h4>{(index ?? 0) + 1}. {question.content}</h4>
                    </div>

                    <ul>
                        <For each={question.answers}>{answer => (
                            <li key={answer.answer_id} className={answer.correct ? "correct" : ""}>
                                {answer.answer}
                            </li>
                        )}</For>
                    </ul>
                </Card>
            )}</For>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

export default QuestionView;