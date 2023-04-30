import styles from "../../../src/styles/navbar/market/opcmarket.module.scss";
import { useEffect, useState } from "react";
import { Habilidades } from "../../../src/pages/api/habilidades";
import Search from "./search";
const Barrafiltros = () => {
  return (
    <>
      <div className={styles.lol}>
        <div className={styles.containfilt}>
          <Search api={Habilidades} title="Habilidades" />
          
          <div className={styles.containlvl}>
            <div>Lvl</div>
            <div className={styles.containlvl}>
              <button className={styles.opclvl}>1</button>
              <button className={styles.opclvl}>2</button>
              <button className={styles.opclvl}>3</button>
            </div>
          </div>

          {/* price */}
          <div style={{ margin: "1rem .4rem" }}>Rareza</div>
          <div style={{ margin: "1rem .4rem" }}>personaje</div>
          <div style={{ margin: "1rem .4rem" }}>personaje</div>
        </div>
      </div>
    </>
  );
};

export default Barrafiltros;
export function Select({ name }) {
  // return(
  //     <div className={styles.containselect}>
  //         <p>{name}</p>
  //     <select className={styles.opcion}>
  //         <option>{opcion}</option>
  //     </select>
  //     </div>
  // )
}

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
