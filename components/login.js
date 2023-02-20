import { useState } from "react"
import Metamasklogin from "./loginmetamask"
import styles from '../src/styles/login.module.css'


const Login = ()=>{
    const [login, setLogin] = useState(false)

    return(
        <>
        <button onClick={()=>{ setLogin(!login)}} >Login</button>
        { login ? 
        <div className={styles.contain}>
            <div className={styles.exit} onClick={()=>{ setLogin(!login)}}>X</div>
            <Metamasklogin/>
            <div>conectar con Google</div>
            <div>Registrar</div>
        </div>
        : null}
        </>
    )
}

export default Login;