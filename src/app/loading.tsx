import styles from './loading.module.scss'
import { ClipLoader } from 'react-spinners'
export default function Loading(){
   
    return (
      <div style={{position:"absolute", right:40, bottom:30, width:"30px", height:"30px"}} >
              <ClipLoader color="#6b199d" />
            </div>
        // <div style={{
        //     display:"flex",
        //     flexDirection:"column",
        //     top:"50%",
        //     alignItems:"center",
        //     justifyContent:"center",
        //     height:"87vh"
        //     }}>
        //       <div className={styles.loader}></div>
        //         </div>
    )
}