"use client"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react" //desde el front-end 
// import { GetServerSideProps } from "next" desde el back-end
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { ClipLoader } from 'react-spinners'
export default function Home() {
  const router = useRouter()
  //si no esta auntenticado entonces.
  // if (status==='unauthenticated'){
    // router.push('./login')
  // }
  // datos desde el front-end
  const [user, setUser] = useState(null)
  useEffect(()=>{
     (async()=>{
       const session = await getSession()
       setUser(session)
       if(!session){
         router.push('/')
       }
     })()
   },[])
  return (
    <>
    { user ? <div style={{position:"absolute", right:40, bottom:30}} >
                      
        <ClipLoader
          color="#f200ff"
          cssOverride={{}}
          size={60}
        />
            </div>:  <> </> }
    </>
  )
}

// export const getServerSideProps = async(context)=>{
//   const session = await getSession(context)
//   return{
//     props:{
//       session: session,
//     }
//   }
// }
