"use client" 
import { useState, useEffect, useContext } from "react";
import styles2 from "../../../styles/user/inventario/inventario.module.scss";
import styles from '../../../styles/navbar/market/opcmarket.module.scss'
import PropsNftcartas from "../../../components/props/propsnftcartas";
import ConnectInnomicNft from "../../../components/funcion/connectinnomicnft";
import NetworkGoerliEth from "../../../components/funcion/network";
import Barrafiltros from "../../../components/navbar/market/opcion_market";
import Link from 'next/link'
import ReactSlider from 'react-slider'
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import ContentLoader, { Instagram } from "react-content-loader";
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
        setNftseller(nftsellerPromises)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchNFTs();
    }, []);

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
  console.log("mondongo")
}

const mondongo = ( link, id )=>{ 
  const elements = document.querySelectorAll('.oculto');
  const nocxdd = document.getElementById(`animasoooos${id}`);

  if (elements.length > 0) {
    elements.forEach((element) => {
      element.style.opacity = 1;
   nocxdd.style.opacity = 1;
      const animation = element.animate(
        { opacity: [1, 0] },
        { duration: 300 }
      );
  
      animation.addEventListener('finish', () => {
        element.style.opacity = 0; // Establecer la opacidad en 0 una vez que la animación haya finalizado
        nocxdd.style.opacity = 1;
      });
    });
  } 
var coordenadas = {
  top: nocxdd.offsetTop,
  left: nocxdd.offsetLeft,
  width: nocxdd.offsetWidth,
  height: nocxdd.offsetHeight
};
let top = coordenadas.top - 312;
let left = coordenadas.left - 190;
if (top > 300) {
  setTop(top * -1);
  console.log(top);
} else if (top < 300) {
  setTop(Math.abs(top));
  console.log(top);
}
if (left > 300) {
  left = left * -1;
  setLeft(left);
  console.log(left);
}
else if (left < 300) {
  const posi = Math.abs(left);
  console.log(posi);
  setLeft(posi);
}
if (nocxdd) {
  console.log(top, left); 
  nocxdd.style.opacity = 1;
  const animation = nocxdd.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: `translate(${left}px, ${top}px)` }, // Desplazamiento utilizando los valores de top y left
    ],
    {
      duration: 1000, // Duración de la animación en milisegundos
      easing: 'ease-in-out', // Tipo de aceleración de la animación
      iterations: 1, // Número de veces que se repetirá la animación (1 para una sola vez)
      fill: 'forwards',
    }
  );
  setTimeout(() => {
    const asdasd = document.getElementById('nosemequieromatar')
if(asdasd){
    asdasd.style.viewTransitionName = 'mondongoss';
function updateTheDOMSomehow(){  
  router.push(`${link}`) 
  setTimeout(() => {
    asdasd.style.viewTransitionName = '';
}, 1800); 
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
      <SaveUrl  name='Inventory' url='/user/inventario' imagen="https://terrabellum.s3.sa-east-1.amazonaws.com/Iconurl/2.png"/>
      {/* <Barrafiltros/> */}
      <div   className={`${styles.container} oculto` }>
      <div  className={styles.subContainer}>
        <div className={styles.filtros}>
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
        {/* <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)}>
            <option>Red Spectre</option>
            <option>Agente</option>
            <option>Aifos</option>
        </select> */}
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
      {noOwner &&
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
        </div>}
{loading ? (
  <div className={styles2.grid} style={{display:"flex"}}>
  <Instagram
                    gradientRatio={4}
                    backgroundColor={'#333'}
                    foregroundColor={'#999'}
                    width={300}
                  />
                  <Instagram
                    gradientRatio={4}
                    backgroundColor={'#333'}
                    foregroundColor={'#999'}
                    width={300}
                  />
                  <Instagram
                    gradientRatio={4}
                    backgroundColor={'#333'}
                    foregroundColor={'#999'}
                    width={300}
                  />
                  <Instagram
                    gradientRatio={4}
                    backgroundColor={'#333'}
                    foregroundColor={'#999'}
                    width={300}
                  />
                  <Instagram
                    gradientRatio={4}
                    backgroundColor={'#333'}
                    foregroundColor={'#999'}
                    width={300}
                  />  
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
                   {nft.id}
                   <button className="oculto"  onClick={()=> Cancelmarketseller(nft.id)}>Cancel</button>
      </div>
    )) }
    {filteredNFTs.map((nft) => (
    <div key={nft.id}>
      <div className="oculto"   onClick={()=> mondongo(`/user/inventario/${nft.id}`, nft.id)} id={`animasoooos${nft.id}`} >
      <PropsNftcartas 
                   level={nft.metadata.level}
                   name={nft.metadata.name}
                   image={nft.metadata.image} height={370}
                   Rare={nft.metadata.rarity}
                   hability1={nft.metadata.hability1}
                   hability2={nft.metadata.hability2}
                   hability3={nft.metadata.hability3}/></div>
                   
                   { !noOwner && 
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
            vender
          </button> 
          <button className={`${styles2.deleted} oculto`} onClick={()=>setConfirmdeletednft(nft.id)} >Deleted  </button>
          { confirmdeletednft && 
          <div className={styles2.confirmdeleted}>
            Realmente quieres eliminar el nft {confirmdeletednft} ?
            <p>para confirmar escribe quiero eliminar el nft</p>
            <input placeholder="quiero eliminar el nft" onChange={e=>setTextdeleted(e.target.value)} />
            <div>
            {textdeleted == "quiero eliminar el nft" ? <button onClick={()=> deletednft()}>Deleted</button> : <button style={{backgroundColor:"gray"}}>Deleted</button>} <button onClick={()=>{setTextdeleted(null); setConfirmdeletednft(false)}}>Cancel</button>

            </div>
          </div>}
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