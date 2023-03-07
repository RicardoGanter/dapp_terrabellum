import PropsNftcartas from "./props/propsnftcartas"
import styles from '../src/styles/marketcompra.module.scss'
import { useRouter } from "next/router";
// import Marketfiltros from "./Marketfiltros"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Layout from "../../components/layout";
import PropsNftcartas from "../../components/props/propsnftcartas";
const Marketcompra = ()=>{
    const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function fetchNFTs() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3", // replace with your contract address
        MyNFTContract.abi,
        signer
      );

      const nftCount = await contract.balanceOf(signer.getAddress());

      const promises = [];
      for (let i = 0; i < nftCount; i++) {
        promises.push(contract.tokenOfOwnerByIndex(signer.getAddress(), i));
      }

      const tokenIds = await Promise.all(promises);

      const nfts = await Promise.all(
        tokenIds.map(async (id) => {
          const tokenURI = await contract.tokenURI(id);
          const price = await contract.getTokenPrice(id);
          return { id, tokenURI, price };
        })
      );

      setNfts(nfts);
    }

    if (window.ethereum) {
      fetchNFTs();
    }
  }, []);

  return (
    <div>
      <h1>NFT Marketplace</h1>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.id}>
            <div>{nft.tokenURI}</div>
            <div>{nft.price} ETH</div>
          </li>
        ))}
      </ul>
    </div>
  );
  };
export default Marketcompra;