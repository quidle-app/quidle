import {useEffect, useState} from "react";
import axios from "axios";

export type QuizData = {
    quiz_id: number,
    user_id: number,
    name: string
}

export function useFetchQuizzes() {
    const [data, setData] = useState<QuizData[]>([]);
    useEffect(() => {
        axios.get("/api/user/quiz/list").then(res => {
            setData(res.data.data);
        });
    }, []);

    return [data] as const;
}