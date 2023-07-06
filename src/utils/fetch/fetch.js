 
  
export const Fetch = async (url, method, data) => {
  try {
    if (data) { 
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }); 
        if (response) { 
          return response 
        } else {
          throw new Error(response.message);
        }
      }
      if(!data){ 
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            } 
          }); 
          if (response) { 
            return response;
          } else {
            throw new Error(response.message);
          } 
      }
  } catch (error) {
    console.log(error)
  }
  };
  
//   const response = await Fetch(`${URI}register`, 'POST', { nombre: Nombre, contraseña: Contraseña, email: Email });
  


  
// export const Fetch = async (url, method, data)=>{ 
//     const response = await ( await fetch(url, {
//         method: method, 
//         headers: {
//           'Content-Type': 'application/json'
//         },
//        ...(data && {body: JSON.stringify({ data })})
//       }) ).json()
//       if ( response ){
//         return response
//     }
// }  
