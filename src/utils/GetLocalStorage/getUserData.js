import Cookies from "js-cookie";
import { Fetch } from "utils/fetch/fetch";
const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'

export const GetUserData = async () => { 
    const token = Cookies.get('token');   
    if( !token ){
      return false
    }

    const userdata = Cookies.get('userdata')
    if( !userdata ){ 
      const response = await Fetch(
        `${URI}getuser` ,
         'POST' ,
         {id : token}
        );

      const data = await response.json()
      if( data ){
      Cookies.set('userdata', JSON.stringify(data))   
      return { data }
      }
    }

    if(userdata){ 
      const data = JSON.parse(userdata)  
      return { data }
    } 
}
