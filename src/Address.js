import React from "react";

export default class Address extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {address} = this.props;
        return (
            <span>{address}</span>
        );
    }
}