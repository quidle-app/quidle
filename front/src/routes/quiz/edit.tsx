import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {QuizData} from "../../Hooks/fetchQuizzes";

function EditQuiz() {
    const {id} = useParams();
    const [data, setData] = useState<QuizData|null>(null);

    useEffect(() => {
        axios.get(`/api/user/quiz/${id}`).then(data => {
            setData(data.data.data);
        })
    }, [id]);

    return (
        <div>{data?.name}</div>
    )
}

export default EditQuiz;