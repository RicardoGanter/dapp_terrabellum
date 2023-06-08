"use client"
import Image from "next/image"
import Link from "next/link"
import styles from '../../../styles/header/login/login.module.scss'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react"
import imagenperfil from '../../../public/img/lal.webp'
import notification from '../../../public/icon/bell-regular.svg'
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');
import borrar from '../../../public/img/cofre.png'

const Login = ()=>{
    const router = useRouter();
    // const [status, setStauts] = useState(null)
    const [perfil, setPerfil] = useState(false)
    const [token,setToken] = useState(null)
    // const [session, setSession] = useState(null)
    const Signin = ()=> router.push('/signin')
    const Register = ()=>router.push('/register')
    const { data: session, status } = useSession()  
    useEffect(()=>{
        const token = Cookies.get('token');
        if(token){
            setToken(token)
        }
    },[])  
     const deletcookie =()=>{
        Cookies.remove('token');
        Cookies.remove('userdata') 
        setToken(null);
     }
        return(
            <div>
                { status==="unauthenticated" && !token ? <div> <button className={styles.btnopc} onClick={()=>Signin()}>Login</button> <button className={styles.btnopc} onClick={()=>Register()}>Register</button> </div>
                    : session || token ? <div className={styles.contain}><Image src={notification} alt="notificacion" width={30} style={{margin:"0 1rem"}}/> <div className={styles.moneyinno}>INNO  66666666</div> <img onClick={()=>setPerfil(!perfil)} className={styles.imgheader} src={session ? session.user.image : borrar}  alt='img perfil'/></div> : null}
                    {/* perfil autenticado */}
                    {  session || token && perfil?
                    <div className={styles.contain_perfil}>
                        <div style={{margin:'5rem 0 0 0', display:'flex', flexDirection:'column'}}>
                        <Link href={'/user/perfil'}> <button>perfil</button> </Link>
                        <Link href={'/user/statistics'}> <button>statistics</button></Link>
                        <Link href={'/user/inventario'}> <button>inventario</button></Link>
                        <Link href={'/user/fusion'}> <button>fusion</button></Link>
                         {
                            session?
                         <Link href={'/'} onClick={()=> signOut()}> <button>Sign out</button></Link>
                         : token ? <Link href={'/'} onClick={()=> deletcookie()}> <button>Sign out</button></Link> : null
                         }
                        </div>
                    </div>
                :null }
            </div>
        )
}
export default Login;