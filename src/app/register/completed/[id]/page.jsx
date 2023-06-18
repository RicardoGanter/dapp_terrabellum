"use client"
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie'
const Completedregister = ({params})=>{
    const [user, setuset] = useState(true)
    const { id } = params; 
    const URI = "http://localhost:8000/usuarios/"
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
            
        const response = await axios.get(`${URI}confirmuser?token=${id}`)
        if(response && response.status == 500){ 
            return router.push('/register')
        }
        if(response.status == 200){  
            const cookie = await response.data.token    
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