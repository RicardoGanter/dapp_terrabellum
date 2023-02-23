import styles from "../../src/styles/props/propsnftcartas.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
const PropsNftcartas = ({ texto }) => {
  const [imageUrl, setImageUrl] = useState("");

  async function fetchImage() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    setImageUrl(data[0].url);
  }

  useEffect(() => {
    fetchImage();
  }, []);

  
  return (
    <div className={styles.cards}>
      <img src={imageUrl} className={styles.nft}></img>
      <p className={styles.texto}>{texto}</p>
      <div className={styles.hability}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={styles.power} />
          <div className={styles.power}></div>
          <div className={styles.power}></div>
        </div>
      </div>

      <div className={styles.price}>usdt</div>
    </div>
  );
};

export default PropsNftcartas;