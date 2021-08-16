import React from 'react';

const Summary = (props) => {
    const ingreSummary = props.ingredients.map(item => {
        return (
            <li key={item.type}>
                <span className="text-capitalize">{item.type} </span> : {item.amount}
            </li>
        )
    })
    return (
        <div>
            <ul>
                {ingreSummary}
            </ul>
        </div>
    )
}

export default Summary;