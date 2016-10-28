/**
 * This web3.js is a web3 wrapper/init for eve-react
* */
import Web3 from 'web3'

var web3 = window.web3

function initWeb3() {
    if (typeof web3 !== 'undefined') {
        console.log('web3 found, swapping with project\'s version')
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        console.log('web3 NOT found, making new one connected to http://localhost:8545')
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}
initWeb3()

export default web3