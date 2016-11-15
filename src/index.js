import React, {Component} from 'react'
import web3 from './web3'

import Web3Info from './Web3Info'
import Web3Eth from './Web3Eth'

import Address from './Address'
import Balance from './Balance'

import Token from './Token'
import TokenSymbol from './TokenSymbol'
import TokenBalance from './TokenBalance'

export default class Eve extends Component {

    constructor() {
        super()
        this.isNotConnected = this.isNotConnected.bind(this)
    }

    isNotConnected() {
        if (web3.isConnected()) {
            return false
        }
        else {
            return <dev>Not connected, make sure to use a web3 enabled browser like Mist or Metamask</dev>
        }
    }

    render() {
        return <div>
            {this.isNotConnected() || this.props.children}
        </div>
    }
}

export {web3 as web3}
export {Web3Info as Web3Info}
export {Web3Eth as Web3Eth}
export {Address as Address}
export {Balance as Balance}
export {Token as Token}
export {TokenSymbol as TokenSymbol}
export {TokenBalance as TokenBalance}