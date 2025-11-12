

import React from "react";
import RegisterForm from "../components/RegisterForm/page";


export default function RegisterPage() {


    return (
        <div
            className="relative min-h-screen pt-5 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/pubImg2.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[5px]"></div>

            <RegisterForm></RegisterForm>
        </div>
    );
}
