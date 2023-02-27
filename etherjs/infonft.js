

const  {ethers}  = require('ethers');
    // const provider = new ethers.providers.JsonRpcProvider();
    
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
    const signer = provider.getSigner();
    // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/f8191b77762f407da099f89c34a57514')
    const Address = '0x189248d3e4a28D6725BB6612753C5Fe09c001145'; // la dirección del contrato NFT
    const abi = require('../web3/abi.js')

const contract = new ethers.Contract(Address, abi, signer);
contract.tokenURI(1)
.then((tokenURI)=>{
  console.log(` Token Uri: ${tokenURI}`)
})


contract._mintTokenAllowedToEarn('0x6749Cd2AfDd2Be6ef0cc4DeF385A6F38D47Adc6c')
console.log(contract.symbol_)



contract.balance()
.then((balance)=>{
  console.log(` balance es: ${balance}`)
})


// saas()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });

// .then((totalSupply)=>{
//       console.log(` el supply es: ${totalSupply}`)
//   })

// nftContract.totalSupply()
// .then((totalSupply)=>{
//     console.log(` el supply es: ${totalSupply}`)
// })
// nftContract.symbol()
// .then((symbol) => {
//   console.log(`El símbolo del token es: ${symbol}`);
// })