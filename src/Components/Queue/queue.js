import React from 'react';

export default function Queue(props) {
    let rows = [];
    let queue = props.queue;
    for (let i = 0; i < queue.length; i++) {
        rows.push(
            <li className="list-group-item">
                {i+1} - {queue[i]}
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