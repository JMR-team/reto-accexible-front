import './EmailConfirmation.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';



function EmailConfirmation(props) {

    return (
        <>
        <div className="emailConfirmationSection">
            <div className="emailConfirmationContainer">
                <div className="emailContainer">
                    <p>El test ha sido realizado con éxito. <br/>Los resultados han sido enviados a su email.<br/> Pulse OK para continuar:</p>
                    <Link to='/'>
                        <button className="buttonConfirmation">
                            OK
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )


}
export default EmailConfirmation