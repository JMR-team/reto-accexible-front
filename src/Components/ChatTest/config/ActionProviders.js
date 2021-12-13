class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage,currentState,createCustomMessage,rest) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.setShowChatBot = rest.setShowChatBot;
    this.state = currentState;
    this.addUserAnswer = rest.addUserAnswer;
  }

  ninini (message,timeDelay) {
    this.addUserAnswer({message,timeDelay})
    this.setState(prevState=>({
      ...prevState,
      messages:[...prevState.messages,this.createChatbotMessage('nininini')],
    }))
  }

}

export default ActionProvider;