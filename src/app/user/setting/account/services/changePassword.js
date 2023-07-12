import { Fetch } from "utils/fetch/fetch";
import Cookies from "js-cookie";

// const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/' 

const URI = 'http://localhost:8000/usuarios/' 

export const changePassword = async ( currentPassword , newPassword )=>{
    // preventDefault()   
    const token = Cookies.get('token');   
    const response = await Fetch(`${URI}switchpassword`, 'PUT' , { id : token, contraseña: currentPassword , newcontraseña: newPassword  });  
    return { response : response.status }
  } 