"use client"
import { useState,useContext } from 'react'
import Setting, {Title} from '../page.jsx'
import { User_data } from '../../../layout.jsx'
import styles from '../../../../styles/user/setting/wallet/wallet.module.scss'
import Image from 'next/image.js'
import metamaskimage from '../../../../public/img/full-metamask-logo.png'
import NetworkGoerliEth from '../../../../components/funcion/network.js'
import Cookies from 'js-cookie'
import axios from 'axios' 
import Completed from '../../../../utils/competed/completed.jsx'
import { SaveUrl } from '../../../../components/header/header.jsx'
const Wallet = () =>{
    const { userdataglobal, updateuserdataglobal } = useContext(User_data); 
    const [confirmdeleted, setConfirmdeleted] = useState(null)
    const [ registercompleted , setRegistercompleted] = useState(null)
    const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'  
    const fregistercompleted = ()=>{
        if(!registercompleted){
            setRegistercompleted(true)
            setTimeout(() => { 
                setRegistercompleted(false)
            }, 3000);
        }
    }
    const DeleteAddressMetamask = async()=>{  
        const token = Cookies.get('token');  
        const response = await axios.put(`${URI}deleteaddress`,{id : token });
        if(response.status === 200){
          const newaddresdata = {...userdataglobal}
          newaddresdata.address_metamask = null 
          Cookies.set('userdata', JSON.stringify(newaddresdata)) 
          setConfirmdeleted(false)
          fregistercompleted()
          return  updateuserdataglobal(newaddresdata) 
        }
      }
      const connectMetamask = async ()=>{  
          const signer = await NetworkGoerliEth();
          const addresss = await signer.getAddress();
          const token = Cookies.get('token');  
          const response = await axios.post(`${URI}sendaddres`,{id : token, address_metamask: addresss});
          if(response.status===200){ 
            const newaddresdata = {...userdataglobal}
            newaddresdata.address_metamask = addresss  
            fregistercompleted()
            updateuserdataglobal(newaddresdata) 
            return Cookies.set('userdata', JSON.stringify(newaddresdata)) 
          }  
      }   
      const Wallets = ()=>{
        return( 
            <div className={styles.wallet}>
                <Image alt="Image_wallet" src={metamaskimage}  height={40}/> 
                <div>
                    { userdataglobal.address_metamask ?<div className={styles.wallet}><h2>{userdataglobal.address_metamask.toString()}</h2> <button onClick={()=>setConfirmdeleted(true)} >Deleted </button> </div>  
                    : <button onClick={()=>{connectMetamask()}}> Connect Wallet</button> }
                </div>  
            </div> 
        )} 
    return( 
        <Setting>
          <SaveUrl name='Wallet' url="user/setting/wallet" imagen="https://terrabellum.s3.sa-east-1.amazonaws.com/Iconurl/5.svg"/>
            <Title title={"Wallets"}/> 
            <div className={styles.contain}>   
              { registercompleted &&
                <Completed/>
              } 
            </div> 
            <div className={styles.containwallet}>
                <div className={styles.wallets}>
                    <Wallets/>
                    {/* <Wallets/>  */}
                    {confirmdeleted ? 
                  <div className={styles.containconfirmdelete}> 
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
            </div>
        </Setting>
    )
}



export default Wallet