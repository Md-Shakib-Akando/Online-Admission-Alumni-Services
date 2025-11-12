

import React from "react";

import LoginForm from "../components/loginForm/page";

export default function LoginPage() {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/pubImg2.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[5px]"></div>


            <LoginForm></LoginForm>
        </div>
    );
}
