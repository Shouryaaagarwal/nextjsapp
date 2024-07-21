"use client"
import axios from "axios" 
import Link from "next/link"
import { useRouter } from "next/navigation" 
import React from "react"

 
 
 export default function Profile(){  
    const router  = useRouter() ; 
    const [data  , setdata ]  = React.useState("nothing")
     const logout  = async()=>{ 
        try{

            const res =  await  axios("/api/users/logout") ; 
            console.log("Successfully loged out") ;  
            router.push("/login")


        } catch(error:any){
            console.log(error.message) ; 

        }
     } 
      
      const getUserdetail =async()=>{
       const res= await  axios.get("/api/users/me") 
       console.log(res.data) ;  
       setdata(res.data.data._id)
      }
    return (
        <div className="w-full h-screen flex flex-col  items-center justify-center ">
            <h1>Profile Page</h1> 
             <hr />  
             <p>{data==="nothing"?"Nothing":<Link href = {`/profile/${data}`}>{data}</Link>}</p>
 
            <button onClick={logout} className="bg-blue-400 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout </button>
            <button onClick={getUserdetail} className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Get details </button>

        </div>
    )
 }