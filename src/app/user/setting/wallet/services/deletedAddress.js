import Cookies from "js-cookie";
import { Fetch } from "../../../../../utils/fetch/fetch";
const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'  

export const DeleteAddress = async()=>{  
    const token = Cookies.get('token');  
    const userdata = Cookies.get('userdata') 
    const data = JSON.parse( userdata )  
    const response = await Fetch(`${URI}deleteaddress`, 'PUT' ,{id : token });
    if(response.status === 200){
      const newAddresData = {...data}
      newAddresData.address_metamask = null 
      Cookies.set('userdata', JSON.stringify(newAddresData))   
      return { newAddresData }
    }
  }