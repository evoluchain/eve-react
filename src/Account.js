import React from "react";

export default class Account extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {account} = this.props;
        return (
            <span>{account}</span>
        );
    }
}