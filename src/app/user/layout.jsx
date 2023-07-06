"use client" 
// import { getSession } from 'next-auth/react' 
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useEffect,useContext } from 'react'; 
import { User_data } from '../layout'
import { Fetch } from 'utils/fetch/fetch';
const User = ( {children}) => { 
    // const [user, setUser] = useState(null) 
    const { userdataglobal, updateuserdataglobal } = useContext(User_data);
    const router = useRouter()
    useEffect(()=>{ 
      if(window.caches){
        console.log("holaaaaa")
      }
    const getdata = async()=> {  
       const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
        const token = Cookies.get('token');  
        // const session = await getSession()
        if(!token ){
          console.error("no tienes una sesion iniciada")
          return router.push('/signin')
        }
        // if(session){
        //   return setUser(session)
        // } 
        const userdata = Cookies.get('userdata') 
        if(!userdata){ 
          const response = await Fetch(`${URI}getuser` , 'POST' ,{id : token});
          const data = await response.json()
          if(data){
          const datauser = Cookies.set('userdata', JSON.stringify(data))   
          return updateuserdataglobal(data)
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