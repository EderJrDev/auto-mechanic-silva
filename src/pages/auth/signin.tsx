// import { useState } from "react";
// //imports
// import Login from "./Login";
// import Register from "./Register";
// import bgLogin from "../../assets/1.png";
// import { useAuth } from "../../hooks/AuthContext";

export function Signin() {
  // const { isRegistered, setIsRegistered } = useAuth();
  // const [showRegister, setShowRegister] = useState<boolean>(false);
  // console.log("isRegistered:", isRegistered);
  // const register = () => {
  //   setShowRegister(true);
  //   setIsRegistered(false);
  // };

  return (
    <>
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          {/* <img
            src={bgLogin}
            alt="image-system"
            className="w-full h-full object-cover"
          /> */}
        </div>

        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
          <h1 className="text-xl text-[#060606] font-semibold">EcoManager</h1>

          <div className="w-full flex flex-col max-w-[550px]:">
            {/* {isRegistered ? <Login /> : <Register />} */}
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-[#060606]">
              Desenvolvido por{" "}
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                EcoManager
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
