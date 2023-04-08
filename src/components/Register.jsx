import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { user_registration } from "Slices/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [locality, setLocality] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, status } = useSelector((state) => state.user);

  const registerHandler = async (e) => {
    e.preventDefault();
    const address = { addressLine, pincode, locality, state, city };
    await dispatch(user_registration(name, contact, email, address, password));
    alert("Regsitered Succesfully");
    navigate("/");
  };

  useEffect(() => {
    if (status.type === "error") {
      alert(status.message);
    }
  }, []);

  return (
    <div className="inputFields flex justify-center  rounded-xl py-4 shadow-lg shadow-gray-500/40">
      <form>
        <div className="grid md:grid-cols-2 gap-8 p-0">
          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">contact</labe>
            <input
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">Email</labe>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          {/* <div className="grid grid-cols-2 gap-4 p-0"> */}
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">Locality</labe>
            <input
              name="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">State</labe>
            <input
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          {/* </div> */}
          {/* <div className="grid grid-cols-2 gap-4 p-0"> */}{" "}
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">City</labe>
            <input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">Pincode</labe>
            <input
              name="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          {/* </div> */}
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">Address</labe>
            <input
              name="addressLine"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">Password</labe>
            <input
              type="password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <labe className="mb-1 uppercase">Confirm Password</labe>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
        </div>
        <div className="mt-9 mb-9 w-full flex justify-center items-center">
          <button
            className="w-48  h-10  bg-indigo-600 rounded text-slate-50"
            onClick={registerHandler}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
