"use client"
import Image from "next/image"
import Link from "next/link"
import styles from '../../../styles/header/login/login.module.scss'
import { useState, useEffect, useRef } from "react"
// import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
// import { signOut } from "next-auth/react" 
import notification from '../../../public/bell-solid 6.svg'
import Cookies from 'js-cookie'; 
import glob from '../../../public/Vector 13.svg'
import tokenicon from '../../../public/img/TOKEN_1.webp'  

const Login = ()=>{
    const router = useRouter(); 
    const [perfil, setPerfil] = useState(false)
    const [token,setToken] = useState(null)  
    const [userinno, setUserinno] = useState(false)
    // const [session, setSession] = useState(null)
    const Signin = ()=> router.push('/signin')
    const Register = ()=>router.push('/register')
    // const { data: session, status } = useSession()  
    const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
    useEffect( ()=>{
      const lol =async ()=>{
        const token = Cookies.get('token'); 
        const user = Cookies.get('userdata') 
        if(token){ 
          setToken(token)
        } 
        if(user){ 
            const imageuser = JSON.parse(user)
            const a = imageuser 
            setUserinno(a) 
        }  
        if(!user && token){   
          const response = await ( await fetch(`${URI}getuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: token })
          }) ).json()
          if(response ){ 
            const data = await response 
            const datauser = Cookies.set('userdata', JSON.stringify(data)) 
              const a = await data
              return setUserinno(a) 
          } }  
        } 
        lol()
    },[] )   
     const deletcookie =()=>{ 
       Cookies.remove('token');
       Cookies.remove('userdata')
       setToken(null); 
       setUserinno(null)
       return  window.location.reload() 
        
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
            <div>
                { !userinno ? <div className={styles.contain}><Image className={styles.globimage} alt="glob icon" src={glob}/> <button className={styles.btnopc} onClick={()=>Signin()}>Login</button> <button className={styles.btnopc} onClick={()=>Register()}>Register</button> </div>
                    : userinno? <div className={styles.contain}> <Image className={styles.globimage} src={glob} alt="glob icon"/><Image src={notification} alt="notificacion" height={35} style={{margin:"0 1rem"}}/> <div className={styles.moneyinno}> <Image height={35} style={{margin:"0 .4rem"}} src={tokenicon} alt="Token Innomic GameChanger"/> INNO <p> 10000 </p></div>  <div  className={styles.containdatauser}   id="lol" onMouseEnter={()=>setPerfil(true)} onMouseLeave={()=>setPerfil(false)} > {userinno && <p>{userinno.nombre}</p>}  <img className={styles.imgheader} src={userinno ? userinno.image : null}  alt='img perfil'/>  { token && perfil?
                      <div className={styles.contain_perfil}>
                          <div  > 
                          <Link className={styles.containtext} href={'/user/statistics'}> <p>Stats</p></Link>
                          <Link className={styles.containtext} href={'/user/inventario'}> <p>Inventory</p></Link>
                          <Link className={styles.containtext} href={'/user/fusion'}> <p>Fusion</p></Link>
                          <Link className={styles.containtext} href={'/user/setting/account'}> <p>Setting</p> </Link>
                           {
                               
                          //  <Link href={'/'} className={styles.containtext} onClick={()=> signOut()}> <p>Sign out</p></Link>
                          userinno && <Link href={'/'} onClick={()=> deletcookie()} className={styles.containtext}> <p>Sign out</p></Link>  
                           }
                          </div> 
                      </div> 
                  :null }</div> </div> : null}
                    {/* perfil autenticado */}
                   
            </div>
        )
}
export default Login;