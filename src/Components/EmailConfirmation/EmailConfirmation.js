import './EmailConfirmation.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';



function EmailConfirmation(props) {

    return (
        <>
            <p>El test ha sido realizado con éxito. Los resultados han sido enviados a su email. Pulse OK para continuar:</p>

            <Link to='/'>
                <button>
                    OK
                </button>
            </Link>


        </>
    )


}
export default EmailConfirmation