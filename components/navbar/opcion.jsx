import Link from 'next/link';
import styles from '../../src/styles/navbar/opcion.module.scss'


const Opcion = ()=>{
    return(
        <>
            <div className={styles.contain}>
                <Link href={'/'}>Home</Link>
                <Link href={'/noticias'}>Noticias</Link>
                <div>Becas</div>
                <Link href={'/market'}>Market</Link>
                
            </div>
            <div className={styles.containrigth}>
            </div>
        </>
    )
}

export default Opcion;