const Web3 = require('web3');
const web3ProviderUrl = "https://goerli.infura.io/v3/f8191b77762f407da099f89c34a57514";
const web3 = new Web3(web3ProviderUrl);
const privateKey = "0x" + "af28d50f35dff3890a623374f65656227d9c7b92d9fee07ffa398657047c5ebd";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const contractAddress = "0x03c6eC8abE655b40A57eEFbf0845bE619A9a831A";
// const abi = require("../artifacts/contracts/InnomicNFT.sol/InnomicNFT.json");
const abi = require("./abi.js")
// console.log(abi)
const contract = new web3.eth.Contract(abi, contractAddress);
 
// contract.methods._mintTokenAllowedToEarn("0x65197058cE55937675d604B89e6404816BF1b797")
// .call({from: account.address})
contract.methods.balance()
.then(lol =>{
    console.log(lol)
  })
//   .catch(error=>{
//     console.log(error)
//   })