import styles from '../../src/styles/props/propsnftcartas.module.css'

const PropsNftcartas = ({texto})=>{
    return(
             <div className={styles.cards}>  
                    <div className={styles.nft}><p className={styles.texto}>{texto}</p></div>

                    <div className={styles.hability}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div className={styles.power}/>
                            <div className={styles.power}></div>
                            <div className={styles.power}></div>
                        </div>
                    </div>


                    <div className={styles.price}>usdt</div>
                    


                    {/* <div >
                    <div style={{backgroundColor:colorInit}} className={styles.card_front}>
                        <p className={styles.texto}>{textinit}</p>
                        <div className={styles.imagennft}></div>
                        <div className={styles.contain}></div>
                    </div>
                    </div> */}
                    {/* <div style={{backgroundColor:colorfin}} className={styles.card_back}></div> */}
            </div>
)}

export default PropsNftcartas;