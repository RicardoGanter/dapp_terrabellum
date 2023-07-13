"use client"
// import Link from "next/link";
import Image from "next/image";
import logo from "../../public/img/logo.webp";
import styles from "../../styles/header/header.module.scss" 
import Login from "./login/login.jsx";
// import search from '../../public/icon/magnifying-glass-solid.svg'
import Cookies from 'js-cookie'
// import { getSession } from "next-auth/react";
import star from '../../public/🦆 icon _star outline_.svg' 
// import styles2 from '../../styles/utils/saveurl/saveurl.module.scss'  
// import starsolid from  '../../public/star-solid 1.svg'     
import { useState,useEffect, useContext } from "react"; 
import { MyContext } from "../../app/layout"; 
// import { Fetch } from "utils/fetch/fetch";

export  const SaveUrl = ({name, url, imagen})=>{ 
  const { sharedVariable, updateSharedVariable } = useContext(MyContext);
  // console.log(sharedVariable)
  // const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
  // const id_user = Cookies.get('token') 
  // const [saved, setSaved ] = useState(false)
  // const [image, setImage] = useState(star) 

  // useEffect(()=>{
  //   const datauser = Cookies.get('userdata')
  //  if(datauser){
  //   const newdatauser = JSON.parse(datauser) 
  //   const nombreBuscado = name;
  //   const existeNombre = newdatauser.urlMarkets.find(item => item.nombre === nombreBuscado); 
  //   if (existeNombre) { 
  //   return  setSaved(true)
  //   } else { 
  //   return  setSaved(false)
  //   } 
  //  }
  // },[saved]) 

//  useEffect(()=>{ 
//   setTimeout(() => {
//     setSaved(savename) 
//   } );
//  },[])
//   const hoverstar = ()=>{
//       setImage(starsolid)
//   }
//   const unhoverstar = ()=>{
//       setImage(star)
//   }
//   const saveurl= async()=>{ 
//     const response = await Fetch(`${URI}inserturl`, 'POST' ,{ id: id_user, url: url , nombre: name, imagen: imagen})
//     const data = await response.json()
//     if(response && response.status === 200){ 
//       const datauser = Cookies.get('userdata')
//       if( datauser ){
//         const objdatauser = JSON.parse(datauser)
//         const datau = {...objdatauser}  
//         datau.urlMarkets.push(data.newUrl) 
//         Cookies.set('userdata', JSON.stringify(datau))   
//         setSaved(true)
//         return updateSharedVariable("blabla")
//           }
//       }
//   }
//   const deletedurl = async () => { 
//     const response = await Fetch(`${URI}deletedurl`, 'POST', {id: id_user, nombre: name})
//     if (response && response.status === 200) {
//       const datauser = Cookies.get('userdata'); 
//       if (datauser && response) {
//         const objdatauser = JSON.parse(datauser);
//         const datau = { ...objdatauser }; 
//         // Eliminar el array con nombre "Profile"
//         datau.urlMarkets = datau.urlMarkets.filter((profile) => profile.nombre !== name); 
//         Cookies.set('userdata', JSON.stringify(datau));
//         setSaved(false)
//         return updateSharedVariable("bloblo")
//       }
//     }
//   };
  
//   return ( 
//           <div  className={styles2.contain}>
//               <img alt={`${name} Icon`} src={imagen} height={20}/>
//               <p>{name}</p>
//            { saved===true ?<Image alt='Star Icon' onClick={()=>deletedurl()} className={styles2.star} src={starsolid} height={20} width={20}/> 
//            : <Image alt='Star Icon' onClick={()=>saveurl()} id='starsolid' className={styles2.star} src={image} onMouseLeave={unhoverstar} onMouseEnter={hoverstar} height={20} width={20}/>}   
//           </div> 
//   )
 } 

const Header = () => {

  //media Query
  // const [navbarcontainMovile, setNavbarcontainMovile] = useState(false);
  // const [interresolution, setInterresolution] = useState(false);
  const [user, setUser] = useState(null)
  const [userinno, setUserInno] = useState(null) 
    const { sharedVariable, updateSharedVariable } = useContext(MyContext);  
  // useEffect(() => { 
  //     const getdata = async () => {
  //       const URI = 'https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/'
  //       const token = Cookies.get('token');
  //       const session = await getSession(); 
  //       if (!token && !session) {
  //         setUser(false);
  //       } 
  //       if (session) {
  //         return setUser(session);
  //       } 
  //       const userdata = Cookies.get('userdata'); 
  //       if (!userdata && token) { 
  //         const response = await Fetch(`${URI}getuser`, 'POST' ,{ id: token })
  //         const data = await response.json()
  //         if (data) {
  //           const datauser = Cookies.set('userdata', JSON.stringify(data));
  //           return setUserInno(data);
  //         }
  //       } 
  //       if (userdata) {
  //         const data = JSON.parse(userdata);
  //         return setUserInno(data);
  //       }
  //       if(!userdata && !token){
  //         return setUserInno(false)
  //       }
  //     };  
  //     getdata()
  // },[sharedVariable]);
   
  return (
    <>
      <header className={styles.header}>
        {/* movil 480px */}
        {/* <nav className={styles.navbarcontainMovile}>
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
        {/* <div className={styles.interresolution}>
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
          ) : null} */}
        {/* </div> */} 

        {/* resolucion 1080px       */}
        <div className={styles.blabla}>

        <Login/>
        </div>
        <div className={styles.lal}> 
          <nav className={styles.navbarcontain}>
          <div className={styles.logotb} >
            <Image src={logo} alt="Terra Bellum abbreviated icon" width={70}/> 
            {/* <Image src={search} className={styles.imagesearch}/> */}
            {/* <input placeholder="Search" className={styles.search} />  */}
          </div>  
            
          <div className={styles.btnsrigth}> 
          </div>
        </nav> 
        <div className={styles.containsavedata}> 
        <div style={{display:"flex"}}> 
          <p style={{margin:".4rem 1rem"}}>Download</p>
          <div className={styles.separador}/>
        </div>
          {/* { userinno && userinno.urlMarkets.map((data) => (
            <Link href={data.url} className={styles.urlsaveimage} key={data.id}>
              <img src={data.imagen} height={20}/> 
              <p>{data.nombre}</p>
              <div className={styles.separador}/>
            </Link>
          ))}  */}
        </div>  
        </div> 
      </header>
    </>
  );
};
export default Header;







// target="blank" href={"https://terrabellum.s3.sa-east-1.amazonaws.com/TBOF.zip"}