// import { json } from 'hardhat/internal/core/params/argumentTypes';
const ABI = require('./abi.js')

const Web3 = require('web3')
const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const web3 = new Web3('https://goerli.infura.io/v3/f8191b77762f407da099f89c34a57514');

var contract = new web3.eth.Contract(ABI, address);

console.log(contract.methods.name().call((err, result)=>{console.log(result)}))