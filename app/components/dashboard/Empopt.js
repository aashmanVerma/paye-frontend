"use client"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

export default function Empopt() {
  
  const [prompt, setPrompt] = useState(false)

  return (
    <div className="px-10 lg:px-24 flex gap-3 flex-wrap my-5">
        <div className="bg-dgreen cursor-pointer text-white rounded px-2 py-1">Payslip</div>
        <div className="bg-dgreen cursor-pointer text-white rounded px-2 py-1" onClick={()=>setPrompt(!prompt)}>Add employee</div>
        {prompt &&
        <div className='w-[15rem] mx-auto mt-14 border px-4 rounded border-green-600 bg-white modal py-5'>
          <div className="flex justify-between">
            <span className='font-medium'>Add employees</span>
            <svg onClick={()=>setPrompt(false)} width="25px" height="25px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </div>
            <form className='mt-4' onSubmit={async(e)=>{
                e.preventDefault();
                await axios.get("https://paye.onrender.com/emp/add",{
                    params : {
                        token : Cookies.get("paye-token"),
                        name : e.target[0].value,
                        email : e.target[1].value,
                        role : e.target[2].value,
                        salary : e.target[3].value,
                        age : e.target[4].value,
                    }
                    
                }).then((d)=>{
                    if (d.data.employeeadded == true) {
                        window.location.reload();
                    }
                }).catch((err)=>{
                    console.log(err);
                })

            }}>
                <input className='px-2 py-1 w-[100%] rounded my-1 border border-gray-600' type="text" placeholder='Enter name' />
                <input className='px-2 py-1 w-[100%] rounded my-1 border border-gray-600' type="email" placeholder='Enter email' />
                <input className='px-2 py-1 w-[100%] rounded my-1 border border-gray-600' type="text" placeholder='Enter role' />
                <input className='px-2 py-1 w-[100%] rounded my-1 border border-gray-600' type="number" placeholder='Enter salary' />
                <input className='px-2 py-1 w-[100%] rounded my-1 border border-gray-600' type="number" placeholder='Enter age' />
                <button type='submit' className='bg-dgreen block w-[100%] rounded py-1 text-center text-white'>Add</button>
            </form>
        </div>
        }
    </div>
  )
}
