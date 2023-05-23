"use client"
import styles from '../../styles/heros/heros.module.scss'
import Image from 'next/image'
import vault from '../../../public/icon/vault-solid.svg'
import NetworkGoerliEth from '../../../components/funcion/network'
import ConnectInnomicNft from '../../../components/funcion/connectinnomicnft'
const Heros = ()=>{
    const probabilidad = ()=>{
        var randomNumber = Math.floor(Math.random() * 4) + 1;
        if (Math.random() < 0.01) {
            return randomNumber += 66;
          } else if (Math.random() < 0.2) {
            return randomNumber += 33;
          }
          return randomNumber
        }
    const Mint = async ()=>{
        const signer = await NetworkGoerliEth();
        const address = await signer.getAddress();
        const contract = await ConnectInnomicNft();
        const nftaleatoreo = probabilidad()
        const mint = await contract._mintTokenAllowedToEarn(address,nftaleatoreo);
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