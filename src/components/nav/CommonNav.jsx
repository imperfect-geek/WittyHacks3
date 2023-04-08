import { Button } from "@mui/material";
import { SnackbarContext } from "components/providers/SnackbarProvider";
import NavWrapper from "components/wrappers/NavWrapper";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user_logout } from "Slices/userSlice";

const CommongNav = () => {
  const { isAuth } = useSelector((state) => state.user);
  const { open: openSnackbar } = useContext(SnackbarContext);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(user_logout());
    openSnackbar("User Logged Out", "info");
  };
  const list = [
    {
      component: "Locate Dustbin",
      to: "/locate-dustbins",
    },
    {
      component: "Waste Category",
      to: "/waste-category",
    },
    {
      component: "Food Collectors",
      to: "/food-collectors",
    },
    {
      component: "Waste Collectors",
      to: "/waste-collectors",
    },
  ];

  list.push(
    isAuth
      ? {
          component: (
            <button
              className="border-4 border-black px-2 py-1 text-lg w-full"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ),
        }
      : {
          component: (
            <button className="border-4 border-black px-2 py-1 text-lg w-full">
              Login / Register
            </button>
          ),
          to: "/login-register",
        }
  );

  return <NavWrapper list={list} />;
};

export default CommongNav;
