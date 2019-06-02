import React, { Component } from 'react';


export default class Form extends Component {

    render() {
      return (
        <div className="container d-flex flex-column align-items-center" style={{height: '100%'}}>
          <div className="bg-warning w-md-50 mx-auto my-auto p-5">
            <h1 className="mb-5 text-center" style={{fontFamily: "'Press Start 2P', cursive"}}>GruPy Dojo!</h1>
            <label
              className="col-form-label-lg"
              htmlFor="codingSeconds"
              >Número de segundos para codar</label>
            <input 
              name="codingSeconds"
              type="number"
              step={1}
              min={30}
              value={this.props.codingSeconds}
              onChange={this.props.handleCodingSecondsChange}
              className="form-control"
              />
            <label 
              className="col-form-label-lg" 
              htmlFor="breakSeconds"
              >Número de segundos de descanso</label>
            <input 
              name="breakSeconds"
              type="number"
              step={1}
              min={10}
              value={this.props.breakSeconds}
              onChange={this.props.handleBreakSecondsChange}
              className="form-control"
              />
            <label 
              className="col-form-label-lg" 
              htmlFor="numberOfTurns"
              >Número de turnos</label>
            <input 
              name="numberOfTurns"
              type="number"
              step={1}
              min={1}
              value={this.props.numberOfTurns}
              onChange={this.props.handleNumberOfTurns}
              className="form-control"
              />
            <br/>
            <button
              onClick={this.props.getFormData}
              className="btn btn-primary"
              >
              Começar!
            </button>
          </div>
        </div>
      );
    }
}