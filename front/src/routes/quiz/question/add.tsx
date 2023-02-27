import styled from "styled-components";
import {FieldValues, useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {For} from "../../../Elems/generics";
import {success} from "../../success";
import {Card} from "./style";
import {faFloppyDisk, faPlus} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../Elems/iconButton";

type Props = {
    quiz_id: string | undefined,
    callback: () => void
}

function AddQuestion({quiz_id, callback}: Props) {
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

        const res = await axios.post(`/api/user/quiz/${quiz_id}/question`, {
            quiz_id: parseInt(quiz_id ?? ""),
            content: content,
            answers: answers
        });

        callback();
        success(res);
    }

    function addAnswer() {
        setAnswers(ans => [...ans, (ans.at(-1) ?? 0) + 1]);
    }

    return (
        <Card>
            <Form onSubmit={handleSubmit(handle)} className="flex-col">
                <div className="question">
                    <label>Pytanie</label>
                    <input {...register("title", {required: true})} autoFocus={true}/>
                </div>

                <For each={answers}>{(id) => (
                    <div key={id} className="answer">
                        <span>
                            <label>Odpowiedź {id}</label>
                            <input {...register(`correct-${id}`)} type="checkbox"/>
                        </span>
                        <input {...register(`answer-${id}`)}/>
                    </div>
                )}</For>

                <div className="flex-row">
                    <IconButton icon={faPlus} type="button" onClick={addAnswer}/>
                    <IconButton icon={faFloppyDisk}/>
                </div>
            </Form>
        </Card>
    )
}

const Form = styled.form`
  width: 100%;
  background-color: transparent;
  padding: 0;

  .question, .answer {
    width: 100%;
    box-sizing: border-box;
  }
  
  .answer {
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
    
    span {
      margin-bottom: 5px;
    }
  }
`;

export default AddQuestion;
