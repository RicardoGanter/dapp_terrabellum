"use client"
import Image from "next/image";
import yoxd from '../../../public/img/lal.webp'
import styles from '../../../styles/user/perfil.module.scss'
import ConnectButton from "../../../components/header/loginmetamask/loginmetamask";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Perfil = ()=>{
    const router = useRouter()
    const [user, setUser] = useState(null)
    useEffect(()=>{
        (async()=>{
          const session = await getSession()
          if(!session){
            router.push('./signin')
          }
          setUser(session)
        })()
      },[])
    return (
        <>
        { user ?  
            <div className={styles.contain}>
            <div className={styles.containinfo}>
                <img src={ user.user.image } 
                className={styles.img} width={150} height={150}  
                alt='perfil_usuario'/>
                <div className={ styles.contain_datos }>
                    <p>Name:  </p>
                    <div>
                        <input value={ user.user.name } />
                        <button>Change Name</button>
                    </div>

                    <p>Email: </p>
                    <div>
                        <input value={ user.user.email } />
                        <button>Change Name</button>
                    </div>
                    <button style={{width:"100%", margin:"2rem auto"}}>Change Password</button>
                </div>
                
            </div>
            <div className={styles.wallet}>
                <button>Change wallet</button> <ConnectButton/> 
            </div>
    </div>
      : null  }
         
        </>
    )
}

export default Perfil;

// { user ?
//     <div className={styles.contain}>
//         <div className={styles.containinfo}>
//             <img src={ user.user.image } 
//             className={styles.img} width={200} height={200}  
//             alt='perfil_usuario'/>
            
//             <div className={ styles.contain_datos }>
//                 <p>Usuario : { user.user.name } </p>
//                 <p>Correo: { user.user.email }</p>
//                 <p>Miembro desde: </p>
//             </div>
//         </div>

//         <div className={styles.descripcion}>
//             <p>descripcion:</p>
//         </div>

//         <div className={styles.wallet}>
//             <p className={styles.address}> Wallet:</p><ConnectButton/>
//         </div>
//     </div>
//        :  null}
// export const getServerSideProps = async(context)=>{
//     const session = await getSession(context)
//     if (!session) return{
//       redirect:{
//         destination: '/login',
//         permanent: false
//       }
//     }
//     return{
//       props:{
//         session
//       }
//     }
//   }