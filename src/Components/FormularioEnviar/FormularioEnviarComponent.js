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
        <section className="formSection">
            <div className="formContainer">
            <h2>Recibe tus Resultados Por Email</h2>
                <div className="loginForm">
                    <input className="loginInput" type="email" placeholder='Email' onChange={cambiarEmail} />
                    <br />
                </div>
                <div className="loginForm">
                    <input className="loginInput" type="text" placeholder='Nombre' onChange={cambiarFirstName} />
                </div>
                <div className="loginForm">
                    <button className="loginButton" onClick={() => EnviarEmail()} >Enviar</button>
                </div>
            </div>
        </section>
        </>
    )

    function EnviarEmail() {
        fetch(process.env.REACT_APP_API_URL+`/api/results`, {
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
            .then(response => {
                if (!response.ok) throw response
                props.setActualPart("confirm-results-send");
            })
    }



}

export default FormularioEnviarComponent;
