import React from "react";
import web3 from './web3'

export default class Balance extends React.Component {
    constructor() {
        super();
        this.state = {
            balance: null
        }
    }

    componentDidMount(){
        this.getBalance.apply(this, [this.props.account])
    }

    componentWillReceiveProps(nextProps) {
        this.getBalance.apply(this, [nextProps.account])
    }

    getBalance(account) {
        if(!account) {
            return
        }

        const balancePromise = new Promise((resolve, reject) => {
            web3.eth.getBalance(account, (error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result.valueOf())
            })
        })

        balancePromise.then(balance => {
            this.setState({
                balance
            })
        }, _error => {
            console.error(_error)
        })

    }

    render() {
        const {balance} = this.state
        return (
            <span>{balance}</span>
        );
    }
}