import Cookies from "js-cookie";
import { Fetch } from "utils/fetch/fetch";
import NetworkGoerliEth from "components/funcion/network";
const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'  

export const connectWallet = async ()=>{  
    const signer = await NetworkGoerliEth();
    const address = await signer.getAddress();
    const token = Cookies.get('token');  
    const userdata = Cookies.get('userdata') 
    const data = JSON.parse( userdata )  
    const response = await Fetch(`${URI}sendaddres`, 'POST' ,{id : token, address_metamask: address});
    if(response.status===200){ 
      const newAddress = {...data}
      newAddress.address_metamask = address   
      Cookies.set('userdata', JSON.stringify(newAddress)) 
      return { newAddress }
    }  
}   