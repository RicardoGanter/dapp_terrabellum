"use client"
import Marketcompra from "../../../components/navbar/market/marketcompra.jsx";
import Marketfiltros from "../../../components/navbar/market/marketfiltros.jsx";
import Barrafiltros from "../../../components/navbar/market/opcion_market";
const Market = ()=>{
    return(
        <div>
            <Barrafiltros/>
            <Marketfiltros/>
            <Marketcompra/>
        </div>
    )
}

export default Market