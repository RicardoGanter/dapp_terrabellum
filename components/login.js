import { useState } from "react"
import Metamasklogin from "./loginmetamask"
import styles from '../src/styles/login.module.css'
import { useSession } from 'next-auth/react'
import Link from "next/link"
import Image from "next/image"
import imagenperfil from '../public/img/lal.png'


const Login = (style)=>{
    const [login, setLogin] = useState(false)
    const [perfil, setPerfil] = useState(false)

    const {data: session, status} = useSession();


    return(
        <>
        { status==='unauthenticated' ? <button className={{style}} onClick={()=>{ setLogin(!login)}} >Login</button>
        : <Image onClick={()=>{setPerfil(!perfil)}} className={styles.imgheader} src={imagenperfil} alt='img perfil'/>}
        
        { login ? 
        <div className={styles.contain}>
            <div className={styles.exit} onClick={()=>{ setLogin(!login)}}>X</div>
            <Metamasklogin/>
            <div>conectar con Google</div>
            <div>Registrar</div>
        </div>
        : null}

        {/* perfil autenticado */}
        {   perfil ?
        <div className={styles.contain_perfil}>
            <div style={{margin:'7rem 0 0 0', display:'flex', flexDirection:'column'}}>
            <Link href={'/user/perfil'}>perfil</Link>
            <Link href={'/user/perfil'}>Historial</Link>
            <Link href={'/user/estadistics'}>Estadisticas</Link>
            <Link href={'/user/perfil'}>Inventario</Link>
            </div>
        </div>

    :null }

        </>
    )
}

export default Login;