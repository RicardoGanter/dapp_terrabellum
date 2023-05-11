"use client"
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/img/logo.webp";
import styles from "../../src/styles/header/header.module.scss"
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
          <Link href={"https://pruebajuego1.s3.sa-east-1.amazonaws.com/up-long-solid.svg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJIMEYCIQCTatiwiW83wcz4HwCenAVkt7xtC%2BrukzZSRYvJ1gDYfAIhAPLW%2BGy2Hhmgcu3M70ejcrYyd5KkI4w4FUcGidcOD7JnKu0CCJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNDI5MTY1Njg0MjI1IgwJMhUK7WjxI7aoHu8qwQLKIUse3Bnz%2Ber%2B%2FTPC92Qa8UOsjVSiDRFbBe%2FgqeULVnDTX8G79j6LzXsdufERxNj2MgYj8fG6Cfgg7iDgztAJ6RQXGcZdfMdDGs7pz3J8RTR5HrcmELHefEUoG5yyeJRlJuzp06OM80lGle8OU8TC18cMwdsQ1sigRXyJvzMbNDv1z1IzVJNwJhEdk4SPoWf2sLCI6sPhbTHFMXnTcwDxA3QPvulop1WItFKv%2BWlJaCqIW8NYygYlUrJ8b8Sz%2BN%2BWbIybzYqeKxKlrEOtfE%2BQGQO5DYxYJIM5S2LKEkjhTX5wxQHXN%2FGT3nhwpwIfFkRol3XF2CX7rV%2BmqXWD8pIAoxCdJyNhaUvfygCO1ZYv7XuVykkz5PH4dTFn2rNzVNyK%2BfrOZbiWlvh9qzrKpKVZAZRpN%2BuqOuV8sajnZrJKjwQwkZi7ogY6sgKFor05v0%2BaimtsXqp%2F2VZ6aFdhxcszauX2M9zaHLdxMBXjQXGOghid%2B0yCkHJwIRSYAuibA1V228lTwVWWBAaBHLzmF%2Fa%2FYjiTkcSCfD4h5IHRUdFiuFhN8ha1YsrRL1eGVRcY9YZGp5jdm7Re9Lvu4OC4BBLyKFJ89P4AdfGOtkqHp1JDlnm0wEH8gdhFQeGiLJrif%2Fz%2BU%2F%2F8apgT11YpkuBWBw2TzQ5EGw4adr72WK14bHboB6jx3diMAkmBOa6ukwRlgJP01%2BTybRL%2B8eDTZQK32958zmcYBtH7JTccdF5FUhfPZABtzT0QdFHabaBThr6kkQTF0GUtOfIQOkIwY6piB8arNzth%2BIkP8c%2BYbyrgLiIJL131sg2B7d2so%2F67hr9wS5HpJvS6wBWbRHk5gXU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230501T044703Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAWH3CEUYAW3APJ56F%2F20230501%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=db44276477f7c2c6a46b5718c7b7f9312643ec78e88a0f6dff20c2ae9d013729"} >
            <button className={styles.prueba}>Download</button>
          </Link> 
          <Link href={"/"}>
            <Image src={logo} alt="Logo" className={styles.img} />
          </Link>
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

