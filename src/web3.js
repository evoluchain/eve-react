/**
 * This web3.js is a web3 wrapper/init for eve-react
* */
import Web3 from 'web3'

function initWeb3() {
    if (typeof window.web3 !== 'undefined') {
        console.log("web3 found")
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        console.log("web3 NOT found")
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}
initWeb3()
var web3 = window.web3

export {web3 as web3}