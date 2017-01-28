import React from 'react'

import tokenContract from './Token/TokenContract'

export default class Token extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contract: null,
        }
    }

    static defaultProps = {
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
                if(error) {
                    console.error(error)
                    return
                    // callback fires twice, we only want the second call when the contract is deployed
                } else if(contract.address){
                    that.setState({
                        contract: contract
                    })
                    callback(contract)
                }
            })
        }
    }

    getBalance(contract) {
        if (contract) {

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

            const allReady = Promise.all([symbolPromise, namePromise, decimalsPromise])

            allReady.then(results => {
                const [ symbol, name, decimals ] = results
                this.setState({
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
        const {name, symbol, decimals} = this.state
        const {address} = this.props

        if (!this.props.children) {
            return null
        }
        return this.props.children({
            token: {
                address,
                name,
                symbol,
                decimals
            }
        })

    }
}