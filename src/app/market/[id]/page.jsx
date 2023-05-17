"use client"
import { React } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/idmarket/idmarket.module.scss'
import personaje from '../../../../public/borrar/Ejemplo1..png'
import habilidad3 from '../../../../public/borrar/HABILIDAD3.webp'
import habilidad2 from '../../../../public/borrar/HABILIDAD2.webp'
import habilidad1 from '../../../../public/borrar/HABILIDAD1.webp'
import Web3Modal from "web3modal";
import tb from '../../../../public/img/logo.webp'
import Image from 'next/image'
import ConnectInnomicNft from '../../../../components/funcion/connectinnomicnft';
import ConnectMarket from '../../../../components/funcion/connectmarket';

function DestinationPage({params}) {
  // const router = useRouter();
  // const { id } = router.query;
  const [Sales, setSales] = useState();
  const router = useRouter();
  const { id } = params;
  const ID = id - 1;

  useEffect(() => {
    async function fetchSales() {
      try {
        const contract = await ConnectMarket() // conectar a el smart contract Market
        const sales = await contract.getListedNfts(); 
        setSales(sales);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSales();
  }, []);
  const fetchImageUrl = async () => {
    try {
      const contract = await ConnectInnomicNft() // conectar a el smart contract innomic
      const response = await contract.tokenURI(1);
      const uritokenn = await fetch(response);
      const uritokenjson = await uritokenn.json();
      console.log("aaaaaaaaa",uritokenjson);
      return {name: uritokenjson.name, rare : uritokenjson.Rare, hability: uritokenjson.hability }
    } catch (error) {
      console.error(error);
    }}
    fetchImageUrl()
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
    <div style={{display:"flex", flexDirection:"column", margin:"160px 120px 0 20px", position:"relative"}}>

      <div className={styles.typegame}>
          <h2>Type Game</h2>
          <select><option> Terrabellum</option></select>
          <h2>ID #{id}</h2>
      </div>
      <div className={styles.owner}>
        {/* borrar */}
       {/* { Sales &&  ID   &&  id&& <p>Owner : {Sales[ID].seller}  </p>} */}
      </div>

      <div   className={styles.containcharacterinfo} >
        <div className={styles.Character}>
          <Image src={personaje} alt="personaje" />
        </div>
        <div className={styles.containhabilitys}>
          <div>
            <Image className={styles.hability} src={habilidad1} alt="habilidad1" />
            <Image className={styles.hability} src={habilidad2} alt="habilidad2" />
            <Image className={styles.hability} src={habilidad2} alt="habilidad3" />
          </div>

          <div className={styles.containhabilityinfo}>
            <p>Description</p>
            <p>Stats</p>
            <p>Redspectre</p>
            <p>Level</p>
          </div>

          <div className={styles.description}>
           <p className={styles.descriptiontext}> 
           {/* borrar */}
            {/* Description : aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
            </p>
          </div>
        </div>
      </div>
      <form className={styles.sell}>
        <input type="number" className={styles.priceinput}/> 
        <div className={styles.sellbuttons}>
          <button onClick={()=>venderNFT(id)} >Sell</button>
          <button>Auction</button>
        </div>
      </form>
      {/* fixed scroll */}
      <div className={styles.scrollfixed}>
        <div className={styles.rutescroll}/>
        <div className={styles.rutescroll}/>
        <div className={styles.rutescroll}/>
      </div>

    </div>
  );
}

export default DestinationPage;