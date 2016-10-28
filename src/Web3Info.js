import React from 'react'
import web3 from './web3'

export default class Web3Info extends React.Component {
    render() {
        const message = web3.version.api ? web3.version.api : ""
        return (
            <div>
                <h3>Web3 Info</h3>
                <div>{message}</div>
            </div>
        );
    }
}
