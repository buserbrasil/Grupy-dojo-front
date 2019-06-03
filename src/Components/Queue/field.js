import React from 'react';

export default function Field(props) {
    return (
        <div class="input-group mb-3">
            <input 
                className="form-control"
                placeholder="Nick do Participante"
                onChange={props.handleQueueInput}
            />
            <div class="input-group-append">
                <button class="btn btn-primary" onClick={props.handleQueueSubmit}>
                    +!
                </button>
            </div>
        </div>
    );
}
