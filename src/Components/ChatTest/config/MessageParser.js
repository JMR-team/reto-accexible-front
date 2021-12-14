class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.timeStamp = Date.now();
  }

  parse(message) {
    // Do nothing if the index of the question array is bigger or equal to the length
    if (this.state.questionIndex > this.state.questionsArray.length ) return

    // If the message is not long enough, ask the user for more input
    if ( message.match(/\S+\s*/g).length<=10 ){
      this.actionProvider.handleShortMessage()
      return
    }

    // Valid message, send it to the action provider that will render the next question
    // and add the answer to the parent component state.
    let timeDelay = (Date.now()-this.timeStamp)/1000;
    this.actionProvider.handleUserMessageWithTiming(message,timeDelay);
  }
  
}

export default MessageParser