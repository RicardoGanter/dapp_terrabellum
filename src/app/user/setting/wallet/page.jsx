"use client"
import { useState,useContext } from 'react'
import  {Title} from '../layout.jsx'
import { User_data } from '../../../layout.jsx'
import styles from '../../../../styles/user/setting/wallet/wallet.module.scss'
import Image from 'next/image.js'
import metamaskimage from '../../../../public/img/full-metamask-logo.png'   
import Completed from '../../../../utils/competed/completed.jsx'
import { SaveUrl } from '../../../../components/header/header.jsx'  

// Feching
import { DeleteAddress } from './services/deletedAddress.js'
import { connectWallet } from './services/connectWallet.js'

const Wallet = () =>{
    const { userdataglobal, updateuserdataglobal } = useContext(User_data); 
    const [confirmdeleted, setConfirmdeleted] = useState(null)
    const [ registercompleted , setRegistercompleted] = useState(null) 
    const fregistercompleted = ()=>{
        if(!registercompleted){
            setRegistercompleted(true)
            setTimeout(() => { 
                setRegistercompleted(false)
            }, 3000);
        }
    }
    const DeleteAddressMetamask = async()=>{  
      const { newAddresData } = await DeleteAddress()
      if( newAddresData ){
        setConfirmdeleted(false)
        fregistercompleted()
        return  updateuserdataglobal(newAddresData) 
      } 
    }
     
    const connectMetamask = async ()=>{  
        const { newAddress } = await connectWallet()
        if(newAddress){  
          fregistercompleted() 
          return updateuserdataglobal(newAddress) 
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
        <div>
          <SaveUrl name='Wallet' url="/user/setting/wallet" imagen="https://d2qjuqjpn9e4f.cloudfront.net/Iconurl/5.svg"/>
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
                    {confirmdeleted && 
                      <div className={styles.containconfirmdelete}> 
                        <div>
                          <h2>Realmente quiere eliminar el address ? </h2>
                          <h2>Recuerda que no podras utilizar tus nfts en el metaverso de Terrabellum una vez eliminado el address</h2>
                        </div> 
                        <div style={{display:"flex", justifyContent:"center", gap:"1rem"}}>
                          <button onClick={()=> DeleteAddressMetamask()}>Accept</button>
                          <button onClick={()=>{setConfirmdeleted(false)}}>Cancel</button>
                        </div> 
                      </div> 
                    }
                </div>
            </div>
        </div>
    )
} 

export default Wallet