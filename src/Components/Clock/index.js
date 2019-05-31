import React, { Component } from "react";

export default class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      /* time order
       session : total session number of queue turns
       queueTurn  : actual queue turn
       codingTurn : time to code
       codingBreak : time to switch pilot 
       queue length : the queue total length
       queue counter : used as condition to change queueTurn*/
      totalSessions: this.props.totalSessions,
      queueTurn: 0,
      codingTurnTime: this.props.codingTurnTime,
      codingBreakTime: this.props.codingBreakTime,
      queueLength: this.props.queueLength,
      queueCounter: 0,
      pauseFlag: false
    }
  }

  decrementCodingTurnTime = () => {
    let codingTurnTime = this.state.codingTurnTime;
    this.setState({codingTurnTime: codingTurnTime - 1});
  }

  resetCodingTurnTime = () => {
    this.setState({codingTurnTime: this.props.codingTurnTime});
  }

  decrementCodingBreakTime = () => {
    let codingBreakTime = this.state.codingBreakTime;
    this.setState({codingBreakTime: codingBreakTime - 1});
  }

  resetCodingBreakTime = () => {
    this.setState({codingTurnTime: this.props.codingTurnTime});
  }

  incrementQueueTurn = () => {
    let queueTurn = this.state.queueTurn
    this.setState({queueTurn: queueTurn + 1});
  }

  pausePlayClock = () => {
    let pauseFlag = this.state.pauseFlag;
    this.setState({pauseFlag: !pauseFlag});
  }

  incrementQueueCounter = () => {
    let queueCounter = this.state.queueCounter;
    this.setState({queueCounter: queueCounter + 1});
  }

  resetQueueCounter = () => {
    this.setState({queueCounter: 0});
  }

  newCodingTurn = () => {
    this.resetCodingTurnTime();
    this.resetCodingBreakTime();
    this.incrementQueueCounter();
  }

  newQueueTurn = () => {
    this.resetQueueCounter();
    this.incrementQueueTurn();
  }

  checkCodingTurn = () => {    
    let codingTurnTime = this.state.codingTurnTime;
    let codingBreakTime = this.state.codingBreakTime;

    if (codingTurnTime > 0) {
      this.decrementCodingTurnTime();
      return this.decrementer();
    }
    else if (codingBreakTime > 0) {
      this.decrementCodingBreakTime();
      return this.decrementer();
    }
    else {
      this.newCodingTurn();
      return this.decrementer();
    }
  }

  checkQueueTurn = () => {
    let queueLength = this.state.queueLength;
    let queueCounter = this.state.queueCounter;
  
    if (queueCounter == queueLength) {
      this.newQueueTurn();
      return this.decrementer();
    }
  }

  checkEnd = () => {
    let queueTurn = this.state.queueTurn;
  
    if (queueTurn == totalSessions) {
      return this.decrementer();
    }
  }

  workflow = () => {
    this.checkCodingTurn();
    this.checkQueueTurn();
    this.checkEnd();
  }

  decrementer = () => {
    setTimeout(() => {
      workflow();
    }, 1000)
  }
  

  render() {
    return <div />;
  }
}
