import React, { Component } from "react";

export default class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newParticipant: "",
      participants: []
    };
  }

  handleAddNewParticipant = () => {
    const participant = this.state.newParticipant;

    this.state.participants.push(participant);

    this.setState({ newParticipant: "" });
  };

  handleInputChange = e => {
    this.setState({ newParticipant: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddNewParticipant}>
          <input
            placeholder="Informe o nome de um participante"
            value={this.state.newParticipant}
            onChange={this.handleInputChange}
          />
          <button type="submit">Adicionar</button>
        </form>

        <section>
          <ul>{}</ul>
        </section>
      </div>
    );
  }
}
