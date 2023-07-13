 import Cookies from "js-cookie"
 
export const noAuthToken = () => {
    const cookies =  Cookies.get('token')
    if (cookies) {  return true  }
    return false
}