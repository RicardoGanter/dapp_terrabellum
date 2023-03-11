import Layout from "../../../components/layout";
import styles from '../../styles/user/fusion.module.scss'
const Fusion = ()=>{
    return (
          <Layout>
            <div className={styles.contain}>

            <div className={styles.cotainleft}>
                <div className={styles.contain1}>a</div>
                <div className={styles.contain2}>a</div>
            </div>

            <div className={styles.cotainleft}>
                <div className={styles.contain1}>a</div>
                <div className={styles.contain2}>a</div>
            </div>

            </div>
          </Layout>
      )
    }
    
    export default Fusion;