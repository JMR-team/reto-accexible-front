import './FormularioEnviarComponent.css';
import { useState } from 'react';

function FormularioEnviarComponent(props) {

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");


    function cambiarFirstName(event) {
        setFirstName(event.target.value)
    }

    function cambiarEmail(event) {
        setEmail(event.target.value)
    }



    return (
        <>
            <div>
                <input type="email" placeholder='Email' onChange={cambiarEmail} />
                <br />
                <input type="text" placeholder='Nombre' onChange={cambiarFirstName} />
                <button onClick={() => EnviarEmail()} >Enviar</button>
            </div>
        </>
    )

    function EnviarEmail() {
        fetch(`http://localhost:9000/api/results`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                testScore: props.results.testScore,
                chatBotAnswers: props.results.chatBotAnswers,
                firstName: firstName,
                email: email
            })
        })
    }



}

export default FormularioEnviarComponent;
