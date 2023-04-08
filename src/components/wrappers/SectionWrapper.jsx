import { Button } from "@mui/material";
import { respPX } from "constants/styles";
import React from "react";
import { Link } from "react-router-dom";

const SectionWrapper = ({
  heading,
  paragraphs = [],
  actionButton,
  image,
  inverted = false,
  className,
  hsize = "md:text-5xl text-3xl",
}) => {
  console.log(inverted);
  return (
    <section
      className={`${respPX} py-6 flex text-[#303030]  ${
        inverted ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col justify-between gap-3 ${className} items-center`}
    >
      <div className="md:w-[45%] w-full flex flex-col gap-3">
        <h1 className={`${hsize} font-bold mb-5`}>{heading}</h1>
        {paragraphs.map((item, index) => {
          return (
            <p className="font-mono text-lg" key={index}>
              {item}
            </p>
          );
        })}
        {actionButton && (
          <span className="w-full md:max-w-fit mt-4">
            <Link to="/login-register">
              <Button variant="contained" fullWidth>
                {actionButton.text}
              </Button>
            </Link>
          </span>
        )}
      </div>
      <img
        className="md:max-w-[600px] object-cover  max-w-full"
        src={image ? image : "https://source.unsplash.com/random/"}
        alt=""
      />
    </section>
  );
};

export default SectionWrapper;
