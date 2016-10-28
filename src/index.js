import React, {Component} from 'react'
import web3 from './web3'

import _Web3Info from './Web3Info'

export default class Eve extends Component {

    constructor() {
        super()
        this.getInfos = this.getInfos.bind(this)
        this.isNotConnected = this.isNotConnected.bind(this)
        this.state = {
            coinbase: ""
        }
    }

    componentWillMount(){
        this.getInfos()
    }

    getInfos() {
        var that = this
        web3.eth.getCoinbase(function (err, val) {
            that.setState({coinbase: val})
        })
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
        const {coinbase} = this.state
        return <div>
            <h2>Welcome to Eve React components pack</h2>
            <p>{coinbase}</p>
            {this.isNotConnected() || this.props.children}
        </div>
    }
}

export {_Web3Info as Web3Info}