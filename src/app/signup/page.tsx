"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios from "axios";
import toast from "react-hot-toast";

export default function signUp() { 
    const router  =  useRouter() ; 
  const [user, setuser] = React.useState({
    email: "",
    password: "",
    username: "",
  }); 
  const [buttonDisabled , setButtonDisabled] =  React.useState(false) ;  
  const [loading  , setloading] =  React.useState(false ) 


  const onSignUp = async () => {  
    try{ 
        setloading(true) ; 
     const res =  await  axios.post("/api/users/signup", user) ;  
     console.log("SignUp successfull", res.data) ;  
      router.push("/login") ; 


     

    }catch(error:any){
            toast.error(error.message) ; 
    }finally{
        setloading(false) ;
    }
  };
   
   useEffect(()=>{
                if(user.email.length>0 && user.username.length>0 && user.password.length>0 ){
                    setButtonDisabled(false)
                } else{
                    setButtonDisabled(true) ;
                }
   }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
    <h1>{loading ?"Proccessing":"Signup"}</h1>
      <h1>SignUp</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 text-black border-gray-400 rounded-lg mb-4 focus-outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 text-black border-gray-400 rounded-lg mb-4 focus-outline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 text-black border-gray-400 rounded-lg mb-4 focus-outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        type="button"
        onClick={onSignUp}
        className="p-2 border-gray-300 bg-gray-700 rounded-lg mb-4 focus-outline-none "
      >
       {buttonDisabled?"No Signup":"SignUp"}
      </button> 
       <Link href="/login">Visit to login page </Link>
    </div>
  );
}
