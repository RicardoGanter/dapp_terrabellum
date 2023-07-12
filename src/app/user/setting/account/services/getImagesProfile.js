import { Fetch } from "utils/fetch/fetch";
 
export const getImagesProfile = async () => {
    try {
      const data = [];
      //ARREGLAR EL i , puede ser problema de CORS o WAF DE aws
      let i = 6;  
      const fetchImage = async () => {
        const response = await Fetch(`https://terrabellum.s3.sa-east-1.amazonaws.com/Imagen_perfil/Imagen_perfil/${i}.webp`, 'GET'); 
        if (response && response.status === 403) {
          return false;
        }  
        data.push(response.url);
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