import React from 'react';

export default function Field(props) {
    return (
        <div className="input-group mb-3">
            <input 
                className="form-control"
                placeholder="Nick do Participante"
                onChange={props.handleQueueInput}
                onKeyPress={props.handleQueueInput}
                value={props.queueInput}
            />
            <div className="input-group-append">
                <button className="btn btn-primary" onClick={props.handleQueueSubmit}>
                    +!
                </button>
            </div>
        </div>
    );
}
