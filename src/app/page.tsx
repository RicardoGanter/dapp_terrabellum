
import styles from './loading.module.scss'
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react" //desde el front-end
import loading from '../../public/loading.svg'
import Image from "next/image"
// import { GetServerSideProps } from "next" desde el back-end
// import { useSession } from 'next-auth/react'
// import { useRouter } from "next/router"
export default function Home() {
  // const router = useRouter()
  // const {data: session, status} = useSession()

  //si no esta auntenticado entonces.
  // if (status==='unauthenticated'){
    // router.push('./login')
  // }
  //datos desde el front-end
  // const [user, setUser] = useState(null)
  //   useEffect(()=>{
  //   (async()=>{
  //     const session = await getSession()
  //   })()
  // },[])
  return (
    <>
    {/* {    session ? */}
    {/* :( <p>Cargando...</p>)} */}
    </>
  )
}
{/* <div>
      {JSON.stringify(user)}
    </div> */}
// desde el back-end

// export const getServerSideProps = async(context)=>{
//   const session = await getSession(context)
//   return{
//     props:{
//       session: session,
//     }
//   }
// }
