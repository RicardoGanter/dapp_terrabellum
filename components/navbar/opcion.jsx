import Link from 'next/link';
import styles from '../../src/styles/navbar/opcion.module.scss'
import Image from 'next/image';
import market from '../../public/icon/shop-solid.svg'
import home from '../../public/icon/house-solid.svg'
import scolarship from '../../public/icon/file-signature-solid.svg'
import news from '../../public/icon/bullhorn-solid.svg'
import glob from '../../public/icon/globe.svg'
import shield from '../../public/icon/shield-heart-solid.svg'

const Opcion = ()=>{
    return(
        <>
            <div className={styles.contain}>
                <div>
                    <Link className={styles.option} href={'/'}>
                    <Image src={home} width={30} style={{margin: " 0 1rem"}} alt='Home'/>
                        <p> Home </p>  </Link>
                    <Link href={'/noticias'} className={styles.option}> 
                    <Image src={news} width={30} style={{margin: " 0 1rem"}} alt='News'/>
                        <p> News </p> </Link>
                    <Link href={'/cambiame'} className={styles.option}>
                    <Image src={scolarship} width={30} style={{margin: " 0 1rem"}} alt='scolarships'/> 
                        <p>ScolarShips</p>
                        </Link>
                    <Link href={'/market'}className={styles.option}> 
                    <Image src={market} width={30} style={{margin: " 0 1rem"}} alt='Market'/> 
                        <p>Market</p></Link>
                    <Link href={'/heros'}className={styles.option}> 
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