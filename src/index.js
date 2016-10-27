import React, {Component} from 'react'
import Web3 from 'web3'

import _Web3Info from './Web3Info'

export default class Eve extends Component {

    initWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }

    render() {
        this.initWeb3()
        const coinbase = web3.eth.coinbase
        return <div>
            <h2>Welcome to Eve React components pack</h2>
            <p>{coinbase}</p>
        </div>
    }
}

export {_Web3Info as Web3Info}