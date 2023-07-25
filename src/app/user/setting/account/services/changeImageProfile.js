import { Fetch } from "../../../../../utils/fetch/fetch";
import Cookies from "js-cookie";


const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'  
function modificarURL(urlOriginal) {
  const nuevaURL = urlOriginal.replace("/Imagen_perfil/", "/Imagen_perfil/Imagen_perfil/");
  return nuevaURL;
}
const changeImageProfile = async (index) => {    
    const urlModificada = modificarURL(index); 
    const token = Cookies.get('token');  
    const userdata = Cookies.get('userdata') 
    const data = JSON.parse( userdata )  
    const response = await Fetch(`${URI}switch_image`, 'PUT' ,{ id: token, newimage: urlModificada })
    if(response.status === 400){
      return  console.error('url incorrecta')
    }
    if(response.status === 200){
     
      const newimage = {...data}
      newimage.image = urlModificada 
      Cookies.set('userdata', JSON.stringify(newimage))  
      return { newimage } 
    } 
   } 
   export default changeImageProfile