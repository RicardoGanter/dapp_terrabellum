import { useState , useEffect } from "react"
import styles from '../../../../../styles/user/setting/account/components/changePassword.module.scss' 
import changePassword from "../services/changePassword"
import eye from '../../../../../public/img/eye-solid.svg'
import noeye from '../../../../../public/img/eye-slash-solid.svg'
import Image from "next/image"

const ChangePasswordComponent = () =>{
    const [contraActual, setContraActual] = useState(null)
    const [eye1, setEye1] = useState(false)
    const [eye2, setEye2] = useState(false)
    const [eye3, setEye3] = useState(false)
    const [newcontraseña, setNewcontraseña] = useState(null)
    const [validationpassword, setValidationpassword] = useState(false)
    const [repetnewcontraseña, setRepetnewcontraseña ] = useState(null)
    // const clearformpassword = ()=>{
    //     setChangepassword(false)
    //     setRepetnewcontraseña(null)
    //     setNewcontraseña(null)
    //     setContraActual(null)
    //     setInvalidpassword(false)
    //   }
    useEffect(()=>{ 
        if(repetnewcontraseña && repetnewcontraseña.length>0){
          if(newcontraseña!=repetnewcontraseña){ 
          return setValidationpassword(false)
        }
          return setValidationpassword(true) 
        }
      },[newcontraseña, repetnewcontraseña])
    const [invalidpassword, setInvalidpassword] = useState(null)
    const [changepassword, setChangepassword] = useState(false)
    const switchpassword = async (req)=>{ 
        req.preventDefault()  
          if( newcontraseña.lenght< 8 || repetnewcontraseña.lenght< 8 || newcontraseña !=repetnewcontraseña){
          return console.error('contraseña erronea o menor a 8 caracteres')
          } 
        const { response } = await changePassword( contraActual, newcontraseña) 
        if( response == 204 ){
          return setInvalidpassword(true)
        }
        if( response == 200 ){ 
          return  clearformpassword()
        } 
      }  

    return( 
            <div className={styles.containswitchpassword}> 
                    <form onSubmit={switchpassword}> 
                        <div className={styles.switchpassword}>
                          <div style={{position:"relative"}}> 
                            <div style={{display:"flex"}}>
                              <p>Current password</p> { invalidpassword && <p className={styles.errortext}>Your password does not match</p> } 
                            </div>
                              <input required type={eye1 ? "text" : "password"} value={contraActual} onChange={req => setContraActual(req.target.value)}/><Image width={20} alt="Closed eye" style={{position:"absolute", bottom:"12px", right:"20px", cursor:"pointer"}} onClick={()=>{setEye1(!eye1)}} src={eye1? eye : noeye}/>
                          </div>
                          <div style={{position:"relative"}}>
                            <p>New password</p>
                            <input required type={eye2 ? "text" : "password"} value={newcontraseña} onChange={req=> setNewcontraseña(req.target.value)}/><Image width={20} alt="Closed eye" style={{position:"absolute", bottom:"12px", right:"20px", cursor:"pointer"}} onClick={()=>{setEye2(!eye2)}} src={eye2? eye : noeye}/>
                          </div>
                         <div style={{position:"relative"}}>
                         <div style={{display:"flex"}}>
                            <p>Repeat the new password</p> {!validationpassword && repetnewcontraseña && repetnewcontraseña.length > 0 && <p className={styles.errortext}>Passwords do not match</p>} 
                         </div>
                          <input required type={eye3 ? "text" : "password"} value={repetnewcontraseña} onChange={req=> setRepetnewcontraseña(req.target.value)}/> <Image width={20} alt="Closed eye" style={{position:"absolute", bottom:"12px", right:"20px", cursor:"pointer"}} onClick={()=>{setEye3(!eye3)}} src={eye3? eye : noeye}/>
                         </div>
                        
                          <div className={styles.option}>
                            {validationpassword ? <button type="submit">Acceptar</button>: <button style={{backgroundColor:"gray"}}>accept</button>}   <button onClick={()=>{setChangepassword(false); clearformpassword()}}>Cancel</button>
                          </div>
                        </div> 
                    </form>
                  </div> 
    )
}

export default ChangePasswordComponent