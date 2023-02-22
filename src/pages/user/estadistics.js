import Layout from "@/components/layout";
import Image from "next/image";
import styles from "../../styles/user/estadistic.module.css";
import imagen from "../../../public/img/lal.png";
const Estadistics = () => {
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
                  <Image src={imagen} className={styles.img} />
                </div>
                <div>
                  <p>Arma Top</p>
                  <Image src={imagen} className={styles.img} />
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#421841",
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
