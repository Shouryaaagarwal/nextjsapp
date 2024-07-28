

       
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false,
            });
        }

        await sendEmail({ email, emailType: "RESET", userid: user._id });
        return NextResponse.json({
            message: "Reset link sent to your email",
            success: true,
        });
    } catch (error: any) {
        console.error("Something went wrong:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        });
    }
}

