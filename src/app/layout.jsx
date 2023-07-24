"use client"
import '../styles/globals.scss'
import Header from '../components/header/header'
import Option from '../components/navbar/opcion' 
// import Loading from './loading'
// import { Suspense } from 'react'
// import { SessionProvider } from 'next-auth/react'
import { createContext, useState, useEffect } from 'react'; 
export  const MyContext = createContext();
export  const User_data = createContext();
export default function RootLayout({
  children,
} 
) { 
  const [sharedVariable, setSharedVariable] = useState();
  const updateSharedVariable = (newValue ) => {
    setSharedVariable(newValue);
  }; 

//   useEffect(()=>{
//     if(window.caches){   
//       const currentUrl = window.location.href; 
//       const deletedText = "http://localhost:3000"
//       const nuevoString = currentUrl.replace(deletedText, ''); 
//       if ('serviceWorker' in navigator) {
//         navigator.serviceWorker
//           .register("/")
//           .then((registration) => console.log('scope is: ', registration.scope));
//       }
//       const installEvent = () => {
//         self.addEventListener('install', () => {
//           console.log('service worker installed');
//         });
//       };
//       installEvent(); 
//       const activateEvent = () => {
//         self.addEventListener('activate', () => {
//           console.log('service worker activated');
//         });
//       };
//       activateEvent();
//       const Cache = async ()=>{ 
//           const cachestest = await caches.open("v2") 
//           if(cachestest){ 
//             cachestest.addAll([
//               nuevoString, 
//             ])
//           }
//       } 
//       Cache()
//       }
// },[])
  const [userdataglobal, setUserdataglobal] = useState('asdasdasd');
  const updateuserdataglobal = (newValue ) => {
    setUserdataglobal(newValue);
  }; 


  return (
    <html lang="en">
       <head>
        <meta charset="UTF-8" />
        <link rel="shortcut icon" href="https://terrabellum.s3.sa-east-1.amazonaws.com/logo.webp"/>
        <title>Terrabellum</title>
        <meta name='robots' content='TerraBellum' />
        <meta name="googlebot" content="23123123"/>
        <meta name ="description" content ="Learning about Meta Tags." />
        <meta property="og:image" content="https://terrabellum.s3.sa-east-1.amazonaws.com/logo.webp" />
        <meta property="og:description" content="Discover an ever-evolving digital universe with blockchain, dApps, and the metaverse. Immerse yourself in an exciting video game with infinite possibilities. Explore, create and connect like never before!" />
        <meta property="og:title" content="Terrabellum Dapp" />
      </head>
      <MyContext.Provider value={{ sharedVariable, updateSharedVariable }}>
        <User_data.Provider value={{userdataglobal ,updateuserdataglobal }} > 
        {/* <SessionProvider > */}
          <body> 
          <Header/>
          <div style={{margin:'120px 0 0 170px'}}>
            {/* { <Suspense fallback={<Loading/>}> */}
              {children}
            {/* </Suspense>} */}
          </div>
          <Option/>
          </body>
        {/* </SessionProvider>  */}
        </User_data.Provider>
      </MyContext.Provider>
    </html>
  )
} 
// RootLayout.defaultProps ={
//        title: 'TerraBellum',
//        description: '.'
//    }