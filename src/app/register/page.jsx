"use client"
import styles from '../../styles/signin/signin.module.scss'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn } from "next-auth/react";
import ConnectButton from '../../components/header/loginmetamask/loginmetamask';
import back from '../../public/icon/circle-arrow-left-solid.svg'
import Image from 'next/image';
import NetworkGoerliEth from '../../components/funcion/network';
import Cookies from 'js-cookie'; 
const Register = ()=>{
    const [Nombre, setNombre] = useState('')
    const [Email,setEmail] = useState('');
    const [Contraseña, setContraseña] = useState('')
    const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
    // const URI = 'http://localhost:8000/usuarios/'
    const {data: session, status} = useSession()
    const router = useRouter();
    const Login = ()=>{
        return router.push('/signin')
      }
    const GuardarUsuario = async(req)=>{
        req.preventDefault()
        const response = await axios.post(`${URI}register`,
        {nombre : Nombre,  contraseña : Contraseña, email : Email},
        // {withCredentials: true,credentials: 'include'}
        )
        if(response.status == 409){
            alert('El usuario o email ya existe')
            }
        if(response.status == 400){
            alert('Correo electrónico inválido')
            }
        if(response.status == 200){  
            const cookie = await response.data.token   
            console.log(response)
            if(cookie){
              Cookies.set('token', cookie) 
              return  router.push('/');  
            } 
        }
    }
    return(
        <div>
        { status==='unauthenticated'? <div className={styles.contain}> 
            <div className={styles.subcontainer}>
            <h2>Register account</h2>
            <Image onClick={()=>{router.push('/')}} className={styles.back} src={back} width={30} height={30} alt="back" />
              {/* FORMULARIO */}
              <form className={styles.containform} onSubmit={GuardarUsuario}>
                <label htmlFor="name">
                    <p style={{textAlign:"start"}}>Name</p>
                    <input placeholder=" Name" required id="name" name="name" value={Nombre}  type={'text'} onChange={req=>setNombre(req.target.value)}/>
                    
                </label>
                <label htmlFor="password">
                  <p style={{textAlign:"start"}}>Email</p>
                <input placeholder=" Email" required id="email" name="email" value={Email} type="email" onChange={(req)=> {setEmail(req.target.value)}} />
                </label>
                <label htmlFor="password">
                    <p style={{textAlign:"start"}}>Password</p>
                    <input placeholder=" Password" required id="password" value={Contraseña} type={'password'} onChange={(req)=> setContraseña(req.target.value)} />
                </label>
                <button type={"submit"}>Register</button>
              </form>
              <p className={styles.color}>Forgot password?</p>
              <p>OR</p>
              <div className={styles.optionsignin}>
                <button onClick={() => {signIn('github')}}>sign in with Github</button>
                <button onClick={() => {signIn('google')}}>sign in with Google</button> 
                {/* <div onClick={()=> NetworkGoerliEth()}>asd</div> */}
              </div>
              <p>Don't have an account? <span onClick={()=>{ Login() }}>Login</span></p>
            </div>
          </div> : null  }
          
      </div> 
    )
}
export default Register;