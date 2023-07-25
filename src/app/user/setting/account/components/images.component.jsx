import { useState , useEffect, useContext } from "react"
import getImagesProfile from "../services/getImagesProfile";
import styles from '../../../../../styles/user/setting/account/components/images.module.scss' 
import exit from '../../../../../public/icon/xmark-solid.svg'   
import changeImageProfile from "../services/changeImageProfile";
import Image from "next/image";
import { User_data } from '../../../../layout'

const ImagesComponents = ()=>{
  const [urlimageperfil, setUrlimageperfil] = useState([])
  const [switchimageperfil, setSwitchimageperfil]= useState([]) 
  const [activeImage, setActiveImage] = useState(false);
  const [editimage, setEditimage] = useState(true)
  const { updateuserdataglobal } = useContext(User_data);   

  const changeimage = async (index)=>{   
    const { newimage } = await changeImageProfile(index)
    if(newimage){
      updateuserdataglobal(newimage) 
    //   //CORREGIR
      const imagen = document.getElementById("imageFromHeader");  
      if(imagen){
        imagen.src = index;  
      }
    //   //CORREGIR
      return closeTab()
    } 
   }   
  const handleImageClick = (index) => {
    setActiveImage(index);
    setSwitchimageperfil(urlimageperfil[index])  
  }
  const closeTab = () => {
    const elemento = document.getElementById('containImagesProfile');
    return  elemento.style.display = "none";
} 
  useEffect(() => {
    const getImages = async () => { 
      const { data } = await getImagesProfile() 
        setUrlimageperfil(data);  
    }
    getImages()
  }, []);  
  return(<>
  
    <div className={styles.containselectimage} id="containImagesProfile" >
      <Image src={exit} className={styles.scape}  alt="button exit" onClick={()=>closeTab()}/>
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
    </div> </>
  )
}


export default ImagesComponents