import React, {Component} from 'react'
import {web3} from './web3'

import _Web3Info from './Web3Info'

export default class Eve extends Component {

    constructor() {
        super()
        this.getInfos = this.getInfos.bind(this)
        this.state = {
            coinbase: ""
        }
        this.getInfos()
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