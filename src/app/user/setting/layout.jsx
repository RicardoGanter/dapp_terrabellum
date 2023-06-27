import styles from '../../../styles/user/setting/setting.module.scss'
import Link from 'next/link'  
import User from '../layout'
const Setting = ({children})=>{  
    return (
        <User> 
        <div className={styles.contain}>
            <div className={styles.containlinks}>  
                <Link  className={styles.links} href={'/user/setting/account'}><p>Account</p>  </Link>
                <Link  className={styles.links} href={'/user/setting/security'}><p>Security</p></Link>
                <Link  className={styles.links} href={'/user/setting/wallet'}><p>Wallet</p> </Link> 
            </div> 
            <div className={styles.childrens}>
                { children } 
            </div>
        </div> 
        </User> 
    )
}  
export const Title = ({title})=>{
    return(
        <div className={styles.containtitle}>
            <h1>{title}</h1>
            <div className={styles.linearhorizontal}/>
        </div>
    )
} 
export default Setting