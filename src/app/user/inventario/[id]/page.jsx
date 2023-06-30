"use client"
import { React } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../../styles/idmarket/idmarket.module.scss'
import personaje from '../../../../public/borrar/Ejemplo1..png'
import habilidad1 from '../../../../public/borrar/HABILIDAD1.webp'
import tb from '../../../../public/img/logo.webp'
import Image from 'next/image'
import ConnectInnomicNft from '../../../../components/funcion/connectinnomicnft';
import ha from '../../../../public/borrar/HABILIDAD3.webp'
import PropsNftcartas from 'components/props/propsnftcartas';
import '../../../../styles/globals.scss' 
import logotb from '../../../../public/img/TOKEN_1.png'
function DestinationPage({params}) {
  // const { id } = router.query;
  const [Sales, setSales] = useState();
  const [addres, setAddres] = useState();
  const router = useRouter();
  const { id } = params;
  const ID = id - 1;

   const back = () =>{
    console.log("lol  ")
    const nocxdjojo = document.querySelector('.nocxdmequieromatar')
        if(nocxdjojo){
          // console.log(  nocxdjojo.offsetTop,
          //   nocxdjojo.offsetLeft )
            nocxdjojo.style.viewTransitionName = 'noseeeeeee';
            function updateTheDOMSomehow(){  
              router.push('/user/inventario') 
              setTimeout(() => {
                nocxdjojo.style.viewTransitionName = '';
            }, 1600); 
            }
            document.startViewTransition(()=>{   
              
                updateTheDOMSomehow()
            }) 


        }
  }

   useEffect(() => {
     async function fetchSales() {
       try {  
         const contract = await ConnectInnomicNft() // conectar a el smart contract Market
         const sales = await contract.fetchUnSoldMarketItems();
         setAddres(sales[id]);
       } catch (error) {
         console.error(error);
       }
     }
     fetchSales();
   }, []);
  useEffect(()=>{
    const fetchImageUrl = async () => {
      try {
        const datanft = await JSON.parse(localStorage.getItem("nftdata"))
        if(datanft){ 
         const newdata =  datanft.filter(x => x.id == id)
         const data = newdata[0]  
          return setSales({ name: data.metadata.name, hability1: data.metadata.hability1, level: data.metadata.level, rarity : data.metadata.rarity,
            hability2: data.metadata.hability2, hability3: data.metadata.hability3, image: data.metadata.image, id:data.metadata.id})
        }
        const contract = await ConnectInnomicNft() // conectar a el smart contract innomic
        const response = await contract.tokenURI(id);
        const uritokenn = await fetch(response);
        const uritokenjson = await uritokenn.json();
        const saless = await contract.ownerOf(id)
        setSales({ name: uritokenjson.name, hability1: uritokenjson.hability1, level: uritokenjson.level, rarity : uritokenjson.rarity,
          hability2: uritokenjson.hability2, hability3: uritokenjson.hability3, image: uritokenjson.image, id:saless})
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
    <div   style={{display:"flex", flexDirection:"column", position:"relative"}}>

      {/* <div className={styles.typegame}>
          <h2>Type Game</h2>
          <select><option> Terrabellum</option></select>
          <h2>ID # {id}</h2>
      </div> */}
      <div className={styles.owner}>
        { addres ? <p>{addres.seller.toString()}</p> :<p> { Sales && !addres && Sales.id}
        </p>  }
        
        {/* borrar */}
       {/* { Sales &&  id&& <p>Owner : {Sales[id-1].seller}  </p>} */}
      </div>

      <div   className={styles.containcharacterinfo} >
        <div className={styles.Character}>
          {/* { Sales && Sales.name == "Aifos" && <img src={"https://terrabellum.s3.sa-east-1.amazonaws.com/personajestb/AIFOS_prot_a.png"}/> }
          { Sales && Sales.name == "Capitan Union" && <img src={"https://terrabellum.s3.sa-east-1.amazonaws.com/personajestb/capitan_Tango_D.png"}/> }
          { Sales && Sales.name == "Red Spectre" && <img src={"https://terrabellum.s3.sa-east-1.amazonaws.com/personajestb/Ejemplo1..png"}/> } */}
    
        <h2 className={styles.idnft}>ID # {id}</h2>  
        <div className={styles.nft}>
          <button onClick={()=>back()} className={styles.back}>Back</button>
        { Sales ? 
         <PropsNftcartas 
         level={Sales.level}
         name={Sales.name}
         image={Sales.image} height={370}
         Rare={Sales.rarity}
         hability1={Sales.hability1}
         hability2={Sales.hability2}
         hability3={Sales.hability3}/>
         : 
         <PropsNftcartas />
        } 
        </div>
      
        
        
        <div >
            <form className={styles.sell}>
            <Image className={styles.logoInno} src={logotb}  />
                <p>INNO</p> <input type="number"  className={styles.priceinput}/> 
              {/* <div className={styles.sellbuttons}> */}
              {/* <button>Auction</button> */}
            {/* </div> */}
          </form> 
          <button className={styles.sellbutton} onClick={()=>venderNFT(id)} >Sell</button>
        </div>
         
        </div>

        <div className={styles.containhabilitys}>
          <div className={styles.habilitys}>
            <div className={styles.grouphabilitys}>
              { Sales && Sales.hability1 > 0 ? <Image className={styles.hability} src={habilidad1} alt="habilidad1" /> : <Image className={styles.hability} src={ha}/> }
              { Sales && Sales.hability2 > 0 ? <Image className={styles.hability} src={habilidad1} alt="habilidad1" /> : <Image className={styles.hability} src={ha}/> }
              { Sales && Sales.hability3 > 0 ? <Image className={styles.hability} src={habilidad1} alt="habilidad1" /> : <Image className={styles.hability} src={ha}/> }
            </div>
             
            <div className={styles.grouphabilityname}>
              {/* CAMBIAR LOS SALES.NAME */}
              {Sales && Sales.hability1 ? <button style={{margin:"0 auto"}}>{Sales.name}</button> : <button style={{margin:"0 auto"}}>Null</button>}
              {Sales && Sales.hability2 ? <button style={{margin:"0 auto"}}>{Sales.name}</button> :<button style={{margin:"0 auto"}}>Null</button>}
              {Sales && Sales.hability3 ? <button style={{margin:"0 auto"}}>{Sales.name}</button> : <button style={{margin:"0 auto"}}>Null</button>}
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.containhabilityinfo}>
              <p>Description</p>
              <p>Stats</p>
            </div>
            <div className={styles.description}>
              <p className={styles.descriptiontext}> 
               Description: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
            </div>
          </div>
        </div>
      </div>
   
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