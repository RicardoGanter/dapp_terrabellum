"use client"
import  {Title} from "../layout.jsx"
import styles from '../../../../styles/user/setting/account/account.module.scss' 
import {SaveUrl} from '../../../../components/header/header.jsx' 
import { useState, useEffect, useContext } from "react"
import { User_data } from '../../../layout.jsx'
import lock from '../../../../public/icon/lock-solid.svg'  
import Image from "next/image.js"  
import Completed from "../../../../utils/competed/completed.jsx"   
import dynamic from "next/dynamic.js"
const ImagesComponents = dynamic(() => import("./components/images.component.jsx"));
const ChangePasswordComponent = dynamic(() => import("./components/changePassword.component.jsx")); 
const ChangeNameComponent = dynamic(() => import("./components/changeName.component.jsx"));  
import  changeEmail  from "./services/changeEmail.js" 


const Account = ()=>{
    const { userdataglobal, updateuserdataglobal } = useContext(User_data);   
    const [changepassword, setChangepassword] = useState(false)   
    const [validationemail, setValidationemail] = useState(false)
    // const [validationname, setValidationname] = useState(false)
    const [switchname ,setSwitchname] = useState(false)
    // const [newname ,setNewname] = useState(null)
    // const [repetnewname,setRepetnewname] = useState(null)
    // const [invalidpassword, setInvalidpassword] = useState(null) 
    const [ registercompleted , setRegistercompleted] = useState(null)
    const [editimage, setEditimage] = useState(false) 
    const [emailnew, setemailnew] = useState(false)
    const [newemail,setNewemail] = useState(null)
    const [repeatnewemail,setRepeatewemail] = useState(null)
    const [ envioemail , setEnvioemail] = useState(false)
    const [ timereenviar, setTimereenviar] = useState(false)
    const fregistercompleted = ()=>{
        if(!registercompleted){
            setRegistercompleted(true)
            setTimeout(() => { 
                setRegistercompleted(false)
            }, 3000);
        }
    } 
         
       // EMAIL
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
      const clearname = ()=>{
         setNewname(null)
         setRepetnewname(null)
         setSwitchname(null)
         setemailnew(false)
       } 
      //  useEffect(()=>{
      //    if(repetnewname && repetnewname.length > 0){
      //      if( newname != repetnewname ){
      //        return setValidationname(false)
      //       } 
      //        return setValidationname(true)
      //    }
      //  },[newname, repetnewname])
       useEffect(()=>{ 
         if(repeatnewemail && repeatnewemail.length>0){
           if(newemail!=repeatnewemail){ 
           return setValidationemail(false)
         }
           return setValidationemail(true) 
         }
       },[newemail, repeatnewemail])   
    return (
        <div>
            { registercompleted &&
                <Completed/>
              } 
            <SaveUrl name='Account' url="/user/setting/account" imagen="https://terrabellum.s3.sa-east-1.amazonaws.com/Iconurl/1.svg"/>
            <div className={styles.contain}>
                <Title title={"Public account"} />
            </div> 
            <div className={styles.containinfo}>
                { editimage &&
                <ImagesComponents/>
                 }
                  <img src={ userdataglobal.image } 
                  className={styles.img} width={200} height={200}  
                  alt='perfil_usuario' onClick={()=> setEditimage(true)}/>
                        <div className={styles.editimage} onClick={()=>setEditimage(true)}>Edit</div>
                  <div className={ styles.contain_datos }>
                      <p>Name</p>
                      <div>
                          <input className={styles.datauser} value={ userdataglobal.nombre }/>
                         { userdataglobal.cont_change_name >= 1 ? <button style={{backgroundColor:"gray"}} >Change Name</button> : <button  onClick={()=>setSwitchname(true)}>Change Name</button>} 
                      </div> 
                      <p>Email</p>
                      <div>
                          <input value={ userdataglobal.email } className={styles.datauser}/>
                          <button  onClick={()=>setemailnew(true)}>Change Email</button>
                      </div>
                      <div style={{display:"flex", justifyContent:"start", alignItems:"center", gap:"1rem"}}>
                        <button onClick={()=>setChangepassword(true)} style={{ width:"210px", margin:"2rem 3.5rem 2rem 0"}}>Change Password</button> 
                        <Image alt="Shield_image" src={lock} width={25}/>
                      </div>
                  </div>  
              </div>
              <div className={styles.contain}>
                <Title title={"Private account"} />
            </div>
         
                { emailnew && 
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
                }
                {envioemail &&
                <div className={styles.containswitchpassword}>
                  <h2>se a enviado un correo electronico de verificacion a {userdataglobal && userdataglobal.email }</h2>
                  <p>si no te a llegado el correo pincha aqui</p> <p style={{cursor:"pointer", color:"blueviolet", width:"fint-content"}} onClick={()=>changeEmail(newemail)}> Reenviar </p> {timereenviar && <p>tienes que espera 3 min para reenviar el correo</p>}
                  </div>}
                { changepassword && 
                  <ChangePasswordComponent/>
                   }
                  {switchname && 
                   <ChangeNameComponent/>
                  }
        </div>
    )
}
export default Account