"use client"   
import { useEffect,useState } from 'react'; 
import { GetUserData } from '../../utils/GetLocalStorage/getUserData';
import { useRouter } from 'next/navigation'; 

const User = ( {children}) => { 
  const router = useRouter()  
  const [wallet, setWallet]  = useState(false)
    useEffect(()=>{  
    const getUserStorage = async () => { 
    const { data } = await GetUserData() 
    const getAddress = localStorage.getItem("Addresstemp"); 
    if( !data && !getAddress ){
      return router.push('/')
    } 
    const newWallet = data ? data : getAddress ? getAddress : null
    setWallet(newWallet)
    } 
    getUserStorage()
  },[]) 
    return(
        <>
        { wallet &&  
             children  
        } 
        </>
    ) 
} 
export default User 