"use client"
import Image from "next/image"
import Link from "next/link"
import styles from '../../../styles/header/login/login.module.scss'
import { useState, useEffect, use } from "react"
// import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
// import { signOut } from "next-auth/react" 
import notification from '../../../public/bell-solid 6.svg'
import Cookies from 'js-cookie';  
import tokenicon from '../../../public/img/TOKEN_1.webp'  
import { GetUserData } from "../../../utils/GetLocalStorage/getUserData"
import ConnectInnomicNft from "../../funcion/connectinnomicnft"
import { get } from "http"

const Login = ()=>{
    const router = useRouter(); 
    const [perfil, setPerfil] = useState(false)
    const [token,setToken] = useState(null)  
    const [userinno, setUserinno] = useState(false) 
    const [Addresstemp, setAddresstemp] = useState(false)

    // const [session, setSession] = useState(null)
    const Signin = ()=> router.push('/signin')
    const Register = ()=>router.push('/register')
    // const { data: session, status } = useSession()  .
    const [balance, setBalance] = useState('Loading...'); 
    useEffect( ()=>{
      const lol =async ()=>{
          const resultUser = await GetUserData()
          if(resultUser){
            return setUserinno(resultUser)  
          } 
        } 
        lol()
    },[] )    
    useEffect(()=>{ 
      const getAddress = localStorage.getItem("Addresstemp"); 
      if(getAddress){ 
        return setAddresstemp(getAddress.substr(0,6) + "...")
      }
    },[])
     const deletcookie =()=>{ 
       Cookies.remove('token');
       Cookies.remove('userdata')
       localStorage.removeItem("Addresstemp");
       setAddresstemp(false)
       setToken(null); 
       setUserinno(null)
       return  window.location.reload() 
        
     }
     const ConnectWallet = async ()=>{
      const connectedWallet = await ConnectInnomicNft()
      if (connectedWallet){
        const getAddress = window.ethereum.selectedAddress 
        localStorage.setItem("Addresstemp", getAddress);  
        setAddresstemp(getAddress.substr(0,6) + " ...")
      }
     }
    //muito importante
    //  if (perfil) {
    //     const handleClick = (event) => {
    //       if (!event.target.matches("#lol")) {
    //         setPerfil(false)
    //       }
    //     }; 
    //     document.addEventListener("click", handleClick);
    //   } 
        return(
            <div style={{display:"flex"}}> 
                { !userinno && !Addresstemp ? <div className={styles.contain}> <button className={styles.btnopc} onClick={()=>Signin()}>Login</button> <button className={styles.btnopc} onClick={()=>Register()}>Register</button> </div>
                    : userinno || Addresstemp ? <div className={styles.contain}> <Image src={notification} alt="notificacion" height={30} style={{margin:"0 1rem"}}/> <div className={styles.moneyinno}> <Image height={30} style={{margin:"0 .4rem"}} src={tokenicon} alt="Token Innomic GameChanger"/> INNO <p> 10000 </p></div>  <div  className={styles.containdatauser}   id="lol" onMouseEnter={()=>setPerfil(true)} onMouseLeave={()=>setPerfil(false)} >  {userinno && <p> {userinno.data.nombre}</p>}{Addresstemp && <p> {Addresstemp}</p>}  <img id="imageFromHeader" className={styles.imgheader} src={userinno && userinno.data.image}  alt='img perfil'/>  {  perfil?
                      <div className={styles.contain_perfil}>
                          <div  > 
                          { userinno && <Link className={styles.containtext} href={'/user/statistics'}> <p>Stats</p></Link>}
                          <Link className={styles.containtext} href={'/user/inventory'}> <p>Inventory</p></Link>
                          <Link className={styles.containtext} href={'/user/fusion'}> <p>Fusion</p></Link>
                           { userinno && <Link className={styles.containtext} href={'/user/setting/account'}> <p>Setting</p> </Link>}
                           { 
                          //  <Link href={'/'} className={styles.containtext} onClick={()=> signOut()}> <p>Sign out</p></Link>
                          <Link href={'/'} onClick={()=> deletcookie()} className={styles.containtext}> <p>Sign out</p></Link>  
                           }
                          </div> 
                      </div> 
                  :null }</div> </div> : null}
                    {/* perfil autenticado */}
                    {!Addresstemp && !userinno && <button onClick={ ()=> ConnectWallet() } className={styles.btnopc}>Connect wallet</button>}  
            </div>
        )
}
export default Login;