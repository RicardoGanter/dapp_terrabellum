"use client" 
import { useState, useEffect, useContext } from "react";
import styles2 from "../../../styles/user/inventario/inventario.module.scss";
import styles from '../../../styles/navbar/market/opcmarket.module.scss'
import PropsNftcartas from "../../../components/props/propsnftcartas";
import ConnectInnomicNft from "../../../components/funcion/connectinnomicnft";
import NetworkGoerliEth from "../../../components/funcion/network";
// import Barrafiltros from "../../../components/navbar/market/opcion_market"; 
import ReactSlider from 'react-slider' 
import { useRouter } from "next/navigation" 
import Cookies from 'js-cookie';
const { ethers } = require('ethers');
import { SaveUrl } from "../../../components/header/header";
import questionicon from '../../../public/circle-question-regular.svg'
import Image from "next/image"; 
import { User_data } from "../../layout";
import '../../../styles/globals.scss'
const NFTContainer = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState({});
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [filtercharacters, setFiltercharacters] = useState("")
  const [selectedRange, setSelectedRange] = useState([1, 3]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedRangedefusion, setSelectedRangedefusion] = useState([0, 5]);
  const [filteredItemsdefusion, setFilteredItemsdefusion] = useState([]);
  const [orderprice, setOrderprice] = useState(false)
  const [user, setUser] = useState(false)
  const router = useRouter(); 
  const [countnft, setCountnft] =useState(null)
  const [noOwner, setnoOwner] = useState(null)
  const { userdataglobal, updateSharedVariable } = useContext(User_data);  
  const [confirmdeletednft, setConfirmdeletednft ] = useState(false)
  const [textdeleted , setTextdeleted] = useState("")
  const [nftsellers, setNftseller] = useState([])
  const [topp, setTop] = useState(false)
  const [leftt, setLeft] = useState()
  const [ reload, setReload ] = useState()
   const filteredNFTs = nfts.filter((nft) => 
   filteredItems.includes(nft.metadata.level) &&
    // filteredItemsdefusion
    ( selectedRarities.length > 0 ? nft.metadata.rarity == selectedRarities[0] || selectedRarities[1] || selectedRarities[2] : true) &&
    nft.metadata.name.toLowerCase().includes(filtercharacters.toLowerCase())
   )
   const filteredNFTsseller = nftsellers.filter((nft) => 
   filteredItems.includes(nft.metadata.level) &&
    // filteredItemsdefusion
    ( selectedRarities.length > 0 ? nft.metadata.rarity == selectedRarities[0] || selectedRarities[1] || selectedRarities[2] : true) &&
    nft.metadata.name.toLowerCase().includes(filtercharacters.toLowerCase())
   )
  //FILTERS

  const handleOrderChange = (e) => {
    const value = e.target.value;
    if (value === "lowest") {
      setOrderprice(false);
    } else if (value === "highest") {
      setOrderprice(true);
    }
  };

  useEffect(() => {
    const filtered = [];
    for (let i = selectedRange[0]; i <= selectedRange[1]; i++) {
      filtered.push(i);
    }
    setFilteredItems(filtered);
  }, [selectedRange]);

  const handleRangeChange = (value) => {
    setSelectedRange(value);
  };

  //PRICE
  // useEffect(() => {
  //   const filtered = [];
  //   for (let i = minprice[0]; i <= minprice[1]; i++) {
  //     filtered.push(i);
  //   }
  //   setFilteredItemsprice(filtered);
  // }, [minprice]);

  // const handleRangeChangeprice = (value) => {
  //   setMinprice(value);
  // };
 
  useEffect(() => {
    const filtered = [];
    for (let i = selectedRangedefusion[0]; i <= selectedRangedefusion[1]; i++) {
      filtered.push(i);
    }
    setFilteredItemsdefusion(filtered);
  }, [selectedRangedefusion]);

  const handleRangeChangefusion = (value) => {
    setSelectedRangedefusion(value);
  };



  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedRarities([...selectedRarities, value]);
    } else {
      setSelectedRarities(selectedRarities.filter(item => item !== value));
    }
    
    applyFilter(); // Aplicar filtro automáticamente al cambiar las selecciones de las casillas de verificación
  };
  const applyFilter = () => {
    let filterValue = 0;
    if (selectedRarities.includes("1")) {
      filterValue = 1;
    } else if (selectedRarities.includes("2")) {
      filterValue = 2;
    } else if (selectedRarities.includes("3")) {
      filterValue = 3;
    }
  };

  const deletednft = async()=>{  
      const contract = await ConnectInnomicNft()
      const deletednft = await contract.repay(confirmdeletednft)
      if(deletednft){
        setConfirmdeletednft(false)
        return setTextdeleted(false)
      } 
  } 
 
  useEffect(() => { 
    const fetchNFTs = async () => {
      try {  
        const datanft = JSON.parse(localStorage.getItem("nftdata"))
        const datanftseller = JSON.parse(localStorage.getItem("nftdataseller"))
        if(datanft && datanftseller){ 
          setNfts(datanft) 
          setNftseller(datanftseller) 
          return  setLoading(false);
        } 
        const wallet = Cookies.get('userdata') 
        const getaddres = JSON.parse(wallet).address_metamask 
        const signer = await NetworkGoerliEth();
        const address = await signer.getAddress();   
        const contract = await ConnectInnomicNft();
         // Obtiene el número total de tokens del usuario
        const tokenCount = await contract.balanceOf(getaddres);
        setCountnft(tokenCount.toString())
        // Crea un arreglo con los NFTs del usuario
        const nftPromises = [];
        const nftsellerPromises = [];
        const lolsitofeo= await  contract.fetchMyUnSoldMarketItems()   
        for (let i = 0; i < lolsitofeo.length; i++) { 
          const tokenid = lolsitofeo[i].tokenId 
          const itemid = lolsitofeo[i].itemId 
          const tokenURI = await contract.tokenURI(tokenid);  
          if (tokenid) {
            const metadata = await fetch(tokenURI).then((res) => res.json());
            nftsellerPromises.push({
              id: itemid.toNumber(),
              metadata
            });
        }
      }
  
  
        for (let i = 0; i < tokenCount; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(getaddres, i); 
          const tokenURI = await contract.tokenURI(tokenId);
          if (tokenId) {
            const metadata = await fetch(tokenURI).then((res) => res.json());
            nftPromises.push({
              id: tokenId.toNumber(),
              metadata
            });
        }
      }
      if(!getaddres){ 
        return console.error("no tienes wallet conectada")
      } 
      if(address !=getaddres){ 
        setnoOwner(true)
      }
        setNfts(nftPromises);
        localStorage.setItem('nftdata', JSON.stringify(nftPromises)); 
        setNftseller(nftsellerPromises)
        localStorage.setItem('nftdataseller', JSON.stringify(nftsellerPromises)); 
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchNFTs();
    }, []);
    useEffect(() => {  
      localStorage.removeItem('nftdata')
      localStorage.removeItem('nftdataseller') 
      const fetchNFTs = async () => {
        try {  
          const datanft = JSON.parse(localStorage.getItem("nftdata"))
          const datanftseller = JSON.parse(localStorage.getItem("nftdataseller"))
          if(datanft && datanftseller){ 
            console.log(datanft,"asdasdasd")
            setNfts(datanft) 
            setNftseller(datanftseller) 
            return  setLoading(false);
          } 
          const wallet = Cookies.get('userdata') 
          const getaddres = JSON.parse(wallet).address_metamask 
          const signer = await NetworkGoerliEth();
          const address = await signer.getAddress();   
          const contract = await ConnectInnomicNft();
           // Obtiene el número total de tokens del usuario
          const tokenCount = await contract.balanceOf(getaddres);
          setCountnft(tokenCount.toString())
          // Crea un arreglo con los NFTs del usuario
          const nftPromises = [];
          const nftsellerPromises = [];
          const lolsitofeo= await  contract.fetchMyUnSoldMarketItems()   
          for (let i = 0; i < lolsitofeo.length; i++) { 
            const tokenid = lolsitofeo[i].tokenId 
            const itemid = lolsitofeo[i].itemId 
            const tokenURI = await contract.tokenURI(tokenid);  
            if (tokenid) {
              const metadata = await fetch(tokenURI).then((res) => res.json());
              nftsellerPromises.push({
                id: itemid.toNumber(),
                metadata
              });
          }
        } 
          for (let i = 0; i < tokenCount; i++) {
            const tokenId = await contract.tokenOfOwnerByIndex(getaddres, i); 
            const tokenURI = await contract.tokenURI(tokenId);
            if (tokenId) {
              const metadata = await fetch(tokenURI).then((res) => res.json());
              nftPromises.push({
                id: tokenId.toNumber(),
                metadata
              });
          }
        }
        if(!getaddres){ 
          return console.error("no tienes wallet conectada")
        } 
        if(address !=getaddres){ 
          setnoOwner(true)
        }
          setNfts(nftPromises);
          localStorage.setItem('nftdata', JSON.stringify(nftPromises)); 
          setNftseller(nftsellerPromises)
          localStorage.setItem('nftdataseller', JSON.stringify(nftsellerPromises)); 
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchNFTs();
      }, [reload]);

// Función para vender un NFT 
const venderNFT = async (Id) => {
  try {
    const contract = await ConnectInnomicNft(); // CONTRATO INNOMIC
    if (price) {
      const newprice = ethers.BigNumber.from(price).mul(ethers.BigNumber.from(10).pow(18));
      const sell = await contract.createMarketItem(Id, newprice, {
        gasLimit: 1000000,
      });
    }
  } catch (error) { 
    console.error(error);
  }
};  
useEffect(()=>{
  if(userdataglobal){
    setUser(userdataglobal)
  }
},[])
const Cancelmarketseller =async (itemid)=>{ 
  const contract = await ConnectInnomicNft()  
  const cancel = await contract.unListMarketItem(itemid,{ 
    gasLimit: 120001 
  }) 
} 

const mondongo = ( link, id, array )=>{
  const elements = document.querySelectorAll('.oculto');
  const nocxdd = document.getElementById(`animasoooos${id}`); 
  // sessionStorage.setItem('temporalnftdata',  JSON.stringify(nfts[array]) 
  if (elements.length > 0) {
    elements.forEach((element) => {
      element.style.opacity = 1;
   nocxdd.style.opacity = 1;
      const animation = element.animate(
        { opacity: [1, 0] },
        { duration: 200 }
      );
  
      animation.addEventListener('finish', () => {
        element.style.opacity = 0; // Establecer la opacidad en 0 una vez que la animación haya finalizado
        nocxdd.style.opacity = 1;
      });
    });
  }  

if (nocxdd) {
  const startTop = nocxdd.offsetTop; // Posición inicial (top) del elemento
  const startLeft = nocxdd.offsetLeft; // Posición inicial (left) del elemento
  const targetTop = 400; // Posición objetivo (top) del elemento
  const targetLeft = (window.innerWidth - 400) / 2; // Posición objetivo (left) del elemento
  
  nocxdd.style.position = 'fixed'; // Asegúrate de que el elemento tenga una posición fija
  
  const animation = nocxdd.animate(
    [
      { top: `${startTop}px`, left: `${startLeft}px` }, 
      { top: '260px',left: 'calc((100vw - 648px) / 2)',right: 'calc((100vw - 170px) / 2)',position: 'fixed', width:" fit-content" },
      
    ],
    {
      duration: 1000,
      easing: 'ease-in-out',
      iterations: 1,
      fill: 'forwards',
    }
  );
  
setTimeout(() => {
const asdasd = document.getElementById('nosemequieromatar')
if(asdasd){
    asdasd.style.viewTransitionName = 'mondongoss';
function updateTheDOMSomehow(){   
      router.push(`${link}`)    
      asdasd.style.viewTransitionName = '';   
    }
    document.startViewTransition(()=>{   
      updateTheDOMSomehow()
}) 
} 
  }, 1000);
} 

} 

  return (
    <div>
    { user &&
    <div style={{display:"flex", gap: "1rem"}}>
      <SaveUrl  name='Inventory' url='/user/inventory' imagen="https://d2qjuqjpn9e4f.cloudfront.net/Iconurl/2.png"/>
      {/* <Barrafiltros/> */}
      <div   className={`${styles.container} oculto` }>
      <div  className={styles.subContainer}>
        <div className={styles.filtros}>
          <h2 onClick={()=>setReload(reload + 1)}>Reset</h2>
        <h2>Type NFT</h2>
          <select> 
              <option>Character</option>
              <option>Items</option>
              <option>Weapon</option>
          </select>
          <h2>Characters</h2>
          <input type="text" value={filtercharacters} style={{backgroundColor:"#0E001A", padding:".5rem 0", width:"100%"}} onChange={(e)=> setFiltercharacters(e.target.value)} />
        </div> 
        <div className={styles.filtros}>
          {/* <h2>price</h2>
          <ReactSlider
            className={styles2.horizontalslider}
            thumbClassName={styles2.examplethumb}
            defaultValue={minprice}
            onChange={handleRangeChangeprice}
            trackClassName="slider-track"
            renderTrack={(props, state) => (
              <div {...props} className={`${props.className} ${state.index === 1 ? 'active' : ''}`} />
            )}
            /> */}

          <h2>Level</h2>
          <ReactSlider
            className={styles.horizontalslider}
            thumbClassName={styles.examplethumb}
            min={1}
            max={3}
            defaultValue={selectedRange}
            onChange={handleRangeChange}
            trackClassName="slider-track"
            renderTrack={(props, state) => (
              <div {...props}  >
                {state.index > 0 && state.index < 2 && (
                  <div className={styles.looooooooooooool}/>
                )}
              </div>
            )} 
            />
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
            <h2>1</h2> <h2>2</h2> <h2>3</h2>
          </div>
        </div>

        <div className={styles.filtros}>
        <h2>Rarity</h2>
        <form style={{ display: "grid", gridTemplateColumns: "1fr 4fr", gap: "10px", placeItems: "start" }}>
          <input type="checkbox" name="a" value={"1"} onChange={handleCheckboxChange} checked={selectedRarities.includes("1")} />
          <label style={{ color: "white" }}>Common</label>
          <input type="checkbox" name="a" value={"2"} onChange={handleCheckboxChange} checked={selectedRarities.includes("2")} />
          <label style={{ color: "white" }}>Rare</label>
          <input type="checkbox" name="a" value={"3"} onChange={handleCheckboxChange} checked={selectedRarities.includes("3")} />
          <label style={{ color: "white" }} htmlFor="a">Legendary</label>
        </form> 

      </div> 
        <div className={styles.filtros}>
          <h2>unmerge</h2>
          <ReactSlider
            className={styles.horizontalslider}
            thumbClassName={styles.examplethumb}
            min={0}
            max={5}
            defaultValue={selectedRangedefusion}
            onChange={handleRangeChangefusion}
            trackClassName="slider-track"
            renderTrack={(props, state) => (
              <div {...props}  >
                {state.index > 0 && state.index < 2 && (
                  <div className={styles.looooooooooooool}/>
                )}
              </div>
            )} 
            />
          {/* <input type="range" min="1" max="7"/> */}
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
            <h2>0</h2> <h2>1</h2> <h2>2</h2> <h2>3</h2> <h2>4</h2> <h2>5</h2>
          </div>
        </div>
      </div>
    </div>
      {/* <PropsNftcartas name="a"  /> */} 

      <h2   className={`${styles2.Title} oculto`}>Inventory</h2>
      {/* { !noOwner &&
        <div className={styles2.contain_warning_addres}> 
          <p>Propietario de billetera no coincide con el inventario.</p> 
          <div className={styles2.hoverquestionicon}>
            <Image className={styles2.questionicon} src={questionicon} width={30} alt={"question icon"}/>
            <div>
              <p> Para vender o cancelar tus NFTs,
                 necesitas una billetera conectada que te permita firmar las transacciones.
                  Sin una billetera compatible, no podrás realizar estas acciones en tu inventario actual.</p> 
            </div>
          </div>
        </div>} */}
{loading ? (
  <div className={styles2.grid} style={{display:"flex"}}> 
  </div>
) : nfts ? (
  <div className={styles2.grid} style={{display:"flex"}}>
    {nftsellers && filteredNFTsseller.map((nft )=>(
       <div className="oculto"  key={nft.id}> 
            <PropsNftcartas 
                   level={nft.metadata.level}
                   name={nft.metadata.name}
                   image={nft.metadata.image} height={370}
                   Rare={nft.metadata.rarity}
                   hability1={nft.metadata.hability1}
                   hability2={nft.metadata.hability2}
                   hability3={nft.metadata.hability3}/>
                   {/* {nft.id} */}
                   <button className="oculto"  onClick={()=> Cancelmarketseller(nft.id)}>Cancel</button>
      </div>
    )) }
    {filteredNFTs.map((nft , id) => (
    <div key={nft.id}>
      <div className="oculto"   onClick={()=> mondongo(`/user/inventory/${nft.id}`, nft.id, id)} id={`animasoooos${nft.id}`} >
      <PropsNftcartas 
                   level={nft.metadata.level}
                   name={nft.metadata.name}
                   image={nft.metadata.image} height={370}
                   Rare={nft.metadata.rarity}
                   hability1={nft.metadata.hability1}
                   hability2={nft.metadata.hability2}
                   hability3={nft.metadata.hability3}/></div>
                   
                   { noOwner && 
      <form
        className={styles2.form}
        onSubmit={(e) => {
          e.preventDefault();
          venderNFT(nft.id);
        }}
      >
        <input className="oculto" 
          type="number"
          placeholder="Precio en ETH"
          value={price[nft]}
          onChange={(e) => setPrice(e.target.value)}
          min={-1}
          max={99999999999}
        />  
         <div>
          <button className={`${styles2.sell} oculto` } type="submit">
            Sell
          </button> 
          <button className={`${styles2.deleted} oculto`} onClick={()=>deletednft()} >Delete  </button>
          {/* { confirmdeletednft && 
          <div className={styles2.confirmdeleted}> 
            Do you really want to remove the nft {confirmdeletednft} ?
            <p>to confirm write I want to delete the nft</p>
            <input placeholder="I want to remove the nft" onChange={e=>setTextdeleted(e.target.value)} />
            <div>
            {textdeleted == "I want to remove the nft" ? <button onClick={()=> deletednft()}>Delete</button> : <button style={{backgroundColor:"gray"}}>Delete</button>} <button onClick={()=>{setTextdeleted(null); setConfirmdeletednft(false)}}>Cancel</button>

            </div>
          </div>} */}
         </div>
      </form> }
    </div>
  ))}
  </div>
) : null }
  <div className={`${styles.contain} oculto`}>
      <select onChange={handleOrderChange}>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>
      </div>
{/* </div> */}
    </div>
     }</div>
  );
};
export default NFTContainer;