import api from "api/apiService";
import CommongNav from "components/nav/CommonNav";
import { respPX } from "constants/styles";
import React, { useEffect } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import eWasteTrash from "assets/e-waste-trash.jpeg";
import organicTrash from "assets/organic-trash.jpeg";
import glassTrash from "assets/glass-trash.jpeg";
import metalTrash from "assets/metal-trash.jpeg";
import paperTrash from "assets/paper-trash.jpeg";
import plasticTrash from "assets/plastic-trash.jpeg";

function getImageFromClass(name) {
  switch (name) {
    case "Organic":
      return organicTrash;
    case "EWaste":
      return eWasteTrash;
    case "Glass":
      return glassTrash;
    case "Metal":
      return metalTrash;
    case "Plastic":
      return plasticTrash;
    default:
      return null;
  }
}

const WasteCategoryPage = () => {
  const uploaderRef = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [result, setResult] = React.useState(null);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async function () {
      setImage(reader.result);
      console.log(reader.result);
      const { data } = await api.post("/imageprediction", {
        imageDataUrl: reader.result,
      });
      console.log(reader.result);
      setResult(data.predictions);
      console.log(data.predictions);
    };
  };

  useEffect(() => {
    uploaderRef.current.addEventListener("change", (e) => {
      console.log(e.target.files[0]);
    });
  }, []);

  return (
    <>
      <CommongNav />
      <main className={`${respPX} grid py-6`}>
        <form>
          <h1 className="text-3xl flex  gap-1">
            <span>Upload Waste Image to categorize</span>
            <div className="text-5xl flex items-center justify-center">
              <AddPhotoAlternateIcon fontSize="inherit" color="primary" />
            </div>
          </h1>
          <p className="text-lg my-4">
            Upload picture of waste material you want to categorize on basis of
            it's type
          </p>

          <input
            type="file"
            name="imageFile"
            className="my-4"
            alt="your trash"
            ref={uploaderRef}
            onChange={handleChange}
          />

          {image && result && (
            <div className="flex justify-around py-10 border-2 border-black bg-green-50 flex-wrap">
              <img src={image} alt="your trash" className="w-1/3" />
              <img
                src={getImageFromClass(result[0].class)}
                alt="your trash"
                className="w-1/3"
              />
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default WasteCategoryPage;
