import { useEffect, useState } from 'react';

const  {ethers}  = require('ethers');
    // const provider = new ethers.providers.JsonRpcProvider();
    
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/f8191b77762f407da099f89c34a57514");
    
    
    // const signer = provider.getSigner();
    // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/f8191b77762f407da099f89c34a57514')
    const Address = '0xC68fC412c1A15c2e4026647E3587710f48Bf04ce'; // la dirección del contrato NFT
    // const abi = require('../web3/abi.js')

const contract = new ethers.Contract(Address, abi, signer);

export const mint = ()=>{ 
  contract._mintTokenAllowedToEarn('0x621f47478a55583084e9bD70e535D509f95D9B78')
}

export const Balance = ()=>{
  const [balance, setBalance]= useState(null)
  useEffect(()=>{
  contract.balance()
  .then(cantidadmint=>{
    setBalance(cantidadmint.toString())
})
},[])
return(
  <div>
    {balance && <h1 style={{color:'white'}}>{balance}</h1>}
  </div>
)
}


export const Tokenuri = ()=>{  
  // const [tokenuri, setTokenuri]= useState(null)
  contract.tokenURI(1)
  .then((tokenURI)=>{
  const stringtoken = tokenURI.toString()
  console.log(stringtoken.replace('https://ipfs.io/ipfs/', ""))

})
}


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