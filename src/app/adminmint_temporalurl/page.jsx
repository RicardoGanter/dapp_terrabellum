"use client"
import Cookies from "js-cookie";
import styles from '../../styles/signin/signin.module.scss'
import Image from 'next/image'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';  
import { signIn } from "next-auth/react"
import back from '../../public/icon/circle-arrow-left-solid.svg'
// import ConnectButton from "../../components/header/loginmetamask/loginmetamask.jsx" 
import { Fetch } from "../../utils/fetch/fetch";
const Admin_mint_temporal = () => { 
  const router = useRouter(); 
  const [user, setuset] = useState(true)
  const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
  // const URI = 'http://localhost:8000/usuarios/'
  useEffect(() => {
    const cookies =  Cookies.get('token_admin_mint')
    if (cookies) {
      setuset(cookies)
      router.push('/adminmint_temporalurl/createnextmint');
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
      const response = await Fetch(`${URI}iniciarSesion_admin`, 'POST', { nombre: Nombre,contraseña: Contraseña }) 
      if (response.status === 204) { 
          setErrorlogin(true)
      }
      if(response.status === 200 && response.token){
        const cookie = await response.token  
        Cookies.set('token_admin_mint', cookie)
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
      const response = await Fetch(`${URI}iniciarSesion_admin`, 'POST' ,{nombre: Nombre,contraseña: Contraseña})
      const userAdmin = await response.json()
      if (response.status === 204) { 
        setErrorlogin(true)
      }
      if(response.status === 200 && userAdmin.token){
        const cookie = await userAdmin.token  
        Cookies.set('token_admin_mint', cookie)
        setErrorlogin(false)  
        console.log("lol")
        return  window.location.reload()
      }
      if(response.status === 200 && userAdmin.twofactor){
        console.log(userAdmin.twofactor)
        setTwofactor(userAdmin.twofactor)
      }
    } catch (error) {
        // router.push('/');
      console.error(error);
      alert('Error al iniciar sesión, Nombre o contraseña incorrectos');
    }
  };
  return (
    <div>
      {  !user && !twofactor ? <div className={styles.contain}>
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

export default Admin_mint_temporal;