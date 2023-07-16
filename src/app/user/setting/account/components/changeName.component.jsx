import { useState , useEffect } from "react"
import styles from '../../../../../styles/user/setting/account/components/changeName.module.scss' 
import changeName from "../services/changeName"

const ChangeNameComponent = () => {
    const [newname ,setNewname] = useState(null)
    const [repetnewname,setRepetnewname] = useState(null)
    const [validationname, setValidationname] = useState(false)
    useEffect(()=>{
        if(repetnewname && repetnewname.length > 0){
          if( newname != repetnewname ){
            return setValidationname(false)
           } 
            return setValidationname(true)
        }
      },[newname, repetnewname])
    const switch_name = async (req)=>{
        req.preventDefault() 
        if( newname != repetnewname && !validationname){
          return console.error('los emails no coinciden')
        }
        const { status, newUser } = await changeName( newname )
        if( status === 202 ){  
          return  setInvalidpassword(true)
        }
        if( status === 204 ){  
          console.log("ya cambiaste el nombre del usuario :(") 
          return  setInvalidpassword(true)
        }
        if( status == 200){  
          updateuserdataglobal(newUser)
          fregistercompleted()
          return clearname()
        }
      }
    return( 
        <form className={styles.contain_switchname} onSubmit={switch_name}>
            <div> 
                <p>Seguro que quieres cambiar el nombre?</p><p>solo puedes hacerlo una vez de manera gratuita!</p>
            </div>
            <p>New name</p>
            <input type="text" value={newname} onChange={req=> setNewname(req.target.value)}/>
            <div style={{display:"flex"}}>
                <p>Repeat the new name</p> { !validationname && repetnewname && <p className={styles.errortext}>Your name does not match</p> }    
            </div>
            <input type="text" value={repetnewname}  onChange={req=> setRepetnewname(req.target.value)}/> 
            <div style={{display:"flex", justifyContent:"space-around", gap:"1rem"}}>
                { validationname && repetnewname ? <button type="submit">Accept</button> : <button style={{backgroundColor:"gray"}}>Accept</button> }
                
                <button onClick={()=>clearname()}>Cancel</button>
                
            </div>  
        </form>
     )
}

export default ChangeNameComponent