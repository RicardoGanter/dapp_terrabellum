"use client"
import Cookies from "js-cookie";
import styles from '../../styles/signin/signin.module.scss'
import Image from 'next/image'
import { useCallback, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios"
import { useSession } from 'next-auth/react';
import { signIn } from "next-auth/react"
import back from '../../public/icon/circle-arrow-left-solid.svg'
import ConnectButton from "../../components/header/loginmetamask/loginmetamask.jsx"
import { flat } from "../../blockchain/abi/abi";
const Signin = () => {
  const {data: session, status} = useSession()
  const router = useRouter(); 
  const [user, setuset] = useState(true)
   const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
  useEffect(() => {
    const cookies =  Cookies.get('token')
    if (cookies) {
      setuset(cookies)
      router.push('/');
    }
    setuset(false)
  }, []);
  const Register = ()=>{
    return router.push('/register')
  }
  const [Nombre,setNombre] = useState('');
  const [Contraseña,setContraseña] = useState('');
  const [sigin,setSigin] = useState(false)
  const [errorlogin, setErrorlogin] = useState(false) 
  const [twofactor, setTwofactor] = useState(false)
  const [tokengoogle, setTokengoogle] = useState(false)


  const sendauthgoogle = async()=>{
    try {
      console.log(Nombre,Contraseña,tokengoogle)
      const response = await axios.post(`${URI}signinauth`,{
        nombre: Nombre,
        contraseña: Contraseña,
        token: tokengoogle
      }); 
      if(response){
        const a = await response.data
        console.log(a)
      }
      console.log("lol")
      if (response.status === 204) { 
          setErrorlogin(true)
      }
      if(response.status === 200 && response.data.token){
        const cookie = await response.data.token  
        Cookies.set('token', cookie)
        setErrorlogin(false)  
        return  window.location.reload()
      } 
    } catch (error) {
        // router.push('/');
      console.error(error);
      alert('Error al iniciar sesión, Nombre o contraseña incorrectos');
    }
  }
  // const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
  
  const iniciarSesion = async (req) => {
    req.preventDefault()
    try {
      const response = await axios.post(`${URI}signin`,{
        nombre: Nombre,
        contraseña: Contraseña
      }); 
      if (response.status === 204) { 
          setErrorlogin(true)
      }
      if(response.status === 200 && response.data.token){
        const cookie = await response.data.token  
        Cookies.set('token', cookie)
        setErrorlogin(false)  
        return  window.location.reload()
      }
      if(response.status === 200 && response.data.twofactor){
        console.log(response.data.twofactor)
        setTwofactor(response.data.twofactor)
      }
    } catch (error) {
        // router.push('/');
      console.error(error);
      alert('Error al iniciar sesión, Nombre o contraseña incorrectos');
    }
  };
  return (
    <div>
      { status==='unauthenticated' && !user && !twofactor ? <div className={styles.contain}>
          <div className={styles.subcontainer}>
            <h2 className={styles.login}>account access</h2>
          <Image onClick={()=>{router.push('/')}} className={styles.back} src={back} width={30} height={30} alt="back" />
            {/* FORMULARIO */}
            <form className={styles.containform} onSubmit={iniciarSesion}>
            <label htmlFor="name">
              <div style={{display:"flex"}}>
                <p style={{textAlign:"start"}}>Name</p> { errorlogin && <p style={{ position:"absolute",top:45 ,right:"20%", color:"red"}}>Nombre o contraseña incorrectos</p>} 
              </div>
                <input placeholder=" Name" required id="name" name="name" value={Nombre} type={'text'} onChange={req => setNombre(req.target.value)} />
            </label>
            <label htmlFor="password">
                <p style={{textAlign:"start"}}>Password</p>
                <input placeholder=" Password" required id="password" value={Contraseña} type={'password'} onChange={(req) => setContraseña(req.target.value)} />
            </label>
            <button type={"submit"}>Sign In</button>
            </form>
            <p className={styles.color}>Forgot password?</p>
            <p>OR</p>
            <div className={styles.optionsignin}>
              <button onClick={() => {signIn('github',{callbackUrl: '/api/auth/callback/github'}) }} >sign in with Github</button>
              <button onClick={() => {signIn('google'),{callbackUrl: '/api/auth/callback/google'}}} >sign in with Google</button>
              <ConnectButton/>
            </div>
            <p>Don't have an account? <span onClick={()=>{ Register() }}>Register</span></p>
          </div>
        </div> : twofactor ?
        <div  className={styles.contain}>
          <div className={styles.subcontainer}>

          <h2>Auth Google</h2>
          <div> 
          <input type="number" onChange={e => setTokengoogle(e.target.value)} />
          <button onClick={()=> sendauthgoogle()}>Send</button>
          </div>
          </div>
        </div> : null  }
        
    </div>
  )
}

export default Signin;