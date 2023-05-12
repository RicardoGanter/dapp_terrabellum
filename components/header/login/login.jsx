"use client"
import Image from "next/image"
import Link from "next/link"
import styles from '../../../src/styles/header/login/login.module.scss'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react"
import imagenperfil from '../../../public/img/lal.webp'
import notification from '../../../public/icon/bell-regular.svg'

const Login = ()=>{
    const router = useRouter();
    const { data: session, status } = useSession()
    const [perfil, setPerfil] = useState(false)
    const Signin = ()=> router.push('/signin')
    const Register = ()=>router.push('/register')

    return(
        <div>
            { status==="unauthenticated" ? <div> <button className={styles.btnopc} onClick={()=>Signin()}>Login</button> <button className={styles.btnopc} onClick={()=>Register()}>Register</button> </div>
                : <div className={styles.contain}><Image src={notification} alt="notificacion" width={30} style={{margin:"0 1rem"}}/> <Image onClick={()=>setPerfil(!perfil)} className={styles.imgheader} src={imagenperfil} alt='img perfil'/> </div> }
                {/* perfil autenticado */}
                {   perfil ?
                <div className={styles.contain_perfil}>
                    <div style={{margin:'5rem 0 0 0', display:'flex', flexDirection:'column'}}>
                    <Link href={'/user/perfil'}> <button>perfil</button> </Link>
                    {/* <Link href={'/user/perfil'}> <button>Historial</button></Link> */}
                    <Link href={'/user/statistics'}> <button>statistics</button></Link>
                    <Link href={'/user/inventario'}> <button>inventario</button></Link>
                    <Link href={'/user/fusion'}> <button>fusion</button></Link>
                    <Link href={'/'} onClick={()=>signOut()}> <button>Sign out</button></Link>
                    </div>
                </div>
            :null }
        </div>
    )
}

export default Login;