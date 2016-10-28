/**
 * This web3.js is a web3 wrapper for eve-react
* */
import Web3 from 'web3'

function initWeb3() {
    if (typeof window.web3 !== 'undefined') {
        console.log("web3 found")
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        console.log("web3 NOT found")
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}
initWeb3()

console.log("web3js:defaultAccount", window.web3.eth.defaultAccount)
