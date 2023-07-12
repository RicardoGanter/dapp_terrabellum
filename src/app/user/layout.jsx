"use client"   
import { useEffect,useContext } from 'react'; 
import { User_data } from '../layout' 
import { GetUserData } from 'utils/GetLocalStorage/getUserData';
import { useRouter } from 'next/navigation'; 

const User = ( {children}) => { 
  const router = useRouter()
    // const [user, setUser] = useState(null) 
    const { userdataglobal, updateuserdataglobal } = useContext(User_data); 
    useEffect(()=>{
      if(window.caches){   
        const currentUrl = window.location.href; 
        const deletedText = "http://localhost:3000"
        const nuevoString = currentUrl.replace(deletedText, ''); 
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register("/")
            .then((registration) => console.log('scope is: ', registration.scope));
        }
        const installEvent = () => {
          self.addEventListener('install', () => {
            console.log('service worker installed');
          });
        };
        installEvent(); 
        const activateEvent = () => {
          self.addEventListener('activate', () => {
            console.log('service worker activated');
          });
        };
        activateEvent();
        const Cache = async ()=>{ 
            const cachestest = await caches.open("v2") 
            if(cachestest){ 
              cachestest.addAll([
                nuevoString, 
              ])
            }
        } 
        Cache()
        }
  },[])
    useEffect(()=>{  
    const getUserStorage = async () => {
    const { data } = await GetUserData()
    if( !data ){
      return router.push('/')
    }
    updateuserdataglobal(data) 
    } 
    getUserStorage()
  },[]) 
    return(
        <>
        { userdataglobal &&  
             children  
        } 
        </>
    ) 
} 
export default User 