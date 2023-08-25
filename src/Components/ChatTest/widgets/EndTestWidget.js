import { createChatBotMessage } from "react-chatbot-kit";
import { useEffect } from "react/cjs/react.development";

export default function EndTestWidget(props) {

    // render a button that when clicked will close the chatbot
    return (
        <div>
            <button class="buttonTest" onClick={onClickEndButton}>
                Finalizar
            </button>
        </div>
    )

    // handle end button click
    function onClickEndButton() {
        props.setChatting(false)
    }

}