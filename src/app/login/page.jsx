"use client"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Unaut = ()=>{
  const  router = useRouter()
return (
    <div>
    { Cookies.get('token') ? 
      <h1>
      tiapaola
      </h1>
  : router.push('/') }
  </div>
  )
}

export default Unaut;