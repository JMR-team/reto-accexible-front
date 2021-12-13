class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.timeStamp = Date.now();
  }

  parse(message) {
    let timeDelay = (Date.now()-this.timeStamp)/1000;
    this.actionProvider.ninini(message,timeDelay);
  }
  
}

export default MessageParser