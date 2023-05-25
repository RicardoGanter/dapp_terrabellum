"use client"
import { React } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/idmarket/idmarket.module.scss'
import personaje from '../../../../public/borrar/Ejemplo1..png'
import habilidad1 from '../../../../public/borrar/HABILIDAD1.webp'
import Web3Modal from "web3modal";
import tb from '../../../../public/img/logo.webp'
import Image from 'next/image'
import ConnectInnomicNft from '../../../../components/funcion/connectinnomicnft';
import PropsNftcartas from '../../../../components/props/propsnftcartas';

function DestinationPage({params}) {
  // const router = useRouter();
  // const { id } = router.query;
  const [Sales, setSales] = useState();
  const router = useRouter();
  const { id } = params;
  const ID = id - 1;

  // useEffect(() => {
  //   async function fetchSales() {
  //     try {
  //       const contract = await ConnectInnomicNft() // conectar a el smart contract Market
  //       const sales = await contract.getAllNFTs(); 
  //       setSales(sales);
  //       console.log(sales[ID].toString(),"aaasdasdadaaaaaaaa")
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchSales();
  // }, []);
  useEffect(()=>{
    const fetchImageUrl = async () => {
      try {
        const contract = await ConnectInnomicNft() // conectar a el smart contract innomic
        const response = await contract.tokenURI(id);
        const uritokenn = await fetch(response);
        const uritokenjson = await uritokenn.json();
        console.log("aaaaaaaaa",uritokenjson);
        setSales({ name: uritokenjson.name, hability1: uritokenjson.hability1, level: uritokenjson.level, rarity : uritokenjson.rarity,
          hability2: uritokenjson.hability2, hability3: uritokenjson.hability3, image: uritokenjson.image})
      } catch (error) {
        console.error(error);
      }}
      fetchImageUrl()
  },[])
  
    // fetchImageUrl()
  const venderNFT = async (Id) => {
    try {
      // Llama a la función de venta del contrato Solidity
      const contract = await ConnectInnomicNft();
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
          { Sales && Sales.name == "Aifos" && <img src={"https://terrabellum.s3.sa-east-1.amazonaws.com/personajestb/AIFOS_prot_a.png"}/> }
          { Sales && Sales.name == "Capitan Union" && <img src={"https://terrabellum.s3.sa-east-1.amazonaws.com/personajestb/capitan_Tango_D.png"}/> }
          { Sales && Sales.name == "Red Spectre" && <img src={"https://terrabellum.s3.sa-east-1.amazonaws.com/personajestb/Ejemplo1..png"}/> }
        </div>
        <div className={styles.containhabilitys}>
          <div className={styles.grouphabilitys}>
            { Sales && Sales.hability1 > 0 ? <Image className={styles.hability} src={habilidad1} alt="habilidad1" /> : null }
            { Sales && Sales.hability2 > 0 ? <Image className={styles.hability} src={habilidad1} alt="habilidad1" /> : null }
            { Sales && Sales.hability3 > 0 ? <Image className={styles.hability} src={habilidad1} alt="habilidad1" /> : null }
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