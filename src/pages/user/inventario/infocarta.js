import Layout from "@/components/layout";
import styles from "../../../styles/user/inventario/infocarta.module.scss";
import PropsNftcartas from "@/components/props/propsnftcartas";
import img from '../../../../public/img/lal.png'
import Image from "next/image";
import Funcioncontract from "@/etherjs/goerlialchemy";
import { getStoredAddress } from "@/components/loginmetamask";

import { useEffect,useState } from "react";
const InfoNft = () => {
    const [fusion, setFusion]= useState(false)
    
setTimeout(() => {
    const address = getStoredAddress();
    console.log(address);
  }, 1000);

  return (
    <>
      <Layout>
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
               <p> asdasdasdasdasdadasd mamamam huevo fluglguglguggluggklgu</p>
              </div>
            </div>
          </div>
          { fusion ? 
          <div className={styles.containfusion}>
            <div className={styles.cartsfusion}>
                <PropsNftcartas/>
                <PropsNftcartas/>
                <PropsNftcartas/>
            </div>
            <div className={styles.btndefusion}> 
                <div onClick={()=>{Funcioncontract()}}>fusion</div>
                <div onClick={()=>{}}>defusion</div>
            </div>
            <div onClick={()=>{}} className={styles.btnaceptfusion}>confirmar</div>
          </div> : null}
          
        </div>
      </Layout>
    </>
  );
};

export default InfoNft;
