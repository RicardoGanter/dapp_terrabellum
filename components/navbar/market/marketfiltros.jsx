import styles from '../../../src/styles/navbar/market/marketfiltros.module.scss'


const Marketfiltros = ()=>{

    return (
      <div className={styles.contain}>
        <select>
          <option>Lowest Price</option>
          <option>Highest Price</option>
        </select>
      </div>
    )
}
export default Marketfiltros;