"use client"
import Cookies from "js-cookie";
import styles from '../../styles/signin/signin.module.scss'
import Image from 'next/image'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import { signIn } from "next-auth/react"
import back from '../../public/icon/circle-arrow-left-solid.svg'
import ConnectButton from "../../components/header/loginmetamask/loginmetamask.jsx"
import googleauth from '../../public/google-authenticator-logo-1.webp'
import { Fetch } from "../../utils/fetch/fetch";
const Signin = () => {
  // const {data: session, status} = useSession()
  const router = useRouter(); 
  const [user, setuset] = useState(true)
   const URI = 'http://localhost:8000/usuarios/'
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
  const [errorloginAuth, setErrorloginAuth] = useState(false) 
  const [twofactor, setTwofactor] = useState(false)
  const [tokengoogle, setTokengoogle] = useState(false)


  const sendauthgoogle = async () =>{
    try {  
      const response = await Fetch(`${URI}signinauth`,  'POST' ,{
        nombre: Nombre,
        contraseña: Contraseña,
        token: tokengoogle
      });   
      const data = await response.json() 
      if (response && response.status === 204) { 
        setErrorloginAuth(true)
          setErrorlogin(true)
      }
      if( response && response.status === 200 && data.token){
        const cookie = await data.token  
        Cookies.set('token', cookie)
        setErrorlogin(false)  
        return  window.location.reload()
      } 
    } catch (error) {
        // router.push('/');
      console.error(error);
      // alert('Error al iniciar sesión, Nombre o contraseña incorrectos');
    }
  }
  // const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
  
  const iniciarSesion = async (req) => {
    req.preventDefault()
    try {
      const response = await Fetch(`${URI}signin`, 'POST' ,{
        nombre: Nombre,
        contraseña: Contraseña
      });  
      const data = await response.json() 
      if (response.status === 204) { 
        return setErrorlogin(true)
      }
      if(response.status === 200 &&  data.token ){  
        const cookie = await data.token 
        Cookies.set('token', cookie)
        setErrorlogin(false)  
        return  window.location.reload()
      }
      if(response.status === 200 && data.twofactor){ 
        return setTwofactor(data.twofactor)
      }
    } catch (error) { 
      console.error(error); 
    }
  };
  return (
    <div>
      { !user && !twofactor ? <div className={styles.contain}>
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
            <p onClick={()=> router.push('/adminmint_temporalurl')}>Admin auth</p>
          </div>
        </div> 
        
        
        : twofactor ?
        <div  className={styles.contain}>
          <div className={styles.subcontainer}>
            <div className={styles.containtwofactor}>
                <Image src={googleauth} height={60} />
              <h2>Two Factor Google auth</h2>
            </div>
            {errorloginAuth && <p className={styles.errorauth}>Numero incorrecto!</p> }
             
            <div className={styles.sendauth}> 
              <input type="number" onChange={e => setTokengoogle(e.target.value)} />
              <button onClick={()=> sendauthgoogle()}>Send</button>
            </div>
          </div>
        </div> : null  }
        
    </div>
  )
}

export default Signin;
