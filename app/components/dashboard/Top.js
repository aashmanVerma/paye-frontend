"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";
import axios from "axios";

export default function Top() {

    const [name, setName] = useState(null);

    useEffect(()=>{
        axios.get("https://paye.onrender.com/profile", {
            params : {
                token : Cookies.get("paye-token")
            }
        }).then((d)=>{
            setName(d.data.name)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const router = useRouter();
    const [menu, setMenu] = useState(false)

    const logout = () =>{
        router.push("/");
    }

  return (
    <div className="py-5 px-10 lg:px-24 flex lg:justify-between content-center">
        <div className="logo text-xl flex-grow lg:flex-grow-0 font-semibold">
            <span>Welcome, {name}</span>
        </div>
        <div className="lg:flex gap-x-5 justify-center content-center flex-wrap hidden lg:visible">
            <span className="cursor-pointer hover-underline-animation" onClick={()=>router.push("/dashboard")}>Employees</span>
            <span className="cursor-pointer hover-underline-animation" onClick={()=>router.push("/dashboard/opportunities")}>Opportunities</span>
            <span className="cursor-pointer hover-underline-animation" onClick={()=>router.push("/dashboard/review")}>Review</span>
        </div>
        <div className="bg-dgreen px-2 py-1 rounded cursor-pointer" onClick={logout}>
            <span className="text-white text-sm lg:text-base">Logout</span>
        </div>
        <div className="flex gap-x-5 justify-center content-center flex-wrap lg:hidden mx-3">
            <div onClick={()=>setMenu(!menu)} className="cursor-pointer">
                <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 5h18M3 12h18M3 19h18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            {menu && <div className="flex absolute py-5 top-20 left-[2.5rem] w-[100%] lg:left-[6rem] bg-white z-20 lg:gap-x-5 lg:justify-center lg:content-center flex-wrap flex-col gap-y-3">
            <span className="inline-block cursor-pointer hover-underline-animation" onClick={()=>router.push("/dashboard")}>Employees</span>
            <span className="inline-block cursor-pointer hover-underline-animation" onClick={()=>router.push("/dashboard/opportunities")}>Opportunities</span>
            <span className="inline-block cursor-pointer hover-underline-animation" onClick={()=>router.push("/dashboard/review")}>Review</span>
            </div>}
        </div>
    </div>
  )
}
