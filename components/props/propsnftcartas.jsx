import styles from "../../src/styles/props/propsnftcartas.module.scss";
import Link from "next/link";
const PropsNftcartas = ({ Href,name,img,Ida,Rare, Level}) => {

  return (
    <Link href={`/market/${Href}`}>
    { Rare==="normal" ? (
      <div className={styles.cards}>
      <div className={styles.contain}>
      <img src={img}  className={styles.nft}>
      </img>
      <div className={styles.hability}>
        <pre>Name  : {name} </pre>
        <pre>Rarity: {Rare}</pre>
        <pre>Level : {Level} </pre>
      </div>
      {/* <h1>{Ida}</h1> */}
      </div>
    </div>

    ) : Rare==="pococomun" ? (
      <div className={styles.cardsRare}>
      <div className={styles.contain}>
      <img src={img}  className={styles.nft}>
      </img>
      <div className={styles.hability}>
        <pre>Name  : {name} </pre>
        <pre>Rarity: {Rare}</pre>
        <pre>Level : {Level} </pre>
      </div>
      <h1>{Ida}</h1>
      </div>
    </div>

    ) : Rare==="legendaria" ? (
      <div className={styles.cardsLegendary}>
      <div className={styles.contain}>
      <img src={img}  className={styles.nft}>
      </img>
      <div className={styles.hability}>
      <pre>Name  : {name} </pre>
        <pre>Rarity: {Rare}</pre>
        <pre>Level : {Level} </pre>
      </div>
      <h1>{Ida}</h1>
      </div>
    </div>
    ): null}

    </Link>
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