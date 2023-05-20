"use client"
import styles from "../../../styles/user/fusion.module.scss";
import { ethers } from "ethers";
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
  if(unmerge){
    if(nfttomerge.length > 0){
      console.log("aaaaaaaaa", unmerge.length)
      setNfttomerge([])
    }
  }
  if( nfttomerge.length > 0 ){
    if(unmerge ){
      console.log("aaaaaaaaavvvvvvvvvvvvvvvv", nfttomerge.length)
      setUnmerge(null)
    }
  }
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
              setUnmergechildrens(nftPromises);
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
      // const contract = await ConnectInnomicNft()
      // contract.upgrade(data[0],data[1],data[2], probabilidad )
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
            <div>
            <div className={styles.containnfts}>
              {/* FILTERS */}
              <div className={styles.filter}>
                <div className={styles.filter1}>
                  <div className={styles.filterinput}>
                    <p>Characters</p>
                    <input type="text" />
                  </div>
                  <div className={styles.filterinput}>
                    <p>Skills</p>
                    <input type="text" />
                  </div>
                 <div className={styles.filterinput}>
                  <p>Rarity</p>
                  <input type="text" /> 
                 </div>
                  <div className={styles.filterinput}> 
                    <p> Level </p>
                    <div>
                      <p>1</p>
                    </div>
                    <div>
                      <p >2</p>
                    </div>
                    <div> 
                      <p>3</p>
                    </div>
                    {/* <input type="checkbox" name="" id="" />
                    <input type="checkbox" name="" id="" />
                    <input type="checkbox" name="" id="" />  */}
                  </div>
                </div>
              </div>
              {/* FILTERS */}

              {/* NFTS */}
              <div className={styles.nfts}>
              { nfts &&  nfts.map((nft) => (
              <div key={nft.id}>
                <div  onClick={()=> setCharacteristics([nft.metadata,  nft.id])} >
                <PropsNftcartas name={nft.metadata.name} image={nft.metadata.image} height={370} Rare={"normal"}/>
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
                    <PropsNftcartas height={370} name={nfttomerge[0].name} image={nfttomerge[0].image} Rare={"normal"}/>  
                  </div>
                )
                 : aw && aw.length == 3 ? aw.map((a)=> <PropsNftcartas height={370} image={a.metadata.image} name={a.metadata.name} Rare={"normal"}/>  
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
               { characteristics ?  <PropsNftcartas Rare="normal" height={320} image={characteristics[0].image} name={characteristics[0].name}/>
               : <PropsNftcartas Rare="normal" height={320} name={"null"}/> }
              { characteristics ? <h1 className={styles.fusion}  onClick={()=> arraymerge(characteristics)}>merge</h1> : 
               <h1 className={styles.fusion} style={{opacity:.7, backgroundColor:"grey"}}>merge</h1> }  
              </div>
              
              <div className={styles.right}>
                
                { characteristics ? <div><h1>{characteristics[0].hability1} </h1> <h1>{characteristics[0].hability2}</h1> <h1>{characteristics[0].hability3} </h1></div> :
                <div>
                  <h1>hability1</h1> 
                  <h1>hability2</h1> 
                  <h1>hability3</h1>
                </div> }

                { characteristics ? <h1 onClick={()=> {setUnmerge(characteristics); if(unmerge && unmerge.length>0 ){getchildrens(unmerge[1], unmerge[0])}}} >unmerge</h1>
                : <h1 style={{opacity:.7, backgroundColor:"grey"}}>unmerge</h1> }              
                
              </div>
              {/* getParents */}
              </div>
                {/* FUNCION FUSION */}
              <div className={styles.bottom}>
                { unmerge && unmerge.length  > 0  ? <PropsNftcartas Rare="normal" height={320} image={unmerge[0].image} name={unmerge[0].name}/>

                : nfttomerge.length === 3 ? <PropsNftcartas Rare="normal" height={320} name={nfttomerge[0][0].name} image={nfttomerge[0][0].image}/>
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
                  {

                  }
                  </div>
              </div>
            </div>
              {/* BOTTOM */}
        </div>
    </>
  );
};

export default Fusion;
    