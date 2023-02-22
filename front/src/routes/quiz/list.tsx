import {QuizData} from "../../Hooks/fetchQuizzes";
import {Link} from "react-router-dom";

type Props = {
    list: QuizData[]
}

function ListQuiz({list}: Props) {
    return (
        <div>
            {list.map(data => (
                <Item key={data.quiz_id} data={data}/>
            ))}
        </div>
    )
}

type ItemProps = {
    data: QuizData
}

function Item({data}: ItemProps)  {
    return (
        <div>
            <Link to={`/quiz/edit/${data.quiz_id}`}>{data.name}</Link>
        </div>
    )
}

export default ListQuiz;