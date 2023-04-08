import { respPX } from "constants/styles";
import React from "react";
import { Link } from "react-router-dom";
import Void from "assets/Void.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NavWrapper = ({ list }) => {
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  const renderList = () =>
    list.map((item, index) => {
      return (
        <Link key={index} to={item.to}>
          <span className="font-bold text-lg lg:inline-block  hidden px-2 py-1 transition-all duration-200 ease-out hover:bg-black/5 active:bg-black/10">
            {item.component}
          </span>
        </Link>
      );
    });
  const renderBurgerList = () => (
    <aside className="bg-[#8DE78D] fixed h-full right-0 top-0 z-50">
      <div className="flex flex-col-reverse justify-end h-full gap-10 px-16 py-16">
        {list.map((item, index) => (
          <Link key={index} to={item.to}>
            <span className="font-bold text-lg px-2 py-1 transition-all duration-200 ease-out hover:bg-black/5 active:bg-black/10 focus:bg-black/10">
              {item.component}
            </span>
          </Link>
        ))}
        <div className="absolute top-5 right-5">
          <IconButton onClick={() => setBurgerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </aside>
  );
  return (
    <nav
      className={`${respPX} py-4 flex gap-2 items-center justify-between bg-[#8DE78D] sticky top-0 z-10`}
    >
      <h1 className="text-3xl">
        <Link to="/">
          {/* <img src={Void} alt="logo" /> */}
          <h1 className="font-extrabold font-sans bg-white px-2 py-1 rounded-md">
            VOID TRAS<span className="text-green-600">H</span>
          </h1>
        </Link>
      </h1>
      {burgerOpen ? renderBurgerList() : renderList()}
      {!burgerOpen && (
        <div className="lg:hidden">
          <IconButton onClick={() => setBurgerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      )}
    </nav>
  );
};

export default NavWrapper;
