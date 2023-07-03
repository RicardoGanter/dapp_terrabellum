"use client"
import Image from "next/image";
import styles from "../../../styles/user/estadistic.module.scss";
// import imagen from "../../../public/img/lal.webp";
// import fondoperfil from '../../../public/img/Rectangle.webp'
import stars from '../../../public/img/Star.png'
import { useState,useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter} from "next/navigation";
// import { getSession } from "next-auth/react";
const Estadistics = () => {
  const [user, setUser] = useState(null)
  const router = useRouter();
  useEffect(()=>{
    (async()=>{
      const session = await getSession()
      if(!session){
        router.push('./signin')
      }
      setUser(session)
    })()
  },[])
  // seguridad de usuario
  // const session = await getSession()

  // if (!session) return res.status(403).send('No Authenticathe')
  return (
        <div className={styles.contain}>
          {user?
          <div className={styles.containestruct}>
            <div className={styles.group1}>
              {/* <Image 
              src={imagen} 
              className={styles.img} 
              style={{left: 5}}
              alt="Image icon perfil"
              /> */}
              {/* <Image 
              src={fondoperfil}
              className={styles.fondo}
              alt="Fondo perfil"/> */}
                <div className={styles.fondo}>  
                  <Image src={stars} alt="start" />
                </div>
              {/* <Image src={imagen}  */}
              {/* className={styles.img} 
              style={{right: 5}}
              alt="icon lvl"/> */}
            </div>

            <div className={styles.group2}>
              <div className={styles.subgroup2}>
                <p
                  className={styles.backgrouninfo1}
                  style={{ borderRadius: ".5rem .5rem 0 0" }}
                >
                  Tiempo jugado
                </p>
                <p className={styles.backgrouninfo2}>9999999H99M</p>
                <p className={styles.backgrouninfo1}>Puntaje Total</p>
                <p className={styles.backgrouninfo2}>999.999.999.999</p>
              </div>
              <div className={styles.subgroup2}>
                <p
                  className={styles.backgrouninfo1}
                  style={{ borderRadius: ".5rem .5rem 0 0" }}
                >
                  Asesinatos
                </p>
                <p className={styles.backgrouninfo2}>999.999.999.999</p>
                <p className={styles.backgrouninfo1}>Muertes</p>
                <p className={styles.backgrouninfo2}>999.999.999.999</p>
              </div>
              <div className={styles.subgroup2_1}>
                <div>
                  <p>Personaje Top</p>
                  {/* <Image src={imagen} 
                  className={styles.imgfrecuente}
                  alt="img personaje frecuente"/> */}
                </div>
                <div>
                  <p>Arma Top</p>
                  {/* <Image src={imagen} className={styles.imgfrecuente}
                  alt="img arma frecuente"/> */}
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#461739",
                padding: "1rem",
                height: "auto",
                margin: "2rem 0",
                borderRadius: "0 0 4rem 4rem",
              }}
            >
              {/* <div></div>
              <div></div> */}
            </div>
          </div>
          : null }
        </div>
  );
};
export default Estadistics;
// export const getServerSideProps = async(context)=>{
//     const session = await getSession(context)
//     if (!session) return{
//       redirect:{
//         destination: '/login',
//         permanent: false
//       }
//     }
//     return{
//       props:{
//         session
//       }
//     }
//   }