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

  handleUserMessageWithTiming (message,timeDelay) {
    // If the index of the question array is bigger or equal to the length, deactivate the chat
    if (this.state.questionIndex >= this.state.questionsArray.length ){
      this.setState(prevState=>({
        ...prevState,
        messages:[
          ...prevState.messages,
          this.createChatbotMessage('Gracias por tu colaboración. A continuación te pediremos tu email para enviarte los resultados del test.')
        ],
      }))
      setTimeout( () => this.setChatting(false) , 2000 );
      
    } else {
      // Use the state hook for updating the list of user answers with its timing
      this.setUserAnswers((userAnswers)=>{
        return [...userAnswers,{message,timeDelay}]
      })
      // Use the chat state hook to print the following message and advance the question Index
      this.setState(prevState=>({
        ...prevState,
        messages:[
          ...prevState.messages,
          this.createChatbotMessage(this.state.questionsArray[this.state.questionIndex])
        ],
        questionIndex:this.state.questionIndex + 1
      }))
    }
  }

}

export default ActionProvider;