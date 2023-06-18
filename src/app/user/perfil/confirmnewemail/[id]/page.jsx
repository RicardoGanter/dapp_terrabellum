"use client"
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie'
const Confirmnewemail = ({params})=>{
    const [user, setuset] = useState(true)
    const { id } = params; 
    const URI = "http://localhost:8000/usuarios/"
    const router = useRouter()
    // useEffect(() => {
    //     const cookies =  Cookies.get('token')
    //     if (!cookies) {
    //       setuset(cookies)
    //       router.push('/');
    //     }
    //     setuset(false)
    //   }, []);
    useEffect(()=>{ 
    const createuser = async () =>{ 
        try { 
        const response = await axios.get(`${URI}confirmnewemail?token=${id}`) 
        if(response && response.status == 500){  
        }
        if(response && esponse.status == 200){  
            console.log(response)
            console.log(response.data)
            const cookie = await response.data.newemail    
            if(cookie){
              const login = Cookies.set('token', cookie) 
              if(login){       // const newaddresdata = {...userInno}
                  // newaddresdata.nombre = response.data.newnombre 
                  // newaddresdata.cont_change_name = response.data.newcont 
                  // Cookies.set('userdata', JSON.stringify(newaddresdata))
                  // setUserInno(newaddresdata)
                  // fregistercompleted()
                  // return clearname()
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


export default Confirmnewemail