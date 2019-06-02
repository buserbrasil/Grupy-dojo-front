import React, { Component } from "react";

export default class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newParticipant: "",
      participants: [],
      queue: {
        queueLength: this.props.queueLenght,
        queueParticipants: []
      }
    };
  }

  handleAddNewParticipant = e => {
    if (e.KeyCode !== 32) return;

    const participant = this.state.newParticipant;

    this.state.participants.push(participant);

    this.setState({ newParticipant: "" });
  };

  handleInputChange = e => {
    this.setState({ newParticipant: e.target.value });
  };

  handleCreateQueue = e => {
    e.preventDefault();
    const { queueParticipants } = this.state.queue;

    this.setState({
      queueParticipants: this.state.participants.map(participant =>
        queueParticipants.push(participant)
      )
    });

    this.setState({ queueLenght: queueParticipants.length });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateQueue}>
          <input
            placeholder="Informe o nome dos participantes"
            value={this.state.newParticipant}
            onChange={this.handleInputChange}
            onKeyDown={this.handleAddNewParticipant}
          />
          <button type="submit">Criar fila</button>
        </form>

        <section>
          <ul>
            {this.state.participants.map(participant => (
              <li>
                <span> participant </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
