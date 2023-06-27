"use client"
import {Title} from "../layout"
import styles from '../../../../styles/user/setting/security/security.module.scss'
import QRCode from 'qrcode.react';
import { useState,useContext } from "react";
import Cookies from 'js-cookie'
import { User_data } from '../../../layout.jsx'
import axios from "axios";
import googleauth from '../../../../public/google-authenticator-logo-1.webp'
import Image from "next/image";
import { SaveUrl } from "../../../../components/header/header";
const Security = ()=>{
    const [secreturl, setSecreturl] = useState(null)
    const [qrurl, setQrurl] = useState(null)
    const [twofactorrandom, setTwofactorrandom] = useState(null)
    const [activateauth, setActivateauth] = useState(null)
    const [confirmdeletedgoogleauth, setConfirmdeletedgoogleauth] = useState(false)
    const { userdataglobal, updateuserdataglobal } = useContext(User_data);  
    const sos = async()=>{
        const token = Cookies.get('token');  
        const URIr  = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/"
        const response = await axios.post(`${URIr}verifytwo`,{secret: secreturl.toString(), token : twofactorrandom.toString(), id: token.toString()})
        if(response.status == 200){ 
            const newdata = response.data
            const newimage = {...userdataglobal}
            newimage.two_factor_google = newdata.secret
            updateuserdataglobal(newimage)
            Cookies.set('userdata', JSON.stringify(newimage))
        }
    }   
        const sas = async()=>{
        const userdata = Cookies.get('userdata') 
        const a = JSON.parse(userdata) 
                const URIr  = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/twofactor" 
                const response = await axios.post( URIr, { email: a.email})
                if(response){   
                setSecreturl(response.data.secret) 
            return  setQrurl(response.data.otpAuthUrl)
            }
        }
        
    const deletedgoogleauth = async ()=>{
        const token = Cookies.get('token');   
        const URIr  = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/"
        const response = await axios.put(`${URIr}deletetwofactor`,{ id: token })
        if(response.status == 200){ 
            const newimage = {...userdataglobal}
            newimage.two_factor_google = null
            updateuserdataglobal(newimage)
            Cookies.set('userdata', JSON.stringify(newimage))
        } 
    }
    return(
        <div>
            <SaveUrl name='Security' url="/user/setting/security" imagen="https://terrabellum.s3.sa-east-1.amazonaws.com/Iconurl/9.svg"/>
            <Title title={"Security account"}/>
            <div className={styles.containsecurityoption}> 
            <h2>Two factor</h2>
                {  !userdataglobal.two_factor_google ?
                    <div>
                        <div className={styles.securityoption}> 
                        <Image src={googleauth} width={60}  alt="icongoogle"/> <h2>Google Authenticator</h2> <button onClick={()=>{setActivateauth(!activateauth); sas()}}> Activate </button>
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
                    <Image src={googleauth} width={60}  alt="icongoogle"/> <h2>Google Authenticator</h2> <button onClick={()=>setConfirmdeletedgoogleauth(true)}> Deleted </button>
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