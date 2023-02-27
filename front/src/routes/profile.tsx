import {useContext} from 'react'
import {userStore} from "../user";
import {useLoggedIn} from "../Hooks/auth";
import {useFetchQuizzes} from "../Hooks/fetchQuizzes";
import ListQuiz from "./quiz/list";
import LinkButton from "../Elems/linkButton";

function Profile() {
    const user = useContext(userStore);
    useLoggedIn();
    const [list] = useFetchQuizzes(user.user_id);

    return (
        <div>
            <h2>Witaj, {user.username}</h2>
            <LinkButton to="/quiz/create">Dodaj nowy</LinkButton>
            <span>Twoje quizy:</span>
            <ListQuiz list={list}/>
        </div>
    )
}

export default Profile
