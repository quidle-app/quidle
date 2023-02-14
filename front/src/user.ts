import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

type User = {
    loggedIn: boolean
    update: () => void
    username?: string
}

function wasLoggedIn() {
    return sessionStorage.getItem("loggedIn") == "1";
}

const defaultState: User = {
    loggedIn: wasLoggedIn(),
    update: () => {},
}

export const userStore = React.createContext<User>(defaultState);

function useAuth() {
    const [user, setUser] = useState<User>(defaultState);
    axios.defaults.withCredentials = true

    const update = useCallback(() => {
        axios.get("/api/user/status").then(res => {
            let loggedIn = false;
            let username = "";
            if (res.data.result == "success") {
                loggedIn = true;
                username = res.data.username;
                sessionStorage.setItem("loggedIn", "1");
            } else {
                sessionStorage.removeItem("loggedIn");
            }
            setUser(user => ({...user, loggedIn: loggedIn, username: username}));
        })
    }, []);

    useEffect(() => {
        setUser({...user, update: update});
        update();
    }, []);

    return [user] as const;
}

export default useAuth;