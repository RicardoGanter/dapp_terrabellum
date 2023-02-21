import Layout from "@/components/layout"
import Image from "next/image";
import yoxd from '../../../public/img/lal.png'
import styles from '../../styles/user/perfil.module.css'
import Metamasklogin from "@/components/loginmetamask";
const Perfil = ({name})=>{
    return(
        <Layout>
            <div className={styles.contain}>
                <div className={styles.containinfo}>
                    <Image src={yoxd} className={styles.img} alt='perfil_usuario'/>
                    
                    <div className={styles.contain_datos}>
                        <p>Usuario: </p>
                        <p>Nombre:{name} </p>
                        <p>Correo: </p>
                        <p>Miembro desde: </p>
                    </div>
                </div>

                <div className={styles.descripcion}>
                    <p>descripcion:</p>
                </div>

                <div className={styles.wallet}>
                    <div> Wallet:</div><Metamasklogin/>
                </div>
            </div>
        </Layout>
    )
}

export default Perfil;