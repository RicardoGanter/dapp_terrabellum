"use client"
import styles from "../../../styles/user/fusion/fusion.module.scss"; 
import { useEffect,useState } from "react";
import PropsNftcartas from "../../../components/props/propsnftcartas";
import ConnectInnomicNft from "../../../components/funcion/connectinnomicnft";
import NetworkGoerliEth from "../../../components/funcion/network";    
import { SaveUrl } from "../../../components/header/header";
import Image from "next/image";
import arrowiconleft from '../../../public/🦆 icon _fast arrow left_.svg'
import borrar from '../../../public/Group 268 (1).svg'  
import upgradeNft from "./services/upgradeNft";
import downgradeNft from "./services/downgradeNft";

const Fusion = () => { 
  const [nfts, setNfts] = useState([]); 
  const [nfttomerge, setNfttomerge] = useState([]);
  const [unmergechildrens, setUnmergechildrens] = useState([]) 
  const [probability, setProbability] = useState(null)
  const [filterlevel, setFilterlevel] = useState(null)
  const [filtercharacters, setFiltercharacters] = useState("")
  const [filterRarity, setFilterRarity] = useState(null)  
  const [lal,setlal]= useState() 


  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const datanft = JSON.parse(localStorage.getItem("nftdata")) 
        if(datanft){ 
          setNfts(datanft)  
          return  setLoading(false);
        } 
        const signer = await NetworkGoerliEth();
        const address = await signer.getAddress();
        const contract = await ConnectInnomicNft();
        // Obtiene el número total de tokens del usuario
        const tokenCount = await contract.balanceOf(address);
        // Crea un arreglo con los NFTs del usuario
        const nftPromises = [];
        for (let i = 0; i < tokenCount; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const tokenURI = await contract.tokenURI(tokenId);
          if (tokenId) {
            const metadata = await fetch(tokenURI).then((res) => res.json());
            nftPromises.push({
              id: tokenId.toNumber(),
              metadata
            });
        }
      }
        setNfts(nftPromises);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchNFTs();
    }, []);  

   //-----------------------------------------------Filter-----------------------------------------------
  function norepeatlvl(value){
    if(filterlevel==value){
      setFilterlevel(null)
    }
    else{
      setFilterlevel(value)
    }
  }
  const Filter = nfts.filter((nft)=> nft.metadata.name.toLowerCase().includes(filtercharacters.toLowerCase()) &&
  ( filterlevel ? nft.metadata.level == filterlevel : nft.metadata.level)&&
  ( filterRarity > 0 ? nft.metadata.rarity == filterRarity : true )
    
  )
   //-----------------------------------------------Filter-----------------------------------------------  
  // useEffect(()=>{
  //   if(nfttomerge.length===3){
  //     seleccionarNumeroConProbabilidad(nfttomerge[0][0].hability1 ,nfttomerge[1][0].hability1,nfttomerge[2][0].hability1)
  //     if(probability){  
  //       const arrayOrdenado = probability.sort((a, b) => b - a);
  //       const dosNumerosMasAltos = arrayOrdenado.slice(0, 2);
  //       // console.log(dosNumerosMasAltos)
  //       // setProbability()
  //     }
  //   }
  // },[nfttomerge])
  
  // useEffect(()=>{
  //   setaw(unmergechildrens)
  // },[unmergechildrens])
  
  const getchildrens = async (father, data) => { 
        setUnmergechildrens([]); // Limpiar los datos anteriores
        // if( data.hability2 > 0 || data.hability3 > 0){
          const contract = await ConnectInnomicNft();
          const childrens = await contract.getParents(father); 
          if (childrens.length === 3) {
            const nftPromises = [];
            childrens.forEach(async (tokenId) => {
              const tokenURI = await contract.tokenURI(tokenId); 
              if (tokenId) {
                const metadata = await fetch(tokenURI).then((res) => res.json());
                nftPromises.push({
                metadata,
              }); 
              if(nftPromises.length === 3){ 
                return setUnmergechildrens(nftPromises);
              }
            }
          });
        }
        // }
        // else{
        //   return console.error("Habilidad 2 o Habilidad 3 deben ser mayores a cero")
        // }
    }

    const arraymerge = (merged) => {
    let isDuplicate = false;
    if(merged[0].level>=3){
      return console.error("no se puede con nft lvl 3")
    } 
    
    if(nfttomerge.length>0){
      if(merged[0].level===(nfttomerge ? nfttomerge[0][0].level : merged[0].level)){ 
        let repetarray = 0
        for (let i = 0; i < nfttomerge.length; i++) {
          const a = nfttomerge[i];
          if (a[1] === merged[1]) {
            isDuplicate = true;
            repetarray = i
            break; // Salir del bucle si se encuentra un duplicado
            
          }
        }
        if(isDuplicate){ 
          removeItem(repetarray)
          return console.error("no puedes agregar los mismo nft al filtro")
        }
        if(nfttomerge.length>=3){
          return console.error("no puedes igresar mas personajes")
        }
        if (!isDuplicate && nfttomerge.length < 3) {
         
          return setNfttomerge((prevData) => [...prevData, merged]);
        }
      }
      else{
        return  console.error("los nft son de distinto lvl")
      }
    } 
    return setNfttomerge((prevData) => [...prevData, merged])
  };

