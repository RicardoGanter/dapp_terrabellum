"use client"
import styles from '../../styles/heros/heros.module.scss'  
import { useState,useEffect } from 'react' 
import { Fetch } from '../../utils/fetch/fetch'
import cofre from './cofre (1).webp'
import Image from 'next/image'
import usdticon from '../../public/usdt.webp'
// Fetching
import  mintNft  from './services/mintNft'
// Functions
import { calculateProbability } from './utils/probability'

const Heros = ()=>{
  const [arraynftmint, setArraynftmint] = useState([])
  const [Legendary, setLegendary] = useState([])
  const [Rare, setRare] = useState([]) 
  const [Common, setCommon] = useState([])
  const [probabilitynft, setProbabilitynft] = useState([])
  
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
    const calculated = calculateProbability(data) 
    setProbabilitynft(calculated)
  },[Legendary && Rare && Common])

  useEffect(()=>{
    const getdatamint =async ()=>{   
    const response = await Fetch('https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/getdatamint', 'GET')
    if(response){ 
        const data = await response.json() 
        setArraynftmint(data.usuario.nft_mint_users)
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
                  <Image src={cofre} alt="vault" className={styles.vault} />
                  <div className={styles.contain_pricebuy}>
                      <div className={styles.price}>Price</div>
                      <div className={styles.valor}>100 </div>
                      {/* <select>
                        <option><Image alt='icon money USDT'  height={20} src={usdticon} /> USDT</option>
                        <option><Image alt='icon money BUSD' height={20} src={usdticon} /> BUSD</option>
                        <option><Image alt='icon money DAI' height={20} src={usdticon} /> DAI</option>
                      </select> */}
                      <div className={styles.btnbuy} onClick={ async ()=> await mintNft()}> Buy </div>
                  </div> 
              </div> 
              <div className={styles.contain_infodrop}>
                  <div className={styles.droprate}>
                      drop rate
                  </div>
                  <div className={styles.raritys}>
                      <div>
                          <div className={styles.rarity} style={{background:"#032C68"}}><div className={styles.circlesimbol} style={{top:3, left:3}}/> <div className={styles.circlesimbol} style={{top:3, right:3}}/> Common { probabilitynft && probabilitynft[0]}%  </div>
                          <div className={styles.characters}>
                          <h2>Characters</h2>
                          <div className={styles.containcharact}>
                        {arraynftmint && arraynftmint.map((data, index) => (
                            <div key={index}> {/* Agrega la propiedad 'key' con el valor 'index' */}
                            {data.tanda > 6 && <div className={styles.character}>{data.nombre}</div>}
                            </div>
  ))}
</div>


                          </div>
                      </div>
                      <div>
                          <div className={styles.rarity} style={{background:"#5B014E"}}><div className={styles.circlesimbol} style={{top:3, left:3}}/> <div className={styles.circlesimbol} style={{top:3, right:3}}/> Rare { probabilitynft && probabilitynft[1]}% </div>
                              <div className={styles.characters} style={{backgroundColor:"#5B014E"}}>
                              <h2>Characters</h2>
                              <div className={styles.containcharact}>
                                      { arraynftmint && arraynftmint.map((data, index) => 
                                     <div key={index}> 
                                      {  data.tanda >3 && data.tanda <=6 && <div className={styles.character}> {data.nombre} </div>   } 
                                      </div> 
                                          )}
                                  </div> 
                          </div>
                      </div>

                      <div>
                          <div className={styles.rarity} style={{background:"#BA9C00", stroke:"black"}}><div className={styles.circlesimbol} style={{top:3, left:3}}/> <div className={styles.circlesimbol} style={{top:3, right:3}}/> Legendary { probabilitynft && probabilitynft[2]}% </div>
                          <div className={styles.characters} style={{backgroundColor:"#BA9C00"}}>
                              <h2>Characters</h2>
                              <div className={styles.containcharact}>
                                  { arraynftmint && arraynftmint.map((data, index) => 
                                  <div key={index}> 
                                  {  data.tanda <=3  && <div className={styles.character}> {data.nombre} </div>   } 
                                  </div> 
                                      )}
                              </div> 
                          </div> 
                      </div> 
                  </div> 
              </div>  
          </div>
      </>
  )
}
export default Heros