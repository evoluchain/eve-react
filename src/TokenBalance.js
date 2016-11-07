import React from "react"

export default class TokenBalance extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {balance} = this.props
        return (
            <span>{balance}</span>
        );
    }
}