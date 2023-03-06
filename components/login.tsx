import { useState } from "react"
import Metamasklogin from "./loginmetamask"
import styles from '../src/styles/login.module.scss'
import { useSession } from 'next-auth/react'
import Link from "next/link"
import Image from "next/image"
import imagenperfil from '../public/img/lal.png'
import { signOut,signIn } from "next-auth/react"
import { NextPage } from "next"

const Login = ()=>{
    const [login, setLogin] = useState(false)
    const [perfil, setPerfil] = useState(false)

    const {data: session, status} = useSession();


    return(
        <>
        { status==='unauthenticated' ? <button style={{backgroundColor:'#853a7e', padding :'0 1rem', borderRadius:'1rem', color:'aliceblue', margin:'0 2rem 0 0'}} onClick={()=>{ setLogin(!login)}} >Login</button>
        : <Image onClick={()=>{setPerfil(!perfil)}} className={styles.imgheader} src={imagenperfil} alt='img perfil'/>}
        
        { login ? 
        <div className={styles.contain}>
            <div className={styles.exit} onClick={()=>{ setLogin(!login)}}>X</div>
            <Metamasklogin/>
            <div>conectar con Google</div>
            <div>Registrar</div>
            <div onClick={()=>{signIn}}>Conectar con Github</div>
        </div>
        : null}

        {/* perfil autenticado */}
        {   perfil ?
        <div className={styles.contain_perfil}>
            <div style={{margin:'5rem 0 0 0', display:'flex', flexDirection:'column'}}>
            <Link href={'/user/perfil'}>perfil</Link>
            <Link href={'/user/perfil'}>Historial</Link>
            <Link href={'/user/estadistics'}>Estadisticas</Link>
            <Link href={'/user/perfil'}>Inventario</Link>
            <Link href={'/'} onClick={()=>{signOut}}> Signout</Link>
            </div>
        </div>

    :null }

        </>
    )
}

export default Login;