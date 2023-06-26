"use client"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function Navbar() {

    const router = useRouter();
    const [menu, setMenu] = useState(false)

    const login = async() =>{
        await axios.get("https://paye.onrender.com/login", {
            params : {
                token : Cookies.get("paye-token")
            }
        }).then((d)=>{
            if (d.data.login == true) {
                router.push("/dashboard");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

  return (
    <div className="py-5 px-10 lg:px-24 flex lg:justify-between content-center">
        <div className="logo text-xl flex-grow lg:flex-grow-0 font-semibold">
            <span>Pay</span>
            <span className="txt-lgreen">E</span>
        </div>
        <div className="lg:flex gap-x-5 justify-center content-center flex-wrap hidden lg:visible">
            <span className="cursor-pointer hover-underline-animation">Home</span>
            <span className="cursor-pointer hover-underline-animation">About</span>
            <span className="cursor-pointer hover-underline-animation">Features</span>
        </div>
        <div className="bg-dgreen px-2 py-1 rounded cursor-pointer" onClick={login}>
            <span className="text-white text-sm lg:text-base">Login</span>
        </div>
        <div className="flex gap-x-5 justify-center content-center flex-wrap lg:hidden mx-3">
            <div onClick={()=>setMenu(!menu)} className="cursor-pointer">
                <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 5h18M3 12h18M3 19h18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            {menu && <div className="flex absolute py-5 top-20 left-[2.5rem] w-[100%] lg:left-[6rem] bg-white z-20 lg:gap-x-5 lg:justify-center lg:content-center flex-wrap flex-col gap-y-3">
            <span className="inline-block cursor-pointer hover-underline-animation">Home</span>
            <span className="inline-block cursor-pointer hover-underline-animation">About</span>
            <span className="inline-block cursor-pointer hover-underline-animation">Features</span>
            </div>}
        </div>
    </div>
  )
}
