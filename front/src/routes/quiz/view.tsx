import {useParams} from "react-router";
import {useLoggedIn} from "../../Hooks/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import {QuizData} from "./types";
import QuestionView from "./question/view";

function ViewQuiz() {
    const {id} = useParams();
    const [data, setData] = useState<QuizData|null>(null);
    useLoggedIn();

    useEffect(fetchData, [id]);

    function fetchData() {
        axios.get(`/api/user/quiz/${id}`).then(data => {
            setData(data.data.data as QuizData);
        });
    }

    return (
        <div>
            <h2 className="title">{data?.name}</h2>
            <br/>
            <QuestionView questions={data?.questions}/>
        </div>
    )
}

export default ViewQuiz;
