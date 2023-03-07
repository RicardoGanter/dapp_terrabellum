import Link from "next/link";
import Image from "next/image";
import logo from "../public/img/logo.png";
import styles from "../src/styles/header.module.scss";
import global from "../public/globe.svg";
import bar from "../public/icon/bar.svg";
import toggle from "../public/toggle.svg";
import Login from "./login.jsx";
// import {mint, Balance, Tokenuri} from "@/etherjs/borrador";
import { useState,useEffect } from "react";

// import DataIpfs from "../ipfs/ipfs";
import { create } from 'ipfs-http-client'

const Header = () => {
  // const sus = Tokenuri()
  // const sas = Tokenuri.toString();
  // Tokenuri()
  const cid = 'QmUNisJskUs7g6UdymhXdQEY7ULtyL96C5VXWhn5L3F5rg/sas/Axe.png';
  const projectId = '2HdtR7fw87DXMsYJBlLLeQl27aM';
  const projectSecret = '41b8ca7bf059eafb70f5305628849b4f';
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', headers: {
    authorization: auth,
}, });
  
  //Ipfs
  const getImageFromIPFS = async (cid) => {
    const stream = ipfs.cat(cid);
    const chunks = [];
  
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
  
    const data = Buffer.concat(chunks);
    const imageUrl = URL.createObjectURL(new Blob([data]));
    return imageUrl;
  };

  const [imageUrl, setImageUrl] = useState('');

  //IPFS
  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await getImageFromIPFS(cid);
      setImageUrl(imageUrl);
    };

    fetchImage();
  }, []);

  //media Query
  const [navbarcontainMovile, setNavbarcontainMovile] = useState(false);
  const [interresolution, setInterresolution] = useState(false);
  
 
  //cambio de color
  const [color, setColor] = useState('#461739')
  const switchColor = ()=>{
    setColor( color=== '#461739' ? 'white': '#461739'  )
  }
  return (
    <>
      <header className={styles.header}>
        {/* movil 480px */}
        <nav className={styles.navbarcontainMovile}>
          <Link href={"/"}>
            {" "}
            <Image src={logo} alt="logo TB movil" className={styles.imagentb} />
          </Link>
          <Image
            onClick={() => {
              setNavbarcontainMovile(!navbarcontainMovile);
            }}
            src={bar}
            alt="barra de navegacion"
            className={styles.imagenbar}
          />
          {navbarcontainMovile ? (
            <div className={styles.optionMovile}>
              <div>Download</div>
              <div>personajes</div>
              <div>MarketPlace</div>
              <div>WithePaper</div>
            </div>
          ) : null}
        </nav>

        {/* resolucion intermedia 1150px */}
        <div className={styles.interresolution}>
          <Link href={"/"}>
            {" "}
            <Image src={logo} alt="logo tb" className={styles.img} />
          </Link>
          <Image
            onClick={() => {
              setInterresolution(!interresolution);
            }}
            src={bar}
            alt="logo TB movil"
            className={styles.imagenbar}
          />
          {interresolution ? (
            <div className={styles.optionMovile}>
              <div>Download</div>
              <div>MarketPlace</div>
              <div>WithePaper</div>
            </div>
          ) : null}
        </div>

        {/* resolucion 1080px       */}
        <nav className={styles.navbarcontain} style={{backgroundColor: color}}>
          <button className={styles.btnnavbar}>Download</button>
          <Link href={"/"}>
            <Image src={logo} alt="Logo" className={styles.img} />
          </Link>

          <div className={styles.btnsrigth}>
            <div className={styles.iconos}>
              <Image src={global} className={styles.icon}/>
              <p>ES</p>
            </div>
            {/* {imageUrl && <img src={imageUrl} />} */}

            <div className={styles.iconos}>
              <Image onClick={switchColor}  src={toggle} className={styles.icon}/>
            </div>
            {/* <p>{fileContent}</p> */}
            {/* {imageUrl && (
        <Image
          src={imageUrl}
          alt="IPFS Image"
          width={500}
          height={500}
        />
      )} */}
            {/* <Balance/> */}
            {/* <div style={{color:'white', fontSize:'3rem'}} onClick={()=>{Balance()}}>{Balance}</div> */}
            {/* <div onClick={()=>{mint()}}  style={{color:'white', fontSize:'2rem'}}>aaaaa</div> */}
            <Login/>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

