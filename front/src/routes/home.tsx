import {useEffect, useState} from 'react'
import axios from 'axios';

function Home() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios("http://localhost:3333/api/hello").then(r => {
            setMessage(r.data.message);
        })
    }, []);

    return (
        <div className="App">
            {message}
        </div>
    )
}

export default Home
