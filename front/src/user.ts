import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

type User = {
    loggedIn: boolean,
    update: () => void,
    username?: string,
    user_id: number
}

function wasLoggedIn() {
    return sessionStorage.getItem("loggedIn") == "1";
}

const defaultState: User = {
    loggedIn: wasLoggedIn(),
    update: () => {},
    user_id: -1
}

export const userStore = React.createContext<User>(defaultState);

function useAuth() {
    const [user, setUser] = useState<User>(defaultState);
    axios.defaults.withCredentials = true

    const update = useCallback(() => {
        axios.get("/api/user/status").then(res => {
            let loggedIn = false;
            let username = "";
            let user_id = 0;

            if (res.data.result == "success") {
                loggedIn = true;
                username = res.data.username;
                user_id = res.data.user_id;
                sessionStorage.setItem("loggedIn", "1");
            } else {
                sessionStorage.removeItem("loggedIn");
            }

            setUser(user => ({
                ...user,
                loggedIn: loggedIn,
                username: username,
                user_id: user_id
            }));
        })
    }, []);

    useEffect(() => {
        setUser({...user, update: update});
        update();
    }, []);

    return [user] as const;
}

export default useAuth;