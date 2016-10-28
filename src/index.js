import React, {Component} from 'react'
import web3 from './web3'

import _Web3Info from './Web3Info'
import _Account from './Account'

export default class Eve extends Component {

    constructor() {
        super()
        this.isNotConnected = this.isNotConnected.bind(this)
    }

    isNotConnected(){
        if(web3.isConnected()){
            return false
        }
        else {
            return <dev>Not connected, make sure to use a web3 enebled browser like Mist or Metamask</dev>
        }
    }

    render() {
        return <div>
            {this.isNotConnected() || this.props.children}
        </div>
    }
}

export {_Web3Info as Web3Info}
export {_Account as Account}