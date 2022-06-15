import React from "react";
import Search from "./Search";
import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";

const Navbar = ({ setArsipScreen, valueNavbar, textNavbar, setSearch }) => {
  return (
    <nav>
      <header>
        <h1>AppNote</h1>
      </header>
      <section className="nav__wrap">
        <Search setSearch={setSearch} />
        <div className="nav__button">
          <button
            className="nav__button__arsip"
            onClick={() => {
              setArsipScreen(valueNavbar);
            }}
          >
            <AssignmentReturnedOutlinedIcon />
            &nbsp;
            {textNavbar}
          </button>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
