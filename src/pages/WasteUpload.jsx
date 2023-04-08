import React from "react";
import WasteUploadForm from "components/WasteUploadForm";
import CommongNav from "components/nav/CommonNav";

const WasteUpload = () => {
  return (
    <>
      <CommongNav />
      <div className="flex md:flex-row flex-col justify-evenly py-8">
        <section className="items-center">
          <div className="my-5">
            <h1 className="text-5xl text-center text-indigo-500">
              Upload Waste
            </h1>
            <WasteUploadForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default WasteUpload;
