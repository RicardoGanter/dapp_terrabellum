import Layout from "@/components/layout";
import Marketcompra from "@/components/marketcompra";
import Marketfiltros from "@/components/marketfiltros";
import Barrafiltros from "@/components/opcion_market";

const Market = ()=>{


    return(
        <>
        <Layout>
            <Barrafiltros/>
            <Marketfiltros/>
            <Marketcompra/>
        </Layout>
        </>
    )
}

export default Market