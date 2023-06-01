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
// import { cookies } from 'next/dist/client/components/headers'
const Register = ()=>{
    const [Nombre, setNombre] = useState('')
    const [Email,setEmail] = useState('');
    const [Contraseña, setContraseña] = useState('')
    const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
    const {data: session, status} = useSession()
    const router = useRouter();
    const Login = ()=>{
        return router.push('/signin')
      }
    const GuardarUsuario = async(req:any)=>{
        req.preventDefault()
        const response = await axios.post(`${URI}register`,
        {nombre:Nombre, email:Email, contraseña:Contraseña},
        // {withCredentials: true,credentials: 'include'}
        )
        if(response.status == 409){
            alert('El usuario o email ya existe')
            }
        if(response.status == 400){
            alert('Correo electrónico inválido')
            }
        if(response.status == 200){
            // Cookies.set('mytoken', response.data);
            // console.log(cookies.get())
            // router.push('/login');
            alert('Usuario registrado con éxito')
        }
    }
    return(
        <div>
        { status==='unauthenticated'? <div className={styles.contain}>
            <div className={styles.subcontainer}>
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
              <button type={"submit"}>Sign In</button>
              </form>
              <p className={styles.color}>Forgot password?</p>
              <p>OR</p>
              <div className={styles.optionsignin}>
                <button onClick={() => {signIn('github')}}>sign in with Github</button>
                <button onClick={() => {signIn('google')}}>sign in with Google</button>
                <ConnectButton/>
              </div>
              <p>Don't have an account? <span onClick={()=>{ Login() }}>Login</span></p>
            </div>
          </div> : null  }
          
      </div>
        // <div>
        //     <div className={styles.contain} style={{padding:"5rem"}}>
        //         <form className={styles.containform} onSubmit={GuardarUsuario}>
        //             <label htmlFor="name"><pre> Name    : 
        //             <input placeholder=" Name" required id="name" name="name" value={Nombre}  type={'text'} onChange={req=>setNombre(req.target.value)}/>
        //             </pre></label>
        //             <label htmlFor="email"> <pre> Email   : 
        //             <input placeholder=" Email" required id="email" name="email" value={Email} type="email" onChange={(req)=> {setEmail(req.target.value)}} />
        //             </pre></label>
        //             <label htmlFor="password"> <pre> Password: 
        //             <input placeholder=" Password" required id="password" value={Contraseña} type={'password'} onChange={(req)=> setContraseña(req.target.value)} />
        //             </pre></label>
        //             <button type={"submit"}>Save</button>
        //         </form>
        //     </div>
        // </div>
    )
}
export default Register;