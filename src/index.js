import React, {Component} from 'react'
import Web3 from 'web3'

import _Web3Info from './Web3Info'

export default class Eve extends Component {

    constructor() {
        super()
        this.getInfos = this.getInfos.bind(this)
        this.state = {
            coinbase: ""
        }
        this.initWeb3()
        this.getInfos()
    }

    initWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }

    getInfos() {
        var that = this
        web3.eth.getCoinbase(function (err, val) {
            that.setState({coinbase: val})
        })
    }

    render() {
        const {coinbase} = this.state
        return <div>
            <h2>Welcome to Eve React components pack</h2>
            <p>{coinbase}</p>
        </div>
    }
}

export {_Web3Info as Web3Info}