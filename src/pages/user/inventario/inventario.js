import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import styles from "../../../styles/user/inventario/inventario.module.scss";
import Layout from "../../../../components/layout";
import { ethers } from "ethers";
import Link from "next/link";
import PropsNftcartas from '../../../../components/props/propsnftcartas';
const NFTContainer = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // Inicializa Web3Modal
        const web3Modal = new Web3Modal({
          network: "goerli",
          cacheProvider: true,
          providerOptions: {},
          chainId: 5 // Opciones del proveedor
        });

        // Conecta la billetera del usuario
        const provider = await web3Modal.connect();

        // Crea una instancia de ethers.js
        const ethersProvider = new ethers.providers.Web3Provider(provider);

        // Obtiene la dirección de la cuenta activa de MetaMask
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();

        // Crea una instancia de la clase ethers.Contract
        const abi = require("../../../../web3/abi");
        const contractAddress = "0xD8b2B4a011d14a6c14EF2C99697082AA42897594";
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          ethersProvider
        );

         // Obtiene el número total de tokens del usuario
    const tokenCount = await contract.balanceOf(address);

    // Crea un arreglo con los NFTs del usuario
    const nftPromises = [];

    for (let i = 0; i < tokenCount; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const tokenURI = await contract.tokenURI(tokenId);
    
      if (tokenId) {
        const metadata = await fetch(tokenURI).then((res) => res.json());
        const imageUrl = metadata.name;
        nftPromises.push({
          id: tokenId.toNumber(),
          metadata: metadata,
          imageUrl: imageUrl
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
    const web3Modal = new Web3Modal({
      network: "goerli",
      cacheProvider: true,
      providerOptions: {},
      chainId: "5" // Opciones del proveedor
    });
    // Conecta la billetera del usuario
    const provider = await web3Modal.connect();
    // Crea una instancia de ethers.js
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const address = await signer.getAddress();
    const abi = require("../../../../web3/abinft.js");
    const contractAddress = "0x9bFfE512fa1595728f8dDCD8b5c9C59fcAF7056F";
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );
    
    // contract.aprobe("0x0Bc916E4DD112d7Ab395b2E669100A827203DD51", 5,{
    //   gasLimit: 10000000,
    // })

    const response = await contract.listNft(
      "0xD8b2B4a011d14a6c14EF2C99697082AA42897594",
      Id,
    Number(price),{
      gasLimit: 1000000,
    } );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Layout>
      {/* <div className={styles.contain}> */}
        <div className={styles.filter}>
          <button>Personaje</button>
          <button>Habilidades</button>
          <button>Armas</button>
          <button>Nivel</button>
          <button>Rareza</button>
        </div>
        {!loading && nfts.length <= 0 && (
  <p>No tienes NFTs en tu billetera.</p>
)}

{loading ? (
  <p>Cargando NFTs...</p>
) : (
  <div className={styles.grid}>
    {nfts.map((nft) => (
              <div key={nft.id}>
                <PropsNftcartas img={nft.imageUrl} Rare={nft.metadata.Rare} name={nft.metadata.name}/>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    venderNFT(nft.id);
                  }}
                >
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
)}
{/* </div> */}
    </Layout>
  );
};

export default NFTContainer;
