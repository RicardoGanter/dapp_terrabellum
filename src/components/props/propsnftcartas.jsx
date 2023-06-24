import styles from "../../styles/props/propsnftcartas.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ha from '../../public/borrar/HABILIDAD3.webp' 
const PropsNftcartas = ({ Href,name, Rare, level, height, image, hability1, hability2, hability3 }) => {
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
      <div className={`${styles.cards} ${Rare === 1 ? styles.cardsblue : Rare === 3 ? styles.cardsgold : ''}`}
      style={ 

        Rare && Rare==1 ?  {backgroundColor:"#45C7FF"}
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
              { hability1 && !hability2 && !hability3 ? <div className={styles.energi} 
              style={{ width: "20%", 
              ...(Rare === 1 ? { backgroundColor: "#45C7FF",boxShadow:"0px 0px 6px 5px #1594CA" } 
              : Rare === 3 ? { backgroundColor: "#FFE145",boxShadow:"0px 0px 6px 5px #E0C11F" } : null) }} />


              : hability1 && hability2 && !hability3? <div className={styles.energi} style={{width:"50%",
              ...(Rare === 1 ? { backgroundColor: "#45C7FF",boxShadow:"0px 0px 6px 5px #1594CA" } 
              : Rare === 3 ? { backgroundColor: "#FFE145",boxShadow:"0px 0px 6px 5px #E0C11F" } : null)}} />
              : hability1 && hability2 && hability3? <div className={styles.energi} style={{width:"100%",
              ...(Rare === 1 ? { backgroundColor: "#45C7FF",boxShadow:"0px 0px 6px 5px #1594CA" } 
              : Rare === 3 ? { backgroundColor: "#FFE145",boxShadow:"0px 0px 6px 5px #E0C11F" } : null)}} />
              : null  
              }

              {  level >= 1 ? <div className={styles.lvlnft} 
              style={ Rare == 1 ? {backgroundColor:"#45C7FF", boxShadow:"0px 0px 6px 5px #1594CA"}  
                    : Rare == 2 ? {backgroundColor:"#e015ff", boxShadow:"0px 0px 6px 5px #9C26B0"}
                    : Rare == 3 ? {backgroundColor:"#FFE145", boxShadow:"0px 0px 6px 5px #E0C11F"}
                    : null}/>
              :  <div  style={{opacity:"70%", backgroundColor:"grey"}} className={styles.lvlnft}/>
              }

              { level >= 2 ?  
                <div style={ 
                  Rare == 1 ? {backgroundColor:"#45C7FF", boxShadow:"0px 0px 6px 5px #1594CA"}
                  :  Rare == 2 ? {backgroundColor:"#e015ff", boxShadow:"0px 0px 6px 5px #9C26B0"}
                  :  Rare == 3 ? {backgroundColor:"#FFE145", boxShadow:"0px 0px 6px 5px #E0C11F"}: null} className={styles.lvlnft}/>
              : <div  style={{opacity:"70%", backgroundColor:"grey"}} className={styles.lvlnft}/>
              }

              {
                level === 3 ? <div style={ 
                  Rare == 1 ? {backgroundColor:"#45C7FF", boxShadow:"0px 0px 6px 5px #1594CA"}
                : Rare == 2 ? {backgroundColor:"#e015ff", boxShadow:"0px 0px 6px 5px #9C26B0"}
                : Rare == 3 ? {backgroundColor:"#FFE145", boxShadow:"0px 0px 6px 5px #E0C11F"}: null} className={styles.lvlnft}/>
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