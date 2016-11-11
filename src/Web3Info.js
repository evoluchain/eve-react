import React from 'react'
import web3 from './web3'

import Web3Eth from './Web3Eth'

import Address from './Address'
import Balance from './Balance'
import Token from './Token'
import TokenSymbol from './TokenSymbol'
import TokenBalance from './TokenBalance'

export default class Web3Info extends React.Component {

    constructor() {
        super()
        this.state = {
            apiVersion: "",
            nodeVersion: "",
            networkVersion: "",
            coinbase: null,
            accounts: ['']
        }
    }

    getTokenAddress(networkVersion) {
        switch (networkVersion) {
            case '1' :
                return '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'
            case '2' :
                return '0x0a0960358dc58391b8a72062efe84201b47075c4'
            default:
                return null
        }
    }

    getInfos() {
        const coinbasePromise = new Promise((resolve, reject) => {
            web3.eth.getCoinbase((error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        })
        const nodePromise = new Promise((resolve, reject) => {
            web3.version.getNode((error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        })
        const networkPromise = new Promise((resolve, reject) => {
            web3.version.getNetwork((error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        })

        const allReady = Promise.all([coinbasePromise, nodePromise, networkPromise])
        allReady.then(results => {
            const [ coinbase, nodeVersion, networkVersion ] = results
            this.setState({
                coinbase,
                nodeVersion,
                networkVersion,
                apiVersion: web3.version.api,
                tokenAddress: this.getTokenAddress(networkVersion)
            })
        }, _error => {
            console.error(_error)
        })
    }

    componentWillMount() {
        this.getInfos.apply(this)
    }

    render() {
        const {apiVersion, nodeVersion, networkVersion, coinbase, tokenAddress} = this.state

        return (
            <div>
                <h3>Web3 Info</h3>

                <div>Web3Eth (coinbase):
                    <Web3Eth method='coinbase'>
                        {({error, result}) => {
                            return <div>
                                <div>Coinbase: <Address address={result}/></div>
                                <div>Balance: <Balance address={result} unit='ether'/></div>
                            </div>
                        }}
                    </Web3Eth>
                </div>
                <p/>

                <div>Token:
                    <Token address={tokenAddress}>
                        {({error, token}) => {
                            return <div>
                                <span> {token.name}</span>
                                <span> - Address: </span>
                                <span>{token.address}</span>
                                <span> - Account: </span>
                                <Address address={coinbase}/>
                                <span> - Balance: </span>
                                <TokenBalance tokenAddress={token.address} address={coinbase}/>
                                <span> - Symbol: </span>
                                <TokenSymbol symbol={token.symbol}/>
                            </div>
                        }}
                    </Token>
                </div>
                <p/>

                <div>Web3Eth (accounts):
                    <Web3Eth method='accounts'>
                        {({error, result}) => {
                            if (result) {
                                const accountsComponents = result.map((account) => {
                                    return <div key={account}><Address address={account}/></div>;
                                })
                                return <div>
                                    <div>{accountsComponents}</div>
                                </div>
                            }
                            return null
                        }}
                    </Web3Eth>
                </div>
                <p/>

                <div>Web3Eth (gasPrice):
                    <Web3Eth method='gasPrice'>
                        {({error, result}) => {
                            return <div>
                                <div>gasPrice : {result ? result.toString() : 'null'}</div>
                            </div>
                        }}
                    </Web3Eth>
                </div>

                <div>Web3Eth (hashrate):
                    <Web3Eth method='hashrate'>
                        {({error, result}) => {
                            return <div>
                                <div>hashrate : {result ? result.toString() : 'null'}</div>
                            </div>
                        }}
                    </Web3Eth>
                </div>

                <div>Web3Eth (syncing):
                    <Web3Eth method='syncing'>
                        {({error, result}) => {
                            return <div>
                                <div>syncing : {result ? result.toString() : 'null'}</div>
                            </div>
                        }}
                    </Web3Eth>
                </div>

                <p/>

                <div>api version : {apiVersion}</div>
                <div>node version : {nodeVersion}</div>
                <div>networkVersion : {networkVersion}</div>
            </div>
        );
    }
}
