import styles from '../src/styles/opcmarket.module.css'


const Barrafiltros = ()=>{

    return(
        <>
        
            <div className={styles.lol}>
                <div className={styles.containfilt}>
                    <Select name='Habilidades' opcion='peru'/>
                    <Select name='Armas' opcion='peru'/>
                    <Select name='Rareza' opcion='peru'/>

                    <div className={styles.containlvl}> 
                        <div>Lvl</div>
                        <div className={styles.containlvl}>
                            <div className={styles.opclvl}>1</div>
                            <div className={styles.opclvl}>2</div>
                            <div className={styles.opclvl}>3</div>
                        </div>
                    </div>

                    
                    {/* price */}
                    <div>personaje</div>
                    <div>personaje</div>
                    <div>personaje</div>
                </div>
            </div>
        </>
    )
}

export default Barrafiltros;
export function Select ({name, opcion}){


    return(
        <div className={styles.containselect}>
            <p>{name}</p>
        <select className={styles.opcion}>
            <option>{opcion}</option>
        </select>
        </div>
    )
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