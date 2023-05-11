import Link from 'next/link';
import styles from '../../src/styles/navbar/opcion.module.scss'
import Image from 'next/image';
import market from '../../public/icon/shop-solid.svg'
import home from '../../public/icon/house-solid.svg'
import scolarship from '../../public/icon/file-signature-solid.svg'
import news from '../../public/icon/bullhorn-solid.svg'

const Opcion = ()=>{
    return(
        <>
            <div className={styles.contain}>
                <div>
                    <Link className={styles.option} href={'/'}>
                    <Image src={home} width={30} style={{margin: " 0 1rem"}}/>
                        <p> Home </p>  </Link>
                    <Link href={'/noticias'} className={styles.option}> 
                    <Image src={news} width={30} style={{margin: " 0 1rem"}}/>
                        <p> News </p> </Link>
                    <Link href={'/cambiame'} className={styles.option}>
                    <Image src={scolarship} width={30} style={{margin: " 0 1rem"}}/> 
                        <p>ScolarShips</p>
                        </Link>
                    <Link href={'/market'}className={styles.option}> 
                    <Image src={market} width={30} style={{margin: " 0 1rem"}}/> 
                        <p>Market</p></Link>
                </div>
            </div>
        </>
    )
}

export default Opcion;