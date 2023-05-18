"use client"
import styles from "../../../styles/user/fusion.module.scss";
import img from '../../../../public/img/lal.webp'
import Image from "next/image";
import { ethers } from "ethers";
import { useEffect,useState } from "react";
import PropsNftcartas from "../../../../components/props/propsnftcartas";

const Fusion = () => {
    
  return (
    <>
        <div className={styles.contain}>
            {/* TOP */}
            <div>
            <div className={styles.containnfts}>
              {/* FILTERS */}
              <div className={styles.filter}>
                <div className={styles.filter1}>
                  <div className={styles.filterinput}>
                    <p>Characters</p>
                    <input type="text" />
                  </div>
                  <div className={styles.filterinput}>
                    <p>Skills</p>
                    <input type="text" />
                  </div>
                 <div className={styles.filterinput}>
                  <p>Rarity</p>
                  <input type="text" /> 
                 </div>
                  <div className={styles.filterinput}> 
                    <p> Level </p>
                    <div>
                      <p>1</p>
                    </div>
                    <div>
                      <p>2</p>
                    </div>
                    <div>
                      <p>3</p>
                    </div>
                    {/* <input type="checkbox" name="" id="" />
                    <input type="checkbox" name="" id="" />
                    <input type="checkbox" name="" id="" />  */}
                  </div>
                </div>
              </div>
              {/* FILTERS */}

              {/* NFTS */}
              <div className={styles.nfts}>
                <PropsNftcartas Rare="normal" height={270} />
                <PropsNftcartas Rare="normal" height={270} />
                <PropsNftcartas Rare="normal" height={270} />
                <PropsNftcartas Rare="normal" height={270} />
                <PropsNftcartas Rare="normal" height={270} />
                <PropsNftcartas Rare="normal" height={270} />
                <PropsNftcartas Rare="normal" height={270} />
                <PropsNftcartas Rare="normal" height={270} />
              </div>
              {/* NFTS */}
            </div>

            <div className={styles.fusionnft}>
              <div className={styles.containfusionnft}>
                <PropsNftcartas Rare="normal" height={250} />
                <PropsNftcartas Rare="normal" height={250} />
                <PropsNftcartas Rare="normal" height={250} />
              </div>
            </div>
            </div>
            {/* TOP */}


              {/* BOTTOM */}
            <div className={styles.containtypemerge}>
              {/* TYPE OF MERGE ?  */}
              <div className={styles.top}>

              <div className={styles.left}>
                <PropsNftcartas Rare="normal" height={320}/>
                <h1 className={styles.fusion}>merge</h1>
              </div>
              
              <div className={styles.right}>
                <div><h1>hability1</h1> <h1>hability2</h1> <h1>hability3</h1></div>                
                <h1>unmerge</h1>
              </div>

              </div>
                {/* FUNCION FUSION */}
              <div className={styles.bottom}>
                  <PropsNftcartas Rare="normal" height={300} />
                  
                  <div className={styles.containcircle}> 
                    <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                      <div className={styles.circleG}/> 
                      <h3>66%</h3>
                  </div> 
                  <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                     <div className={styles.circleM}/>
                     <h3>33%</h3>
                  </div>
                  <button>Merge</button>
                  </div>
              </div>
            </div>
              {/* BOTTOM */}
        </div>
    </>
  );
};

export default Fusion;
    