import Link from 'next/link';
import styles from '../../src/styles/navbar/opcion.module.scss'


const Opcion = ()=>{
    return(
        <>
            <div className={styles.contain}>
                <Link href={'/'}> <button> Home </button>  </Link>
                <Link href={'/noticias'}> <button> News </button> </Link>
                <button>ScolarShips</button>
                <Link href={'/market'}> <button>Market</button></Link>
                
            </div>
            <div className={styles.containrigth}>
            </div>
        </>
    )
}

export default Opcion;