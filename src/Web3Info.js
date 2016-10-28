import React from 'react'
import web3 from './web3'

export default class Web3Info extends React.Component {

    constructor() {
        super()
        this.getInfos = this.getInfos.bind(this)
        this.state = {
            coinbase: ""
        }
    }

    getInfos() {
        //TODO : make it the ES6 way
        var that = this
        web3.eth.getCoinbase(function (err, val) {
            that.setState({coinbase: val})
        })
    }

    componentWillMount(){
        this.getInfos()
    }

    render() {
        const message = web3.version.api ? web3.version.api : ""
        const {coinbase} = this.state
        return (
            <div>
                <h3>Web3 Info</h3>
                <div>coinbase:{coinbase}</div>
                <div>{message}</div>
            </div>
        );
    }
}
