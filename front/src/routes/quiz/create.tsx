import {FieldValues, useForm} from "react-hook-form";
import axios from "axios";
import {success} from "../success";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function CreateQuiz() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [id, setId] = useState(-1);

    useEffect(() => {
        if (id >= 0) {
            navigate(`/quiz/edit/${id}`);
        }
    }, [id]);

    async function handle(data: FieldValues) {
        const res = await axios.post("/api/user/quiz/create", {
            name: data["title"],
        })
        if (success(res)) {
            const id = res.data.message.id;
            setId(id);
        }
    }

    return (
        <div>
            <h2 className="title">Utwórz quiz</h2>
            <form onSubmit={handleSubmit(handle)}>
                <div>
                    <label>Nazwa quizu</label>
                    <input {...register("title", {required: true})}/>
                </div>
                <div>
                    <input type="submit" value="Dodaj"/>
                </div>
            </form>
        </div>
    )

}

export default CreateQuiz;
