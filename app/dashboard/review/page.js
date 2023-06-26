"use client"
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { save, toggle } from "@/app/redux/store";

export default function page() {

  const dispatch = useDispatch();
  const popView = useSelector((state)=>state.popupMode.popup)

  const [data,setData] = useState(null);
  const [pop, setPop] = useState(false);

  useEffect(()=>{
    axios.get("https://paye.onrender.com/fetch", {
      params : {
        token : Cookies.get("paye-token")
      }
    }).then((d)=>{
      setData(d.data.data)
      console.log(d.data.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div className="px-10 lg:px-24 my-5">
      <span className="font-medium md:font-semibold md:text-lg lg:text-xl">Provide feedback </span>
      <div className="flex flex-wrap gap-4 my-5">
      {data && data.map((e)=>{
        return (
          <div key={e._id} className="border border-gray-500 w-[15rem] md:w-[17rem] lg:w-[20rem] px-6 py-5 rounded">
            <div className="flex justify-between">
              <span className="font-medium">Name</span>
              <span>{e.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              <span>{e.email}</span>
            </div>
            <div className="bg-dgreen text-center py-1 rounded w-[100%] mt-2 cursor-pointer" onClick={()=>{
              setPop(!pop);
              dispatch(toggle(true))
              dispatch(save(e._id))
            }}>
              <span className="text-white">Review</span>
            </div>
          </div>
        )
      })}
      </div>
      {popView && <Popup />}
    </div>
  )
}
