import React from 'react'
import web3 from './web3'

import Account from './Account'
import Balance from './Balance'
import Token from './Token'

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
                apiVersion: web3.version.api
            })
        }, _error => {
            console.error(_error)
        })
    }

    componentWillMount() {
        this.getInfos.apply(this)
    }

    render() {
        const {apiVersion, nodeVersion, networkVersion, coinbase, accounts} = this.state
        const accountsComponents = accounts.map((account) => {
            return <div key={account}><Account account={account}/> - <Balance account={account}/></div>;
        })
        return (
            <div>
                <h3>Web3 Info</h3>
                <div>Coinbase:<Account account={coinbase}/></div>
                <div>Balance:<Balance account={coinbase}/></div>
                <p/>

                <div>Token (prod):
                    <Token address='0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'
                           account={coinbase}/>
                </div>

                <div>Token (morden):
                    <Token address='0x0a0960358dc58391b8a72062efe84201b47075c4'
                           account={coinbase}>
                        <Account/>
                    </Token>
                </div>

                <div>Token (morden + children):
                    <Token address='0x0a0960358dc58391b8a72062efe84201b47075c4'
                           account={coinbase}>
                        <div>Account:</div>
                        <Account/>
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
