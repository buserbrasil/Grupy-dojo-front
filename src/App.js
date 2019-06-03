import React from "react";
import "./App.css";

import Clock from "./Components/Clock/index.js"
import Form from "./Components/Form/index.js"
import Field from "./Components/Queue/field.js"
import Queue from "./Components/Queue/queue.js"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codingSeconds: '30',
      breakSeconds: '10',
      numberOfTurns: '1',
      queueInput: '',
      queue: [],
      formDone: false,
    }
  }

  handleCodingSecondsChange = (e) => {
    this.setState({codingSeconds: e.target.value});
  }

  handleBreakSecondsChange = (e) => {
    this.setState({breakSeconds: e.target.value});
  }

  handleNumberOfTurns = (e) => {
    this.setState({numberOfTurns: e.target.value});
  }

  handleQueueInput = (e) => {
    if (e.key === 'Enter') {
      this.handleQueueSubmit(e);
      return;
    }
    this.setState({queueInput: e.target.value});
  }

  handleQueueSubmit = (e) => {
    e.preventDefault();
    let newQueue = [...this.state.queue];
    if (this.state.queueInput !== "") {
      newQueue.push(this.state.queueInput);
    }
    this.setState({queue: newQueue, queueInput: ''});
  }

  handleQueueShift = () => {
    let actualQueue = [...this.state.queue];
    let actualFirst = actualQueue.shift();
    actualQueue.push(actualFirst);
  }

  getFormData = (e) => {
    e.preventDefault();
    this.setState({'formDone': true});
  }

  handleDeleteQueueItem = (i) => {
    let queue = [...this.state.queue];
    queue.splice(i, 1);
    this.setState({'queue': queue});
  }

  renderForm = () => {
    return <Form 
            codingSeconds={this.state.codingSeconds}
            breakSeconds={this.state.breakSeconds}
            numberOfTurns={this.state.numberOfTurns}
            handleCodingSecondsChange={this.handleCodingSecondsChange}
            handleBreakSecondsChange={this.handleBreakSecondsChange}
            handleNumberOfTurns={this.handleNumberOfTurns}
            getFormData={this.getFormData}
          />
  }

  renderClock = () => {
    return <Clock 
            totalSessions={parseInt(this.state.numberOfTurns)}  
            codingTurnTime={parseInt(this.state.codingSeconds)}
            codingBreakTime={parseInt(this.state.breakSeconds)}
            queueLength={5}
          />;
  }

  render() {
    return (
      <div className="container d-flex align-items-center justify-content-center" style={{height: '100%'}}>
        <div className="row w-100">
          <div className="col-6">
            {
              this.state.formDone ?
              this.renderClock() :
              this.renderForm()
            }
          </div>
          <div className="col-6 p-3 bg-warning d-flex flex-column align-items-center">
            <h3 className="text-center">
              Fila
            </h3>
            <Field 
              handleQueueInput={this.handleQueueInput}
              handleQueueSubmit={this.handleQueueSubmit}
              queueInput={this.state.queueInput}
              />
            <Queue 
              queue={this.state.queue}
              handleDeleteQueueItem={this.handleDeleteQueueItem}
            />
          </div>
        </div>   
      </div>
    )
  }
}



export default App;
