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
      pauseFlag: true,
      nonStarted: true,
      endend: false,
      highlightItem: 'codingTurnTime'
    }
    this.initialState = {...this.state};
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
    this.setState({codingBreakTime: this.props.codingBreakTime});
  }

  incrementQueueTurn = () => {
    let queueTurn = this.state.queueTurn
    this.setState({queueTurn: queueTurn + 1});
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
      this.setState({highlightItem: 'codingTurnTime'})
      return this.decrementer();
    }
    else if (codingBreakTime > 0) {
      this.decrementCodingBreakTime();
      this.setState({highlightItem: 'codingBreakTime'})
      return this.decrementer();
    }
    else {
      this.setState({highlightItem: 'codingTurnTime'})
      this.newCodingTurn();
      return this.decrementer();
    }
  }
  
  checkQueueTurn = () => {
    let queueLength = this.state.queueLength;
    let queueCounter = this.state.queueCounter;
    
    
    if (queueCounter === queueLength) {
      // stops previous decrementer since it will call a new
      clearTimeout(this.state.timeoutPromise);
      this.newQueueTurn();
      return this.decrementer();
    }
  }

  checkEnd = () => {
    let queueTurn = this.state.queueTurn;
    let totalSessions = this.state.totalSessions;
    
    
    if (queueTurn === totalSessions) {
      // stops previous decrementer since it will call a new
      clearTimeout(this.state.timeoutPromise);
      this.setState({endend: true});
    }
  }
  
  handleStartTimer = (e) => {
    e.preventDefault();
    this.decrementer();
  }
  
  handlePausePlayClock = async (e) => {
    e.preventDefault();
    let pauseFlag = this.state.pauseFlag;
    await this.setState(
      {pauseFlag: !pauseFlag, nonStarted: false}
    );
    if (pauseFlag) ; this.decrementer();
  }

  handleReset = async (e) => {
    e.preventDefault();
    await clearTimeout(this.state.timeoutPromise);
    await this.setState({...this.initialState});
    return;
  }

  workflow = async () => {
    await this.checkCodingTurn();
    await this.checkQueueTurn();
    await this.checkEnd();
  }

  decrementer = () => {
    let pauseFlag = this.state.pauseFlag;
    let timeoutPromise;

    if (pauseFlag && this.state.timeoutPromise) {
      clearTimeout(this.state.timeoutPromise);
      return ;
    } else {
      timeoutPromise = setTimeout(() => {
        this.workflow();
      }, 1000);
      this.setState(
        {timeoutPromise: timeoutPromise}
      );
    }
  }

  toMmSs = (toConvertNumber) => {
    let minutes = Math.floor(toConvertNumber/60).toString();
    let seconds = (toConvertNumber%60).toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    if (seconds.length === 1) {
      seconds = '0' + seconds
    }
    return `${minutes}:${seconds}`
  }

  render() {
    return (
      <div className="container my-2">
        <div className="row my-2">
          <div className="col-md-4">
            <div className="card" style={this.state.highlightItem === 'codingTurnTime' ? {backgroundColor: 'orange'} : {}}>
              <h3 className="card-header text-center">Codar!</h3>
              <h3 className="card-body card-text text-center">{this.toMmSs(this.state.codingTurnTime)}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={this.state.highlightItem === 'codingBreakTime' ? {backgroundColor: 'orange'} : {}}>
              <h3 className="card-header text-center">Descanso</h3>
              <h3 className="card-body card-text text-center">{this.toMmSs(this.state.codingBreakTime)}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={
              this.state.endend ?
              {backgroundColor: 'red', color:'white'} :
              {}
            }>
              <h3 className="card-header text-center">Rodada</h3>
              <h3 className="card-body card-text text-center">{`${this.state.queueTurn}`}</h3>
            </div>
          </div>
        </div>

        {
          this.state.endend ?
          <div className="row d-flex justify-content-center" style={{color: "pink"}}><h3>Partida finalizada!</h3></div> :
          ""         
        }

        <div className="row d-flex justify-content-center">
          <button className="btn btn-primary mr-2" onClick={this.handlePausePlayClock}>{
            this.state.pauseFlag ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>
          }</button>
          {
            !this.state.nonStarted ?
            <button className="btn btn-warning ml-2" onClick={this.handleReset}>
              <i className="fas fa-undo"></i> Reiniciar
            </button> :
            ""
          }
        </div>
      </div>
    );
  }
}
