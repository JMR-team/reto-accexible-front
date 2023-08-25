import ChatTestComponent from "../../Components/ChatTest/ChatTestComponent";
import QuestionsComponent from "../../Components/Questions/QuestionsComponent";
import FormularioEnviarComponent from "../../Components/FormularioEnviar/FormularioEnviarComponent";
import EmailConfirmation from "../../Components/EmailConfirmation/EmailConfirmation";

import { useState, useEffect } from "react";

export default function Test(props) {

    // Store the results of the test and chatbot in a state variable
    let [results,setResults] = useState({
        testScore : 0,
        chatBotAnswers: [],
    });
    // State variable that controls what is going to be rendered
    let [actualPart,setActualPart] = useState('test');
    // State variable that controls if the test is still going on
    let [testFinished,setTestFinished] = useState(false);

    // Effects
    
    // Changes in the results
    useEffect(()=>{
        if (results.chatBotAnswers.length > 0 && results.testScore > 0) {
            setTestFinished(true);
        }
    },[results])

    // Change in the status of the test
    useEffect(()=>{
        if (testFinished) {
            // If the user is logged send the results directly
            if ( localStorage.getItem('token') !=null ) {
                sendResultsLoggedUser();
            } else { // If the user is not logged send to the send email form
                setActualPart('send-results')
            }
        }
    },[testFinished])
    
    
    // Object in which the keys are the names of the components to be rendered. The values are functions
    // which render the corresponding components and give them the props they need for work.
    let parts = {
        'test': () => <QuestionsComponent setActualPart={setActualPart} setResults={setResults} />,
        'chat': () => <ChatTestComponent  setActualPart={setActualPart} setResults={setResults} />,
        'send-results': () => <FormularioEnviarComponent setActualPart={setActualPart} results={results} />,
        'confirm-results-send':()=> <EmailConfirmation />,
    }

    // Variable that controls if the user is logged or not
    let token = localStorage.getItem('token');

    // Render everything
    return(
        <>
            {parts[actualPart]()}
        </>
    )


    // Functions

    // Function to send the results to the API if the user is logged
    function sendResultsLoggedUser() {
        fetch(REACT_APP_API_URL+`/api/results`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                testScore: results.testScore,
                chatBotAnswers: results.chatBotAnswers,
            }),
        }).then(response => {
            if ( !response.ok ) throw response // response has an error status
            setActualPart("confirm-results-send"); // Move to the next part of the test
        }).catch( response => {
            response.json().then(console.log);
        })
    }
}
