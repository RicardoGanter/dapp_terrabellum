"use client"
import  {Title} from "../layout.jsx"
import styles from '../../../../styles/user/setting/account/account.module.scss' 
import {SaveUrl} from '../../../../components/header/header.jsx' 
import { useState, useContext } from "react"
import { User_data } from '../../../layout.jsx'
import lock from '../../../../public/icon/lock-solid.svg'  
import Image from "next/image.js"     
import dynamic from "next/dynamic.js"
const ImagesComponents = dynamic(() => import("./components/images.component.jsx"));
const ChangePasswordComponent = dynamic(() => import("./components/changePassword.component.jsx")); 
const ChangeNameComponent = dynamic(() => import("./components/changeName.component.jsx"));  
const ChangeEmailComponent = dynamic(() => import("./components/changeEmail.component.jsx"));   

const Account = ()=>{
  const { userdataglobal } = useContext(User_data);   
  const [changepassword, setChangepassword] = useState(false)   
  const [switchname ,setSwitchname] = useState(false)  
  const [editimage, setEditimage] = useState(false)  
  const [emailnew, setemailnew] = useState(false)  
  return ( 
    <div> 
      <SaveUrl name='Account' url="/user/setting/account" imagen="https://d2qjuqjpn9e4f.cloudfront.net/Iconurl/1.svg"/>
      <div className={styles.contain}>
          <Title title={"Public account"} />
      </div> 
      <div className={styles.containinfo}>
        { editimage && <ImagesComponents/>  }
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
        { emailnew && <ChangeEmailComponent/>  } 
        { changepassword &&  <ChangePasswordComponent/> }
        { switchname &&  <ChangeNameComponent/>  }
    </div>
  )
}
export default Account