import { useEffect, useState } from "react";

import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import { createChatBotMessage } from "react-chatbot-kit";

import ActionProvider from "./config/ActionProviders";
import MessageParser from "./config/MessageParser";
import inputValidator from "./config/validator";
import StartTestWidget from "./widgets/StartTestWidget";
import EndTestWidget from "./widgets/EndTestWidget";
import './ChatTestComponent.css'

export default function ChatTestComponent(props) {

    // State of the component
    let [chatbotConfig, setChatbotConfig]      = useState();
    let [chatting,setChatting]                 = useState(true);
    let [chatbotIsLoading,setChatbotIsLoading] = useState(true);
    let [userAnswers,setUserAnswers]           = useState([]);

    // Effect Hooks
    useEffect(initialChatbotConfig,[]) // Start the chatbot config after initial load of the component

    useEffect(()=>{  // Logic to implement if the test is finished (chatting=false)
        if (!chatting){
            userAnswers.forEach(
                ({text,responseTime})=>console.log(`texto: "${text}" delay: ${responseTime}`)
            )
        }
    },[chatting])

    // rendering of the component
    return (
        <section>
            <div className="chatBotContainerDiv">
                {
                    ( !chatbotIsLoading && chatting) ? 
                    <Chatbot
                        placeholderText='. . . . .'
                        headerText='acceXible chatbot'
                        config={chatbotConfig}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        validator={inputValidator}
                        setUserAnswers={setUserAnswers}
                        setChatting={setChatting}
                    /> :
                    <p>Chat bot loading</p>
                }
            </div>
        </section>
    )

    // UTILITY / FUNCTIONALITY FUNCTIONS

    // fetch the API for chatbot messages and use them for the
    //  initial configuration of the chatbot.
    function initialChatbotConfig() {
        fetch('/api/chatbot-messages')
            .then(response=>{
                if (response.ok) return response.json()
                throw response;
            })
            .then(response=>{
                // Configuration object of the chatbot
                let config = {
                    widgets:[
                        {
                            widgetName: 'start-test',
                            widgetFunc: (props) => <StartTestWidget {...props} />,
                            mapStateToProps: ['disableChatInput'],
                        },
                        {
                            widgetName: 'end-test',
                            widgetFunc: (props) => <EndTestWidget {...props} />,
                            props: {setChatting:setChatting}
                        },
                    ]
                };
                // Initial messages
                config.initialMessages = response
                    .filter(
                        item=>item.type==='greeting'
                    )
                    .map(
                        item=>createChatBotMessage( item.text, {widget:'start-test'} )
                    )
                // State of the chatbot
                let state = {
                    timeStamp : Date.now(),
                    questionIndex:0,
                    disableChatInput:true
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
                setChatbotConfig({...config});
                setChatbotIsLoading(false);
            })
            .catch(err=>{
                alert(`ERROR: code ${err.status}  (${err.statusText})`);
                console.log(err);
            })
    }
}