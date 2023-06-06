"use client"
import Image from "next/image";
import yoxd from '../../../public/img/lal.webp'
import styles from '../../../styles/user/perfil.module.scss'
import ConnectButton from "../../../components/header/loginmetamask/loginmetamask";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import jwt  from 'jsonwebtoken';
import axios from "axios";
import lock from '../../../public/icon/lock-solid.svg'
import trustimage from '../../../public/img/full-trust-wallet-logo.png'
import metamaskimage from '../../../public/img/full-metamask-logo.png'
import NetworkGoerliEth from "../../../components/funcion/network";

const Perfil = ()=>{
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [userInno, setUserInno] = useState(null)
    const URI = 'http://localhost:8000/usuarios/'
    const [address, setAddress] = useState(null)
    useEffect(()=>{
      const geaddress =async ()=>{
        const signer = await NetworkGoerliEth();
        const addresss = await signer.getAddress();
        if(address){
          setAddress(addresss)
        }
      }
      geaddress()
    },[])

   useEffect(()=>{
    const getdata = async()=> {
      try {
        const token = Cookies.get('token');  
        const response = await axios.post(`${URI}getuser`,{id : token});
        if(response.data){
        return setUserInno(response.data)
        }
        const session = await getSession()
        if(session){
          return setUser(session)
          }
        if(!session && !response){
          router.push('./signin')
        }
      } catch (error) {
        console.error(error);
        alert('Error al iniciar sesión, Nombre o contraseña incorrectos');
      }
    };
    getdata()
   },[])
    return (
        <>
        { user|| userInno ?  
            <div className={styles.contain}>
              <div className={styles.containinfo}>
                  <img src={ user ? user.user.image : userInno ? null : null } 
                  className={styles.img} width={200} height={200}  
                  alt='perfil_usuario'/>
                  <div className={ styles.contain_datos }>
                      <p>Name:  </p>
                      <div>
                          <div className={styles.datauser}>{ user ? user.user.name : userInno ? userInno.nombre : null }</div>
                          <button>Change Name</button>
                      </div>

                      <p>Email: </p>
                      <div>
                          <div className={styles.datauser}>{ user ? user.user.email: userInno ? userInno.email : null } </div>
                          <button>Change Name</button>
                      </div>
                      <div style={{display:"flex", justifyContent:"start", alignItems:"center", gap:"1rem"}}>
                      <button style={{ width:"210px", margin:"2rem 3.5rem 2rem 0"}}>Change Password</button> 
                      <Image alt="Shield_image" src={lock} width={25}/>
                      </div>
                  </div>
              </div>
              <div className={styles.containWallets}>
                  <p>Wallets Connected In account</p>
                <div className={styles.wallet}>
                  <Image alt="Image_wallet" src={metamaskimage}  height={40}/> 
                  <div>
                    { address ? address.toString() : <button onClick={()=>{}}> Connect Wallet</button> }
                    
                    </div> 
                  
                </div>
                <div className={styles.wallet}>
                  <Image alt="Image_wallet" src={trustimage} height={40}/>
                  
                </div>
                
              </div>
            {/* <div className={styles.wallet}>
                <button>Change wallet</button> <ConnectButton/> 
            </div> */}
    </div>
      : null  }
         
        </>
    )
}

export default Perfil;
