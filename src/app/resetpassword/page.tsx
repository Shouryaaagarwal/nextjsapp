
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ResetPassword() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ password: "" });

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

    const handleClick = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/users/resetpassword", { token, password: user.password });
            console.log("Password changed successfully", res.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Cannot change password:", error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            {loading ? "Processing" : "Set new Password"}
            <input
                className="p-2 text-black border-gray-400 rounded-lg mb-4 focus-outline-none focus:border-gray-600"
                type="password"
                placeholder="New password"
                id="password"
                onChange={handleChange}
            />
            <button onClick={handleClick} className="bg-white text-black px-2 py-3 font-semibold">
                Change
            </button>
        </div>
    );
}

