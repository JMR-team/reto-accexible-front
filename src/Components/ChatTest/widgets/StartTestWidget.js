import { useEffect } from "react";

export default function StartTestWidget(props) {
  // Right after this widget loads, disable the text input of the chat
  useEffect(() => {
    document.querySelector(".react-chatbot-kit-chat-input").readOnly =
      props.disableChatInput;
  }, []);

  // render a button that when clicked will start the test
  return (
    <div className="containerButton">
      <button
        class="buttonTest"
        onClick={props.disableChatInput ? onClickStartButton : null}
      >
        Iniciar Test
      </button>
    </div>
  );

  // handle start button click
  function onClickStartButton() {
    document.querySelector(".react-chatbot-kit-chat-input").readOnly = false;
    props.actionProvider.nextQuestion();
    props.setState((prevState) => {
      return {
        ...prevState,
        disableChatInput: false,
      };
    });
  }
}
