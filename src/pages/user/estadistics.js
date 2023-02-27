import Layout from "@/components/layout";
import Image from "next/image";
import styles from "../../styles/user/estadistic.module.scss";
import imagen from "../../../public/img/lal.png";
import { getSession } from "next-auth/react";
const Estadistics = () => {

  // seguridad de usuario
  // const session = await getSession()

  // if (!session) return res.status(403).send('No Authenticathe')

  return (
     
        <>
         
      <Layout>
        <div className={styles.contain}>
          <div className={styles.containestruct}>
            <div className={styles.group1}>
              <Image src={imagen} className={styles.img} />
              {/* <div
                style={{
                  backgroundColor: "#5C225B",
                  padding: "2rem 6rem",
                  margin: " 1rem",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "#5C225B",
                  padding: "2rem 6rem",
                  margin: " 1rem",
                }}
              ></div> */}
              <Image src={imagen} className={styles.img} />
            </div>

            <div className={styles.group2}>
              <div className={styles.subgroup2}>
                <p
                  className={styles.backgrouninfo1}
                  style={{ borderRadius: "1rem 1rem 0 0" }}
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
                  style={{ borderRadius: "1rem 1rem 0 0" }}
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
                  <Image src={imagen} className={styles.imgfrecuente} />
                </div>
                <div>
                  <p>Arma Top</p>
                  <Image src={imagen} className={styles.imgfrecuente} />
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#461739",
                padding: "11rem",
                margin: "2rem .6rem",
                borderRadius: "0 0 4rem 4rem",
              }}
            >
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </Layout>
     
    </>
   
  );

};

export default Estadistics;

export const getServerSideProps = async(context)=>{
    const session = await getSession(context)
    if (!session) return{
      redirect:{
        destination: '/login',
        permanent: false
      }
    }
    return{
      props:{
        session
      }
    }
  }
