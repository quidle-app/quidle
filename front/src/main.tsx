import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/home'
import {HashRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout";
import Login from "./routes/login";
import useAuth, { userStore } from "./user";
import Profile from "./routes/profile";
import Logout from "./routes/logout";
import Register from "./routes/register";

function App() {
    const [user] = useAuth();

    return (
        <userStore.Provider value={user}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                    </Route>
                </Routes>
            </HashRouter>
        </userStore.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
