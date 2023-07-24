import { Fetch } from "../../../../../utils/fetch/fetch"
import Cookies from 'js-cookie' 

const DeletedTwoFactor = async () => { 
    const userdata = Cookies.get('userdata') 
    const data = JSON.parse( userdata )  
    const token = Cookies.get('token');   
    const URI  = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/"
    const response = await Fetch(
        `${URI}deletetwofactor`,
         'PUT' ,
         { id: token }
         )
         
    if(response.status == 200){ 
        const getUser = {...data}
        getUser.two_factor_google = null 
        Cookies.set('userdata', JSON.stringify(getUser))
        return { getUser }
    } 
}

export default DeletedTwoFactor