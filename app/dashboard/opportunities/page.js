"use client"
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function page() {

    const [data,setData] = useState(false);

    const fetch =()=>{
        axios.get("https://paye.onrender.com/form/fetch", {
            params : {
                token : Cookies.get("paye-token")
            }
        }).then((d)=>{
            setData(d.data);
        }).catch((err)=>{
            console.log(err);
        })
    };

    const [form,setForm] = useState(true);


  return (
    <div className="px-10 lg:px-24 my-5">
        <div className="flex gap-x-3">
            <span className="text-white cursor-pointer px-2 rounded py-1 bg-dgreen" onClick={()=>setForm(true)}>Create form</span>
            <span className="text-white cursor-pointer px-2 rounded py-1 bg-dgreen" onClick={()=>{
                setForm(false);
                fetch();
            }}>Actives</span>
        </div>
        { form && <span className="block my-8 font-medium text-lg md:text-xl md:font-semibold lg:text-2xl">Post a job form</span> }
      {form && <form onSubmit={async(e)=>{
        
        e.preventDefault();

        await axios.post("https://paye.onrender.com/form", {
            token : Cookies.get("paye-token"),
            title : e.target[0].value,
            requirements : e.target[1].value,
            description : e.target[2].value
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
            Enter job title
          </label>
          <input
            type="text"
            className="border border-gray-500 w-[100%] px-4 py-2 rounded bg-gray-100"
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Minimum requirements
          </label>
          <textarea
            className="border border-gray-500 w-[100%] h-20 px-4 py-2 rounded bg-gray-100"
            placeholder="Requirements"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job description
          </label>
          <textarea
            className="border border-gray-500 w-[100%] h-20 px-4 py-2 rounded bg-gray-100"
            placeholder="Description"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-dgreen px-4 py-1 rounded"
        >
          Submit
        </button>
      </form> }
      {
        !form && <div className="flex my-8 gap-3 flex-wrap">
            {data && data.map((e)=>{
                return (
                    <div key={e._id} className="w-[15rem] border border-gray-500 rounded px-4 py-2 block">
                        <span className="mt-2 font-medium block">Title -</span>
                        <span className="">{e.title}</span>
                        <span className="mt-4 block font-medium">Description -</span>
                        <span className="my-1 block">{e.description+"..."}</span>
                        <div className="px-2 py-1 rounded my-2 bg-red-700 text-center cursor-pointer" onClick={async()=>{
                            await axios.post("https://paye.onrender.com/form/del",{
                                token : Cookies.get("paye-token"),
                                formid : e._id
                            })
                        }}>
                            <span className="text-white">Delete</span>
                        </div>
                    </div>
                )
            })}
        </div>
      }
    </div>
  );
}
