import {QuizInfo} from "../../Hooks/fetchQuizzes";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {userStore} from "../../user";

type Props = {
    list: QuizInfo[]
}

function ListQuiz({list}: Props) {
    return (
        <div>
            {list.map(data => (
                <Item key={data.quiz_id} quiz={data}/>
            ))}
        </div>
    )
}

type ItemProps = {
    quiz: QuizInfo
}

function Item({quiz}: ItemProps)  {
    const user = useContext(userStore);

    let link = `/quiz/${quiz.quiz_id}`;

    if (quiz.user_id == user.user_id) {
        link = `/quiz/edit/${quiz.quiz_id}`;
    }

    return (
        <div>
            <Link to={link}>{quiz.name}</Link>
        </div>
    )
}

export default ListQuiz;