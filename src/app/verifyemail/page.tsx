"use client"  
 
import axios from "axios" 
 
 import Link from "next/link" 
 import React , {useState  , useEffect} from  "react" 
  
  
  
 export default function Verifyemail(){
    const [token , settoken] = useState("") ; 
    const [message , setMessage] = useState(false) ;  
    const [error , seterror] =  useState(false) ; 
    const [verified , setverified] =  useState(false) ;  
     
        const verifyuseremail  = async()=>{
            try {
                       await  axios.post("/api/users/verifyemail",{token}) ;
                                setverified(true) ; 

            } catch ( error:any) {
                    seterror(true) ; 
                    console.log(error.response.data) ; 
            }
        } 
         
         useEffect(()=>{
                  const urltoken =  window.location.search.split("=")[1] ; 
                  settoken(urltoken||"")  ; 
         }, []) 
          
          useEffect(()=>{
                    if(token.length>0){
                        verifyuseremail() ; 
                    }
          },[token])
      return ( 
                <div className="flex flex-col w-full h-screen items-center justify-center"> 
                        <h1 className="text-4xl ">Verify Your Email</h1> 
                        <h2 className="p-2 bg-orange-500 text-black ">{token?`${token}`:"no token "}</h2>  

                        {verified &&(  
                            <div> 
                                <h2 className="text-2xl"> Email verified</h2> 
                                <Link href="/login"> 
                                                login                                  
                                  </Link>
                            </div>
                        )}
                     
                     
                     {error &&(  
                            <div> 
                                <h2 className="text-2xl text-red-400">  Error</h2> 
                        
                            </div>
                        )}
                </div>
      )

 }