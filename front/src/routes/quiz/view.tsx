import {useParams} from "react-router";

function ViewQuiz() {
    const {id} = useParams();

    return (
        <p>id quizu: {id}</p>
    )
}

export default ViewQuiz;
