import CommongNav from "components/nav/CommonNav";
import { SnackbarContext } from "components/providers/SnackbarProvider";
import { respPX } from "constants/styles";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
  const handleSubmit = (ev) => {
    // ev.preventDefault();
    // [...ev.target.elements].forEach((e) => {
    //   console.log(e.value);
    // });
    openSnackbar(
      "Succesfully submitted your request, Nagar Nigam team will be in contact with you soon.",
      "success"
    );
    navigate("/");
  };
  return (
    <>
      <CommongNav />
      <main className={`${respPX} py-6`}>
        <h1 className="text-3xl">Waste Collection Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="border-1 border-gray-400 py-4 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <LabelInput label="Name" name="name" id="name" placeholder="Name" />
            <LabelInput
              label="Email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <LabelInput
              label="Phone"
              name="phone"
              id="phone"
              placeholder="Phone"
            />
            <LabelInput
              label="Address"
              name="address"
              id="address"
              placeholder="Address"
            />
            <LabelInput label="City" name="city" id="city" placeholder="City" />
            <LabelInput
              label="Waste Image"
              name="wasteImage"
              id="wasteImage"
              type="file"
            />
          </div>
          <LabelInput
            label="Waste Description"
            name="wasteDescription"
            id="wasteDescription"
            placeholder="Waste Description"
            type="textarea"
          />
          <div className="flex justify-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Generate Pickup Request
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default WasteCollectorPage;
