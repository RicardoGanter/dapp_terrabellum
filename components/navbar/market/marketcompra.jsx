import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PropsNftcartas from "../../props/propsnftcartas";
import styles from '../../../src/styles/navbar/market/marketcompra.module.scss'
import iconeth from '../../../public/icon/ethereum.svg'
import Image from "next/image";
import ConnectInnomicNft from "../../funcion/connectinnomicnft.js";

const Marketcompra = ()=>{
  const [sales, setSales] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    async function fetchSales() {
      try {
        const contract = await ConnectInnomicNft() // conectar a el smart contract Market
        const sales = await contract.fetchUnSoldMarketItems()
        setSales(sales);
        console.log("asdasdasdasd",sales)
      } catch (error) {
        console.error(error);
      }
    }
    fetchSales();
  }, []);

 const fetchImageUrl = async (tokenId) => {
    try {
     
      const contract = await ConnectInnomicNft() 
      const response = await contract.tokenURI(tokenId);
      
      const uritokenn = await fetch(response);
      const uritokenjson = await uritokenn.json();
      
      return { name: uritokenjson.Name}
    } catch (error) {
      console.error(error);
    }}

    // COMPRA 
  // const compra =async (Id,values)=>{
  //   try {
  //     const contract = await ConnectMarket() // conectar a el smart contract Market
  //     const options = {
  //       value: ethers.utils.parseUnits(String(values),0), // Convertir a WEI sin decimales
  //       gasLimit: 1000000 
  //     };
  //     const compra = await contract.buyNft("0x93a6B40Ff6101246b1eE6BAD63DeC48d41E2786f",Number(Id),options);
  //     const aprob = await contract.aprobe("0x93a6B40Ff6101246b1eE6BAD63DeC48d41E2786f",Id,{
  //         gasLimit: 10000000,
  //       })
  //   } catch (error) {
  //     console.error(error); 
  //   }
  // };

  useEffect(() => {
    const getImageUrls = async () => {
      const urls = await Promise.all(sales.map(async (sale) => await fetchImageUrl(sale.tokenId)));
      setImageUrls(urls);
    };
    getImageUrls();
  }, [sales]);


  return (
    <>
      <div className={styles.contain}>
        { imageUrls.length !== 0 ? 
        imageUrls.map((data, index) => (
          <div key={index} >
            {/* <Link className={styles.containcard} href={`/market/[id]`} as={`/market/${sales[index].owner}`}> */}
            <div className={styles.containcard} >
           {data && <PropsNftcartas Href={sales[index].tokenId} name={"aa"} Rare="normal" Ida="1" img={"a"} Level={"3"}/>}
            <div className={styles.containPrice}>Price:{sales[index].price.toString()} <Image src={iconeth} width={40} height={40} alt='Icon ETH' /></div>
            <button onClick={ ()=>{compra(sales[index].tokenId , sales[index].price)} } className={styles.btnbuy}> Comprar </button>
            </div>
          </div> 
        ))
      : null}
        
      </div>
    </>
  );
  };
export default Marketcompra;