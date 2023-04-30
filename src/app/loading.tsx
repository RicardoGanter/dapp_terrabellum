import styles from './loading.module.scss'
export default function Loading(){
   
    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            top:"50%",
            alignItems:"center",
            justifyContent:"center",
            height:"87vh"
            }}>
              <div className={styles.loader}></div>
                </div>
    )
}