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
import Web3Modal from "web3modal";
import { ethers } from "ethers";
const Perfil = ()=>{
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [userInno, setUserInno] = useState(null)
    const [addressMetamask, setAddressMetamask] = useState(null)
    const [confirmdeleted, setConfirmdeleted] = useState(null)
    const URI = 'http://localhost:8000/usuarios/' 


    const DeleteAddressMetamask = async()=>{ 
      const token = Cookies.get('token');  
      const response = await axios.put(`${URI}deleteaddress`,{id : token });
      if(response.status === 200){
        const newaddresdata = {...userInno}
        newaddresdata.address_metamask = null 
        Cookies.set('userdata', JSON.stringify(newaddresdata)) 
        setUserInno(newaddresdata) 
        return setConfirmdeleted(false)
      }
    }
    const connectMetamask = async ()=>{ 
      if(!userInno.address_metamask){ 
        const signer = await NetworkGoerliEth();
        const addresss = await signer.getAddress();
        const token = Cookies.get('token');  
        const response = await axios.post(`${URI}sendaddres`,{id : token, address_metamask: addresss});
        if(response.status===200){
          const newaddresdata = {...userInno}
          newaddresdata.address_metamask = addresss 
          setUserInno(newaddresdata)
          return  alert('Wallet ingresada')
        } 
      }
    } 
   useEffect(()=>{
    const getdata = async()=> {
      try {
        const userdata = Cookies.get('userdata') 
        if(!userdata){ 
          const token = Cookies.get('token');  
          const response = await axios.post(`${URI}getuser`,{id : token});
          if(response.data){
          const datauser = Cookies.set('userdata', JSON.stringify(response.data)) 
          const data = JSON.parse(datauser)  
          return setUserInno(data)
          }
          const session = await getSession()
          if(session){
            return setUser(session)
            }
          if(!session && !response){
           return router.push('./signin')
          }
        }
        if(userdata){
          const data = JSON.parse(userdata)  
          return setUserInno(data)
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
        { user || userInno ?  
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
                          <button>Change Email</button>
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
                    { userInno.address_metamask ?<div onClick={()=>{setConfirmdeleted(true)}} className={styles.wallet}><h2>{userInno.address_metamask.toString()}</h2> <button>Deleted </button> </div>  : <button onClick={()=>{connectMetamask()}}> Connect Wallet</button> }
                    </div>  
                </div>
                <div className={styles.wallet}>
                  <Image alt="Image_wallet" src={trustimage} height={40}/>
                  
                </div>
                {confirmdeleted ? 
                  <div className={styles.containconfirmdelete}>
                    <div>

                    </div>
                    <div>
                      <h2>Realmente quiere eliminar el address ?</h2>
                      <h2>Recuerda que no podras utilizar tus nfts en el metaverso de Terrabellum una vez eliminado el address</h2>
                    </div>

                    <div style={{display:"flex", justifyContent:"center", gap:"1rem"}}>
                      <button onClick={()=> DeleteAddressMetamask()}>Accept</button>
                      <button onClick={()=>{setConfirmdeleted(false)}}>Cancel</button>
                    </div> 
                  </div>
                
                : null}
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
