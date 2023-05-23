"use client"
import styles from "../../../styles/user/fusion.module.scss";
// import { ethers } from "ethers";
import { useEffect,useState } from "react";
import PropsNftcartas from "../../../../components/props/propsnftcartas";
import ConnectInnomicNft from "../../../../components/funcion/connectinnomicnft";
import NetworkGoerliEth from "../../../../components/funcion/network";
const Fusion = () => {
  // const [merge, setMerge] = useState(false)
  const [nfts, setNfts] = useState([]);
  const [characteristics, setCharacteristics] = useState(null);
  const [unmerge, setUnmerge] = useState(null)
  const [nfttomerge, setNfttomerge] = useState([]);
  const [unmergechildrens, setUnmergechildrens] = useState([])
  const [aw, setaw] = useState(null)
  const [probability, setProbability] = useState(null)
  const [filterlevel, setFilterlevel] = useState(null)
  const [filtercharacters, setFiltercharacters] = useState("")
  const [filterRarity, setFilterRarity] = useState(null)
  const [showUnmergeData, setShowUnmergeData] = useState(false);

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

  // if(unmerge){
  //   if(nfttomerge.length > 1){
  //     console.log("aaaaaaaaa", unmerge.length)
  //     setNfttomerge([])
  //   }
  // }
  // if( nfttomerge.length > 0 ){
  //   if(unmerge ){
  //     console.log("aaaaaaaaavvvvvvvvvvvvvvvv", nfttomerge.length)
  //     setUnmerge(null)
  //   }
  // }
  useEffect(()=>{
    if(nfttomerge.length===3){
      seleccionarNumeroConProbabilidad(nfttomerge[0][0].hability1 ,nfttomerge[1][0].hability1,nfttomerge[2][0].hability1)
      if(probability){  
        const arrayOrdenado = probability.sort((a, b) => b - a);
        const dosNumerosMasAltos = arrayOrdenado.slice(0, 2);
        // console.log(dosNumerosMasAltos)
        // setProbability()
      }
    }
  },[nfttomerge])
  
  useEffect(()=>{
    setaw(unmergechildrens)
  },[unmergechildrens])
  
  const getchildrens = async (father, data) => {
        setUnmergechildrens([]); // Limpiar los datos anteriores
        const nftPromises = [];
        if( data.hability2 > 0 || data.hability3 > 0){
          const contract = await ConnectInnomicNft();
          const childrens = await contract.getParents(father);
          if (childrens.length === 3) {
            childrens.forEach(async (tokenId) => {
              const tokenURI = await contract.tokenURI(tokenId);
              if (tokenId) {
                const metadata = await fetch(tokenURI).then((res) => res.json());
                nftPromises.push({
                metadata,
              });
              return setUnmergechildrens(nftPromises);
            }
          });
        }
        }
        else{
          return console.error("Habilidad 2 o Habilidad 3 deben ser mayores a cero")
        }
    }

    const arraymerge = (merged) => {
    let isDuplicate = false;
    if(nfttomerge.length>=3){
      return console.error("no puedes igresar mas personajes")
    }

    for (let i = 0; i < nfttomerge.length; i++) {
      const a = nfttomerge[i];
      if (a[1] === merged[1]) {
        isDuplicate = true;
        break; // Salir del bucle si se encuentra un duplicado
      }
    }
    if (!isDuplicate && nfttomerge.length < 3) {
      return setNfttomerge((prevData) => [...prevData, merged]);
    }
  };

const removeItem = (index) => {
  const updatedData = [...nfttomerge];
  updatedData.splice(index, 1);
  setNfttomerge(updatedData);
};

  const downgradenft = async ( id ) =>{
  const contract = await ConnectInnomicNft()
  contract.downgrade(id)
  }

  function seleccionarNumeroConProbabilidad(...valores) {
    const total = valores.length; // Obtener el total de valores
  
    // Calcular la probabilidad de cada valor
    const probabilidades = valores.reduce((prob, valor) => {
      prob[valor] = (prob[valor] || 0) + 1;
      return prob;
    }, {});
  
    for (const valor in probabilidades) {
      probabilidades[valor] = ((probabilidades[valor] / total) * 100).toFixed(2) + "%";
    }
  
    setProbability(Object.values(probabilidades)); // Actualizar el estado con las probabilidades
  
    const valoresProbabilidad = Object.values(probabilidades); // Obtener los valores del objeto
    const totalProbabilidad = valoresProbabilidad.reduce((sum, prob) => sum + parseFloat(prob), 0); // Utilizar parseFloat para convertir los porcentajes en números
    let acumulativo = 0;
    const rand = Math.random() * totalProbabilidad;
    for (let i = 0; i < valoresProbabilidad.length; i++) {
      acumulativo += parseFloat(valoresProbabilidad[i]); // Utilizar parseFloat para convertir los porcentajes en números
      if (rand <= acumulativo) {
        return Object.keys(probabilidades)[i]; // Retorna la clave seleccionada
      }
    }
  }
  
  const upgradenft = async ( id ) =>{
    const data = []
    if (id.length === 3){
      id.map((a)=>{
        data.push(a[1]) 
      })
    }
    // const array = []
    if(data.length>2){
      const probabilidad = (seleccionarNumeroConProbabilidad(id[0][0].hability1,id[1][0].hability1,id[2][0].hability1))
      const contract = await ConnectInnomicNft()
      contract.upgrade(data[0],data[1],data[2], probabilidad )
    }
  }

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
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
  return (
    <>
        <div className={styles.contain}>
            {/* TOP */}
            <div style={{width:"100%"}}>
            <div className={styles.containnfts}>
              {/* FILTERS */}
              <div className={styles.filter}>
                <div className={styles.filter1}>
                  <div className={styles.filterinput}>
                    <p>Characters</p>
                    <input type="text" value={filtercharacters} onChange={(e)=> setFiltercharacters(e.target.value)} />
                  </div>
                  {/* <div className={styles.filterinput}>
                    <p>Skills</p>
                    <input type="text" />
                  </div> */}
                 <div className={styles.filterinput}>
                 <p>Rarity</p>
                  {/* <input type="text" />  */}
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
                <button style={{backgroundColor:"#47213c", fontSize:"1.3rem"}} onClick={()=> {setFilterRarity(null);setCharacteristics("");setFilterlevel(null)}}>reset</button>
                </div>
              </div>
              {/* FILTERS */}

              {/* NFTS */}
              <div className={styles.nfts}>
              { nfts &&  Filter.map((nft) => (
              <div key={nft.id}>
                <div  onClick={()=> setCharacteristics([nft.metadata,  nft.id])} >
                <PropsNftcartas 
                   level={nft.metadata.level}
                   name={nft.metadata.name}
                   image={nft.metadata.image} height={370}
                   Rare={nft.metadata.rarity}
                   hability1={nft.metadata.hability1}
                   hability2={nft.metadata.hability2}
                   hability3={nft.metadata.hability3}/>
                </div>
              </div>
            ))}
              </div>
              {/* NFTS */}
            </div>

            <div className={styles.fusionnft}>
              <div className={styles.containfusionnft}>
                
                
                { nfttomerge &&  nfttomerge.length>0 && nfttomerge.length < 4 ? nfttomerge.map((nfttomerge,index) => 
                  <div onClick={ ()=> removeItem(index)}> 
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
                 :showUnmergeData && aw && aw.length == 3 ? aw.map((a) => 
                 <PropsNftcartas 
                      level={a.metadata.level}
                      name={a.metadata.name}
                      image={a.metadata.image}
                      Rare={a.metadata.rarity}
                      hability1={a.metadata.hability1}
                      hability2={a.metadata.hability2}
                      hability3={a.metadata.hability3}/> 
                 

                  )
                  : <PropsNftcartas height={370} Rare="normal" name={"null"}/> 
                 }

              </div>
            </div>

            </div>
            {/* TOP */}


              {/* BOTTOM */}
            <div className={styles.containtypemerge}>
              {/* TYPE OF MERGE ?  */}
              <div className={styles.top}>

              <div className={styles.left}>
               { characteristics ?  
               <PropsNftcartas 
                level={characteristics[0].level}
                name={characteristics[0].name}
                image={characteristics[0].image}
                Rare={characteristics[0].rarity}
                hability1={characteristics[0].hability1}
                hability2={characteristics[0].hability2}
                hability3={characteristics[0].hability3}/> 

               : <PropsNftcartas Rare="normal" height={320} name={"null"}/> }
              { characteristics ? <h1 className={styles.fusion}  onClick={()=> arraymerge(characteristics)}>merge</h1> : 
               <h1 className={styles.fusion} style={{opacity:.7, backgroundColor:"grey"}}>merge</h1> }  
              </div>
              
              <div className={styles.right}>
                
                {/* { characteristics ? <div><h1>{characteristics[0].hability1} </h1> <h1>{characteristics[0].hability2}</h1> <h1>{characteristics[0].hability3} </h1></div> :
                <div>
                  <h1>hability1</h1> 
                  <h1>hability2</h1> 
                  <h1>hability3</h1>
                </div> } */}

                { characteristics ? <h1 onClick={()=> {setUnmerge(characteristics); setShowUnmergeData(true); if(unmerge && unmerge ){getchildrens(unmerge[1], unmerge[0])}}}  >unmerge</h1>
                : <h1 style={{opacity:.7, backgroundColor:"grey"}}>unmerge</h1> }              
                
              </div>
              {/* getParents */}
              </div>
                {/* FUNCION FUSION */}
              <div className={styles.bottom}>
                { unmerge && unmerge.length  > 0  ? 
                <PropsNftcartas 
                  level={unmerge[0].level}
                  name={unmerge[0].name}
                  image={unmerge[0].image}
                  Rare={unmerge[0].rarity}
                  hability1={unmerge[0].hability1}
                  hability2={unmerge[0].hability2}
                  hability3={unmerge[0].hability3}/> 

                : nfttomerge.length === 3 ?
                  <PropsNftcartas 
                  level={nfttomerge[0][0].level}
                  name={nfttomerge[0][0].name}
                  image={nfttomerge[0][0].image}
                  Rare={nfttomerge[0][0].rarity}
                  hability1={nfttomerge[0][0].hability1}
                  hability2={nfttomerge[0][0].hability2}
                  hability3={nfttomerge[0][0].hability3}/> 
                 
                 
                  : <PropsNftcartas Rare="normal" height={320} name={"null"}/>
                //  CAMBIOS
                }
                 
                
                  <div className={styles.containcircle}> 
                  { nfttomerge.length === 3 ?
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>
                  <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                      <div className={styles.circleG}/> 
                      { probability && <h2>{probability[0]}</h2> } 
                  </div> 
                  <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                     <div className={styles.circleM}/>
                     { probability && <h2>{probability[1]}</h2> } 
                  </div>
                  </div>
                    : null}
                  {/* MERGE */}
                  { nfttomerge.length === 3 ?
                  <button onClick={()=> upgradenft(nfttomerge)}>Complete Merge</button>
                  : aw && aw.length == 3 && !nfttomerge.length > 0  ?
                  <button onClick={()=> downgradenft(unmerge[1])}>Complete Unmerge</button>
                  : <button  style={{opacity:.7, backgroundColor:"grey"}}>Complete</button>
                  }
                  {/* UNMERGE */}
                  </div>
              </div>
            </div>
              {/* BOTTOM */}
        </div>
    </>
  );
};

export default Fusion;
    