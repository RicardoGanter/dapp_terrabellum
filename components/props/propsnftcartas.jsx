import styles from "../../src/styles/props/propsnftcartas.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ha from '../../public/borrar/HABILIDAD3.webp'
import lvls from '../../public/borrar/Group 157.png'
import rdsp from '../../public/borrar/spectre_plus1.jpg'
const PropsNftcartas = ({ Href,name,Ida,Rare, level, height, image, hability1, hability2, hability3 }) => {
  const width = height * 0.7
  const [size_pre , setsize_pre] = useState();
  const [fontsize, setFontsize] = useState();
  useEffect(() => {
    const size = height/ 25 + "px"
    setFontsize(size)
      const tonumber = Number(size.replace("px", ""))
      const a =   tonumber * 3 + 40
      if ( height > 40 ){
        const lal = height / 40
        setsize_pre( a + lal)
      }
      //  400 = 50   800 = 60   200 = 45  100 = 42.5 0 = 40 
  },[])
   
  // <Link className={styles.link} href={`/market/${Href}`}>
  return (
    <div className={styles.link}>
      <div className={styles.cards} 
      style={
        Rare && Rare==1 ? {backgroundColor:"#45C7FF"}
        : Rare== 3 ? { backgroundColor:"#FFE145" }
        :null
      
      
      }>
        <div className={styles.contain}>
          { image ? <img src={image}  alt={`image from ${name}`} className={styles.nft}/>     
                  : <div style={{backgroundColor:"black", opacity:"90%"}}> 
                      <img src={"https://terrabellum.s3.sa-east-1.amazonaws.com/imagencharacter/unknow.jpg"}
                      style={{opacity:"50%"}} alt={`image from ${name}`} className={styles.nft}/> 
                    </div>    
          }
          <div className={styles.absotule} style={ Rare && Rare == 3 ? {backgroundColor:"#D1B00066"} : Rare== 1 ? {backgroundColor:"#0D42493B", 
boxShadow:"inset 0px 0.5px 4px #45C7FF"}: null }>
            <div className={styles.containlvlnft}>
              { hability1 && !hability2 && !hability3 ? <div className={styles.energi} style={{width:"20%"}} />
              : hability1 && hability2 && !hability3? <div className={styles.energi} style={{width:"50%"}} />
              : hability1 && hability2 && hability3? <div className={styles.energi} style={{width:"100%"}} />
              : null  
              }

              {  level >= 1 ? <Image alt={"image lvl nft"} src={ha} className={styles.lvlnft}/>
              :  <div  style={{opacity:"70%", backgroundColor:"grey"}} className={styles.lvlnft}/>
              }

              { level >= 2 ?   <Image alt={"image lvl nft"} src={ha} className={styles.lvlnft}/>
              : <div  style={{opacity:"70%", backgroundColor:"grey"}} className={styles.lvlnft}/>
              }

              {
                level === 3 ? <Image alt={"image lvl nft"} src={ha} className={styles.lvlnft}/>
              :  <div  style={{opacity:"70%", backgroundColor:"grey"}} className={styles.lvlnft}/>
              }

            </div>
            <p>{name}</p>
          </div>
          <div className={styles.habilitys} style={ Rare && Rare == 3  ? { backgroundColor:"#E0C11F"} : Rare== 1 ? {backgroundColor:"#4086B8"}: null}>
            { hability1 ? <Image alt={`hability icon`}  className={styles.hability} src={ha}/>
                        : <Image alt={`hability icon`} style={{opacity:"30%"}} className={styles.hability} src={ha}/>
            }
            { hability2 ? <Image alt={`hability icon`}  className={styles.hability} src={ha}/>
                        : <Image alt={`hability icon`} style={{opacity:"30%"}} className={styles.hability} src={ha}/>
            }
            { hability3 ? <Image alt={`hability icon`}  className={styles.hability} src={ha}/>
                        : <Image alt={`hability icon`} style={{opacity:"30%"}} className={styles.hability} src={ha}/>
            }
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropsNftcartas;