"use client"
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
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
import jwt  from 'jsonwebtoken';
import { SaveUrl } from "../../../components/header/header";
import questionicon from '../../../public/circle-question-regular.svg'
import Image from "next/image";
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
  const [user, setUser] = useState(null)
  const router = useRouter();
  const [userInno, setUserInno] = useState(null) 
  const [countnft, setCountnft] =useState(null)
  const [noOwner, setnoOwner] = useState(null)

  useEffect(()=>{
    const getdata = async()=> { 
        const token = Cookies.get('token');  
        const session = await getSession()
        if(!token && !session){
          console.error("no tienes una sesion iniciada")
          return router.push('./signin')
        }
        if(session){
          return setUser(session)
        } 
        const userdata = Cookies.get('userdata') 
        if(!userdata){ 
          const response = await axios.post(`${URI}getuser`,{id : token});
          if(response.data){
          const datauser = await Cookies.set('userdata', JSON.stringify(response.data))   
          return setUserInno(response.data)
          }
        }
        if(userdata){ 
          const data = JSON.parse(userdata)  
          return setUserInno(data)
        } 
    };
    setTimeout(() => {
      getdata()
      
    }, 2000);
   }) 


   const filteredNFTs = nfts.filter((nft) => 
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


  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const wallet = Cookies.get('userdata') 
        const getaddres = JSON.parse(wallet).address_metamask
        if(!getaddres){
          alert("no tienes una wallet, conectala")
        } 


        const signer = await NetworkGoerliEth();
        const address = await signer.getAddress();  
        if(address !=getaddres){ 
          setnoOwner(true)
        }
        
        const contract = await ConnectInnomicNft();
         // Obtiene el número total de tokens del usuario
        const tokenCount = await contract.balanceOf(getaddres);
        setCountnft(tokenCount.toString())
        // Crea un arreglo con los NFTs del usuario
        const nftPromises = [];
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
        setNfts(nftPromises);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchNFTs();
    }, []);

// Función para vender un NFT
const { ethers } = require('ethers');

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
    console.log('loooooooooooooooooooool')
    console.error(error);
  }
};  
  return (
    <>
    {userInno ?
    <div style={{display:"flex", gap: "1rem"}}>
      <SaveUrl name='Inventory' url='user/inventario' imagen="https://terrabellum.s3.sa-east-1.amazonaws.com/Iconurl/2.png"/>
      {/* <Barrafiltros/> */}
      <div className={styles.container}>
      <div className={styles.subContainer}>
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

      <h2 className={styles2.Title}>Inventory</h2>
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
    {filteredNFTs.map((nft) => (
    <div key={nft.id}>
      <Link href={`/market/${nft.id}`}>
      <PropsNftcartas 
                   level={nft.metadata.level}
                   name={nft.metadata.name}
                   image={nft.metadata.image} height={370}
                   Rare={nft.metadata.rarity}
                   hability1={nft.metadata.hability1}
                   hability2={nft.metadata.hability2}
                   hability3={nft.metadata.hability3}/></Link>
                   
                   { !noOwner && 
      <form
        className={styles2.form}
        onSubmit={(e) => {
          e.preventDefault();
          venderNFT(nft.id);
        }}
      >
        <input
          type="number"
          placeholder="Precio en Wei"
          value={price[nft]}
          onChange={(e) => setPrice(e.target.value)}
          min={-1}
          max={99999999999}
        />  
         <button className={styles2.sell} type="submit">
          vender
         </button> 
      </form> }
    </div>
  ))}
  </div>
) : null }
  <div className={styles.contain}>
      <select onChange={handleOrderChange}>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>
      </div>
{/* </div> */}
    </div>
    : null}</>
  );
};
export default NFTContainer;