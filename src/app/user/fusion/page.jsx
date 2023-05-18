"use client"
import styles from "../../../styles/user/fusion.module.scss";
import { ethers } from "ethers";
import { useEffect,useState } from "react";
import PropsNftcartas from "../../../../components/props/propsnftcartas";
import ConnectInnomicNft from "../../../../components/funcion/connectinnomicnft";
import NetworkGoerliEth from "../../../../components/funcion/network";
const Fusion = () => {
  const [merge, setMerge] = useState(false)
  const [unmerge, setUnmerge] = useState(false)
  const [nfts, setNfts] = useState([]);
  const [characteristics, setCharacteristics] = useState(null);
  const [nfttomerge, setNfttomerge] = useState([]);
const arraymerge = (merged) => {
  if (nfttomerge.length < 3) {
    setNfttomerge((prevData) => [...prevData, merged]);
  }
};

const removeItem = (index) => {
  const updatedData = [...nfttomerge];
  updatedData.splice(index, 1);
  setNfttomerge(updatedData);
  console.log(index)
};


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
  
  if(merge==true){
    if( unmerge){
    setUnmerge(false)
  }
  }
  if(unmerge==true){
    if( merge){
    setMerge(false)
  }
  }

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
                <div  onClick={()=> setCharacteristics(nft.metadata)} >
                <PropsNftcartas name={nft.metadata.name} Rare={"normal"} img={nft.metadata.image}/>
                </div>
              </div>
            ))}
              </div>
              {/* NFTS */}
            </div>

            <div className={styles.fusionnft}>
              <div className={styles.containfusionnft}>
                { nfttomerge.map((nfttomerge,index) => 
                  // <div key={a}>
                 <div onClick={ ()=> removeItem(index) }> <PropsNftcartas name={nfttomerge.name} Rare={"normal"} img={nfttomerge.image}/> </div>
                //  </div>
                )}
                {/* // <PropsNftcartas Rare="normal" height={250} />
                // <PropsNftcartas Rare="normal" height={250} />
                // <PropsNftcartas Rare="normal" height={250} /> */}

              </div>
            </div>

            </div>
            {/* TOP */}


              {/* BOTTOM */}
            <div className={styles.containtypemerge}>
              {/* TYPE OF MERGE ?  */}
              <div className={styles.top}>

              <div className={styles.left}>
               { characteristics && <div onClick={()=> arraymerge(characteristics)} > <PropsNftcartas Rare="normal" height={320} img={characteristics.image} name={characteristics.name}/> </div>}
               { !characteristics ? <PropsNftcartas Rare="normal" height={320} name={"null"}/> : null}
                <h1 className={styles.fusion}  onClick={()=> setMerge(true) }>merge</h1>
              </div>
              
              <div className={styles.right}>
                <div><h1>hability1</h1> <h1>hability2</h1> <h1>hability3</h1></div>                
                <h1 onClick={()=>setUnmerge(true)}>unmerge</h1>
              </div>

              </div>
                {/* FUNCION FUSION */}
              <div className={styles.bottom}>
                  <PropsNftcartas Rare="normal" height={300} />
                  
                  <div className={styles.containcircle}> 
                    <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                      <div className={styles.circleG}/> 
                      <h2>66%</h2>
                  </div> 
                  <div style={{display: "flex", alignItems:"center", gap:"1rem" }}>
                     <div className={styles.circleM}/>
                     <h2>33%</h2>
                  </div>
                  <button>Merge</button>
                  </div>
              </div>
            </div>
              {/* BOTTOM */}
        </div>
    </>
  );
};

export default Fusion;
    