import {useContext} from "react";
import {userStore} from "../user";
import {useFetchQuizzes} from "../Hooks/fetchQuizzes";
import ListQuiz from "./quiz/list";
import LinkButton from "../Elems/linkButton";

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
            <LinkButton to="/quiz/create">Dodaj nowy</LinkButton>
            <ListQuiz list={list}/>
        </div>
    )
}

export default Home
