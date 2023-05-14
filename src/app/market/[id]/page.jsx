"use client"
import { useRouter } from 'next/navigation';
import styles from '../../../styles/idmarket/idmarket.module.scss'
import personaje from '../../../../public/borrar/Ejemplo1..png'
import habilidad3 from '../../../../public/borrar/HABILIDAD3.webp'
import habilidad2 from '../../../../public/borrar/HABILIDAD2.webp'
import habilidad1 from '../../../../public/borrar/HABILIDAD1.webp'

import tb from '../../../../public/img/logo.webp'
import Image from 'next/image'


function DestinationPage({params}) {
  // const router = useRouter();
  // const { id } = router.query;
  const router = useRouter();
  const { id } = params;
  
  console.log(encodeURIComponent(params))
  return (
    <div style={{display:"flex", flexDirection:"column", margin:"160px 120px 0 200px", position:"relative"}}>

      <div className={styles.typegame}>
          <h2>Type Game</h2>
          <select><option> Terrabellum</option></select>
          <h2>ID #{id}</h2>
      </div>
      <div className={styles.owner}>
        {/* borrar */}
        <p>Owner: 0x41603311FC9A25E16c90Df3c1F2CeFf2D36BeD69</p>
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
            Description : aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
          </div>
        </div>
      </div>
      <form className={styles.sell}>
        <input type="number" className={styles.priceinput}/> 
        <div className={styles.sellbuttons}>
          <button>Sell</button>
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