"use client"
import { Fetch } from "utils/fetch/fetch";
const Switchemail = ({params})=>{ 
    const { id } = params; 
    const URI = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/" 
    const createuser = async () =>{ 
        try {  
        const response = await Fetch(`${URI}verifynewemail?token=${id}`, 'GET')
        console.log(response) 
        if (response.status == 200){ 
            window.close();  
          }
        // if(response.status == 200){  
        //     const cookie = await response.data.token    
        //     if(cookie){
        //       const login = Cookies.set('token', cookie) 
        //       if(login){
        //           return  window.location.reload();  
        //       }
        //     } 
        // } 
    } catch (error) {
        console.error(error);
    }
    }
    createuser() 
} 
export default Switchemail