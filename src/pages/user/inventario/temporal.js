import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
// import { nftContractAddress, nftContractAbi } from "../utils/constants";

function NFTContainer() {
  const [nfts, setNfts] = useState([]);
  const abi = require('../../../../web3/abi')
  useEffect(() => {
    const fetchNFTs = async () => {
      // Inicializa Web3Modal
      const web3Modal = new Web3Modal({
        network: "goerli",
        cacheProvider: true,
        providerOptions: {} // Opciones del proveedor
      });

      // Conecta la billetera del usuario
      const provider = await web3Modal.connect();

      // Crea una instancia de ethers.js
      const ethersProvider = new ethers.providers.Web3Provider(provider);

      // Obtiene la dirección de la cuenta activa de MetaMask
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();

      // Crea una instancia de la clase ethers.Contract
      const contract = new ethers.Contract("0x472D4625B8f53F04694FB1483cB764702241A7cC", abi, ethersProvider);

      // Obtiene el número total de tokens del usuario
      const tokenCount = await contract.balanceOf(address);
      console.log(tokenCount)

      // Crea un arreglo con los NFTs del usuario
      const nftPromises = [];
      for (let i = 0; i < tokenCount.toNumber(); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const tokenURI = await contract.tokenURI(tokenId);
        const metadata = await fetch(tokenURI).then(res => res.json());
        nftPromises.push({ id: tokenId.toString(), metadata });
      }
      setNfts(await Promise.all(nftPromises));
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      <h1>Mis NFTs:</h1>
      {nfts.map(nft => (
        <div key={nft.id}>
          <h3>{nft.metadata.name}</h3>
          <img src={nft.metadata.image} alt={nft.metadata.name} />
          <p>{nft.metadata.description}</p>
        </div>
      ))}
    </div>
  );
}

export default NFTContainer;