"use client"
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "../styles/home/home.module.scss";
import mainImage from "../public/icon/lienzo 1 (1).png";
import twoImage from "../public/img/games/terrabellum/Captura_de_pantalla_582.png";
import threeImage from "../public/img/games/terrabellum/Captura_de_pantalla_583.png";
import arrowLeft from "../public/icon/🦆 icon _nav arrow left_.svg";

export default function Home() {
  const [contador, setContador] = useState(0);
  const [image, setImage] = useState(mainImage);
  const [arrayImages] = useState([mainImage, twoImage, threeImage]);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setContador((prevContador) => (prevContador + 1) % arrayImages.length);
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [arrayImages.length]);

  useEffect(() => {
    setImage(arrayImages[contador]);
  }, [contador, arrayImages]);

  return (
    <div className={styles.contain}>
      <h2> All Games</h2>
      <div className={styles.containimages}>
        <Image className={styles.imageGame} src={image} />
        <Image className={`${styles.arrow} ${styles.arrowLeft}`} src={arrowLeft} />
        <Image className={`${styles.arrow} ${styles.arrowRight}`} src={arrowLeft} />
      </div>
      <div className={styles.containCircleButton}>
        <div className={styles.containSubImages}>
          {arrayImages.map((x, index) => (
            <div
              key={index}
              onClick={() => {
                setContador(index);
              }}
              style={Number(index) === contador ? { backgroundColor: "#3C0071" } : null}
              className={styles.circle}
            />
          ))}
        </div>
        <button className={styles.button}>Download</button>
      </div>
    </div>
  );
}


// export const getServerSideProps = async(context)=>{
//   const session = await getSession(context)
//   return{
//     props:{
//       session: session,
//     }
//   }
// }
