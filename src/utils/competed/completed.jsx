"use client"
import styles from '../../styles/utils/completed/completed.module.scss' 
export default function Completed(){    
    // const fregistercompleted = ()=>{
    //     if(!registercompleted){
    //         setRegistercompleted(true)
    //         setTimeout(() => { 
    //             setRegistercompleted(false)
    //         }, 3000);
    //     }
    // }  
        return ( 
            <div className={styles.popup_register}>
                <p>Register completed!</p>
                <div></div>
            </div>  
          );    
  };
   