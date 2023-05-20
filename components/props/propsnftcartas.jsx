import styles from "../../src/styles/props/propsnftcartas.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ha from '../../public/borrar/HABILIDAD3.webp'
import lvls from '../../public/borrar/Group 157.png'
const PropsNftcartas = ({ Href,name,Ida,Rare, Level, height, image }) => {
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
    { Rare==="normal" ? (
      // style={{width:width,height:height}}
      <div className={styles.cards} >
        <div className={styles.contain}>
          <img src={image} alt={`image from ${name}`} className={styles.nft}/>
          <div className={styles.absotule}>
            <div className={styles.containlvlnft}>
              <div className={styles.energi}></div>
              <Image alt={"image lvl nft"} src={ha} className={styles.lvlnft}/>
              <Image alt={"image lvl nft"} src={ha} className={styles.lvlnft}/>
              <Image alt={"image lvl nft"} src={ha} className={styles.lvlnft}/>
            </div>
            <p>{name}</p>
          </div>
          <div className={styles.habilitys}>
            <Image alt={`hability icon`}  className={styles.hability} src={ha}/>
            <Image alt={`hability icon`} className={styles.hability} src={ha}/>
            <Image alt={`hability icon`} className={styles.hability} src={ha}/>
            {/* <pre style={{fontSize: fontsize }} >Name  : {name} </pre>
            <pre style={{fontSize: fontsize }} >Rarity: {Rare}</pre>
            <pre style={{fontSize: fontsize }} >Level : {Level} </pre> */}
          </div>
        </div>
      </div>

    ) : Rare==="pococomun" ? (
      <div className={styles.cardsRare}>
      <div className={styles.contain}>
      <img src={img}  className={styles.nft}>
      </img>
      <div className={styles.hability}>
        <pre>Name  : {name} </pre>
        <pre>Rarity: {Rare}</pre>
        <pre>Level : {Level} </pre>
      </div>
      <h1>{Ida}</h1>
      </div>
    </div>

    ) : Rare==="legendaria" ? (
      <div className={styles.cardsLegendary}>
      <div className={styles.contain}>
      <img src={img}  className={styles.nft}>
      </img>
      <div className={styles.hability}>
      <pre>Name  : {name} </pre>
        <pre>Rarity: {Rare}</pre>
        <pre>Level : {Level} </pre>
      </div>
      <h1>{Ida}</h1>
      </div>
    </div>
    ): null}

    </div>
  );
};

export default PropsNftcartas;