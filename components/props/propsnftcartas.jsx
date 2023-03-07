import styles from "../../src/styles/props/propsnftcartas.module.scss";
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import IPFS from 'ipfs-http-client'
import { create } from 'ipfs-http-client';

const PropsNftcartas = ({ name,img }) => {
  const [imageUrl, setImageUrl] = useState("");
  // const [data, setData] = useState(null);
  // async function fetchImage() {
  //   const response = await fetch("https://api.thecatapi.com/v1/images/search");
  //   const data = await response.json();
  //   setImageUrl(data[0].url);
  // }

  // useEffect(() => {
  //   fetchImage();
  // }, []);

  // fetch de ipfs
//   const fetchDataFromIPFS = async () => {
//   const response = await fetch("https://ipfs.io/ipns/k51qzi5uqu5dlefd1gznkz19mm9mjtggeakwp58oye9mmqv526jp2z86v1vome");
//   const data = await response.json();
//   setData(data);
//   console.log(data)
// };

// useEffect(() => {
//   fetchDataFromIPFS();
//   console.log(data)
// }, []);

  return (
    <div className={styles.cards}>
      <div className={styles.contain}>
      <img src={img}  className={styles.nft}/>
      
      <div className={styles.hability}>
          <div className={styles.power}/>
          <div className={styles.power}></div>
          <div className={styles.power}></div>
          <p className={styles.texto}>{name}</p>
      </div>
      </div>
      
    </div>
  );
};

export default PropsNftcartas;


// const IPFSImage = ({ ipfsPath }) => {
//   const [imageUrl, setImageUrl] = useState('')

//   useEffect(() => {
//     async function fetchImage() {
//       try {
//         const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
//         const files = await client.get(ipfsPath)
//         const imageFile = files.find(file => file.type.startsWith('image'))
//         if (imageFile) {
//           const url = URL.createObjectURL(new Blob([imageFile.content]))
//           setImageUrl(url)
//         }
//       } catch (error) {
//         console.error(error)
//       }
//     }
//     fetchImage()
//   }, [ipfsPath])

//   if (!imageUrl) {
//     return <div>Loading...</div>
//   }

//   return <img src={imageUrl} alt="IPFS Image" />
// }