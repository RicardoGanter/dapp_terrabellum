"use client"
import Image from "next/image"
import Link from "next/link"
import styles from '../../../styles/header/login/login.module.scss'
import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react"
import imagenperfil from '../../../public/img/lal.webp'
import notification from '../../../public/icon/bell-regular.svg'
import Cookies from 'js-cookie'; 
import borrar from '../../../public/img/cofre.png'
import axios from "axios"
import glob from '../../../public/icon/globe.svg'
import tokenicon from '../../../public/img/TOKEN_1.png'

const Login = ()=>{
    const router = useRouter();
    const contenedorRef = useRef(false);
    // const [status, setStauts] = useState(null)
    const [perfil, setPerfil] = useState(false)
    const [token,setToken] = useState(null)  
    const [userinno, setUserinno] = useState(false)
    // const [session, setSession] = useState(null)
    const Signin = ()=> router.push('/signin')
    const Register = ()=>router.push('/register')
    const { data: session, status } = useSession()  
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
            const a = imageuser.image 
            setUserinno(a) 
        }  
        if(!user && token){ 
          console.log("lal")
          const response = await axios.post(`${URI}getuser`,{id : token}); 
          if(response && response.data){
            const data = await response.data
            const datauser = await Cookies.set('userdata', JSON.stringify(data))  
              const a = await data.image
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
     if (perfil) {
        const handleClick = (event) => {
          if (!event.target.matches("#lol")) {
            setPerfil(false)
          }
        }; 
        document.addEventListener("click", handleClick);
      } 
        return(
            <div>
                { status==="unauthenticated" && !userinno ? <div className={styles.contain}><Image className={styles.globimage} src={glob}/> <button className={styles.btnopc} onClick={()=>Signin()}>Login</button> <button className={styles.btnopc} onClick={()=>Register()}>Register</button> </div>
                    : session || userinno? <div className={styles.contain}> <Image className={styles.globimage} src={glob}/><Image src={notification} alt="notificacion" height={35} style={{margin:"0 1rem"}}/> <div className={styles.moneyinno}> <Image height={30} src={tokenicon} />  5871600</div> <img  id="lol" onClick={()=>setPerfil(!perfil)} className={styles.imgheader} src={userinno ? userinno : session ? session.user.image  : null}  alt='img perfil'/></div> : null}
                    {/* perfil autenticado */}
                    {  session || token && perfil?
                    <div  style={{zIndex:"6"}} className={styles.contain_perfil}>
                        <div  style={{margin:'3.5rem 0 0 0', display:'flex', flexDirection:'column'}}> 
                        <Link href={'/user/statistics'}> <button>Stats</button></Link>
                        <Link href={'/user/inventario'}> <button>Inventory</button></Link>
                        <Link href={'/user/fusion'}> <button>Fusion</button></Link>
                        <Link href={'/user/setting/account'}> <button>Setting</button> </Link>
                         {
                            session?
                         <Link href={'/'} onClick={()=> signOut()}> <button>Sign out</button></Link>
                         : token || userinno? <Link href={'/'} onClick={()=> deletcookie()}> <button>Sign out</button></Link> : null
                         }
                        </div> 
                    </div> 
                :null }
            </div>
        )
}
export default Login;