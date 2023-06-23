"use client" 
import styles from '../../../styles/admin_mint/mint.module.scss'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie' 
const Createnextmint = ()=>{
    const [Nftdataventa, setNftdataventa] = useState([])
    const [dataname, setDataname] = useState([]) 
    useEffect( ()=>{
        const fetchData = async () => {
            try {
              const data = []; 
              let i = 1;  
              const fetchImage = async () => {
                const response = await axios.get(`https://terrabellum.s3.sa-east-1.amazonaws.com/Jsoncharacters/${i}.json`); 
                if (response.status === 403) {
                  return false;
                }  
                 data.push( { name :response.data.name , idnft : i });
                 
                i++;
                return true;
            };   
              let shouldContinue = await fetchImage(); 
              while (shouldContinue) {
                if(data){
                    setDataname(data);
                }
                shouldContinue = await fetchImage();  
              }  
            } catch (error) {
              console.error('Error al obtener los datos:', error);
            }
          }; 
          fetchData();
    },[]) 

    const arraydatanft = (nft)=>{ 
        console.log(nft)
        if(Nftdataventa.length>0){ 
            const lolsito = Nftdataventa.find(x=> x.name   == nft.name )
            if(lolsito){ 
                const a = Nftdataventa.filter( x =>  x  != nft ) 
                return setNftdataventa(a)
            }

            const newdata =  [...Nftdataventa]
            newdata.push(nft) 
            return  setNftdataventa(newdata)
        }
        setNftdataventa([nft])
    }

    const deleted = (data)=>{ 
        const newdata = Nftdataventa.filter( x =>  x != data ) 
      setNftdataventa(newdata)
    } 
    const mintnft =async ()=>{ 
            const token = Cookies.get('token_admin_mint') 
            console.log(Nftdataventa)
            const response =await axios.post('https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/insertnfttanda', { id: token, data: Nftdataventa })
            if(response){
                console.log(response.data.data)
            } 
    } 
    if(dataname){
        console.log(dataname)
    }
    return (
        <div className={styles.contain}>
            <div className={styles.leftcontain}>
                <h2> cantidad de NFT Actual {dataname && dataname.length}</h2>
                {/* <p> Type rarity :   L -- R -- C</p> */}
                { dataname && dataname.length > 0 && dataname.map( (data, index) =>
                    <div className={styles.containnftdata} onClick={()=>arraydatanft(data)}> 
                        <p>{data.name}</p> 
                        {/* <div className={styles.containtanda}>
                            { data.tanda <= 3 && <p className={`${styles.tanda} ${styles.tandalegendary}`}>{data.tanda}</p> }
                            { data.tanda <= 6 && <p className={`${styles.tanda} ${styles.tandarare}`}>{data.tanda}</p>}
                            <p className={`${styles.tanda} ${styles.tandacommon}`}>{data.tanda}</p>
                        </div>  */}
                    </div>
                ) }
            </div>

            <div className={styles.leftcontain}>
                <h2>NFT para la venta {Nftdataventa.length} </h2>
                {Nftdataventa.length >0 && 
                Nftdataventa.map((data)=>

                <div className={styles.containnftdata} onClick={()=>deleted(data)}> 
                    <p>{data.name}</p> 
                    <div className={styles.containtanda}>
                        { data.tanda <= 3 && <p className={`${styles.tanda} ${styles.tandalegendary}`}>{data.tanda}</p> }
                        { data.tanda <= 6 && <p className={`${styles.tanda} ${styles.tandarare}`}>{data.tanda}</p>}
                        <p className={`${styles.tanda} ${styles.tandacommon}`}>{data.tanda}</p>
                    </div> 
                </div>
            )}
            <button onClick={()=> mintnft()}> Accept mint </button>
            </div>
        </div>
    )
}

export default Createnextmint