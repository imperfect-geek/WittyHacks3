import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload_waste } from "Slices/wasteSlice";
import uploadGIF from "assets/upload.gif";

const WasteUploadForm = () => {
  const [image, setImage] = useState("");
  const [previewImage, setpreviewImage] = useState("logo512.png");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const uploadHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("image", image);

    await dispatch(upload_waste(myForm));
  };

  const dispatch = useDispatch();

  const { waste, status: ewasteStatus } = useSelector((state) => state.ewaste);

  const WasteDataChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setpreviewImage(reader.result);
          setImage(reader.result);
        }
      };
    }
  };

  useEffect(() => {
    if (ewasteStatus.type === "error") {
      alert(ewasteStatus.message);
    }
  }, []);

  return (
    <div className="inputFields flex justify-center ">
      <form onSubmit={uploadHandler}>
        <div className="flex flex-col m-3 ml-auto">
          <img
            src={uploadGIF}
            alt="preview"
            className="w-44 h-15 ml-auto mr-auto my-5"
          ></img>
          <input
            id="icon-button-file"
            type="file"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={WasteDataChange}
          />
          <label
            htmlFor="icon-button-file"
            className=" w-40 py-2 rounded bg-indigo-600  mb-2 uppercase cursor-pointer text-center text-white ml-auto mr-auto"
          >
            Upload Image
          </label>
        </div>

        <div className="flex flex-col mb-6 ml-auto">
          <label className="mb-2 uppercase">Title</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-80 h-11 rounded-lg bg-green-200 text-black-600 p-2"
          />
        </div>
        <div className="flex flex-col m-3 ml-auto">
          <labe className="mb-2 uppercase">Description</labe>
          <input
            type="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-80 h-11 rounded-lg bg-green-200 text-black-600 p-2"
          />
        </div>
        <div className="mt-9 mb-9 w-full flex justify-center items-center">
          <button
            className="w-40  h-10 bg-green-800 rounded text-slate-50"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default WasteUploadForm;
