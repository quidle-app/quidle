import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {QuizData} from "../../Hooks/fetchQuizzes";
import {FieldValues, useForm} from "react-hook-form";
import {useLoggedIn} from "../../Hooks/auth";
import styled from "styled-components";
import {For} from "../../Elems/generics";

function EditQuiz() {
    const {id} = useParams();
    const [data, setData] = useState<QuizData|null>(null);
    const [showAdd, setShowAdd] = useState(false);
    useLoggedIn();

    useEffect(() => {
        axios.get(`/api/user/quiz/${id}`).then(data => {
            setData(data.data.data);
        })
    }, [id]);

    const showAddQuestion = () => setShowAdd(true);
    const hideAddQuestion = () => setShowAdd(false);

    return (
        <div style={{textAlign: "center"}}>
            <h2 className="title">{data?.name}</h2>
            <button onClick={showAddQuestion}>Nowe pytanie</button>
            <br/>
            {showAdd && (
                <AddQuestion quiz_id={id} callback={hideAddQuestion}/>
            )}
        </div>
    )
}

type AddQuestionProps = {
    quiz_id: string | undefined
    callback: () => void
}

function AddQuestion({quiz_id, callback}: AddQuestionProps) {
    const {register, handleSubmit} = useForm();
    const [answers, setAnswers] = useState<number[]>([]);

    async function handle(data: FieldValues) {
        let content = "";
        const keys = Object.keys(data);
        const length = Math.ceil((keys.length - 1) / 2);

        const answers = Array.apply(null, Array(length)).map(() => ({
            content: "",
            correct: false
        }));

        for (let key of keys) {
            if (key == "title") {
                content = data[key];
                continue;
            }
            const split = key.split('-');
            const id = parseInt(split[1]) - 1;

            switch (split[0]) {
                case "answer":
                    answers[id].content = data[key];
                    break;
                case "correct":
                    answers[id].correct = data[key];
                    break;
            }
        }

        const res = await axios.put(`/api/user/quiz/${quiz_id}/question`, {
            quiz_id: parseInt(quiz_id ?? ""),
            content: content,
            answers: answers
        });

        callback();

        console.log(res.data);
    }

    function addAnswer() {
        setAnswers(ans => [...ans, (ans.at(-1)??0)+1]);
    }

    return (
        <Form onSubmit={handleSubmit(handle)}>
            <div>
                <label>Pytanie</label>
                <input {...register("title", {required: true})} autoFocus={true}/>
            </div>
            <For each={answers}>{(id) => (
                <div key={id}>
                    <span>
                        <label>Odpowiedź {id}</label>
                        <input {...register(`correct-${id}`)} type="checkbox"/>
                    </span>
                    <input {...register(`answer-${id}`)}/>
                </div>
            )}</For>
            <div>
                <button type="button" onClick={addAnswer}>Dodaj odpowiedź</button>
            </div>
            <div>
                <input type="submit" value="Wyślij"/>
            </div>
        </Form>
    )
}

const Form = styled.form`
  margin-top: 15px;
  text-align: left;
`;

export default EditQuiz;