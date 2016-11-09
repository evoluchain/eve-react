import React, {PropTypes} from "react"
import _ from 'lodash'
import isEqual from 'lodash/isEqual'

import web3 from './web3'

// Inspired from https://github.com/smalldots/smalldots/blob/master/src/Fetch.js

// defaultBlock param not yet managed

// get methods with callback as only param call
const getMethods = ['coinbase', 'mining', 'hashrate', 'accounts', 'gasPrice']

// get methods with callback + param call
// Not implemented :
// , blockNumber
// getStorageAt, getCode, getBlock, getBlockTransactionCount, getUncle,
// getTransaction, getTransactionFromBlock, getTransactionReceipt, getTransactionCount
const getMethodsParam = ['balance']
// balance (addressHexString, func())
// web3.eth.getStorageAt(addressHexString, position [, defaultBlock] [, callback])
// web3.eth.getCode(addressHexString [, defaultBlock] [, callback])

// is methods with callback as only param call
const isMethods = ['syncing']

// direct call of values. Not implemented : register, unRegister
const values = ['defaultAccount', 'defaultBlock']

const methods = getMethods.concat(getMethodsParam).concat(isMethods).concat(values)

export default class Web3Eth extends React.Component {

    static propTypes = {
        method: PropTypes.oneOf(methods),
        address: PropTypes.string,
        params: PropTypes.object,
        children: PropTypes.func
    }

    static defaultProps = {
        method: 'coinbase',
        params: {},
        address: null,
    }

    state = {
        result: null,
        error: null
    }

    componentDidMount() {
        this.fetch()
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props, nextProps)) {
            this.fetch()
        }
    }

    getPromise() {
        const {method, address} = this.props

        // Start with uppercase
        const _method = _.startCase(method).replace(/\s/g, "")

        // Case for get methods without params
        if (getMethods.includes(method)) {
            const methodCall = 'get' + _method
            return new Promise((resolve, reject) => {
                web3.eth[methodCall]((error, result) => {
                    if (error) {

                        return reject(error)
                    }
                    resolve(result)
                })
            })
        }
        // Case for get methods with params
        else if (getMethodsParam.includes(method) && address) {
            const methodCall = 'get' + _method
            return new Promise((resolve, reject) => {
                web3.eth[methodCall](address, (error, result) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                })
            })
        }
        else
            return null
    }

    fetch() {
        const ethPromise = this.getPromise()
        if (ethPromise) {
            ethPromise.then(result => {
                this.setState({
                    result
                })
            }, _error => {
                console.error(_error)
            })
        }
    }

    render() {
        if (!this.props.children) {
            return null
        }
        return this.props.children({
            result: this.state.result,
        })
    }
}