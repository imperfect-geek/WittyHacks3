import { Call, LocationCity } from "@mui/icons-material";
import { Grid } from "@mui/material";
import api from "api/apiService";
import CommongNav from "components/nav/CommonNav";
import { respPX } from "constants/styles";
import React, { useEffect } from "react";

const CardPair = ({ title, value }) => {
  return (
    <div className="flex items-center gap-1">
      <h3 className="text-lg">{title} </h3>
      <h3 className="text-lg text-gray-500"> {value}</h3>
    </div>
  );
};

const FoodCollectorsPage = () => {
  const [state, setState] = React.useState([]);
  useEffect(() => {
    api
      .get("/foodcollectors")
      .then(({ data }) => {
        if (data.status === "success") {
          setState(data.foodCollectors);
          console.log(data.foodCollectors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <CommongNav />
      <header className={`${respPX} py-6`}>
        <h1 className="text-3xl">
          Food Collectors <Call />{" "}
        </h1>
      </header>
      <Grid container spacing={4} className={`${respPX} py-4`}>
        {state.map((data) => (
          <Grid item xs={12} sm={6} md={4}>
            <section className="shadow-lg rounded-lg p-7 bg-green-100 h-full">
              <h2 className="font-bold text-2xl mb-3">{data.name}</h2>
              <p>
                <Call />{" "}
                <a href={`tel:${data.contact.primary}`}>
                  {data.contact.primary}
                </a>
                {data.contact.alternate && (
                  <a
                    href={`tel:${data.contact.alternate}`}
                    className="text-gray-500"
                  >
                    / {data.contact.alternate}
                  </a>
                )}
              </p>
              <hr />
              <ul className="text-lg mt-3 flex flex-col gap-1">
                <CardPair
                  title="Address Line"
                  value={data.address.addressLine}
                />
                <CardPair title="City" value={data.address.city} />
                <CardPair title="Locality" value={data.address.locality} />
                <CardPair title="Pincode" value={data.address.pincode} />
                <CardPair title="State" value={data.address.state} />
              </ul>
            </section>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FoodCollectorsPage;
