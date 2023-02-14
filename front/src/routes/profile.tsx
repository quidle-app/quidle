import {useContext} from 'react'
import {userStore} from "../user";
import {useLoggedIn} from "../Hooks/auth";

function Profile() {
    const user = useContext(userStore);
    useLoggedIn();

    return (
        <div>
            <h2>Witaj, {user.username}</h2>
            <p> Twoje quizy: <i>nic tu nie ma</i></p>
        </div>
    )
}

export default Profile
