import React from "react"
import tokenContract from './TokenContract'

export default class Token extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contract: null,
            balance: null
        }
        // console.log('constructor state', this.state)
    }

    static defaultProps = {
        account: null,
        address: null,
    }

    componentWillReceiveProps(nextProps) {
        //console.log('componentWillReceiveProps nextProps', nextProps)
        //console.log('componentWillReceiveProps props', this.props)

        this.getToken.bind(this)(nextProps, this.getBalance.bind(this))


        //console.log('componentWillReceiveProps state', this.state)
    }

    componentWillMount() {
        //console.log('componentWillMount props', this.props)
        //console.log('componentWillMount state', this.state)
        //this.getBalance.apply(this)

       // this.setState({toto: 'TOTO'})
        //console.log('componentWillMount state', this.state)
    }

    getToken(props, callback) {
        if (props.address) {

            //console.log('getToken address', address)

            // initiate contract for an address
            const that = this
            tokenContract.at(props.address, function (error, contract) {

                //console.log('getToken at', error , contract)

                that.setState({
                    contract: contract
                })

                callback(contract, props.account)
                //console.log('getToken state', that.state)
            })

            //this.getBalance.apply(this)

        }
    }

    getBalance(contract, account) {
        // console.log('getBalance props', this.props)
        //console.log('getBalance state', contract, this.state)

        // const {contract} = this.state
        //const {account} = this.props
        if (!contract || !account) {
            console.log()
            return
        }

        //console.log('will call getBalance')
        console.log('this', this)
        const that = this
        contract.balanceOf.call(account, function (error, balance) {
            console.log('contract.balanceOf', balance.valueOf())
            that.setState({
                balance: balance.valueOf()
            })
            console.log('this ???', this)
        })
        //console.log('called getBalance')
    }

    render() {

        console.log('render props', this.props)
        console.log('render state', this.state)

        const {contract, balance} = this.state
        const {address, account} = this.props
        return (
            <span>address:{address} - account:{account} - balance:{balance}</span>
        );
    }
}