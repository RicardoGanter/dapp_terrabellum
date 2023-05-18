import styles from "../../src/styles/props/propsnftcartas.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
const PropsNftcartas = ({ Href,name,img,Ida,Rare, Level, height }) => {
  
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
      <div className={styles.cards} style={{width:width,height:height}}>
      <div className={styles.contain}>
      <img src={img}  className={styles.nft}  height={height - size_pre}/>
      <div className={styles.hability}>
        <pre style={{fontSize: fontsize }} >Name  : {name} </pre>
        <pre style={{fontSize: fontsize }} >Rarity: {Rare}</pre>
        <pre style={{fontSize: fontsize }} >Level : {Level} </pre>
      </div>
      {/* <h1>{Ida}</h1> */}
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