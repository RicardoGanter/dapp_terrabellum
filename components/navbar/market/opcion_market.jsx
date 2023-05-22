"use client"
import styles from "../../../src/styles/navbar/market/opcmarket.module.scss";
import { useEffect, useState } from "react";
import { Habilidades } from "../../../src/pages/api/habilidades";
import Search from "./search";
const Barrafiltros = () => {
  
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState()
  const [selectedRarities, setSelectedRarities] = useState([]);
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedRarities([...selectedRarities, value]);
    } else {
      setSelectedRarities(selectedRarities.filter(item => item !== value));
    }
  };
  return (
    <div className={styles.container}>
    <div className={styles.subContainer}>
      <div className={styles.filtros}>
      <h2>Type NFT</h2>
        <select>
            <option>Character</option>
            <option>Items</option>
            <option>Weapon</option>
        </select>
        <h2>Hability</h2>
        <select>
            <option>noc</option>
            <option>n213123oc</option>
            <option>noc2312312</option>
        </select>
      </div>

      <div className={styles.filtros}>
        <h2>Level</h2>
        <input 
          type="range" 
          defaultValue="1"
          min="1" 
          max="3"
          onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
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
      <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)}>
          <option>Red Spectre</option>
          <option>Agente</option>
          <option>Aifos</option>
      </select>
      <div className={styles.filtros}>
        <h2>unmerge</h2>
        <input type="range" min="1" max="7"/>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
          <h2>1</h2> <h2>2</h2> <h2>3</h2> <h2>4</h2> <h2>5</h2> <h2>6</h2> <h2>7</h2> 
        </div>
      </div>
    </div>
  </div>
  );
};

export default Barrafiltros;
// export function Select({ name }) {
  // return(
  //     <div className={styles.containselect}>
  //         <p>{name}</p>
  //     <select className={styles.opcion}>
  //         <option>{opcion}</option>
  //     </select>
  //     </div>
  // )
// }

// export function PriceFilter() {
//     const [price, setPrice] = useState(50);

//     const handlePriceChange = (event) => {
//       setPrice(event.target.value);
//       // Aquí podrías llamar a una función que filtre los datos en función del precio seleccionado
//     };

//     return (
//       <div>
//         <label htmlFor="price-filter">Precio:</label>
//         <RangeInput
//           id="price-filter"
//           name="price-filter"
//           min={0}
//           max={100}
//           step={1}
//           value={price}
//           onChange={handlePriceChange}
//         />
//         <p>{price}</p>
//       </div>
//     );
//   }
