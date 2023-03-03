import {useLoggedIn} from "../Hooks/auth";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {userStore} from "../user";

function Logout() {
    const user = useContext(userStore);
    const navigate = useNavigate();
    useLoggedIn();

    useEffect(() => {
        axios.post("/api/auth/logout").then(() => {
            sessionStorage.removeItem("loggedIn");
            user.update();
            navigate("/");
        });
    }, []);

    return null;
}

export default Logout;
