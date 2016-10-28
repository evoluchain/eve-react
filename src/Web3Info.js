import React from 'react'
import web3 from './web3'

export default class Web3Info extends React.Component {

    constructor() {
        super()
        this.getInfos = this.getInfos.bind(this)
        this.state = {
            apiVersion:"",
            nodeVersion: "",
            coinbase: ""
        }
    }

    getInfos() {
        //TODO : make it the ES6 way
        var that = this
        web3.eth.getCoinbase(function (error, result) {
            that.setState({coinbase: result})
        })
        web3.version.getNode(function (error, result) {
            that.setState({nodeVersion: result})
        })
        that.setState({apiVersion: web3.version.api})
    }

    componentWillMount() {
        this.getInfos()
    }

    render() {
        const {apiVersion, nodeVersion, coinbase} = this.state
        return (
            <div>
                <h3>Web3 Info</h3>
                <div>coinbase:{coinbase}</div>
                <div>api version:{apiVersion}</div>
                <div>node version:{nodeVersion}</div>
            </div>
        );
    }
}
