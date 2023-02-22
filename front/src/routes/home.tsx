import {useContext} from "react";
import {userStore} from "../user";
import {Link} from "react-router-dom";
import {useFetchQuizzes} from "../Hooks/fetchQuizzes";
import ListQuiz from "./quiz/list";

function Home() {
    const user = useContext(userStore);
    const [list] = useFetchQuizzes();

    if (!user.loggedIn) return (
        <div>
            <h2>Witaj</h2>
            <p>
                Taki quizlet i moodle w jednym... <b>ale gorsze!</b>
            </p>
        </div>
    );

    return (
        <div>
            <h2>Lista quizów</h2>
            <Link to="/quiz/create">Dodaj nowy</Link>
            <ListQuiz list={list}/>
        </div>
    )
}

export default Home
