import {useEffect, useState} from "react";
import axios from "axios";

export type QuizInfo = {
    quiz_id: number,
    user_id: number,
    name: string
}

export function useFetchQuizzes(user_id?: number) {
    const [data, setData] = useState<QuizInfo[]>([]);
    useEffect(() => {
        axios.get("/api/user/quiz/list").then(res => {
            if (res.data.result != "success") {
                setData([]);
                return;
            }

            let data = res.data.data;

            if (user_id) {
                data = data.filter((quiz: QuizInfo) => quiz.user_id == user_id);
            }

            setData(data);
        });
    }, []);

    return [data] as const;
}
