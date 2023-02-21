import Link from "next/link";
import Image from "next/image";
import logo from "../public/img/logo.png"
import styles from "../src/styles/header.module.css";
import global from '../public/globe.svg';
import bar from '../public/icon/bar.svg'
import toggle from '../public/toggle.svg'
import Login from "./login";
import { useState } from "react";
const Header = ()=>{
    const [navbarcontainMovile, setNavbarcontainMovile] = useState(false)
    const [interresolution, setInterresolution] = useState(false)

    return(
        <>
                <header className={styles.header}>
        
                 {/* movil 480px */}
                <nav className={styles.navbarcontainMovile}>
                    <Link href={'/'}> <Image src={logo} alt='logo TB movil' className={styles.imagentb}/></Link>
                    <Image onClick={()=>{setNavbarcontainMovile(!navbarcontainMovile)}} src={bar} alt='barra de navegacion' className={styles.imagenbar}/>
                    {navbarcontainMovile ? 
                    
                    <div className={styles.optionMovile}>
                    <div>Download</div>
                    <div>personajes</div>
                    <div>MarketPlace</div>
                    <div>WithePaper</div>
                    </div>
                    : null}
                </nav>

                {/* resolucion intermedia 1020px */}
                <div className={styles.interresolution}>
                <Link href={'/'}> <Image src={logo} alt='logo tb' className={styles.img}/></Link>
                    <Image onClick={()=>{setInterresolution(!interresolution)}} src={bar} alt='logo TB movil' className={styles.imagenbar}/>
                    {interresolution ?  <div className={styles.optionMovile}>
                    <div>Download</div>
                    <div>personajes</div>
                    <div>MarketPlace</div>
                    <div>WithePaper</div>
                    </div>   : null}
                </div>
                        
                  {/* resolucion 1080px       */}
                <nav className={styles.navbarcontain}>
                    <button className={styles.btnnavbar} >Download</button>            
                    <Link href={"/"}><Image src={logo} alt="Logo" className={styles.img} /></Link>            
                    <div style={{alignItems:'center', textAlign:'center'}}>

                    {/* <Image  className={styles.btnnavbar} src={global} alt='icono idioma'/>
                    <Image  className={styles.btnnavbar} style={{width:'60px', height:'40px'}}  src={toggle} alt='toggle img'/> */}
                    <button className={styles.btnnavbar}> Login </button>
                    <button className={styles.btnnavbar}> Login </button>
                    <Login style= 'styles.btnnavbar' />
                    </div>  
                </nav>
                </header>
        </>
    )
}

export default Header;