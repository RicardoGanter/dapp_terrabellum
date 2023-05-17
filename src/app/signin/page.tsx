"use client"
// import Cookies from "js-cookie";
import styles from '../../styles/signin/signin.module.scss'
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios"
import { useSession } from 'next-auth/react';
import { signIn } from "next-auth/react"
import back from '../../../public/icon/circle-arrow-left-solid.svg'
import ConnectButton from "../../../components/header/loginmetamask/loginmetamask.jsx"
const Signin = () => {
  const {data: session, status} = useSession()
  const router = useRouter();
  
  // useEffect(() => {
  //   if (!Cookies.get('token')) {
  //     router.push('/');
  //   }
  // }, []);
  const Register = ()=>{
    return router.push('/register')
  }
  const [Nombre,setNombre] = useState('');
  const [Contraseña,setContraseña] = useState('');
  const [sigin,setSigin] = useState(false)
  const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
  const iniciarSesion = async (req:any) => {
    req.preventDefault()
    try {
      const response = await axios.post(`${URI}signin`,{
        nombre: Nombre,
        contraseña: Contraseña
      });
      if (response.status == 200) {
        // Cookies.set('token', response.data.token);
        alert('Usuario registrado con éxito')
        // Redirect to the home page
        router.push('/');
      }
    } catch (error) {
        router.push('/');
      console.error(error);
      alert('Error al iniciar sesión, Nombre o contraseña incorrectos');
    }
  };
  return (
    <div>
      { status==='unauthenticated'? <div className={styles.contain}>
          <div className={styles.subcontainer}>
          <Image onClick={()=>{router.push('/')}} className={styles.back} src={back} width={30} height={30} alt="back" />
            {/* FORMULARIO */}
            <form className={styles.containform} onSubmit={iniciarSesion}>
            <label htmlFor="name">
                <p>Name</p>
                <input placeholder=" Name" required id="name" name="name" value={Nombre} type={'text'} onChange={req => setNombre(req.target.value)} />
                
            </label>
            <label htmlFor="password">
                <p>Password</p>
                <input placeholder=" Password" required id="password" value={Contraseña} type={'password'} onChange={(req) => setContraseña(req.target.value)} />
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
            <p>Don't have an account? <span onClick={()=>{ Register() }}>Register</span></p>
          </div>
        </div> : null  }
        
    </div>
  )
}

export default Signin;
