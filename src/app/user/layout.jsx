"use client"   
import { useEffect,useContext } from 'react'; 
import { User_data } from '../layout' 
import { GetUserData } from 'utils/GetLocalStorage/getUserData';
import { useRouter } from 'next/navigation'; 

const User = ( {children}) => { 
  const router = useRouter()
    // const [user, setUser] = useState(null) 
    const { userdataglobal, updateuserdataglobal } = useContext(User_data); 
    
    useEffect(()=>{  
    const getUserStorage = async () => {
    const { data } = await GetUserData()
    if( !data ){
      return router.push('/')
    }
    updateuserdataglobal(data) 
    } 
    getUserStorage()
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