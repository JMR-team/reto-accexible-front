import ChatTestComponent from "../ChatTest/ChatTestComponent";
import QuestionsComponent from "../Questions/QuestionsComponent";
import FormularioEnviarComponent from "../FormularioEnviar/FormularioEnviarComponent";

import { useState } from "react";

export default function Test(props) {

    // Store the results of the test and chatbot in a state variable
    let [results,setResults] = useState({
        testScore : 0,
        chatBotAnswers: [],
    })
    // State variable that controls what is going to be rendered
    let [actualPart,setActualPart] = useState('test')
    
    // Object in which the keys are the names of the components to be rendered. The values are functions
    // which render the corresponding components and give them the props they need for work.
    let parts = {
        'test': () => <QuestionsComponent setActualPart={setActualPart} setResults={setResults} />,
        'chat': () => <ChatTestComponent  setActualPart={setActualPart} setResults={setResults} />,
        'send-results': () => <FormularioEnviarComponent results={results} />
    }

    // Render everything
    return(
        <>
            {parts[actualPart]()}
        </>
    )
}
