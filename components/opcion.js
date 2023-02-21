import Link from 'next/link';
import styles from '../src/styles/opcion.module.css'


const Opcion = ()=>{
    return(
        <>
            <div className={styles.contain}>
                <Link href={'/'}>Home</Link>
                <Link href={'/market'}>Compras</Link>
                <div>Becas</div>
            </div>
        </>
    )
}

export default Opcion;