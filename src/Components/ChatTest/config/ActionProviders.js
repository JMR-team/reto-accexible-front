class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage,currentState,createCustomMessage,rest) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.setShowChatBot      = rest.setShowChatBot;
    this.state               = currentState;
    this.setUserAnswers      = rest.setUserAnswers;
    this.setChatting         = rest.setChatting;
  }

  // Handle a message that is not long enough
  handleShortMessage () {
    const infoMessages = [
      'Para que los resultados del test sean fiables necesito respuestas más largas.',
      'Las respuestas tienen que ser más largas.',
      'Necesito que escribas mensajes más largos.'
    ]
    let info = infoMessages[parseInt(Math.random()*infoMessages.length)];
    // send a chatbot message asking the use for more input.
    this.setState(prevState =>{
      return {
        ...prevState,
        messages: [
          ...prevState.messages,
          this.createChatbotMessage( info )
        ]
      }
    })
  }

  // Handle the input of a valid message
  handleUserMessageWithTiming (message,responseTime) {
    // Use the state hook for updating the list of user answers with its timing
    this.setUserAnswers((userAnswers)=>{
      return [...userAnswers,{text:message,responseTime:responseTime}]
    })
    
    if (this.state.questionIndex<=this.state.questionsArray.length-1){
      this.nextQuestion()
    } else {
      this.handleEndOfChat()
    }
  }

  // Handle the end of chat
  handleEndOfChat() {
    // Right after the questions end, disable the text input of the chat
    document.querySelector('.react-chatbot-kit-chat-input').readOnly=true
    this.setState(prevState=>({
      ...prevState,
      messages:[
        ...prevState.messages,
        this.createChatbotMessage('Gracias. Pulsa el botón para finalizar.',{widget:'end-test'})
      ],
    }))
  }

  // Use the chat state hook to print the following message and advance the question Index
  nextQuestion(){
    this.setState(
      prevState=>{
        return {
          ...prevState,
          messages:[
            ...prevState.messages,
            this.createChatbotMessage(this.state.questionsArray[this.state.questionIndex])
          ],
          questionIndex:this.state.questionIndex + 1
        }
      }
    )
  }

}

export default ActionProvider;