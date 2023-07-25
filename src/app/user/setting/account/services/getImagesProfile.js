import { Fetch } from "../../../../../utils/fetch/fetch";
import Cookies from "js-cookie";

const userdata = Cookies.get('userdata')
 
const getImagesProfile = async () => {
    try {
      const data = []; 
      let i = 3  
      const image = JSON.parse(userdata)  
      const fetchImage = async () => { 
        let url = `https://terrabellum.s3.sa-east-1.amazonaws.com/Imagen_perfil/${i}.webp` 
        if( image.image != url){  
        const response = await Fetch(`${url}`, 'GET'); 
        if (response && response.status === 403) {
          return false;
        }  
        data.push(response.url);
      }
        i++;
        return true;
     
      }; 
      let shouldContinue = await fetchImage(); 
      while (shouldContinue) { 
        shouldContinue = await fetchImage();   
       } 
       if(data.length > 5) { 
         return { data } 
       }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }; 
   
export default getImagesProfile