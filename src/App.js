import React from "react";
import "./App.css";

import Clock from "./Components/Clock/index.js"
import Form from "./Components/Form/index.js"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codingSeconds: '30',
      breakSeconds: '10',
      numberOfTurns: '1',
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

  getFormData = (e) => {
    e.preventDefault();
    this.setState({'formDone': true})
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
      <div style={{height: '100%'}}>        
        {
          this.state.formDone ?
          this.renderClock() :
          this.renderForm()
        }
      </div>
    )
  }
}



export default App;
