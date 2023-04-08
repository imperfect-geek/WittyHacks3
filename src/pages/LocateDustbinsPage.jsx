import api from "api/apiService";
import CommongNav from "components/nav/CommonNav";
import { respPX } from "constants/styles";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import TrashIcon from "assets/trash.png";
import RedMarkerIcon from "assets/redMarker.png";
import L from "leaflet";

function getTrashMarker() {
  return L.icon({
    iconUrl: TrashIcon,
    iconSize: [50, 50],
  });
}
function getPersonMarker() {
  return L.icon({
    iconUrl: RedMarkerIcon,
    iconSize: [40, 40],
  });
}

const LocateDustbinsPage = () => {
  const [currPos, setCurrPos] = React.useState([]);
  const [dustbins, setDustbins] = React.useState([]);
  const showPosition = ({ coords }) => {
    setCurrPos(() => [coords.latitude, coords.longitude]);
    api
      .get(
        `/binlocations?latitude=${coords.latitude}&longitude=${coords.longitude}`
      )
      .then(({ data }) => {
        if (data.status === "success") {
          const dustbins = [];
          data.binLocations.forEach((bl) => {
            const [lon, lat] = bl.location.coordinates;
            dustbins.push([lat, lon]);
          });
          setDustbins(dustbins);
        }
      });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, [currPos[0]?.toFixed(4), currPos[1]?.toFixed(4)]);

  console.log(dustbins);

  return (
    <>
      <CommongNav />
      <main className={`${respPX} py-6`}>
        <h1 className="text-3xl flex items-center">
          Locate Dustbins <img src={TrashIcon} alt="trash" className="w-14" />
        </h1>
        <p className="text-lg my-2">
          Find Dustbins near your current location with map syncing, click on
          them for directions.
        </p>
        <section>
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
              {dustbins.map((dustbin, idx) => (
                <Marker position={dustbin} icon={getTrashMarker()}>
                  <Popup>
                    <a
                      href={`https://www.google.com/maps?q=${dustbin[0]},${dustbin[1]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Directions
                    </a>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <h2 className="text-red-200">Please Enable Location to continue</h2>
          )}
        </section>
      </main>
    </>
  );
};

export default LocateDustbinsPage;

// serve -s build
