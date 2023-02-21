import Link from 'next/link';
import styles from '../src/styles/opcion.module.css'


const Opcion = ()=>{
    return(
        <>
            <div className={styles.contain}>
                <Link href={'/'}>Home</Link>
                <Link href={'/noticias'}>Noticias</Link>
                <Link href={'/market'}>Market</Link>
                <div>Becas</div>
            </div>
            <div className={styles.containrigth}>
            </div>
        </>
    )
}

export default Opcion;