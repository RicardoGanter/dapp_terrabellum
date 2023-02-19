const  {ethers}  = require('ethers');
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/f8191b77762f407da099f89c34a57514')
    const Address = '0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b'; // la dirección del contrato NFT
    
    const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    // "event Transfer(address indexed from, address indexed to, uint amount)"
];

const nftContract = new ethers.Contract(Address, abi, provider);


nftContract.totalSupply()
.then((totalSupply)=>{
    console.log(` el supply es: ${totalSupply}`)
})
nftContract.symbol()
.then((symbol) => {
  console.log(`El símbolo del token es: ${symbol}`);
})