import styles from '../src/styles/marketfiltros.module.scss'


const Marketfiltros = ()=>{

    return (
      <div className={styles.contain}>
        <div>All filters</div>
        <select name=''>
          <option>Lowest Price</option>
          <option>Highest Price</option>
        </select>
      </div>
    )
}
export default Marketfiltros;