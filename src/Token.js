import React from 'react'

import tokenContract from './Token/TokenContract'
import Balance from './Token/Balance'
import Symbol from './Token/Symbol'

export {tokenContract as tokenContract}
export {Balance as Balance}
export {Symbol as Symbol}

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
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                })
            })

            const namePromise = new Promise((resolve, reject) => {
                contract.name.call((error, result) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                })
            })

            const decimalsPromise = new Promise((resolve, reject) => {
                contract.decimals.call((error, result) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                })
            })

            const allReady = Promise.all([balancePromise, symbolPromise, namePromise, decimalsPromise])

            allReady.then(results => {
                const [ balance, symbol, name, decimals ] = results
                this.setState({
                    balance: balance.valueOf(),
                    symbol,
                    name,
                    decimals: decimals.valueOf()
                })
            }, _error => {
                console.error(_error)
            })

        }
    }

    render() {
        const {balance, symbol} = this.state
        const {address, account} = this.props

        //TODO : use React.Children.isReactComponent()
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                account: account,
                balance: balance,
                symbol: symbol,
                address: address,
            })
        )

        return (
            <span>
                {childrenWithProps}
            </span>
        )
    }
}