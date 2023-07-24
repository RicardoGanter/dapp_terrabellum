import { Fetch } from "../../../../../utils/fetch/fetch"
import Cookies from 'js-cookie'
// import { useState, useContext } from "react";
// import { User_data } from "app/layout";  
const URI  = "https://qnxztdkz3l.execute-api.sa-east-1.amazonaws.com/1/usuarios/"

const VerifyTwoFactor = async( secretUrl , twoFactor )=>{
    // const { userdataglobal, updateuserdataglobal } = useContext(User_data);  
        const token = Cookies.get('token');  
        const userData = Cookies.get('userdata')  
        const response = await Fetch(`${URI}verifytwo`, 'POST' ,{
            secret: secretUrl.toString(),
            token : twoFactor.toString(),
            id: token.toString()
        })

        const data = await response.json()

        if(response.status == 200){ 
            const newdata = data
            console.log(data)
            const userdataglobal = JSON.parse(userData)  
            const getUser = {...userdataglobal}
            getUser.two_factor_google = newdata.secret 
            Cookies.set('userdata', JSON.stringify(getUser))
            return { getUser }
        } 
}   

export default VerifyTwoFactor;