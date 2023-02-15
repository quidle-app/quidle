import {FieldValues, useForm} from "react-hook-form";
import axios from "axios";
import {useContext} from "react";
import {userStore} from "../user";
import {useLoggedOut} from "../Hooks/auth";
import {success} from "./success";

function Register() {
    const user = useContext(userStore);
    const {register, handleSubmit} = useForm();
    useLoggedOut();

    async function handle(data: FieldValues) {
        const res = await axios.post("/api/auth/register", {
            login: data["login"],
            password: data["password"]
        })
        if (success(res)) {
            user.update();
        }
    }

    return (
        <div>
            <h2 className="title">Zarejestruj się</h2>
            <form onSubmit={handleSubmit(handle)}>
                <div>
                    <label>Login</label>
                    <input {...register("login", {required: true})}/>
                </div>
                <div>
                    <label>Hasło</label>
                    <input type="password" {...register("password", {required: true})}/>
                </div>
                <div>
                    <input type="submit" value="Utwórz konto"/>
                </div>
            </form>
        </div>
    )
}

export default Register;