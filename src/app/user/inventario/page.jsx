"use client"
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import styles from "../../../styles/user/inventario/inventario.module.scss";
import PropsNftcartas from "../../../../components/props/propsnftcartas";
import ConnectInnomicNft from "../../../../components/funcion/connectinnomicnft";
import ConnectMarket from "../../../../components/funcion/connectmarket";
import NetworkGoerliEth from "../../../../components/funcion/network";
const NFTContainer = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const signer = await NetworkGoerliEth();
        const address = await signer.getAddress();
        const contract = await ConnectInnomicNft();
        
         // Obtiene el número total de tokens del usuario
        const tokenCount = await contract.balanceOf(address);
        // Crea un arreglo con los NFTs del usuario
        const nftPromises = [];
        for (let i = 0; i < tokenCount; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const tokenURI = await contract.tokenURI(tokenId);
          if (tokenId) {
            const metadata = await fetch(tokenURI).then((res) => res.json());
            nftPromises.push({
              id: tokenId.toNumber(),
              metadata
            });
        }
      }
        setNfts(nftPromises);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchNFTs();
    }, []);

// Función para vender un NFT
const venderNFT = async (Id) => {
  try {
    // Llama a la función de venta del contrato Solidity
    const contract = await ConnectMarket();
    // contract.aprobe("0x3B92E898442BEEf2ECB82746AaCC5a353933cb28", 5,{
    //   gasLimit: 10000000,
    // })
     await contract.listNft(
      "0x93a6B40Ff6101246b1eE6BAD63DeC48d41E2786f",  // CONTRATO INNOMIC
      Id,
      price,{
      gasLimit: 1000000,
    } );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <PropsNftcartas name="a"  />
{loading ? (
  <p>Cargando NFTs...</p>
) : nfts ? (
  <div className={styles.grid}>
    {nfts.map((nft) => (
              <div key={nft.id}>
                <PropsNftcartas Href={nft.id} name={nft.metadata.name} Rare={"normal"}/>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    venderNFT(nft.id);
                  }}
                >
                  <PropsNftcartas/>
                  <input
                    type="number"
                    placeholder="Precio en Wei"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button className={styles.sell} type="submit">
                    vender
                  </button>
                </form>
              </div>
            ))}
  </div>
) : null }
{/* </div> */}
    </div>
  );
};
export default NFTContainer;