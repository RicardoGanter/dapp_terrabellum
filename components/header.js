import Link from "next/link";
import Image from "next/image";
import logo from "../public/img/logo.png"
import styles from "../src/styles/header.module.css";
import global from '../public/globe.svg';
// import DarkModeToggle from "./DarkModeToggle ";
import toggle from '../public/toggle.svg'
import Home from "./loginmetamask";
const Header = ()=>{

    return(
        <>
        <nav className={styles.navbarcontain}>
           
                <button className={styles.btnnavbar} >InnomicToken</button>            
                <Link href={"/"}><Image src={logo} alt="Logo" className={styles.img} /></Link>            
                <div style={{alignItems:'center', textAlign:'center'}}>

                {/* <Image  className={styles.btnnavbar} src={global} alt='icono idioma'/>
                <Image  className={styles.btnnavbar} style={{width:'60px', height:'40px'}}  src={toggle} alt='toggle img'/> */}
                <button className={styles.btnnavbar}> Login </button>
                <button className={styles.btnnavbar}> Login </button>
                <Home/>
            </div>
        </nav>
        </>
    )
}

export default Header;