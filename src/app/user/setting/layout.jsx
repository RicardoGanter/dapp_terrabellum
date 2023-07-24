"use client"
import styles from '../../../styles/user/setting/setting.module.scss'  
import User from '../layout'
import { useRouter } from 'next/navigation'
import '../../../styles/globals.scss'
const Setting = ({children})=>{  
    const asdasd= "/user/setting/account"
    const router = useRouter()
    const mondongo = ( link )=>{ 
        const nocxd = document.getElementById('blablalbalblabla')
        nocxd.style.viewTransitionName = 'full-embed';
        function updateTheDOMSomehow(){ 
            router.push( `${link}` )  
            setTimeout(() => {
                nocxd.style.viewTransitionName = '';
            }, 1600); 
        }
        document.startViewTransition(()=>{    
            updateTheDOMSomehow()
        }) 
      }
    return (
        <User> 
        <div className={styles.contain}>
            <div className={styles.containlinks}>  
                 <p onClick={()=> mondongo( "/user/setting/account" )}>Account</p>  
                 <p onClick={()=> mondongo( "/user/setting/security" )}>Security</p> 
                 <p onClick={()=> mondongo( "/user/setting/wallet" )}>Wallet</p> 
            </div> 
            <div id='blablalbalblabla' className={styles.childrens}>
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