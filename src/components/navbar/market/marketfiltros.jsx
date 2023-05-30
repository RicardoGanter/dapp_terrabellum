import styles from '../../../styles/navbar/market/marketfiltros.module.scss'


const Marketfiltros = ()=>{

    return (
      <div className={styles.contain}>
        <select>
          <option>Highest Price</option>
          <option>Lowest Price</option>
        </select>
      </div>
    )
}
export default Marketfiltros;