const removeItem = (index) => {
  if(index==0){
    setFilterlevel(null)
  }
  const updatedData = [...nfttomerge];
  updatedData.splice(index, 1);
  setNfttomerge(updatedData);
  return setlal(false)
};  

  if(nfttomerge.length === 1 && !lal){ 
    setFilterlevel(nfttomerge[0][0].level)
    setlal(true)
  }

  if( nfttomerge.length ===1 && nfttomerge[0][0].level >= 2 && !lal){  
       setlal(true)
       return getchildrens(nfttomerge[0][1], nfttomerge[0][0])
    }    
  return (
    <>  { 1==1? 
        <div className={styles.contain}>
          <SaveUrl name='Fusion' url="/user/fusion" imagen="https://d2qjuqjpn9e4f.cloudfront.net/Iconurl/3.svg"/>
            {/* TOP */}
            <div className={styles.containleft}>
            <div className={styles.containnfts}>
              {/* FILTERS */}
              <div className={styles.filter}>
                <div className={styles.filter1}>
                  <div className={styles.filterinput}>
                    <p>Characters</p>
                    <input type="text" value={filtercharacters} onChange={(e)=> setFiltercharacters(e.target.value)} />
                  </div>
                 <div className={styles.filterinput}>
                 <p>Rarity</p>
                 <select className={styles.rarity} value={filterRarity} onChange={(e) => setFilterRarity(e.target.value)}>
                    <option value={0} > All </option>s
                    <option value={1} >Common</option>
                    <option value={2} >Rare</option>
                    <option value={3} >Legendary</option>
                </select>
                </div>
                <div style={{display:"flex", gap:"1.5rem"}}>
                  <form className={styles.filterinput}>
                    <p>Level</p>
                  </form>
                  <div className={styles.containlvl}>
                      <p className={styles.aaa} value={"1"} name="lvl" style={ filterlevel== 1 ? {backgroundColor:"#57213C"} : null} onClick={()=>norepeatlvl(1)} >1</p>
                      <p className={styles.aaa} value={"2"} name="lvl" style={ filterlevel== 2 ? {backgroundColor:"#57213C"} : null} onClick={()=>norepeatlvl(2)} >2</p>
                      <p className={styles.aaa} value={"3"} name="lvl" style={ filterlevel== 3 ? {backgroundColor:"#57213C"} : null} onClick={()=>norepeatlvl(3)} >3</p>
                  </div>
                </div>
                <button style={{backgroundColor:"#0E001A", fontSize:"1.3rem"}} onClick={()=> {setFilterRarity(0);setFiltercharacters("");setFilterlevel(null)}}>reset</button>
                </div>
              </div>
              {/* FILTERS */}

              {/* NFTS */}
              <div></div>
              <div className={styles.nfts}> 
              { nfts && nfts.length > 0 ? Filter.map((nft, index) => (
              <div key={nft.id}>
                <div
                  className={`${styles.blabla} ${
                    nfttomerge.length > 0 &&
                    nfttomerge.some(item => item[1] === nft.id) &&
                    styles.noseee
                  }`}
                  onClick={() => arraymerge([nft.metadata, nft.id])}
                >
                  <PropsNftcartas
                    level={nft.metadata.level}
                    name={nft.metadata.name}
                    image={nft.metadata.image}
                    height={370}
                    Rare={nft.metadata.rarity}
                    hability1={nft.metadata.hability1}
                    hability2={nft.metadata.hability2}
                    hability3={nft.metadata.hability3}
                  />
                </div>
              </div>
            )) : <>  
            </> }
              </div>
              {/* NFTS */}
            </div>

            <div className={styles.fusionnft}>
              <div className={styles.containfusionnft}  > 
                {/* <h1>From</h1> */}
                <div style={{display:"flex"}}> 
                { nfttomerge &&  nfttomerge.length>0 && nfttomerge.length < 4 && nfttomerge.map((nfttomerge,index) => 
                  <div className={styles.blabla} onClick={ ()=> removeItem(index)}> 
                    <PropsNftcartas  
                      level={nfttomerge[0].level}
                      name={nfttomerge[0].name}
                      image={nfttomerge[0].image}
                      Rare={nfttomerge[0].rarity}
                      hability1={nfttomerge[0].hability1}
                      hability2={nfttomerge[0].hability2}
                      hability3={nfttomerge[0].hability3}/>  
                  

                  </div> 
                )  
                 }
                 {nfttomerge.length == 0 ?  
                 <div style={{display:"flex"}}>
                  <PropsNftcartas height={370} Rare="normal" name={"null"}/>
                  <PropsNftcartas height={370} Rare="normal" name={"null"}/>
                  <PropsNftcartas height={370} Rare="normal" name={"null"}/>
                 </div> 
                 : nfttomerge.length == 1 ? 
                 <div style={{display:"flex"}}>
                  <PropsNftcartas height={370} Rare="normal" name={"null"}/>
                  <PropsNftcartas height={370} Rare="normal" name={"null"}/> 
                 </div> 
                 : nfttomerge.length == 2 ? 
                 <div style={{display:"flex"}}>
                 <PropsNftcartas height={370} Rare="normal" name={"null"}/> 
                </div> 
                 : null }
              </div>
              </div>

             {  nfttomerge.length ===3 ||  nfttomerge.length ===1 && nfttomerge[0][0].level >= 2? <Image src={arrowiconleft} height={70} className={`${styles.fusionreadyarrow} ${styles.activefusionarrow}`} /> :  <Image className={styles.fusionreadyarrow} src={arrowiconleft} height={70} />  }
              { nfttomerge.length === 3 ?  
                  <div className={styles.containprobabilidadfusion} > 
                  {/* <h1>To</h1> */}
                    <div className={styles.infoprobabilidadfusion}>
                    <PropsNftcartas 
                      level={nfttomerge[0][0].level}
                      name={nfttomerge[0][0].name}
                      image={nfttomerge[0][0].image}
                      Rare={nfttomerge[0][0].rarity}
                      hability1={nfttomerge[0][0].hability1}
                      hability2={nfttomerge[0][0].hability2}
                      hability3={nfttomerge[0][0].hability3}/> 
                      <div>
                        <h2>Most probability</h2>
                        <Image src={borrar} height={130} />
                      {/* { probability && <h2>{probability[0]}</h2> } 
                      { probability && <h2>{probability[1]}</h2> }  */}
                      </div> 
                    </div>
                    
                     <button onClick={()=> {upgradeNft(nfttomerge); setNfttomerge([]) }}>Fusion</button>
                  </div>
                  : nfttomerge.length ===1 && nfttomerge[0][0].level >= 2 ?
                  <div className={styles.containdefusionnft}> 
                  <div className={styles.containinfo} >
                    { unmergechildrens && unmergechildrens.map((a) => 
                   <PropsNftcartas 
                        level={a.metadata.level}
                        name={a.metadata.name}
                        image={a.metadata.image}
                        Rare={a.metadata.rarity}
                        hability1={a.metadata.hability1}
                        hability2={a.metadata.hability2}
                        hability3={a.metadata.hability3}/> )}
                  </div> 
                  <button onClick={()=> {downgradeNft(nfttomerge[0][1]); setNfttomerge([]) }}>Defusion</button>
                </div> :  
                   <div className={styles.nonfts}>
                  <div className={styles.containnonft}></div>
                    <div> 
                      <button>Defusion</button>
                      <button>Fusion</button>
                    </div>
                </div>
                  }
            </div> 
            </div>
            {/* TOP */} 
        </div>
        : null }
    </>
  );
}; 
export default Fusion; 