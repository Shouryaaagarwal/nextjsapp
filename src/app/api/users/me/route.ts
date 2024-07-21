import { getdatafromtoken } from "@/helpers/getdatafromtoken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/usermodel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userid = await getdatafromtoken(request);
    const user = await User.findOne({ _id: userid }).select("-password");
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
