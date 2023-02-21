import { useState } from "react"
import Metamasklogin from "./loginmetamask"
import styles from '../src/styles/login.module.css'
import { useSession } from 'next-auth/react'

const Login = (style)=>{
    const [login, setLogin] = useState(false)
    const [perfil, setPerfil] = useState(false)

    const {data: session, status} = useSession();


    return(
        <>
        { status==='unauthenticated' ? <button className={{style}} onClick={()=>{ setLogin(!login)}} >Login</button>
        : <button onClick={()=>{setPerfil(!perfil)}} >perfil</button>  }
        
        { login ? 
        <div className={styles.contain}>
            <div className={styles.exit} onClick={()=>{ setLogin(!login)}}>X</div>
            <Metamasklogin/>
            <div>conectar con Google</div>
            <div>Registrar</div>
        </div>
        : null}

        {   perfil ?
        <>
        <button></button>
        <button></button>
        <button>Settings</button>
        <button>Sign Out</button>
        </>

    :null }

        </>
    )
}

export default Login;