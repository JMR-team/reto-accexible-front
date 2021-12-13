import { useEffect, useState } from "react";

import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./config/ActionProviders";
import MessageParser from "./config/MessageParser";

export default function ChatTestComponent(props) {

    // State of the component
    let [chatbotConfig, setChatbotConfig] = useState();
    let [userAnswers,setUserAnswers] = useState([]);

    // Effect Hooks
    useEffect(initialChatbotConfig,[])
    useEffect(()=>console.log('respuestas',userAnswers),[userAnswers]);
    // useEffect(()=>{console.log(chatbotConfig)},[chatbotConfig]);

    return (
        <>
            <h1>holi</h1>
            {
                chatbotConfig !=undefined ? 
                <Chatbot
                    placeholderText='.......'
                    config={chatbotConfig}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    addUserAnswer={addUserAnswer}
                /> :
                <h1>Conversacion finalizada</h1>
            }
        </>
    )

    function addUserAnswer(newAnswer){
        setUserAnswers([...userAnswers,newAnswer])
    }

    function initialChatbotConfig() {
        fetch('/api/chatbot-messages')
            .then(response=>{
                if (response.ok) return response.json()
                throw response;
            })
            .then(response=>{
                // Configuration object of the chatbot
                let config = {};
                // Initial messages
                config.initialMessages = response
                    .filter(
                        item=>item.type==='greeting'
                    )
                    .map(
                        item=>createChatBotMessage( item.text )
                    )
                // State of the chatbot
                let state = {
                    timeStamp : Date.now(),
                    questionIndex:0
                }
                state.questionsArray = response
                    .filter(
                        item=>item.type==='question'
                    )
                    .map(
                        item=>item.text 
                    )
                config.state = state;
                // Update the component state
                setChatbotConfig({...config})
            })
            .catch(err=>{
                alert('error');
                console.log(err);
            })
    }
}