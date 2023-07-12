import { Fetch } from "utils/fetch/fetch";
import Cookies from "js-cookie";


const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'  

export const changeImageProfile = async (index) => {  
    const token = Cookies.get('token'); 
    const userdata = Cookies.get('userdata') 
    const data = JSON.parse( userdata )  
    const response = await Fetch(`${URI}switch_image`, 'PUT' ,{ id: token, newimage: index })
    if(response.status === 400){
      return  console.error('url incorrecta')
    }
    if(response.status === 200){
     
      const newimage = {...data}
      newimage.image = index 
      Cookies.set('userdata', JSON.stringify(newimage)) 
      
      return { newimage }
      // return  window.location.reload()
    } 
   } 