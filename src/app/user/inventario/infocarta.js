import styles from "../../../styles/user/inventario/infocarta.module.scss";
import PropsNftcartas from "../../../../components/props/propsnftcartas";
import img from '../../../../public/img/lal.png'
import Image from "next/image";
import { ethers } from "ethers";
// import connectWallet from "@/etherjs/borrador";
// import connectWallet,{web3Modal} from "@/etherjs/borrador";
import { useEffect,useState } from "react";
// import getAddress from "./getaddress";
// import getNFTs from "./idnft";
const InfoNft = () => {
    const [fusion, setFusion]= useState(false)
    const [confirmfusion, setConfirmfusion]= useState(true)
    const [confirmdefusion, setConfirmdefusion]= useState(false)
    const switchfusion = ()=>{
      if(confirmfusion===true){
        setConfirmfusion(!confirmfusion)
      }
    }
    const switchdefusion = ()=>{
      if(confirmdefusion===true){
        setConfirmdefusion(!confirmdefusion)
      }
    }
  return (
    <>
        <div className={styles.contain}>
          <div className={styles.info}>
            <div className={styles.infoleft}>
                <PropsNftcartas/>
                <div className={styles.sell}>
                    <div>Vender </div>
                    <div>Subastar</div>
                </div>
                <div className={styles.fusion} onClick={()=>{setFusion(!fusion)}} >Fusion/desfusion</div>
            </div>
            {/* --------------------------------------- */}
            <div className={styles.inforight}>
              <div className={styles.containhabilidades}>
                <Image src={img} alt='lol'/>
                <Image src={img} alt='lol'/>
                <Image src={img} alt='lol'/>
              </div>
              <div className={styles.infohabilidades}>
               <div>asdasdasdasdasdadasd mamamam huevo fluglguglguggluggklgu</div>
              </div>
            </div>
          </div>
          {/* --------------------FUSION-------------------- */}
          { fusion ? 
          <div className={styles.containfusion}>
            <div className={styles.nftfusion}>aaaa</div>
            <div className={styles.cartsfusion}>
                <PropsNftcartas/>
                <PropsNftcartas/>
                <PropsNftcartas/>
            </div>
            <div className={styles.btndefusion}> 
                <div onClick={()=>{setConfirmfusion(!confirmfusion),switchdefusion()}}>fusion</div>
                <div onClick={()=>{setConfirmdefusion(!confirmdefusion),switchfusion()}}>defusion</div>
            </div>
              { confirmfusion ? 
              
              <div onClick={()=>{connectWallet()}} className={styles.btnaceptfusion}>confirmar fusion</div>  
              :null
            }
            { confirmdefusion ?

              <div onClick={()=>{connectWallet()}} className={styles.btnaceptfusion}>confirmar defusion</div>  
              :null

            }
          </div> : null}
          
        </div>
        <PropsNftcartas/>
    </>
  );
};

export default InfoNft;
