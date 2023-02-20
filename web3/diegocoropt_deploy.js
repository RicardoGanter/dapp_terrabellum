// import { json } from 'hardhat/internal/core/params/argumentTypes';
const ABI = require('./ABI_diegocops')

const Web3 = require('web3')
const address = '0x621f47478a55583084e9bD70e535D509f95D9B78';
const web3 = new Web3('https://goerli.infura.io/v3/f8191b77762f407da099f89c34a57514');

var contract = new web3.eth.Contract(ABI, address);

console.log(contract.methods._mintTokenAllowedToEarn(address).call((err, result)=>{console.log(result)}))
// .call((err, result)=>{console.log(result)})
// console.log(ABI)