import { useState , useEffect } from "react"
import styles from '../../../../../styles/user/setting/account/account.module.scss' 
import changeEmail from "../services/changeEmail" 

const ChangeEmailComponent = () => {
    const [newemail,setNewemail] = useState(null)
    const [repeatnewemail,setRepeatewemail] = useState(null)
    const [ envioemail , setEnvioemail] = useState(false)
    const [validationemail, setValidationemail] = useState(false) 

    const switch_email = async (req )=>{
        req.preventDefault()
       if( newemail != repeatnewemail && !validationemail){
         return console.error('los emails no coinciden')
       } 
       const { response } = await changeEmail(newemail) 
       if( response == 200){   
         setEnvioemail(true) 
         return clearname()
       }
     }   
   
    useEffect(()=>{ 
      if(repeatnewemail && repeatnewemail.length>0){
        if(newemail!=repeatnewemail){ 
        return setValidationemail(false)
      }
        return setValidationemail(true) 
      }
    },[newemail, repeatnewemail])   

    return(<>
        <form className={styles.contain_switchname} onSubmit={switch_email}> 
        <p>New email</p>
        <input type="email" value={newemail} onChange={req=> setNewemail(req.target.value)}/>
        <div style={{display:"flex"}}>
          <p>Repeat the new email</p> { !validationemail && repeatnewemail && <p className={styles.errortext}>Your email does not match</p> }    
        </div>
        <input type="email" value={repeatnewemail}  onChange={req=> setRepeatewemail(req.target.value)}/> 
        <div style={{display:"flex", justifyContent:"space-around", gap:"1rem"}}>
          { validationemail && repeatnewemail ? <button type="submit">Accept</button> : <button style={{backgroundColor:"gray"}}>Accept</button> }
          
          <button onClick={()=>clearname()}>Cancel</button> 
        </div>  
        </form> 
        {envioemail &&
            <div className={styles.containswitchpassword}>
              <h2>se a enviado un correo electronico de verificacion a {userdataglobal && userdataglobal.email }</h2>
              <p>si no te a llegado el correo pincha aqui</p> <p style={{cursor:"pointer", color:"blueviolet", width:"fint-content"}} onClick={()=>changeEmail(newemail)}> Reenviar </p> {timereenviar && <p>tienes que espera 3 min para reenviar el correo</p>}
              </div>}
              </>
    )
}

export default ChangeEmailComponent