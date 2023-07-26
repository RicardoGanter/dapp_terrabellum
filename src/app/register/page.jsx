"use client"
import styles from '../../styles/signin/signin.module.scss'
import { useState, useEffect } from 'react' 
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { signIn } from "next-auth/react";
import ConnectButton from '../../components/header/loginmetamask/loginmetamask';
import back from '../../public/icon/circle-arrow-left-solid.svg'
import Image from 'next/image'; 
import Cookies from 'js-cookie';
import { Fetch } from '../../utils/fetch/fetch'; 
const Register = ()=>{
    const [Nombre, setNombre] = useState('')
    const [Email,setEmail] = useState('');
    const [Contraseña, setContraseña] = useState('')
    const [errornombre, setErrornombre] = useState(false)
    const [erroremail, setErroremail] = useState(false)
    const [user, setuset] = useState(true)
    const [registersemicompleted, setRegistersemicompleted] = useState(false)
   const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
    const router = useRouter(); 
    // const {data: session, status} = useSession()

    useEffect(() => {
    const cookies =  Cookies.get('token')
    if (cookies) {
      setuset(cookies)
      router.push('/');
    }
    setuset(false)
  }, []);

    // const Login = ()=>{
    //     return router.push('/signin')
    //   }
    const GuardarUsuario = async(req)=>{
        req.preventDefault()  
        const response = await Fetch(`${URI}register`, 'POST' , {nombre : Nombre,  contraseña : Contraseña, email : Email})  
        if(!response){ return console.error("f")}
        if(response.status == 205){
          setErroremail(true)
          setErrornombre(false)
          }
      if(response.status == 204){
          setErrornombre(true) 
          setErroremail(false)
          }
      if(response.status == 203){
          setErroremail(true)
          setErrornombre(true)
      }
      if(response.status == 200){  
          return setRegistersemicompleted(true) 
      }
    }
    return(
        <div>
        { !user && <div className={styles.contain}> 
           
          { !registersemicompleted ? 
           <div className={styles.subcontainer}>
           <h2 className={styles.register}>Register account</h2>
         <Image onClick={()=>{router.push('/')}} className={styles.back} src={back} width={30} height={30} alt="back" />
           {/* FORMULARIO */}
           <form className={styles.containform} onSubmit={GuardarUsuario}>
             <label htmlFor="name" style={{position:"relative"}}>
                 <p style={{textAlign:"start"}}>Name</p> {errornombre && <p style={{ position:"absolute",top:0 ,left:"20%", color:"red"}}>Este nombre ya existe</p>} 
                 <input placeholder=" Name" required id="name" name="name" value={Nombre}  type={'text'} onChange={req=>setNombre(req.target.value)}/>
                 
             </label>
             <label htmlFor="password" style={{position:"relative"}}>
               <p style={{textAlign:"start"}}>Email</p> { erroremail && <p style={{ position:"absolute",top:0 ,left:"20%", color:"red"}}>Este email ya existe</p> } 
             <input placeholder=" Email" required id="email" name="email" value={Email} type="email" onChange={(req)=> {setEmail(req.target.value)}} />
             </label>
             <label htmlFor="password">
                 <p style={{textAlign:"start"}}>Password</p>
                 <input placeholder=" Password" required id="password" value={Contraseña} type={'password'} onChange={(req)=> setContraseña(req.target.value)} />
             </label>
             <button type={"submit"}>Register</button>
           </form>
           <p className={styles.color}>Forgot password?</p>
           <p style={{fontSize:"15px"}}>OR</p>
           <div className={styles.optionsignin}>
             <button onClick={() => {signIn('github')}}>sign in with Github</button>
             <button onClick={() => {signIn('google')}}>sign in with Google</button> 
             {/* <div onClick={()=> NetworkGoerliEth()}>asd</div> */}
           </div>
           <p>Don't have an account? <span onClick={()=>{ Login() }}>Login</span></p>
         </div>
         : <div className={styles.subcontainer}>
          <div className={styles.registrocasicompleto}>
            <h2>¡Casi has terminado de crear tu cuenta! </h2>
            <p>
              Solo necesitas confirmar tu dirección de correo electrónico para completar el proceso de registro. 
              Te hemos enviado un correo electrónico con un enlace de confirmación. Haz clic en el enlace para verificar tu cuenta
               y comenzar a disfrutar de todos los beneficios.
            </p>
            <p>
            ¡No olvides revisar tu bandeja de entrada y también la carpeta de correo no deseado!
            </p>
            </div>
         </div> }

          </div> }
          
      </div> 
    )
}
export default Register;