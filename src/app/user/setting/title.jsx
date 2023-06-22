import styles from '../../../styles/user/setting/setting.module.scss'
const Title = ({title})=>{
    return(
        <div className={styles.containtitle}>
            <h1>{title}</h1>
            <div className={styles.linearhorizontal}/>
        </div>
    )
} 

export default Title