"use client"
import Setting, {Title} from "../page.jsx"
import styles from '../../../../styles/user/setting/account/account.module.scss' 
import {SaveUrl} from '../../../../components/header/header.jsx' 
import { useState, useEffect, useContext } from "react"
import { User_data } from '../../../layout.jsx'
import lock from '../../../../public/icon/lock-solid.svg'  
import Image from "next/image.js" 
import exit from '../../../../public/icon/xmark-solid.svg'  
import Cookies from 'js-cookie'
import axios from "axios"
import eye from '../../../../public/img/eye-solid.svg'
import noeye from '../../../../public/img/eye-slash-solid.svg'
import Completed from "../../../../utils/competed/completed.jsx"
const Account = ()=>{
    const { userdataglobal, updateuserdataglobal } = useContext(User_data);   
    const [changepassword, setChangepassword] = useState(false)
    const [contraActual, setContraActual] = useState(null)
    const [newcontraseña, setNewcontraseña] = useState(null)
    const [repetnewcontraseña, setRepetnewcontraseña ] = useState(null)
    const [validationpassword, setValidationpassword] = useState(false)
    const [validationemail, setValidationemail] = useState(false)
    const [validationname, setValidationname] = useState(false)
    const [switchname ,setSwitchname] = useState(false)
    const [newname ,setNewname] = useState(null)
    const [repetnewname,setRepetnewname] = useState(null)
    const [invalidpassword, setInvalidpassword] = useState(null)
    const [eye1, setEye1] = useState(false)
    const [eye2, setEye2] = useState(false)
    const [eye3, setEye3] = useState(false)
    const [ registercompleted , setRegistercompleted] = useState(null)
    const [editimage, setEditimage] = useState(false)
    const [activeImage, setActiveImage] = useState(false);
    const [urlimageperfil, setUrlimageperfil] = useState([])
    const [switchimageperfil, setSwitchimageperfil]= useState([]) 
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
     const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/' 
       // const URI = 'http://localhost:8000/usuarios/'  
     //PASSWORD
     const switchpassword = async (req)=>{
         req.preventDefault() 
         if( newcontraseña.lenght< 8 || repetnewcontraseña.lenght< 8 || newcontraseña !=repetnewcontraseña){
          return console.error('contraseña erronea o menor a 8 caracteres')
         }
         const token = Cookies.get('token');  
         const response = await axios.put(`${URI}switchpassword`,{ id : token, contraseña: contraActual , newcontraseña: newcontraseña  }); 
         if( response.status === 204 ){ 
           return  setInvalidpassword(true)
         }
         if( response.status===200){ 
           return  clearformpassword()
         } 
       } 
       //NAME 
       const switch_name = async (req)=>{
         req.preventDefault() 
         if( newname != repetnewname && !validationname){
           return console.error('los emails no coinciden')
         }
         const token = Cookies.get('token');   
         const response = await axios.put(`${URI}switchname`,{ id : token, newnombre: newname });  
  
         if( response.status === 202 ){  
           return  setInvalidpassword(true)
         }
         if( response.status === 204 ){  
           console.log("ya cambiaste el nombre del usuario :(") 
           return  setInvalidpassword(true)
         }
         if( response.status == 200){ 
           const newaddresdata = {...userdataglobal}
           newaddresdata.nombre = response.data.newnombre 
           newaddresdata.cont_change_name = response.data.newcont 
           Cookies.set('userdata', JSON.stringify(newaddresdata))
           updateuserdataglobal(newaddresdata)
           fregistercompleted()
           return clearname()
         }
       }
       // EMAIL
       const switch_email = async (req)=>{
         req.preventDefault()  
        if( newemail != repeatnewemail && !validationemail){
          return console.error('los emails no coinciden')
        }
        const token = Cookies.get('token');  
        if(token && newemail)  {
          const response = await axios.put(`${URI}switch_email`,{ id : token, newemail: newemail });    
          // if( response.status === 202 ){  
          //   return  setInvalidpassword(true)
          // }
          // if( response.status === 204 ){  
          //   console.log("ya cambiaste el nombre del usuario :(") 
          //   return  setInvalidpassword(true)
          // }
          if( response.status == 200){  
            setEnvioemail(true)
            // const newaddresdata = {...userInno}
            // newaddresdata.nombre = response.data.newnombre 
            // newaddresdata.cont_change_name = response.data.newcont 
            // Cookies.set('userdata', JSON.stringify(newaddresdata))
            // setUserInno(newaddresdata)
            // fregistercompleted()
            return clearname()
          }
        }

      } 
      const clearname = ()=>{
         setNewname(null)
         setRepetnewname(null)
         setSwitchname(null)
         setemailnew(false)
       }
       const clearformpassword = ()=>{
         setChangepassword(false)
         setRepetnewcontraseña(null)
         setNewcontraseña(null)
         setContraActual(null)
         setInvalidpassword(false)
       }

       useEffect(()=>{
         if(repetnewname && repetnewname.length > 0){
           if( newname != repetnewname ){
             return setValidationname(false)
            } 
             return setValidationname(true)
         }
       },[newname, repetnewname])
       useEffect(()=>{ 
         if(repeatnewemail && repeatnewemail.length>0){
           if(newemail!=repeatnewemail){ 
           return setValidationemail(false)
         }
           return setValidationemail(true) 
         }
       },[newemail, repeatnewemail])
       useEffect(()=>{ 
         if(repetnewcontraseña && repetnewcontraseña.length>0){
           if(newcontraseña!=repetnewcontraseña){ 
           return setValidationpassword(false)
         }
           return setValidationpassword(true) 
         }
       },[newcontraseña, repetnewcontraseña])
       const changeimage = async (index)=>{  
         const token = Cookies.get('token'); 
         const response = await axios.put(`${URI}switch_image`, { id: token, newimage: index })
         if(response.status === 400){
           console.error('url incorrecta')
         }
         if(response.status ===200){
           const newimage = {...userdataglobal}
           newimage.image = index
           updateuserdataglobal(newimage)
           Cookies.set('userdata', JSON.stringify(newimage))
           setEditimage(false)
           const imagen = document.getElementById("lol");
           imagen.src = index;
           // return  window.location.reload()
         } 
        } 
        const handleImageClick = (index) => {
         setActiveImage(index);
         setSwitchimageperfil(urlimageperfil[index])  
       }
       useEffect(() => {
         const fetchData = async () => {
           try {
             const data = [];
             let i = 1;  
             const fetchImage = async () => {
               const response = await fetch(`https://terrabellum.s3.sa-east-1.amazonaws.com/Imagen_perfil/${i}.webp`); 
               if (response.status === 403) {
                 return false;
               } 
               data.push(response.url);
               i++;
               return true;
             }; 
             let shouldContinue = await fetchImage(); 
             while (shouldContinue) {
               shouldContinue = await fetchImage();
             } 
             setUrlimageperfil(data); 
           } catch (error) {
             console.error('Error al obtener los datos:', error);
           }
         }; 
         fetchData();
       }, []); 
       const reenviaremail =  ()=>{
         if(!timereenviar){ 
           console.log("a")
         setTimeout(async() => {
           if( newemail != repeatnewemail && !validationemail){
             return console.error('los emails no coinciden')
           }
           const token = Cookies.get('token');  
           if(token && newemail)  {
             const response = await axios.put(`${URI}switch_email`,{ id : token, newemail: newemail });   
             return setTimereenviar(true)
            }
         }, 1*1000*60*3);
       }
       }
    return (
        <Setting>
            { registercompleted &&
                <Completed/>
              } 
            <SaveUrl name='Profile' url="user/setting/account" imagen="https://terrabellum.s3.sa-east-1.amazonaws.com/Iconurl/1.svg"/>
            <div className={styles.contain}>
                <Title title={"Public account"} />
            </div>
            <div className={styles.containinfo}>
                { editimage &&
                 <div className={styles.containselectimage}>
                     <Image src={exit} className={styles.scape} onClick={()=>setEditimage(false)}/>
                     <div className={styles.images}> 
                       {urlimageperfil && urlimageperfil.map((image, index) => (
                        <div>
                            <img
                          key={index}
                          className={`${styles.image} ${activeImage === index ? styles.active : ''}`}
                          src={image}
                          onClick={() => handleImageClick(index)}
                          alt="ssssa"
                        />
                     { activeImage >=0 && switchimageperfil ? <button onClick={()=>{ changeimage(switchimageperfil) }} className={styles.confirmimage}>Confirm</button> : <button style={{backgroundColor:"gray"}} className={styles.confirmimage}>Confirm</button> }
                     
                        </div>
                        ))} 
                     </div> 
                 </div>}
                  <img src={ userdataglobal.image } 
                  className={styles.img} width={200} height={200}  
                  alt='perfil_usuario' onClick={()=> setEditimage(true)}/>
                        <div className={styles.editimage} onClick={()=>setEditimage(true)}>Edit</div>
                  <div className={ styles.contain_datos }>
                      <p>Name</p>
                      <div>
                          <div className={styles.datauser}>{ userdataglobal.nombre }</div>
                         { userdataglobal.cont_change_name >= 1 ? <button style={{backgroundColor:"gray"}} >Change Name</button> : <button style={{backgroundColor:"#0E001A"}} onClick={()=>setSwitchname(true)}>Change Name</button>} 
                      </div> 
                      <p>Email</p>
                      <div>
                          <div className={styles.datauser}>{ userdataglobal.email } </div>
                          <button style={{backgroundColor:"#0E001A"}} onClick={()=>setemailnew(true)}>Change Email</button>
                      </div>
                      <div style={{display:"flex", justifyContent:"start", alignItems:"center", gap:"1rem"}}>
                        <button onClick={()=>setChangepassword(true)} style={{backgroundColor:"#0E001A", width:"210px", margin:"2rem 3.5rem 2rem 0"}}>Change Password</button> 
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
                  <h2>se a enviado un correo electronico de verificacion a { user ? user.user.email: userInno ? userInno.email : null }</h2>
                  <p>si no te a llegado el correo pincha aqui</p> <p style={{cursor:"pointer", color:"blueviolet", width:"fint-content"}} onClick={()=>reenviaremail()}> Reenviar </p> {timereenviar && <p>tienes que espera 3 min para reenviar el correo</p>}
                  </div>}
                { changepassword &&
                  <div className={styles.containswitchpassword}> 
                    <form onSubmit={switchpassword}> 
                        <div className={styles.switchpassword}>
                          <div style={{position:"relative"}}> 
                            <div style={{display:"flex"}}>
                              <p>Current password</p> { invalidpassword && <p className={styles.errortext}>Your password does not match</p> } 
                            </div>
                              <input required type={eye1 ? "text" : "password"} value={contraActual} onChange={req => setContraActual(req.target.value)}/><Image width={20} style={{position:"absolute", bottom:"12px", right:"20px", cursor:"pointer"}} onClick={()=>{setEye1(!eye1)}} src={eye1? eye : noeye}/>
                          </div>
                          <div style={{position:"relative"}}>
                            <p>New password</p>
                            <input required type={eye2 ? "text" : "password"} value={newcontraseña} onChange={req=> setNewcontraseña(req.target.value)}/><Image width={20} style={{position:"absolute", bottom:"12px", right:"20px", cursor:"pointer"}} onClick={()=>{setEye2(!eye2)}} src={eye2? eye : noeye}/>
                          </div>
                         <div style={{position:"relative"}}>
                         <div style={{display:"flex"}}>
                            <p>Repeat the new password</p> {!validationpassword && repetnewcontraseña && repetnewcontraseña.length > 0 && <p className={styles.errortext}>Passwords do not match</p>} 
                         </div>
                          <input required type={eye3 ? "text" : "password"} value={repetnewcontraseña} onChange={req=> setRepetnewcontraseña(req.target.value)}/> <Image width={20} style={{position:"absolute", bottom:"12px", right:"20px", cursor:"pointer"}} onClick={()=>{setEye3(!eye3)}} src={eye3? eye : noeye}/>
                         </div>
                        
                          <div className={styles.option}>
                            {validationpassword ? <button type="submit">Acceptar</button>: <button style={{backgroundColor:"gray"}}>accept</button>}   <button onClick={()=>{setChangepassword(false); clearformpassword()}}>Cancel</button>
                          </div>
                        </div> 
                    </form>
                  </div> }
                  {switchname && 
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
                  }
        </Setting>
    )
}
export default Account