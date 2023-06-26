"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Status() {

    const [emp, setEmp] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(()=>{
        axios.get("https://paye.onrender.com/emp/fetch", {
            params : {
                token : Cookies.get("paye-token")
            }
        }).then((d)=>{
            setEmp(d.data.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])




  return (
    <div className='px-10 lg:px-24 my-5'>
        {emp && <div className='mt-10'>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                    <th scope="col" className="px-6 py-4">Sr No.</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope='col' className='px-6 py-4'>Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emp.map((e, index)=>{
                                        return (
                                            <tr key={e._id} className="border-b dark:border-neutral-500" onClick={()=>setEdit(!edit)}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{e.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{e.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{e.role}</td>
                                                <td className={`whitespace-nowrap px-6 py-2 mt-2 rounded text-white font-medium ml-5 cursor-pointer ${e.paid==true?"bg-gray-500":"bg-dgreen"} inline-block`} onClick={async()=>{
                                                    if (e.paid==false) {
                                                        await axios.post("https://paye.onrender.com/pay",{
                                                        token : Cookies.get("paye-token"),
                                                        empid : e._id
                                                    }).then((d)=>{
                                                        window.location.reload();
                                                    }).catch((err)=>{
                                                        console.log(err);
                                                    })
                                                    }
                                                }}>Pay</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
  )
}
