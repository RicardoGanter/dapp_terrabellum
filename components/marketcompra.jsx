// import Marketfiltros from "./Marketfiltros"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Layout from "./layout";
import PropsNftcartas from "./props/propsnftcartas";
import styles from '../src/styles/marketcompra.module.scss'
import iconeth from '../public/icon/ethereum.svg'
import Image from "next/image";
const Marketcompra = ()=>{
  const [sales, setSales] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uritoken,setUritoken] = useState([])
  console.log(uritoken.toString())
  // const lol = sales[1].price.toString();
  // const laal = lol
  
  useEffect(() => {
    async function fetchSales() {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://eth-goerli.g.alchemy.com/v2/gIYahKEbCs9lj1MRp6mwlzYHxonY3hYL"
        );
        const abi = require("../web3/abinft.js");
        const contract = new ethers.Contract(
          "0x9bFfE512fa1595728f8dDCD8b5c9C59fcAF7056F",
          abi,
          provider
        );
        const sales = await contract.getListedNfts();
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
        providerOptions: {
          gasPrice: 200000000,
          gasLimit: 1000000
        }, // Opciones del proveedor
      });
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const abi = require("../web3/abi.js");
      const contractAddress = "0x4Df0137edBcfA16f2743223Ea9835A93C1D900c3";
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      const response = await contract.tokenURI(tokenId);
      const uritokenn = await fetch(response);
      const uritokenjson = await uritokenn.json();
      // return {image: uritokenjson.image, name: uritokenjson.name, description: uritokenjson.description};
      return {image: uritokenjson.image, name: uritokenjson.name, description: uritokenjson.description}
    } catch (error) {
      console.error(error);
    }}

 
    // COMPRA 
  const compra =async (Id,values)=>{
    try {
      const web3Modal = new Web3Modal({
        network: "goerli",
        cacheProvider: true,
        providerOptions: { gasLimit: 1000000 }, // Opciones del proveedor
      });
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const abi = require("../web3/abinft.js");
      const contractAddress = "0x9bFfE512fa1595728f8dDCD8b5c9C59fcAF7056F";
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      //20usd = 10000000
      const valueswei= (values/(10**18))
      // const options = {value: ethers.utils.parseUnits(String(values),"wei")
      // , gasLimit: 1000000 }
      const options = {
        value: ethers.utils.parseUnits(String(values),0), // Convertir a WEI sin decimales
        gasLimit: 1000000 
      };

      const compra = await contract.buyNft("0x4Df0137edBcfA16f2743223Ea9835A93C1D900c3",Number(Id),options);
      contract.aprobe("0x4Df0137edBcfA16f2743223Ea9835A93C1D900c3",Id,{
          gasLimit: 10000000,
        })
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
    <div style={{ margin: "200px" }} className={styles.contain}>
      {imageUrls.map((data, index) => (
        <div key={index} >
          {/* <img src={ iconeth }/> */}
          {data && <PropsNftcartas img={data.image} />}
          {/* <div className={styles.containPrice}> */}
          <h4>Price: {sales[index].price.toString()} <Image src={iconeth} width={40} height={40} /></h4>
          {/* </div> */}
          {/* <h1>{((sales[index].price)/(10**18)).toString()}</h1> */}
          
          {/* <div className={styles.price}> </div> */}
          <button onClick={ ()=>{compra(sales[index].tokenId,sales[index].price)} } className={styles.btnbuy}> Comprar </button>
        </div> 
      ))}
    </div>
    </>
  );
  };
export default Marketcompra;








{/* {price.length !== 0 && ( */}
       {/* {Object.keys(uritoken).map((key) => (
         <h1>{uritoken.image}</h1> */}
  
  {/* // age: uritoken[key].age,
  // city: uritoken[key].city,
))} */}
      {/* <h1>{uritoken.image}</h1> */}
      {/* )} */}
        {/* {Object.keys(list).map((key, index) => (
  <h1 key={key}>
    {key}: {list[key][index]}
  </h1>
))} */}
{/* {sales.map((sale, index) => {
  const tokenId = sale.tokenId;

  return (
    <div key={index}>
      <PropsNftcartas img={uritoken.image} name={uritoken.name}/>
      <h1>{String(tokenId)}</h1>
      {/* <button onClick={() => compra(tokenId)}>Comprar</button> */}

    {/* </div> */}
  {/* ); */}
{/* })} } */}