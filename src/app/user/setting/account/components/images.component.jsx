import { useState , useEffect } from "react"
import getImagesProfile from "../services/getImagesProfile";
import styles from '../../../../../styles/user/setting/account/components/images.module.scss' 
import exit from '../../../../../public/icon/xmark-solid.svg'   
import changeImageProfile from "../services/changeImageProfile";
import Image from "next/image";
const ImagesComponents = ()=>{
  const [urlimageperfil, setUrlimageperfil] = useState([])
  const [switchimageperfil, setSwitchimageperfil]= useState([]) 
  const [activeImage, setActiveImage] = useState(false);
  const [editimage, setEditimage] = useState(true)
  const changeimage = async (index)=>{   
    const { newimage } = await changeImageProfile(index)
    if(newimage){
      updateuserdataglobal(newimage) 
      //CORREGIR
      const imagen = document.getElementById("lol"); 
      imagen.src = index; 
      //CORREGIR
      setEditimage(false) 
    } 
   }   
  const handleImageClick = (index) => {
    setActiveImage(index);
    setSwitchimageperfil(urlimageperfil[index])  
  }

  useEffect(() => {
    const getImages = async () => { 
      const { data } = await getImagesProfile() 
        setUrlimageperfil(data);  
    }
    getImages()
  }, []);  
  return(<>
    {editimage && 
    <div className={styles.containselectimage}>
      <Image src={exit} className={styles.scape}  alt="button exit" onClick={()=>setEditimage(false)}/>
      <div className={styles.images}> 
      {urlimageperfil && urlimageperfil.map((image, index) => (
      <div>
          <img
          key={index}
          className={`${styles.image} ${activeImage === index ? styles.active : ''}`}
          src={image}
          onClick={() => handleImageClick(index)}
          alt="ssssa"
      />
      { activeImage >=0 && switchimageperfil ? <button onClick={()=>{ changeimage(switchimageperfil) }} className={styles.confirmimage}>Confirm</button> : <button style={{backgroundColor:"gray"}} className={styles.confirmimage}>Confirm</button> }
      
      </div>
      ))} 
      </div> 
    </div>}</>
  )
}


export default ImagesComponents