import {useContext} from "react";
import {userStore} from "../user";
import {Link} from "react-router-dom";

function Home() {
    const user = useContext(userStore);

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
        </div>
    )
}

export default Home
