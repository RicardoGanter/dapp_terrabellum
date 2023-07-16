"use client"
import { Title } from "../layout"
import styles from '../../../../styles/user/setting/security/security.module.scss'
import QRCode from 'qrcode.react' 
import { useState,useContext } from "react" 
import { User_data } from '../../../layout.jsx' 
import googleauth from '../../../../public/google-authenticator-logo-1.webp'
import Image from "next/image" 
import { SaveUrl } from "../../../../components/header/header" 

//Fetch data
import NewTwoFactor from "./services/newTwoFactor"; 
import DeletedTwoFactor from "./services/deletedTwoFactor";
import VerifyTwoFactor from "./services/verifyTwoFactor";

const Security = ()=>{
    const [secreturl, setSecreturl] = useState(null)
    const [qrurl, setQrurl] = useState(null)
    const [twofactorrandom, setTwofactorrandom] = useState(null)
    const [activateauth, setActivateauth] = useState(null)
    const [confirmdeletedgoogleauth, setConfirmdeletedgoogleauth] = useState(false)
    const { userdataglobal, updateuserdataglobal } = useContext(User_data);  
    const sos = async()=>{  
        const { getUser } = await VerifyTwoFactor( secreturl, twofactorrandom )  
        updateuserdataglobal(getUser)
    }   

    const sas = async()=>{
        const {secret, auth} = await NewTwoFactor()   
        if(secret && auth ){   
            setSecreturl(secret) 
            return setQrurl(auth)
        }   
    }
        
    const deletedgoogleauth = async ()=>{
        const response = await DeletedTwoFactor() 
        updateuserdataglobal(response)
    }

    return(
        <div>
            <SaveUrl name='Security' url="/user/setting/security" imagen="https://d2qjuqjpn9e4f.cloudfront.net/Iconurl/9.svg"/>
            <Title title={"Security account"}/>
            <div className={styles.containsecurityoption}> 
            <h2>Two factor</h2>
                {  !userdataglobal.two_factor_google ?
                    <div>
                        <div className={styles.securityoption}> 
                        <Image src={googleauth} height={40}  alt="icongoogle"/> <h2>Google Authenticator</h2> <button onClick={()=>{setActivateauth(!activateauth); sas()}}> Activate </button>
                        </div>
                        {
                        activateauth &&
                        <div className={styles.savesecurity}>
                           { qrurl && <div style={{backgroundColor:"white", padding:"2rem", width:"fit-content", margin:"0 auto"}}>
                            <QRCode value={qrurl} /></div>}
                            <p>{secreturl}</p> 
                            <input onChange={e => setTwofactorrandom(e.target.value)} />
                            <button onClick={()=> sos()}>Verificar</button>
                        </div> 
                        } 
                    </div>
                 : 
                 <div className={styles.securityoption}> 
                    <Image src={googleauth} height={40}  alt="icongoogle"/> <h2>Google Authenticator</h2> <button onClick={()=>setConfirmdeletedgoogleauth(true)}> Deleted </button>
                    { confirmdeletedgoogleauth &&
                    <div className={styles.confirmdeleted}>
                        <h2>Realmente quieres eliminar el two factor de google ?</h2>
                        <button onClick={()=>deletedgoogleauth()}>Accept</button> <button onClick={()=>setConfirmdeletedgoogleauth(false)}>Cancel</button>
                    </div>
                    }
                 </div>
            }    
            </div>
        </div>
    )
} 
export default Security