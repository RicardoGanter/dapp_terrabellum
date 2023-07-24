import { Fetch } from "../../../../../utils/fetch/fetch"
import Cookies from 'js-cookie' 
const NewTwoFactor = async ()=>{
    const userdata = Cookies.get('userdata') 
    const toJsonData = JSON.parse(userdata)  
        const URIr  = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/twofactor" 
        const response = await Fetch( URIr, 'POST' , { email: toJsonData.email})
        const data = await response.json()
        if(data){    
        return { secret : data.secret, auth : data.otpAuthUrl }
        }   
}

export default NewTwoFactor