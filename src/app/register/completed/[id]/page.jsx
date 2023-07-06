"use client"
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation"; 
import Cookies from 'js-cookie'
import { Fetch } from "utils/fetch/fetch";
const Completedregister = ({params})=>{
    const [user, setuset] = useState(true)
    const { id } = params; 
    const URI = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/"
    const router = useRouter()
    useEffect(() => {
        const cookies =  Cookies.get('token')
        if (cookies) {
          setuset(cookies)
          router.push('/');
        }
        setuset(false)
      }, []);
    useEffect(()=>{ 
    const createuser = async () =>{ 
        try {
        const response = await Fetch(`${URI}confirmuser?token=${id}`, 'GET' )
        const data = await response.json()
        if(response.status == 500){ 
            return router.push('/register')
        }
        if(response.status == 200){  
            const cookie = await data.token    
            if(cookie){
              const login = Cookies.set('token', cookie) 
              if(login){
                  return  window.location.reload();  
              }
            } 
        } 
    } catch (error) {
        console.error(error);
    }
    }
    createuser()
    },[]) 
}


export default Completedregister