import React from "react";

export default class Account extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {account} = this.props;
        return (
            <div> {account} </div>
        );
    }
}