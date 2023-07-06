"use client"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PropsNftcartas from "../../props/propsnftcartas";
import styles from '../../../styles/navbar/market/marketcompra.module.scss'
import iconeth from '../../../public/icon/ethereum.svg'
import Image from "next/image";
import ConnectInnomicNft from "../../funcion/connectinnomicnft.js";
import styles2 from '../../../styles/navbar/market/opcmarket.module.scss'
import ReactSlider from 'react-slider';
import Link from "next/link"; 
const Marketcompra = ()=>{
  const [sales, setSales] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [filtercharacters, setFiltercharacters] = useState("")
  const [selectedRange, setSelectedRange] = useState([1, 3]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedRangedefusion, setSelectedRangedefusion] = useState([0, 5]);
  const [filteredItemsdefusion, setFilteredItemsdefusion] = useState([]);
  const [orderprice, setOrderprice] = useState(false)
  const [minprice, setMinprice] = useState([0, 10**8])
  const [filteredItemsprice, setFilteredItemsprice] = useState([])
 
  const filteredNFTs = imageUrls.filter((nft) => 
  // filteredItemsprice.includes(nft.id.price.toString()/ 10*18) &&
  filteredItemsdefusion.includes(nft.unfusioned) &&
  filteredItems.includes(nft.level) && 
  nft.name.toLowerCase().includes(filtercharacters.toLowerCase()) &&
  (selectedRarities.length === 0 || selectedRarities.includes(nft.rarity.toString()))

  )
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
  useEffect(() => {
    const filtered = [];
    for (let i = minprice[0]; i <= minprice[1]; i++) {
      filtered.push(i);
    }
    setFilteredItemsprice(filtered);
  }, [minprice]);

  const handleRangeChangeprice = (value) => {
    setMinprice(value);
  };



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
      console.log(selectedRarities)
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
    async function fetchSales() {
      try {
        const contract = await ConnectInnomicNft();
        const saless = await contract.fetchUnSoldMarketItems(); 
        const sortedSales = [...saless]; // Hacer una copia del array original
        const minmax = []
        const dividir = [sortedSales[sortedSales[0].price.toString() , sortedSales.length - 1].price.toString()]

        // setMinprice(dividir/ 10**18)
        if (orderprice==true){
          sortedSales.sort((a, b) => b.price.toString() - a.price.toString()); 
          return setSales(sortedSales);
        }
        if(orderprice==false){
          sortedSales.sort((a, b) => a.price.toString() - b.price.toString());
          // setMinprice([sortedSales[sortedSales[0].price.toString() , sortedSales.length - 1].price.toString()])
          // setMinprice(minmax)
          return setSales(sortedSales); 
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchSales();
  }, [orderprice]); 
  // useEffect(async ()=>{
  //   const urls = await Promise.all(sales.map((sale)=> contract.getUnFusioned(Number(sale.tokenId))))
  //   setUnfusioned(unf)
  // },[sales])

  
 const fetchImageUrl = async (tokenId, ide) => {
    try {
      const id= await ide 
      const contract = await ConnectInnomicNft() 
      const response = await contract.tokenURI(tokenId);
      const uritokenn = await fetch(response);
      const uritokenjson = await uritokenn.json();
      const Nfunsioned = await contract.getUnFusioned(tokenId)
      return { name: uritokenjson.name, hability1: uritokenjson.hability1, level: uritokenjson.level, rarity : uritokenjson.rarity,
         hability2: uritokenjson.hability2, hability3: uritokenjson.hability3, image: uritokenjson.image, unfusioned: Nfunsioned, id: ide}
    } catch (error) {
      console.error(error);
    }}

    // COMPRA 
    const compra = async (Id, values) => {
      try {
        const contract = await ConnectInnomicNft(); // Conectar al smart contract Market
        const weiValue = ethers.utils.parseUnits(String(values), 0); // Convertir a WEI sin decimales
        const ethValue = ethers.utils.formatUnits(weiValue, 'ether'); // Convertir de WEI a ETH
        
        const options = {
          value: weiValue,
          gasLimit: 5000000
        }; 
        console.log(ethValue, "ETH"); // Mostrar el valor en ETH en la consola 
        const compra = await contract.createMarketSale(Number(Id), options);
      } catch (error) {
        console.error(error);
      }
    };
    
    
  useEffect(() => {
    const getImageUrls = async () => {
      const urls = await Promise.all(sales.map(async (sale) => await fetchImageUrl(sale.tokenId, sale)));
      setImageUrls(urls);
    };
    getImageUrls();
  }, [sales]);


  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <div className={styles2.container}>
      <div className={styles2.subContainer}>
        <div className={styles2.filtros}>
        <h2>Type NFT</h2>
          <select>
              <option>Character</option>
              <option>Items</option>
              <option>Weapon</option>
          </select>
          <h2>Characters</h2>
          <input type="text" value={filtercharacters} onChange={(e)=> setFiltercharacters(e.target.value)} /> 
        </div>
          
        <div className={styles2.filtros}>
          {/* <h2>price</h2> */}
          {/* <ReactSlider
            className={styles2.horizontalslider}
            thumbClassName={styles2.examplethumb}
            min={0}
            max={1*10**6}
            defaultValue={minprice}
            onChange={handleRangeChangeprice}
            trackClassName="slider-track"
            renderTrack={(props, state) => (
              <div {...props}  >
                {state.index > 0 && state.index < 2 && (
                  <div className={styles2.looooooooooooool}/>
                )}
              </div>
            )} 
            /> */} 
          <h2>Level</h2>
          <ReactSlider
            className={styles2.horizontalslider}
            thumbClassName={styles2.examplethumb}
            min={1}
            max={3}
            defaultValue={selectedRange}
            onChange={handleRangeChange} 
            renderTrack={(props, state) => (
              <div {...props}  >
                {state.index > 0 && state.index < 2 && (
                  <div className={styles2.looooooooooooool}/>
                )}
              </div>
            )} 
              />
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
            <h2>1</h2> <h2>2</h2> <h2>3</h2>
          </div>
        </div>

        <div className={styles2.filtros}>
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
        <div className={styles2.filtros}>
          <h2>unmerge</h2>
          <ReactSlider
            className={styles2.horizontalslider}
            thumbClassName={styles2.examplethumb}
            min={0}
            max={5}
            defaultValue={selectedRangedefusion}
            onChange={handleRangeChangefusion}
            trackClassName="slider-track"
            renderTrack={(props, state) => (
              <div {...props}  >
                {state.index > 0 && state.index < 2 && (
                  <div className={styles2.looooooooooooool}/>
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
   
      <div className={styles.contain}>
        <h2 className={styles.Title}>Marketplace</h2>
      {imageUrls.length > 0 && sales.length > 0 ? 
  filteredNFTs.map((data) => (
    <div className={styles.containcard}  key={data.id} >
      <div >
        {data && (
          <Link href={`/market/${data.id.tokenId}`}>
          <PropsNftcartas 
            name={data.name} 
            Rare={data.rarity} 
            image={data.image} 
            level={data.level} 
            hability1={data.hability1} 
            hability2={data.hability2} 
            hability3={data.hability3}
          />
          </Link>
        )}
      </div>
      <div className={styles.containPrice}>
        Price: {(data.id.price/10**18).toString()} <Image src={iconeth} width={40} height={40} alt='Icon ETH' />
      </div>
      <button onClick={() => compra(data.id.itemId, data.id.price)} className={styles.btnbuy}>
        Comprar
      </button>
    </div> 
      ))
    : <div className={styles.saasdasd} >
                  
    </div>}
      </div>
      <div className={styles2.contain}>
      <select onChange={handleOrderChange}>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>
      </div>
      </div>
  );
  };
export default Marketcompra;