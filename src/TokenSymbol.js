import React from "react";

export default class TokenSymbol extends React.Component {
    render() {
        const {symbol} = this.props
        return (
            <span>{symbol}</span>
        );
    }
}