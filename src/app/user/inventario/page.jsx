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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchNFTs();
    }, []);

//  Función para vender un NFT
 const venderNFT = async (Id) => {
   try {
     const contract = await ConnectInnomicNft(); // CONTRATO INNOMIC
      await contract.createMarketItem( 
       Id,
       price *10**9 ,{
       gasLimit: 1000000,
     } );
   } catch (error) {
     console.error(error);
   }
 };

  return (
    <div style={{display:"flex", gap: "1rem"}}>
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
          <input type="text" value={filtercharacters} style={{backgroundColor:"#47213c", padding:".5rem 0", width:"100%"}} onChange={(e)=> setFiltercharacters(e.target.value)} />
          {/* <h2>Hability</h2>
          <select>
              <option>noc</option>
              <option>n213123oc</option>
              <option>noc2312312</option>
          </select> */}
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
              <div {...props} className={`${props.className} ${state.index === 1 ? 'active' : ''}`} />
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
              <div {...props} className={`${props.className} ${state.index === 1 ? 'active' : ''}`} />
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




{loading ? (
  <p>Cargando NFTs...</p>
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
          max={99999999999}
        />
        <button className={styles2.sell} type="submit">
          vender
        </button>
      </form>
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
  );
};
export default NFTContainer;