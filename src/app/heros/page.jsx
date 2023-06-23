"use client"
import styles from '../../styles/heros/heros.module.scss'
import Image from 'next/image'
import vault from '../../public/img/cofre.png'
import NetworkGoerliEth from '../../components/funcion/network'
import ConnectInnomicNft from '../../components/funcion/connectinnomicnft'
import axios from 'axios'
import PropsNftcartas from '../../components/props/propsnftcartas'
import { useState,useEffect } from 'react' 
const Heros = ()=>{
    const [arraynftmint, setArraynftmint] = useState([])
    const [Legendary, setLegendary] = useState([])
    const [Rare, setRare] = useState([]) 
    const [Common, setCommon] = useState([])
    const [probabilitynft, setProbabilitynft] = useState([])
    function calcularProbabilidad(datos) {
        const total = datos.reduce((sum, dato) => sum + dato, 0);
        const probabilidades = datos.map((dato) => ((dato / total) * 100).toFixed(1));
        return probabilidades;
      }
      
    const Mint = async ()=>{
        try{
            const signer = await NetworkGoerliEth();
            const address = await signer.getAddress();
            const contract = await ConnectInnomicNft();
             const URI = await axios.get( "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/Mintt" )
            // const URI = await axios.get( "http://localhost:8000/usuarios/Mintt" );
            const propability = URI.data.message
            if(propability){
                const mint = await contract._mintTokenAllowedToEarn(address,propability);
                return mint
            }
        }
        catch(error){
            console.log(error);
        }
      }
      useEffect(()=>{
        const legendary =  arraynftmint.filter(x=> x.tanda<=3)  
        setLegendary(legendary)
        const rare = arraynftmint.filter(x=> x.tanda>3 && x.tanda <=6)  
        setRare(rare)
        const common = arraynftmint.filter(x=> x.tanda > 6)  
        setCommon(common)
      },[arraynftmint])

      useEffect(()=>{ 
        const data = [Common.length, Rare.length, Legendary.length]
        const calculo = calcularProbabilidad(data) 
        setProbabilitynft(calculo)
      },[Legendary && Rare && Common])

      useEffect(()=>{
       const getdatamint =async ()=>{
         const response = await axios.get('https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/getdatamint')
        if(response){
            setArraynftmint(response.data.usuario.nft_mints)
        }
       }
       getdatamint()
      },[]) 
    return(
        <>
            <div className={styles.contain}>
                <div className={styles.circle_absolute} style={{top:4, left:4}}/>
                <div className={styles.circle_absolute} style={{top:4, right:4}}/>
                <div className={styles.circle_absolute} style={{bottom:4, left:4}}/>
                <div className={styles.circle_absolute} style={{bottom:4, right:4}}/>

                <div className={styles.rectangle_absolute} style={{left:8}}/>
                <div className={styles.rectangle_absolute} style={{right:8}}/>

                <div className={styles.rectangle_absolute_h} style={{top:8}}/>
                <div className={styles.rectangle_absolute_h} style={{bottom:8}}/>

                <div className={styles.boxhero}>
                    <Image src={vault} alt="vault" className={styles.vault} />
                    <div className={styles.contain_pricebuy}>
                        <div className={styles.price}>Price</div>
                        <div className={styles.valor}>100 USDT</div>
                        <div className={styles.btnbuy} onClick={()=> Mint()}> Buy </div>
                    </div> 
                </div> 
                <div className={styles.contain_infodrop}>
                    <div className={styles.droprate}>
                        drop rate
                    </div>
                    <div className={styles.raritys}>
                        <div>
                            <div className={styles.rarity} style={{background:"#4085B7"}}><div className={styles.circlesimbol} style={{top:3, left:3}}/> <div className={styles.circlesimbol} style={{top:3, right:3}}/> Common { probabilitynft && probabilitynft[0]}%  </div>
                            <div className={styles.characters}>
                            <h2>Characters</h2>
                            <div className={styles.containcharact}>
                                    { arraynftmint && arraynftmint.map(data => 
                                    <div> 
                                    {  data.tanda >6  && <div className={styles.character}> {data.nombre} </div>   } 
                                    </div> 
                                        )}
                                </div> 
                            </div>
                        </div>
                        <div>
                        <div className={styles.rarity} style={{background:"#670B59"}}><div className={styles.circlesimbol} style={{top:3, left:3}}/> <div className={styles.circlesimbol} style={{top:3, right:3}}/> Rare { probabilitynft && probabilitynft[1]}% </div>
                            <div className={styles.characters}>
                            <h2>Characters</h2>
                            <div className={styles.containcharact}>
                                    { arraynftmint && arraynftmint.map(data => 
                                    <div> 
                                    {  data.tanda >3 && data.tanda <=6 && <div className={styles.character}> {data.nombre} </div>   } 
                                    </div> 
                                        )}
                                </div> 
                            </div>
                        </div>

                        <div>
                            <div className={styles.rarity} style={{background:"#E0C11F"}}><div className={styles.circlesimbol} style={{top:3, left:3}}/> <div className={styles.circlesimbol} style={{top:3, right:3}}/> Legendary { probabilitynft && probabilitynft[2]}% </div>
                            <div className={styles.characters}>
                                <h2>Characters</h2>
                                <div className={styles.containcharact}>
                                    { arraynftmint && arraynftmint.map(data => 
                                    <div> 
                                    {  data.tanda <=3  && <div className={styles.character}> {data.nombre} </div>   } 
                                    </div> 
                                        )}
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
                {/* <div className={styles.boxheroinfo}></div>
                <div className={styles.Ranking}></div> */}
            </div>
        </>
    )
}
export default Heros