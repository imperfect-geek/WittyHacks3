import CommongNav from "components/nav/CommonNav";
import React from "react";

const LogoutPage = () => {
  return (
    <>
      <CommongNav />
      <h1 className={`text-3xl`}>Confirm Logout ?</h1>
      <button>Confirm</button>
    </>
  );
};

export default LogoutPage;
