import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { user_registration } from "Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "./providers/SnackbarProvider";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import RedMarkerIcon from "assets/redMarker.png";
import L from "leaflet";

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
  const [currPos, setCurrPos] = React.useState([]);
  const showPosition = ({ coords }) => {
    setCurrPos(() => [coords.latitude, coords.longitude]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, status } = useSelector((state) => state.user);
  const { open: openSnackbar } = useContext(SnackbarContext);

  const registerHandler = async (e) => {
    e.preventDefault();
    const address = { addressLine, pincode, locality, state, city };
    await dispatch(user_registration(name, contact, email, address, password));
    openSnackbar("Regsitered Succesfully", "success");
    navigate("/");
  };
  function getPersonMarker() {
    return L.icon({
      iconUrl: RedMarkerIcon,
      iconSize: [40, 40],
    });
  }
  useEffect(() => {
    if (status.type === "error") {
      openSnackbar(status.message, "error");
    }
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, [currPos[0]?.toFixed(4), currPos[1]?.toFixed(4)]);

  return (
    <div className="inputFields flex justify-center  rounded-xl py-4 ">
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
            <label className="mb-1 uppercase">contact</label>
            <input
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Email</label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>

          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Pincode</label>
            <input
              name="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>

          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Password</label>
            <input
              type="password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          {/* span in both grid col */}
          <div className="md:col-span-2">
            {currPos.length ? (
              <MapContainer
                center={currPos}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currPos} icon={getPersonMarker()}>
                  <Popup>Your Currrent Position</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <h2 className="text-red-200">
                Please Enable Location to continue
              </h2>
            )}
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
