"use client"
import '../styles/globals.scss'
import Header from '../components/header/header'
import Option from '../components/navbar/opcion'
// import Loading from './loading'
// import { Suspense } from 'react'
// import { SessionProvider } from 'next-auth/react'
import { createContext, useState } from 'react'; 
export  const MyContext = createContext();
export  const User_data = createContext();
export default function RootLayout({
  children,
}
// : {
//   children: React.ReactNode
// }
) { 
  const [sharedVariable, setSharedVariable] = useState();
  const updateSharedVariable = (newValue ) => {
    setSharedVariable(newValue);
  }; 


  const [userdataglobal, setUserdataglobal] = useState('asdasdasd');
  const updateuserdataglobal = (newValue ) => {
    setUserdataglobal(newValue);
  }; 


  return (
    <html lang="en">
       <head>
         <link rel="shortcut icon" href="https://terrabellum.s3.sa-east-1.amazonaws.com/logo.webp"/>
        <title>Terrabellum</title>
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