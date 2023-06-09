import Link from 'next/link';
import styles from '../../styles/navbar/opcion.module.scss'
import Image from 'next/image';
import market from '../../public/icon/shop-solid.svg'
import home from '../../public/icon/house-solid.svg'
import scolarship from '../../public/icon/file-signature-solid.svg'
import news from '../../public/icon/bullhorn-solid.svg'
import glob from '../../public/icon/globe.svg'
import shield from '../../public/icon/shield-heart-solid.svg'
import { useState } from 'react';
const Opcion = ()=>{
    const [homee, setHome] = useState(false)
    const [newss, setNews] = useState(false)
    const [clan, setClan] = useState(false)
    const [markets, setMarket] = useState(false)
    const [heross, setHeros] = useState(false)
    const clearstyles = ()=>{
        setHome(false)
        setNews(false)
        setMarket(false)
        setHeros(false)
    }
    return(
        <>
            <div className={styles.contain}>
                <div>
                    <Link onClick={()=>{clearstyles(); setHome(true)}} style={homee ? {backgroundColor:'rgba(255, 255, 255, 0.08)'} : null}  className={styles.option} href={'/'}>
                    <Image src={home} width={30} style={{margin: " 0 1rem"}} alt='Home'/>
                        <p> Home </p>  </Link>

                    <Link onClick={()=>{clearstyles(); setNews(true)}} style={newss ? {backgroundColor:'rgba(255, 255, 255, 0.08)'} : null} href={'/noticias'} className={styles.option}> 
                    <Image src={news} width={30} style={{margin: " 0 1rem"}} alt='News'/>
                        <p> News </p> </Link>
                    <Link onClick={()=>{clearstyles(); setNews(true)}} style={newss ? {backgroundColor:'rgba(255, 255, 255, 0.08)'} : null}  href={'/cambiame'} className={styles.option}>
                    <Image src={scolarship} width={30} style={{margin: " 0 1rem"}} alt='scolarships'/> 
                        <p>Clan account</p>
                        </Link>
                    <Link onClick={()=>{clearstyles(); setMarket(true)}} style={markets ? {backgroundColor:'rgba(255, 255, 255, 0.08)'} : null} href={'/market'}className={styles.option}> 
                    <Image src={market} width={30} style={{margin: " 0 1rem"}} alt='Market'/> 
                        <p>Market</p></Link>
                    <Link onClick={()=>{clearstyles(); setHeros(true)}} style={heross ? {backgroundColor:'rgba(255, 255, 255, 0.08)'} : null} href={'/heros'}className={styles.option}> 
                    <Image src={shield} width={30} style={{margin: " 0 1rem"}} alt='Market'/> 
                        <p>Heros</p></Link>
                </div>
                {/* potencial actualizacion */}
                <div style={{ position:"absolute", bottom: 60, left:20}}> 
                <div style={{display:"flex",flexDirection:"row", margin:"1rem"}}>
                    <Image src={glob} width={40} alt='language'/>
                    <h2>Es</h2>
                </div>
                </div>
            </div>
        </>
    )
}

export default Opcion;