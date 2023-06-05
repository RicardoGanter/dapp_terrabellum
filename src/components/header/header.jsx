"use client"
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/img/logo.webp";
import styles from "../../styles/header/header.module.scss"
import global from "../../public/globe.svg";
import toggle from "../../public/toggle.svg";
import bar from "../../public/icon/bar.svg";
import Login from "./login/login.jsx";
// import {mint, Balance, Tokenuri} from "@/etherjs/borrador";
import { useState,useEffect } from "react";
const Header = () => {
  //media Query
  const [navbarcontainMovile, setNavbarcontainMovile] = useState(false);
  const [interresolution, setInterresolution] = useState(false);
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
        <nav className={styles.navbarcontain}>
          <Link target="blank" href={"https://terrabellum.s3.sa-east-1.amazonaws.com/TBOF.zip"} >
            <button className={styles.prueba}>Download</button>
          </Link> 
          {/* <Link href={"/"}>
            <Image src={logo} alt="Logo" className={styles.img} />
          </Link> */}
          <div className={styles.btnsrigth}>
            {/* <div className={styles.iconos}>
              <Image src={global} className={styles.icon}/>
              <p>ES</p>
            </div> */}
            {/* <div className={styles.iconos}>
              <Image src={toggle} className={styles.icon}/>
            </div> */}
            <Login/>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

