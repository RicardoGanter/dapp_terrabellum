import Layout from "@/components/layout";
import Marketcompra from "@/components/marketcompra";
import Marketfiltros from "@/components/marketfiltros";


const Market = ()=>{


    return(
        <>
        <Layout>
            <Marketfiltros/>
            <Marketcompra/>
        </Layout>
        </>
    )
}

export default Market