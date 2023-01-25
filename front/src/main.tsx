import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/home'
import {HashRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout";
import Auth from "./routes/auth";

const App = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
            </Route>
        </Routes>
    </HashRouter>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
