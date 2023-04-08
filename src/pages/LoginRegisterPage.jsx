import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import CommongNav from "components/nav/CommonNav";

const LoginRegisterPage = () => {
  const [compSwitch, setCompSwitch] = useState(false);
  return (
    <>
      <CommongNav />
      <section className="w-full h-auto items-center py-8">
        {/* <div className="grid grid-cols-2 gap-4 pl-48 pr-48"> */}
        {/* input fields column */}
        <div className="">
          <h1 className="text-5xl text-center mb-8 text-indigo-500">
            {compSwitch ? "Register" : "Login"}
          </h1>
          <p className="text-lg text-center mb-8">
            {compSwitch
              ? "Already have an account ? "
              : "Dont have any account ? "}
            <span className="text-indigo-800">
              <a
                onClick={() => setCompSwitch(!compSwitch)}
                className="cursor-pointer"
              >
                {compSwitch ? "Login" : "Register"}
              </a>
            </span>
          </p>
          {compSwitch ? <Register /> : <Login />}
        </div>

        {/* image column */}
        {/* <div className="flex justify-center items-center">
          <img
          src={compSwitch ? "logo192.png" : "logo512.png"}
          alt="loginImg"
          />
          </div> 
        </div>*/}
      </section>
    </>
  );
};

export default LoginRegisterPage;
