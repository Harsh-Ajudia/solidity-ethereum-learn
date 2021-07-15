import React from 'react'

function InfoPanel(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <hr />
            <h4>This contract is managed by {props.manager}</h4>
            <p>
                Registrations: {props.noOfPlayers}
            </p>
            <p>
                Price Pool: {props.balance}
            </p>
        </div>
    )
}

export default InfoPanel