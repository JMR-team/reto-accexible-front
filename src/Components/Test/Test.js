import ChatTestComponent from "../ChatTest/ChatTestComponent";
import QuestionsComponent from "../Questions/QuestionsComponent";
import FormularioEnviarComponent from "../FormularioEnviar/FormularioEnviarComponent";

import { useEffect, useState } from "react";

export default function Test(props) {

    let [results,setResults] = useState({
        testScore : 0,
        chatBotAnswers: [],
    })

    let [actualPart,setActualPart] = useState('test')
    
    let [parts,setParts] = useState({
        'test': <QuestionsComponent setActualPart={setActualPart} setResults={setResults} />,
        'chat': <ChatTestComponent  setActualPart={setActualPart} setResults={setResults} />,
        'send-results': <FormularioEnviarComponent results={results} />
    })

    useEffect(()=>{
        console.log(results);
    },[results])

    return(
        <>
            {parts[actualPart]}
        </>
    )
}
