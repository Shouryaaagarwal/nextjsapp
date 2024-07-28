import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) { 
    
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    } 
    
     const salt = await bcryptjs.genSalt(10) ;  
     const hashedpassword  =  await bcryptjs.hash(password , salt) ; 
       
     const newuser   =  new User({ 
        username,
        email ,  
        password:hashedpassword
     })  

      const savedUser   = await newuser.save() ; 
      console.log(savedUser) ;    
       
       await sendEmail({email , emailType:"VERIFY", userid :savedUser._id}) ; 
       
       return NextResponse.json({
        message:"User created Successfully" , 
        success:true ,  
        savedUser
       })

      
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
