import React from 'react';

export default function Queue(props) {
    let rows = [];
    let queue = props.queue;
    for (let i = 0; i < queue.length; i++) {
        rows.push(
            <li key={i} name={i} className="list-group-item">
                {i+1} - {queue[i]}
                <button type="button" class="close" aria-label="Close" onClick={
                    () => {
                        props.handleDeleteQueueItem(i)
                    }
                }>
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        );
    }
    return (
        <div className="w-100" style={{height: '500px', overflowY: 'scroll'}}>
            <ul className="list-group">
                {rows}
            </ul>
        </div>
    )
}