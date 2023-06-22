"use client" 
import { getSession } from 'next-auth/react' 
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useState,useEffect,useContext } from 'react'; 
import { User_data } from '../layout'
const User = ( {children}) => { 
    const [user, setUser] = useState(null) 
    const { userdataglobal, updateuserdataglobal } = useContext(User_data);
    const router = useRouter()
    useEffect(()=>{ 
    const getdata = async()=> {  
       const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
        const token = Cookies.get('token');  
        const session = await getSession()
        if(!token && !session){
          console.error("no tienes una sesion iniciada")
          return router.push('./signin')
        }
        if(session){
          return setUser(session)
        } 
        const userdata = Cookies.get('userdata') 
        if(!userdata){ 
          const response = await axios.post(`${URI}getuser`,{id : token});
          if(response.data){
          const datauser = await Cookies.set('userdata', JSON.stringify(response.data))   
          return updateuserdataglobal(response.data)
          }
        }
        if(userdata){ 
          const data = JSON.parse(userdata)  
          return updateuserdataglobal(data)
        } 
    };
    getdata()
  },[]) 
    return(
        <>
        { userdataglobal &&  
             children  
        } 
        </>
    ) 
} 
export default User

