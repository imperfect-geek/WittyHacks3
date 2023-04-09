import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { user_registration } from "Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "./providers/SnackbarProvider";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import RedMarkerIcon from "assets/redMarker.png";
import L from "leaflet";

function DraggableMarker({ center, setPin }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setPin(() => [marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

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
  const [pin, setPin] = React.useState([]);
  const showPosition = ({ coords }) => {
    setCurrPos(() => [coords.latitude, coords.longitude]);
    setPin(() => [coords.latitude, coords.longitude]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, status } = useSelector((state) => state.user);
  const { open: openSnackbar } = useContext(SnackbarContext);

  const placePin = (e) => {
    console.log(e);
    setPin(() => [e.latitude, e.longitude]);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    const address = { pincode, latitude: pin?.[0], longitude: pin?.[1] };
    try {
      const resp = await dispatch(
        user_registration(name, contact, email, address, password)
      );
      console.log("register response");
      console.log(resp);
      openSnackbar("Regsitered Succesfully", "success");
      navigate("/");
    } catch (error) {
      openSnackbar(error?.response?.data?.message, "error");
    }
  };
  function getPersonMarker() {
    return L.icon({
      iconUrl: RedMarkerIcon,
      iconSize: [40, 40],
    });
  }
  function getPinMarker() {
    return L.icon({
      iconUrl: RedMarkerIcon,
      iconSize: [50, 50],
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

  useEffect(() => {
    console.log(pin);
  }, [pin]);

  function MarkerAction() {
    const map = useMapEvents({
      click: () => {
        map.locate();
      },
      locationfound: (location) => {
        console.log(location);
        map.flyTo(location.latlng, map.getZoom());
        setPin(() => [location.latlng.lat, location.latlng.lng]);
      },
    });
    return null;
  }
  return (
    <div className="inputFields flex justify-center  rounded-xl py-4 ">
      <form>
        <div className="grid md:grid-cols-2 gap-8 p-0">
          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">contact</label>
            <input
              name="contact"
              placeholder="Enter your contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Email</label>
            <input
              name="email"
              placeholder="Enter your email"
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
              placeholder="6 digit pincode"
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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          <div className="flex flex-col mx-3 ml-auto">
            <label className="mb-1 uppercase">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2"
            />
          </div>
          {/* span in both grid col */}
          <div className="md:col-span-2 overflow-hidden">
            {currPos.length ? (
              <MapContainer
                center={currPos}
                onClick={placePin}
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
                <DraggableMarker center={pin} setPin={setPin} />
                <MarkerAction />
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
            className="w-48  h-10  bg-green-600 rounded text-slate-50"
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
