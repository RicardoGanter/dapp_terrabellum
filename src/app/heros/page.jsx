"use client"
import styles from '../../styles/heros/heros.module.scss'
import Image from 'next/image'
import vault from '../../public/icon/vault-solid.svg'
import NetworkGoerliEth from '../../components/funcion/network'
import ConnectInnomicNft from '../../components/funcion/connectinnomicnft'
import axios from 'axios'

const Heros = ()=>{
    const Mint = async ()=>{
        try{
            const signer = await NetworkGoerliEth();
            const address = await signer.getAddress();
            const contract = await ConnectInnomicNft();
            const response = await axios.get( "http://localhost:8000/usuarios/Mintt" );
            const lol = response.data.message
            const mint = await contract._mintTokenAllowedToEarn(address,lol);
        }
        catch(error){
            console.log(error);
        }
      }
    return(
        <>
            <div className={styles.contain}>
                <div className={styles.boxhero}>
                    <Image src={vault} alt="vault" className={styles.vault} />
                    <button onClick={()=> Mint()}> Buy </button>
                </div>
                <div className={styles.boxheroinfo}></div>
                <div className={styles.Ranking}></div>
            </div>
        </>
    )
}
export default Heros