// import { Inter } from '@next/font/google'
import Layout from "../../components/layout"
import Marketcompra from "@/components/marketcompra"
import Sosol from "@/components/botonsol"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react" //desde el front-end
// import { GetServerSideProps } from "next" desde el back-end
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router"
export default function Home() {
  const router = useRouter()
  const {data: session, status} = useSession()

  //si no esta auntenticado entonces.
  if (status==='unauthenticated'){
    router.push('./login')
  }
  //datos desde el front-end
  const [user, setUser] = useState(null)
    useEffect(()=>{
    (async()=>{
      const session = await getSession()
    })()
  },[])

  console.log(user)
  return (
    <>
    {    session ?
    (<main>
      <Layout>
      </Layout>
    </main>)
    :( <p>Cargando...</p>)}
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
