import CommongNav from "components/nav/CommonNav";
import { SnackbarContext } from "components/providers/SnackbarProvider";
import { respPX } from "constants/styles";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SweepingFloorGIF from "assets/sweeping-floor.gif";
import api from "api/apiService";

const LabelInput = ({ label, name, id, placeholder, type = "text" }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-lg">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          rows="5"
          className="border-2 border-gray-300 p-2 rounded-lg"
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className="border-2 border-gray-300 p-2 rounded-lg"
        />
      )}
    </div>
  );
};

const WasteCollectorPage = () => {
  const navigate = useNavigate();
  const { open: openSnackbar } = useContext(SnackbarContext);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const data = {};
    [...ev.target.elements].forEach((e) => {
      data[e.name] = e.value;
    });
    try {
      const resp = await api.post("/notify", {
        ...data,
      });
      openSnackbar(
        "Succesfully submitted your request, Nagar Nigam team will be in contact with you soon.",
        "success"
      );
      navigate("/");
    } catch (error) {
      openSnackbar(error.message, "error");
    }
  };
  return (
    <>
      <CommongNav />
      <main className={`${respPX} py-6`}>
        <h1 className="text-2xl md:text-5xl font-bold flex items-center justify-center">
          Waste Collection Form
          <span className="">
            <img
              src={SweepingFloorGIF}
              alt="cleaning"
              className="md:hidden w-32"
            />
          </span>
        </h1>
        <section className="flex justify-center items-center">
          <img
            src={SweepingFloorGIF}
            alt="cleaning"
            className="flex-1 hidden md:block"
          />
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="border-1 border-gray-400 py-4 grid  sm:grid-cols-2 gap-4">
              <LabelInput
                label="Name"
                name="name"
                id="name"
                placeholder="Name"
              />
              <LabelInput
                label="Email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <LabelInput
                label="Phone"
                name="contact"
                id="phone"
                placeholder="Phone"
              />
              <LabelInput
                label="Address"
                name="address"
                id="address"
                placeholder="Address"
              />
            </div>
            <LabelInput
              label="Waste Description"
              name="description"
              id="wasteDescription"
              placeholder="Waste Description"
              type="textarea"
            />
            <div className="flex justify-center">
              <button className="bg-green-600 text-white px-8 py-2 rounded-lg">
                Generate Pickup Request
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default WasteCollectorPage;
