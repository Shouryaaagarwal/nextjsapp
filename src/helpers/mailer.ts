// import nodemailer from "nodemailer";
// import User from "@/models/usermodel";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({ email, emailType, userid }: any) => {
//   try {
//     const hashedtoken = await bcryptjs.hash(userid.toString(), 10);

//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userid, {
//         verifyToken: hashedtoken,
//         verifyTokenExpiry: Date.now() + 3600000,
//       });
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(userid, {
//         forgotPasswordToken: hashedtoken,
//         forgotPasswordTokenExpiry: Date.now() + 3600000,
//       });
//     }

//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: process.env.user,
//         pass: process.env.pass,
//       },
//     });

//     const Mailoptions = {
//       from: "shouryaaagarwal@gmail.com",
//       to: email,
//       subject:
//         emailType === "VERIFY" ? "Verify your password" : "Reset your password",
//       html: `<p>Click <a href=${
//         process.env.domain
//       }/verifyemail?=${hashedtoken}">here</a> 
//         to ${
//           emailType === "VERIFY" ? "verify your email" : "Reset your password"
//         } 
         
//          and paste the links in browser  <br>${
//             process.env.domain
//           }/verifyemail?=${hashedtoken}
//       </p>`,
//     }; 
     
//      const mailresposne  =  await transport.sendMail(Mailoptions)  
//       return mailresposne ; 
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }; 
 
 
import nodemailer from "nodemailer";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userid }: any) => {
  try {
    const hashedtoken = await bcryptjs.hash(userid.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userid, {
        verifyToken: hashedtoken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userid, {
        forgotPasswordToken: hashedtoken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const Mailoptions = {
      from: "shouryaaagarwal@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.domain}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedtoken}">here</a> 
             to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
             and paste the links in the browser <br>${process.env.domain}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedtoken}</p>`,
    };

    const mailResponse = await transport.sendMail(Mailoptions);
    console.log("Mail sent successfully:", mailResponse);
    return mailResponse;
  } catch (error: any) {
    console.error("Error in sendEmail:", error);
    throw new Error(error.message);
  }
};

