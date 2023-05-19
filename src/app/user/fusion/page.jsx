"use client"
import styles from "../../../styles/user/fusion.module.scss";
import { ethers } from "ethers";
import { useEffect,useState } from "react";
import PropsNftcartas from "../../../../components/props/propsnftcartas";
import ConnectInnomicNft from "../../../../components/funcion/connectinnomicnft";
import NetworkGoerliEth from "../../../../components/funcion/network";
const Fusion = () => {
  const [merge, setMerge] = useState(false)
  const [unmerge, setUnmerge] = useState(null)
  const [nfts, setNfts] = useState([]);
  const [characteristics, setCharacteristics] = useState(null);
  const [nfttomerge, setNfttomerge] = useState([]);

  // unmerge nfttomerge
  // if(unmerge){
  //   if(nfttomerge.length>0){
  //     setNfttomerge([])
  //   }
  // }

  const arraymerge = (merged) => {
    let isDuplicate = false;
    if(nfttomerge.length>0){
      console.log("aaaaaaa",nfttomerge.length)
      console.log("looooooool", nfttomerge[0][0].lvl, merged[0].lvl)
    }
    for (let i = 0; i < nfttomerge.length; i++) {
      const a = nfttomerge[i];
      if (a[1] === merged[1]) {
        isDuplicate = true;
        break; // Salir del bucle si se encuentra un duplicado
      }
    }
    if (!isDuplicate && nfttomerge.length < 3) {
      setNfttomerge((prevData) => [...prevData, merged]);
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

  const upgradenft = async ( id ) =>{
    console.log(id)
    const data = []
    if (id.length === 3){
      id.map((a)=>{
        data.push(a[1]) 
        console.log("mamahuevo",data)
      })
    }
    if(data.length>2){
      const contract = await ConnectInnomicNft()
      contract.upgrade(data[0],data[1],data[2])
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
  
  // if(merge==true){
  //   if( unmerge){
  //   setUnmerge(false)
  // }
  // }
  // if(unmerge==true){
  //   if( merge){
  //   setMerge(false)
  // }
  // }

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
              {nfts.map((nft) => (
              <div key={nft.id}>
                <div  onClick={()=> setCharacteristics([nft.metadata,  nft.id])} >
                <PropsNftcartas name={nft.metadata.name} Rare={"normal"} img={nft.metadata.image} Level={nft.metadata.lvl}/>
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
                    <PropsNftcartas name={nfttomerge[0].name} Rare={"normal"} 
                    img={nfttomerge[0].image} Level={nfttomerge[0].lvl}/>  
                  </div>
                )
                :
                    <PropsNftcartas Rare="normal" height={320} name={"null"}/> 
                    
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
               { characteristics && <div> <PropsNftcartas Rare="normal" height={320} img={characteristics[0].image} name={characteristics[0].name} Level={characteristics[0].lvl }/></div>}
               { !characteristics ? <PropsNftcartas Rare="normal" height={320} name={"null"}/> : null}
              { characteristics ? <h1 className={styles.fusion}  onClick={()=> arraymerge(characteristics)}>merge</h1> : 
               <h1 className={styles.fusion} style={{opacity:.7, backgroundColor:"grey"}}>merge</h1> }  
              </div>
              
              <div className={styles.right}>
                <div><h1>hability1</h1> <h1>hability2</h1> <h1>hability3</h1></div>  
                { characteristics ? <h1 onClick={()=> setUnmerge(characteristics)} >unmerge</h1>
                : <h1 style={{opacity:.7, backgroundColor:"grey"}}>unmerge</h1> }              
                
              </div>

              </div>
                {/* FUNCION FUSION */}
              <div className={styles.bottom}>
                { unmerge &&
                 <PropsNftcartas Rare="normal" height={320} img={unmerge[0].image} name={unmerge[0].name} Level={unmerge[0].lvl }/>
                }
                  <div className={styles.containcircle}> 
                    <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                      <div className={styles.circleG}/> 
                      <h2>66%</h2>
                  </div> 
                  <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                     <div className={styles.circleM}/>
                     <h2>33%</h2>
                  </div>

                  {/* MERGE */}
                  { nfttomerge.length === 3 ?
                  <button onClick={()=> upgradenft(nfttomerge)}>Complete Merge</button>
                  : unmerge && unmerge.length === 2 && !nfttomerge.length > 0  ?
                  <button onClick={()=> downgradenft(unmerge[1])}>Complete Unmerge</button>
                  : <button onClick={()=> upgradenft(nfttomerge)} style={{opacity:.7, backgroundColor:"grey"}}>Complete</button>
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
    