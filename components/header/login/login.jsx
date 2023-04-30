"use client"
import Image from "next/image"
import Link from "next/link"
import styles from '../../../src/styles/header/login/login.module.scss'
import Metamasklogin from "../loginmetamask/loginmetamask"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { signIn, signOut } from "next-auth/react"
import axios from "axios"
import Cookies from 'js-cookie';
import { cookies } from "next/dist/client/components/headers"
import imagenperfil from '../../../public/img/lal.webp'

const Login = ()=>{
    const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
    const [perfil, setPerfil] = useState(false)
    const [Nombre,setNombre] = useState('');
    const [Email,setEmail] = useState('');
    const [Contraseña,setContraseña] = useState('');
    const [sigin,setSigin] = useState(false)
    const [login, setLogin] = useState(false)
    const [register, setRegister]= useState(false);
    
    const router = useRouter();
    const {data: session, status} = useSession()
    

    const GuardarUsuario = async(req)=>{
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
            console.log(cookies.get())
            router.push('/login');
            alert('Usuario registrado con éxito')
        }
    }
    const token = Cookies.get('token');


    const iniciarSesion = async (req) => {
        req.preventDefault()
        try {
          const response = await axios.post(`${URI}signin`,{
            nombre: Nombre,
            contraseña: Contraseña
          });
          if (response.status == 200) {
            // Cookies.set('token', response.data.token);
            // console.log(response.data.token);
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


    if(register){
        if(login || sigin){
        setLogin(false)
        setSigin(false)
    }   
    }
    if(login){
       if(register || sigin){
        setRegister(false);
        setSigin(false)
       }
    }
    if(sigin){
        if(register || login){
         setRegister(false);
         setLogin(login)
        }
    }

    return(
        <>
        { status==="unauthenticated" ? <button onClick={()=>{ setLogin(true) }}>Login</button>
        : <Image onClick={()=>{setPerfil(!perfil)}} className={styles.imgheader} src={imagenperfil} alt='img perfil'/>}
        
        { register ?
        <div className={styles.contain} style={{padding:"5rem"}}>
            <div className={styles.exit} onClick={()=>{ setRegister(!register)}}>X</div>
            <form className={styles.containform} onSubmit={GuardarUsuario}>
                <label htmlFor="name"><pre> Name    : 
                <input placeholder=" Name" required id="name" name="name" value={Nombre}  type={'text'} onChange={req=>setNombre(req.target.value)}/>
                </pre></label>
                <label htmlFor="email"> <pre> Email   : 
                <input placeholder=" Email" required id="email" name="email" value={Email} type="email" onChange={(req)=> {setEmail(req.target.value)}} />
                </pre></label>
                <label htmlFor="password"> <pre> Password: 
                <input placeholder=" Password" required id="password" value={Contraseña} type={'password'} onChange={(req)=> setContraseña(req.target.value)} />
                </pre></label>
                <button type={"submit"}>Save</button>
            </form>
        </div>
        : null
        }

        { sigin ?

            <div className={styles.contain} style={{padding:"5rem"}}>
                <div className={styles.exit} onClick={() => { setSigin(!sigin) }}>X</div>
                <form className={styles.containform} onSubmit={iniciarSesion}>
                <label htmlFor="name">
                    <pre> Name    :
                    <input placeholder=" Name" required id="name" name="name" value={Nombre} type={'text'} onChange={req => setNombre(req.target.value)} />
                    </pre>
                </label>
                <label htmlFor="password">
                    <pre> Password:
                    <input placeholder=" Password" required id="password" value={Contraseña} type={'password'} onChange={(req) => setContraseña(req.target.value)} />
                    </pre>
                </label>
                <button type={"submit"}>Save</button>
                </form>
            </div>
        : null
        }


        { login ? 
        <div className={styles.contain}>
            <div className={styles.exit} onClick={()=>{ setLogin(false)}}>X</div>
            <Metamasklogin/>
            <button target="_blank" onClick={() => {signIn('google')}}>connect with Google</button>
            <button onClick={() => {signIn('github')}}>connect with Github</button>
            <button onClick={() => {setSigin(!sigin); setLogin(!login)}}>sigin</button>
            <button onClick={() => {setRegister(!register); setLogin(!login)}}>register</button>
           
        </div>
        : null}

        {/* perfil autenticado */}
        {   perfil ?
        <div className={styles.contain_perfil}>
            <div style={{margin:'5rem 0 0 0', display:'flex', flexDirection:'column'}}>
            <Link href={'/user/perfil'}>perfil</Link>
            <Link href={'/user/perfil'}>Historial</Link>
            <Link href={'/user/statistics'}>Estadisticas</Link>
            <Link href={'/user/inventario'}>Inventario</Link>
            <Link href={'/user/fusion'}>fusion</Link>
            <Link href={'/'} onClick={signOut}> Signout</Link>
            </div>
        </div>

    :null }

        </>
    )
}

export default Login;