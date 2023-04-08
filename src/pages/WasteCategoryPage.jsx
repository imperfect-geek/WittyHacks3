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
import { CameraAlt, UploadFile } from "@mui/icons-material";
import { Button, ButtonGroup, Divider, IconButton, Input } from "@mui/material";
import CaptureImageModal from "components/CaptureImageModal";

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
  const [camOpen, setCamOpen] = React.useState(false);
  const [imageData, setImageData] = React.useState(null);

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
      setResult(data.predictions);
    };
  };
  const capturedImageData = async (imageData) => {
    imageData.replace("webp", "jpeg");
    console.log(imageData);
    setImage(imageData);
    const { data } = await api.post("/imageprediction", {
      imageDataUrl: imageData,
    });
    setResult(data.predictions);
    setCamOpen(false);
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
          <h1 className="text-3xl flex items-center gap-1">
            <span>Upload Waste Image to categorize</span>
            <div className="text-5xl flex items-center justify-center">
              <AddPhotoAlternateIcon fontSize="inherit" color="primary" />
            </div>
          </h1>
          {/* <p className="text-lg my-4">
            Upload picture of waste material you want to categorize on basis of
            it's type
          </p> */}
          <div className="flex justify-start items-center gap-4 my-6">
            <Input
              type="file"
              name="imageFile"
              alt="your trash"
              ref={uploaderRef}
              onChange={handleChange}
            />
            {/* <span className="font-bold hidden md:block">OR</span>
            <span className="hidden md:block">
              <Button
                color="inherit"
                variant="outlined"
                endIcon={<CameraAlt />}
                sx={{ px: 2, height: 35 }}
                onClick={() => setCamOpen(true)}
              >
                Capture
              </Button>
            </span> */}
            <input
              type="file"
              name="imageFile"
              className="my-4 hidden"
              alt="your trash"
              ref={uploaderRef}
              onChange={handleChange}
            />
          </div>
          {image && result && (
            <div className="flex w-full justify-center items-center py-10 flex-wrap md:flex-nowrap relative">
              <img src={image} alt="your trash" className="w-full" />
              <img
                src={getImageFromClass(result[0].class)}
                alt="your trash"
                className="md:absolute bottom-5 right-0"
              />
            </div>
          )}
          <CaptureImageModal
            open={camOpen}
            onClose={() => setCamOpen(false)}
            setImageData={capturedImageData}
          />
        </form>
      </main>
    </>
  );
};

export default WasteCategoryPage;
