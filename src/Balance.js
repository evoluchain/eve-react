import React from "react";
import web3 from './web3'
import Web3Eth from './Web3Eth'

export default class Balance extends React.Component {

    static defaultProps = {
        unit: 'ether'
    }

    render() {
        const {address, unit} = this.props
        return (
            <Web3Eth method='balance' address={address}>
                {({error, result}) => {
                    const balance = result ? web3.fromWei(result.valueOf(), unit) : 'null'
                    return <span>{balance} {unit}</span>
                }}
            </Web3Eth>
        );
    }
}