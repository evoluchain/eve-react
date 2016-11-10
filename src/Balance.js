import React from "react";
import web3 from './web3'
import Web3Eth from './Web3Eth'

export default class Balance extends React.Component {

    static defaultProps = {
        unit: 'ether'
    }

    render() {
        const {account, unit} = this.props
        return (
            <Web3Eth method='balance' address={account}>
                {({error, result}) => {
                    const balance = result ? web3.fromWei(result.valueOf(), unit) : 'null'
                    return <span>balance(eth) : {balance} {unit}</span>
                }}
            </Web3Eth>
        );
    }
}