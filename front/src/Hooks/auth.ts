import {useContext, useEffect} from "react";
import {userStore} from "../user";
import {useNavigate} from "react-router-dom";

export function useLoggedIn() {
    const user = useContext(userStore);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            return navigate("/login");
        }
    }, [user]);
}

export function useLoggedOut() {
    const user = useContext(userStore);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.loggedIn) {
            return navigate("/profile");
        }
    }, [user]);
}
