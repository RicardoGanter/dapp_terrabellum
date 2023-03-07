// const ethers = require('ethers');
// import getAddress from './getaddress';
// // Dirección del contrato de NFT
// const nftContractAddress = '0x472D4625B8f53F04694FB1483cB764702241A7cC';

// // ABI del contrato de NFT
// const nftContractAbi = require('../../../../web3/abi')
// const myFunc = async () => {
//     const address = await getAddress(window.ethereum);
//     // console.log(`La dirección es: ${address}`);
//     return address
//   };
//   myFunc()
// // Dirección de la cuenta a verificar
// const addressToCheck = `${myFunc()}` ;

// async function getNFTs() {
//   const provider = new ethers.providers.JsonRpcProvider('goerli', 'https://eth-goerli.g.alchemy.com/v2/gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL');
//   const nftContract = new ethers.Contract(nftContractAddress, nftContractAbi, provider);
//   const nftCount = await nftContract.balanceOf(addressToCheck);

//   console.log(`La dirección ${addressToCheck} tiene ${nftCount.toString()} NFTs:`);

//   for (let i = 0; i < nftCount; i++) {
//     const tokenId = await nftContract.tokenOfOwnerByIndex(addressToCheck, i);
//     console.log(`- NFT ${i + 1}: ID ${tokenId.toString()}`);
//   }
// }
// export default getNFTs;





