import React from "react";

export default class Balance extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {balance} = this.props;
        return (
            <div>{balance}</div>
        );
    }
}