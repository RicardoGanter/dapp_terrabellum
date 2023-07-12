import { Fetch } from "utils/fetch/fetch";
import Cookies from "js-cookie";

const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'  

export const changeName = async ( newname ) => {
  const token = Cookies.get('token');   
  const userdata = Cookies.get('userdata') 
  const newUser = JSON.parse( userdata )  
  const response = await Fetch(`${URI}switchname`, 'PUT' ,{ id : token, newnombre: newname });  
  const data = await response.json() 
  if( response.status == 200){ 
    const newaddresdata = {...newUser}
    newaddresdata.nombre = data.newnombre 
    newaddresdata.cont_change_name = data.newcont 
    Cookies.set('userdata', JSON.stringify(newaddresdata)) 
    return { status : response.status , newUser }
  }
}