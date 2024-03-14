// import { useState } from "react";
// //imports
// import Login from "./Login";
// import Register from "./Register";
import bgImage from "../../assets/image-login.png";
import { Login } from "./login";
// import { useAuth } from "../../hooks/AuthContext";

export function Signin() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2">
          <img
            src={bgImage}
            alt="image-system"
            className="w-full h-full object-cover"
          />
          but
        </div>

        <div className="w-full md:w-1/2 bg-[#f5f5f5] flex flex-col p-8 md:p-20 justify-between">
          <h1 className="text-xl text-[#060606] font-semibold">
            Auto Mecânica Silva
          </h1>

          <div className="w-full max-w-lg">
            <Login />
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-[#060606]">
              Desenvolvido por{" "}
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                <a
                  href="https://ederjr.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dev
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
