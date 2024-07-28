"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Forgot() {
    const router = useRouter();
    const [email, setEmail] = React.useState({ email: "" });
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e: any) => {
        setEmail({
            ...email,
            [e.target.id]: e.target.value,
        });   
        console.log(email)
 ;    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/users/checkemail", email);
            console.log("Email sent successfully", res.data);
            setLoading(false);
        } catch (error: any) {
            console.log("Error sending email", error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-3 items-center justify-center h-screen">
            {loading ? "Processing" : "Submit email"}
            <h1>Forgot password?</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    className="p-2 text-black border-gray-400 rounded-lg mb-4 focus-outline-none focus:border-gray-600"
                    type="email"
                    placeholder="email"
                    id="email"
                    onChange={handleChange}
                />
                <button type="submit" className="bg-white text-black px-2 py-3 font-semibold rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}
