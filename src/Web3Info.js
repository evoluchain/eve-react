import React from 'react'
import web3 from './web3'

import Web3Eth from './Web3Eth'

import Account from './Account'
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
        const accountsPromise = new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        })

        const allReady = Promise.all([coinbasePromise, nodePromise, networkPromise, accountsPromise])
        allReady.then(results => {
            const [ coinbase, nodeVersion, networkVersion, accounts ] = results
            this.setState({
                coinbase,
                nodeVersion,
                networkVersion,
                accounts,
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
        const {apiVersion, nodeVersion, networkVersion, coinbase, accounts, tokenAddress} = this.state
        const accountsComponents = accounts.map((account) => {
            return <div key={account}><Account account={account}/> - <Balance account={account}/></div>;
        })
        return (
            <div>
                <h3>Web3 Info</h3>
                <div>Coinbase:<Account account={coinbase}/></div>
                <div>Balance:<Balance account={coinbase}/></div>
                <p/>

                <div>Web3Eth (coinbase):
                    <Web3Eth method='coinbase'>
                        {({error, result}) => {
                            return <div>
                                <div>coinbase : {result}</div>
                            </div>
                        }}
                    </Web3Eth>
                </div>

                <div>Web3Eth (balance):
                    <Web3Eth method='balance' address={coinbase}>
                        {({error, result}) => {
                            return <div>
                                <div>balance(wei) : {result ? result.valueOf() : 'null'}</div>
                            </div>
                        }}
                    </Web3Eth>
                </div>

                <div>Web3Eth (accounts):
                    <Web3Eth method='accounts'>
                        {({error, result}) => {
                            if (result) {
                                const accountsComponents = result.map((account) => {
                                    return <div key={account}><Account account={account}/></div>;
                                })
                                return <div>
                                    <div>{accountsComponents}</div>
                                </div>
                            }
                            return null
                        }}
                    </Web3Eth>
                </div>

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

                <div>Token:
                    <Token address={tokenAddress}
                           account={coinbase}>
                        <span> Account: </span>
                        <Account/>
                        <span> - Balance: </span>
                        <TokenBalance/>
                        <span> - Symbol: </span>
                        <TokenSymbol/>
                    </Token>
                </div>

                <p/>

                <div>Accounts list</div>
                {accountsComponents}
                <p/>

                <div>api version : {apiVersion}</div>
                <div>node version : {nodeVersion}</div>
                <div>networkVersion : {networkVersion}</div>
            </div>
        );
    }
}
