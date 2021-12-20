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
            <section className="formularioSection">
                <div className="formularioContainer">
                    <h2>Para recibir sus resultados por favor rellene los campos que aparecen a continuación:</h2>
                    <div className='formularioCampos'>
                        <input className='formularioInput' type="email" placeholder='Email' onChange={cambiarEmail} />

                    </div>
                    <br />
                    <div className='formularioCampos'>
                        <input className='formularioInput' type="text" placeholder='Nombre' onChange={cambiarFirstName} />

                    </div>
                <div className='formularioCampos'>
                    <button className='formularioButton' onClick={() => EnviarEmail()} >Enviar</button>
                    </div>
                </div>
            </section>
        </>
    )

    function EnviarEmail() {
        fetch(`/api/results`, {
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
