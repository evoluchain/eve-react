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

            const balancePromise = new Promise((resolve, reject) => {
                contract.balanceOf.call(account, (error, result) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                })
            })

           const symbolPromise = new Promise((resolve, reject) => {
                contract.symbol.call((error, result) => {
                    console.log('symbolPromise', error, result)
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                })
            })

            const allReady = Promise.all([balancePromise, symbolPromise])

            allReady.then(results => {
                const [ balance, symbol ] = results
                this.setState({
                    balance: balance.valueOf(),
                    symbol
                })
            }, _error => {
                console.error(_error)
            })

        }
    }

    render() {
        const {balance, symbol} = this.state
        const {address, account} = this.props
        return (
            <span>address:{address} - account:{account} - balance:{balance} {symbol}</span>
        );
    }
}