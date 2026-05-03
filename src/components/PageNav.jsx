import React from "react";
import { NavLink } from "react-router-dom";

const PageNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>product</NavLink>
        </li>
        <li>
          <NavLink to={"/price"}>price</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
