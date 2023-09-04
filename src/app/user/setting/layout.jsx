"use client"
import styles from '../../../styles/user/setting/setting.module.scss'  
import User from '../layout'
import { useRouter } from 'next/navigation'
import '../../../styles/globals.scss' 
import Image from 'next/dist/client/image'
import iconWallet from '../../../public/icon/🦆 icon _wallet_.svg'
import iconProfile from '../../../public/icon/🦆 icon _profile circled_@2x.svg'
import iconLock from '../../../public/icon/lock-solid.svg'
import { useEffect,useContext } from 'react'; 
import { User_data } from '../../layout' 
import { GetUserData } from '../../../utils/GetLocalStorage/getUserData';
const Setting = ({children})=>{  
    const asdasd= "/user/setting/account"
    const router = useRouter()
    const { userdataglobal, updateuserdataglobal } = useContext(User_data); 
    
    useEffect(()=>{  
    const getUserStorage = async () => { 
    const { data } = await GetUserData() 
    if( !data ){
      return router.push('/')
    }
    updateuserdataglobal(data) 
    } 
    getUserStorage()
  },[]) 
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
                <div className={styles.flex}><Image src={iconProfile} height={30} />  <p onClick={()=> mondongo( "/user/setting/account" )}>Account</p>  </div>
                <div className={styles.flex} > <Image src={iconWallet} height={30} />  <p onClick={()=> mondongo( "/user/setting/security" )}>Security</p> </div>
                <div className={styles.flex}><Image src={iconLock} height={30} /> <p onClick={()=> mondongo( "/user/setting/wallet" )}>Wallet</p> </div>
            </div> 
            { userdataglobal && 
            <div id='blablalbalblabla' className={styles.childrens}>
                { children } 
            </div>
            }
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