import mongoose  from 'mongoose'  

 
 
export async function connect () {
     
     try{
            mongoose.connect(process.env.MONGO!) ; 
            const connection  =  mongoose.connection ; 
            connection.on("connected",()=>{
                console.log("Mongoose connection established successfully") ; 
                 
            }) 
             connection.on("error", (err)=>{ 
                 console.log("Mongo connection error"+err) ; 
                 process.exit() ; 
             })
     } catch(error){
        console.log("Something went wrong") ; 
        console.log(error) ; 
     }
}