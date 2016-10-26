import React from 'react';

export default class Web3Info extends React.Component {
    render() {
        const {web3} = this.props;
        let version = '';
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            version = web3.version.api;
        } else {
            console.log('No web3? You should consider trying MetaMask!');
        }
        return (
            <div>
                <h3>Web3 Info</h3>
                <div>version {version}</div>
            </div>
        );
    }
}
