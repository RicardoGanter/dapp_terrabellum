import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PropsNftcartas from "../../props/propsnftcartas";
import styles from '../../../src/styles/navbar/market/marketcompra.module.scss'
import iconeth from '../../../public/icon/ethereum.svg'
import Image from "next/image";
import ConnectInnomicNft from "../../funcion/connectinnomicnft.js";
import Link from "next/link";
const Marketcompra = ()=>{
  const [sales, setSales] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    async function fetchSales() {
      try {
        const contract = await ConnectInnomicNft() // conectar a el smart contract Market
        const sales = await contract.fetchUnSoldMarketItems()
        setSales(sales);
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
      return { name: uritokenjson.name, hability1: uritokenjson.hability1, level: uritokenjson.level, rarity : uritokenjson.rarity,
         hability2: uritokenjson.hability2, hability3: uritokenjson.hability3, image: uritokenjson.image}
    } catch (error) {
      console.error(error);
    }}

    // COMPRA 
    const compra =async (Id,values)=>{
      try {
        const contract = await ConnectInnomicNft() // conectar a el smart contract Market
        const options = {
          value: ethers.utils.parseUnits(String(values),0), // Convertir a WEI sin decimales
          gasLimit: 5000000
        };
        console.log(options.value.toString(),"aaaaaaaaaaa")
        const compra = await contract.createMarketSale(Number(Id),options);
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
      <div className={styles.contain}>
      {imageUrls.length > 0 && sales.length > 0 ? 
  imageUrls.map((data, index) => (
    <div className={styles.containcard}  key={index} >
      <div >
        {data && (
          <Link href={`/market/${sales[index].tokenId}`}>
          <PropsNftcartas 
            name={data.name} 
            Rare={data.rarity} 
            image={data.image} 
            level={data.level} 
            hability1={data.hability1} 
            hability2={data.hability2} 
            hability3={data.hability3}
          /></Link>
        )}
      </div>
      <div className={styles.containPrice}>
        Price: {(sales[index].price/10**14).toString()} <Image src={iconeth} width={40} height={40} alt='Icon ETH' />
      </div>
      <button onClick={() => compra(sales[index].itemId, sales[index].price)} className={styles.btnbuy}>
        Comprar
      </button>
    </div> 
      ))
    : null}

        
      </div>
  );
  };
export default Marketcompra;