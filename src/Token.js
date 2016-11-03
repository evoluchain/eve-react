import React from "react"
import tokenContract from './TokenContract'

export default class Token extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contract: null,
            balance: null
        }
    }

    static defaultProps = {
        account: null,
        address: null,
    }

    componentWillReceiveProps(nextProps) {
        this.getToken.bind(this)(nextProps, this.getBalance.bind(this))
    }

    getToken(props, callback) {
        if (props.address) {
            // initiate contract for an address
            const that = this
            tokenContract.at(props.address, function (error, contract) {
                that.setState({
                    contract: contract
                })
                callback(contract, props.account)
            })
        }
    }

    getBalance(contract, account) {
        if (contract && account) {
            const that = this
            contract.balanceOf.call(account, function (error, balance) {
                that.setState({
                    balance: balance.valueOf()
                })
            })
        }
    }

    render() {
        const {balance} = this.state
        const {address, account} = this.props
        return (
            <span>address:{address} - account:{account} - balance:{balance}</span>
        );
    }
}