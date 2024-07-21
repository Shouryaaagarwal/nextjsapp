import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not found" },
        { status: 400 }
      );
    }

    const validpassword = await bcryptjs.compare(password, user.password); 
    if(!validpassword){return  NextResponse.json({error:"The password is not valid"}, {status:404})}  
     const tokenData = { 
        id:user._id ,  
        username:user.username,  
        email:user.email
     } 
      
      const token =  await jwt.sign(tokenData , process.env.JWT! ,{expiresIn:"1d"}) 
      const response = NextResponse.json({
        message:"Login Successful",
        success:true
      }) 
      response.cookies.set("token", token , {httpOnly:true}) 

      return response ; 

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
