"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const onLogin = async () => { 
    try{     
          
         setloading(true) ; 
          const res  = await axios.post("/api/users/login", user) ;  
          console.log("Login sucess", res.data) ; 
           
          router.push("/profile") ; 



    }catch(error:any){
                console.log("LOGIN failed", error.message) ;
                
    }finally{
            setloading(false)
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
    {loading?"Processing":"Login"}  
      <h1>Login</h1>
      <hr />

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
        onClick={onLogin}
        className="p-2 border-gray-300 bg-gray-700 rounded-lg mb-4 focus-outline-none "
      >
        {" "}
        Login here{" "}
      </button>   
      <Link href="/signup">Visit to SignUp page </Link>  
       <Link href="/forgot" className="mt-10 bg-green-400 text-black px-2 py-3"> fORGOT PASSWORD</Link>
    </div>
  );
}
