import {useParams} from "react-router";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useLoggedIn} from "../../Hooks/auth";
import AddQuestion from "./question/add";
import QuestionView from "./question/view";
import {QuizData} from "./types";
import {Show} from "../../Elems/generics";

function EditQuiz() {
    const {id} = useParams();
    const [data, setData] = useState<QuizData|null>(null);
    const [showAdd, setShowAdd] = useState(false);
    useLoggedIn();

    useEffect(fetchData, [id]);

    function fetchData() {
        axios.get(`/api/user/quiz/${id}`).then(data => {
            setData(data.data.data as QuizData);
        });
    }

    const showAddQuestion = () => setShowAdd(true);

    const handleSend = () => {
        setShowAdd(false);
        fetchData();
    }

    const questions = useMemo(() => (
        <QuestionView questions={data?.questions}/>
    ), [data]);

    return (
        <div className="flex-col">
            <h2 className="title">{data?.name}</h2>
            <button onClick={showAddQuestion}>Nowe pytanie</button>
            <br/>
            <Show when={showAdd}>
                <AddQuestion quiz_id={id} callback={handleSend}/>
            </Show>
            {questions}
        </div>
    )
}


export default EditQuiz;
