// import Marketfiltros from "./Marketfiltros"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Layout from "./layout";
import PropsNftcartas from "./props/propsnftcartas";

const Marketcompra = ()=>{
  const [sales, setSales] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://eth-goerli.g.alchemy.com/v2/gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL"
        );
        const abi = require("../web3/abinft.js");
        const contract = new ethers.Contract(
          "0xc832E42E913094E5eeB874f18CFC7591b688F76C",
          abi,
          provider
        );
        const sales = await contract.getSales();
        setSales(sales);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSales();
  }, []);

  const fetchImageUrl = async (tokenId) => {
    try {
      const web3Modal = new Web3Modal({
        network: "goerli",
        cacheProvider: true,
        providerOptions: {}, // Opciones del proveedor
      });
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      const abi = require("../web3/abi.js");
      const contractAddress = "0x0Bc916E4DD112d7Ab395b2E669100A827203DD51";
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      const response = await contract.tokenURI(tokenId);
      const uritoken = await fetch(response); // agregamos "await" aquí para esperar la respuesta de fetch
      const uritokenjson = await uritoken.json();
      return uritokenjson.image;
    } catch (error) {
      console.error(error);
    }
  };


    // COMPRA 
  const compra =async (tokenId)=>{
    try {
      const web3Modal = new Web3Modal({
        network: "goerli",
        cacheProvider: true,
        providerOptions: {}, // Opciones del proveedor
      });
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      // const address = await signer.getAddress();
      const abi = require("../web3/abinft.js");
      const contractAddress = "0xc832E42E913094E5eeB874f18CFC7591b688F76C";
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      const compra = await contract.buy(tokenId,{gasLimit:1000000 });
      console.log(compra)
    } catch (error) {
      console.error(error); 

    }
  };

  useEffect(() => {
    const getImageUrls = async () => {
      const urls = await Promise.all(sales.map(async (sale) => await fetchImageUrl(sale.tokenId)));
      setImageUrls(urls);
    };
    getImageUrls();
  }, [sales]);

  return (
    <>
    <div style={{ margin: "200px" }}>
        aaaa
        {imageUrls.map((url, index) => (
          <div key={sales[index].tokenId}>
            <PropsNftcartas img={url} />
            <button onClick={ ()=>{compra(sales[index].tokenId,10000)} }> Comprar </button>
            {/* <PropsNftcartas  img={data}/> */}
            {/* <h2>{`NFT ID: ${sales[index].tokenId}`}</h2>
            <p>{`Seller: ${sales[index].seller}`}</p>
            <p>{`Price: ${ethers.utils.formatEther(sales[index].price)} ETH`}</p> */}
          </div>
        ))}
      </div>
    </>
  );
  };
export default Marketcompra;