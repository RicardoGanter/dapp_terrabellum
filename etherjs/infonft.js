import { useState, useEffect } from "react"
import { ethers } from "ethers"


export default function Renderitems(items){
    const { ethers } = require('ethers');

const nftContractAddress = '0x38E5AB498844cEF2d09c94C0f8fd1342996ED03A'; // la dirección del contrato NFT
const nftTokenId = '123'; // el ID del token NFT que se desea recuperar

const abi = [ /* el ABI del contrato NFT */ ];

const provider = new ethers.providers.InfuraProvider('mainnet', 'your-project-id');
const nftContract = new ethers.Contract(nftContractAddress, abi, provider);

// Recupera la información del token NFT
nftContract.tokenURI(nftTokenId).then(tokenURI => {
  console.log('URI del token NFT:', tokenURI);
});

    return(
        <>
        </>
    )
}
