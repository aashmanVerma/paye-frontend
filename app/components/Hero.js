"use client"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"


export default function Hero() {

    const router = useRouter();

    const [user,setUser] = useState({
        name : null,
        email : null,
        password : null
    })

    const signup = async() =>{
        if (user.name!="" && user.name!=null && user.email!="" && user.email!=null && user.password!="" && user.password!=null) {
            await axios.post("https://paye.onrender.com/signup", {
                name : user.name,
                email : user.email,
                password : user.password
            }).then((d)=>{
                Cookies.set("paye-token",d.data.token);
                router.push("/dashboard")
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

  return (
    <div className="px-10 lg:px-24 my-16 flex mt-8 flex-col lg:flex-row">
        <div className="lg:w-[50%] lg:px-10 flex flex-col flex-wrap items-center lg:items-start">
            <div className="mb-3">
                <span className="font-semibold text-lg lg:text-xl">Effortless Payroll Management and Employee Tracking</span>
            </div>
            <Image src="/hero.svg" width={300} height={300} alt="hero-pic" />
            <div className="mt-5">
                <span className="font-medium">Effortlessly calculate salaries, generate payrolls, and track employee records in one intuitive platform. Simplify your payroll processes and focus on business growth. Try PayGenius today.</span>
            </div>
        </div>
        <div className="my-5 flex flex-col gap-y-3 lg:w-[50%] lg:px-10">
            <div className="hidden lg:block lg:text-lg lg:font-semibold lg:text-center">
                <span>Join with us today</span>
                <hr className="mt-4" />
                <div className="flex content-center flex-wrap justify-between">
                    <div className="flex flex-col gap-y-1 font-normal content-center flex-wrap justify-center text-left">
                        <span><strong className="mr-12">Service</strong>   4/5</span>
                        <span><strong className="mr-4">Availability</strong>     5/5</span>
                        <span><strong className="mr-6">Ranking</strong>   4.5/5</span>
                    </div>
                    <div>
                        <Image src="/coin.svg" height={200} width={200} alt="coins"></Image>
                    </div>
                </div>
                <div className="lg:flex-col lg:flex lg:gap-y-2 lg:mt-3">
                    <input type="text" className="w-[100%] font-normal border px-3 py-1 rounded" placeholder="enter name" onChange={(e)=>setUser({...user, name:e.target.value})} />
                    <input type="email" className="w-[100%] font-normal border px-3 py-1 rounded" placeholder="enter email" onChange={(e)=>setUser({...user, email:e.target.value})} />
                    <input type="password" className="w-[100%] font-normal border px-3 py-1 rounded" placeholder="enter password" onChange={(e)=>setUser({...user, password:e.target.value})} />
                </div>
            </div>
            <div className="lg:hidden my-4 text-center">
                <span className="font-medium text-lg block my-2">Join with us</span>
                <input type="text" className="w-[100%] font-normal block my-2 border px-3 py-1 rounded" placeholder="enter name" onChange={(e)=>setUser({...user, name:e.target.value})} />
                <input type="email" className="w-[100%] font-normal block my-2 border px-3 py-1 rounded" placeholder="enter email" onChange={(e)=>setUser({...user, email:e.target.value})} />
                <input type="password" className="w-[100%] font-normal block my-2 border px-3 py-1 rounded" placeholder="enter password" onChange={(e)=>setUser({...user, password:e.target.value})} />
            </div>
            <div className="py-2 cursor-pointer text-center bg-dgreen rounded lg:mt-4" onClick={signup}>
                <span className="text-white">Sign up</span>
            </div>
        </div>
    </div>
  )
}
