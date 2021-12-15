import { createChatBotMessage } from "react-chatbot-kit";
import { useEffect } from "react/cjs/react.development";

export default function StartTestWidget(props) {

    // Right after this widget loads, disable the text input of the chat
    useEffect(()=>{
        document.querySelector('.react-chatbot-kit-chat-input').readOnly=props.disableChatInput
    },[])

    // render a button that when clicked will start the test
    return (
        <div>
            <button onClick={ props.disableChatInput ? onClickStartButton : null}>
                Empezar test
            </button>
        </div>
    )

    // handle start button click
    function onClickStartButton() {
        document.querySelector('.react-chatbot-kit-chat-input').readOnly=false;
        props.actionProvider.nextQuestion();
        props.setState(prevState=>{
            return {
                ...prevState,
                disableChatInput:false
            }
        })
    }

}