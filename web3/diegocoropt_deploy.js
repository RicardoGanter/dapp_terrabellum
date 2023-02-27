// import { json } from 'hardhat/internal/core/params/argumentTypes';
const ABI = require('./abi')

const Web3 = require('web3')
const address = '0x189248d3e4a28D6725BB6612753C5Fe09c001145';
const web3 = new Web3('http://127.0.0.1:7545');

var contract = new web3.eth.Contract(ABI, address);


// contract.methods._mintTokenAllowedToEarn(address).call((err, result)=>{console.log(result)})
console.log(contract.methods._mintTokenAllowedToEarn('0x6749Cd2AfDd2Be6ef0cc4DeF385A6F38D47Adc6c'))
// console.log()
// .call((err, result)=>{console.log(result)})
// console.log(ABI)