import Image from "next/image";
import yoxd from '../../../../public/img/lal.webp'
import styles from '../../../styles/user/perfil.module.scss'
import ConnectButton from "../../../../components/header/loginmetamask/loginmetamask.jsx"
// import { getSession } from "next-auth/react";
const Perfil = ()=>{
    return (
            <div className={styles.contain}>
                <div className={styles.containinfo}>
                    <Image src={yoxd} className={styles.img} alt='perfil_usuario'/>
                    
                    <div className={styles.contain_datos}>
                        <p>Usuario: </p>
                        <p>Nombre: </p>
                        <p>Correo: </p>
                        <p>Miembro desde: </p>
                    </div>
                </div>

                <div className={styles.descripcion}>
                    <p>descripcion:</p>
                </div>

                <div className={styles.wallet}>
                    <div className={styles.address}> Wallet:</div><ConnectButton/>
                </div>
            </div>
    )
}

export default Perfil;


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