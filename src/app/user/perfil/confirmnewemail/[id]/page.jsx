"use client"
import { useEffect,useState } from "react";  
import Cookies from 'js-cookie'
import { Fetch } from "utils/fetch/fetch";
const Confirmnewemail = ({params})=>{
    const [user, setuset] = useState(true)
    const { id } = params; 
    const URI = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/" 
    useEffect(()=>{ 
    const createuser = async () =>{ 
        try { 
        const response = await Fetch(`${URI}confirmnewemail?token=${id}`, 'GET') 
        const data = await response.json()
        if(response && response.status == 500){  
            console.error("error")
        }
        if(response && response.status == 200){   
            const cookie = await data.newemail    
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