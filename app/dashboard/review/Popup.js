"use client"
import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/app/redux/store';


export default function popup(props) {

  const dispatch = useDispatch();
  const id = useSelector((state)=>state.id.id);


  return (
    <div className='modal bg-white px-6 py-4 rounded border border-gray-500'>
      <div className='flex justify-between my-4'>
        <span className='font-medium'>Feedback mail</span>
          <svg onClick={()=>dispatch(toggle(false))} width="25px" height="25px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      </div>
        <form onSubmit={async(e)=>{
        
        e.preventDefault();

        await axios.post("https://paye.onrender.com/mail", {
            token : Cookies.get("paye-token"),
            from : "vermaaarush436@gail.com",
            to : id,
            subject : e.target[0].value,
            text : e.target[1].value,
        }).then((d)=>{
            if (d.statusText == "OK") {
                window.location.reload();
            }
        }).catch((err)=>{
            console.log(err);
        })


      }}>
        
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter subject
          </label>
          <textarea
            className="border border-gray-500 w-[100%] h-20 px-4 py-2 rounded bg-gray-100"
            placeholder="Subject"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter message
          </label>
          <textarea
            className="border border-gray-500 w-[100%] h-20 px-4 py-2 rounded bg-gray-100"
            placeholder="message"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-dgreen px-4 py-1 rounded text-center w-[100%]"
        >
          Send
        </button>
      </form>
    </div>
  )
}
