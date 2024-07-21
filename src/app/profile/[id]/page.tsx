export default function UserProfile({params}:any){ 
     
     return ( 

<div className="w-full h-screen flex flex-col items-center justify-center "> 
      
            <h1>Profile Page</h1>  
                    <hr />
            <h2>here are ther param <span className=" text-black font-semibold bg-green-300 px-2 py-3">{params.id}</span></h2>
        </div>
     )
}