import { Fetch } from "utils/fetch/fetch";
import Cookies from "js-cookie"; 

let validator = true

const changeEmail = async ( newEmail ) => {
  if( validator == true ){
    const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'  
  const token = Cookies.get('token');  
    if(token && newEmail)  { 
      const response = await Fetch(`${URI}switch_email`, 'PUT' ,{ id : token, newemail: newEmail });  
      validator = false   
      return { response : response.status }
    } 
  }
  if ( validator == false ) {
    setTimeout(() => { 
      validator = true
    }, 1000 * 25);
  }
}
export default changeEmail