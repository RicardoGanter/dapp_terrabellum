
import { Fetch } from "utils/fetch/fetch";




const logIn = async ( name, password ) => { 
    try { 
      const response = await Fetch(`${URI}signin`, 'POST' ,{
        nombre: name,
        contraseña: password
      }); 
      const data = await response.json()  
      if(response.status === 200 &&  data.token ){ 
        console.log(response, data)
        const cookie = await data.token 
        Cookies.set('token', cookie)
        setErrorlogin(false)  
        return  window.location.reload()
      }
      if(response.status === 200 && data.twofactor){ 
        return setTwofactor(data.twofactor)
      }
    } catch (error) { 
      console.error(error); 
    }
  };