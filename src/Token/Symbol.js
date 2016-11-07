import React from "react";

export default class Symbol extends React.Component {
    render() {
        const {symbol} = this.props
        return (
            <span>{symbol}</span>
        );
    }
}