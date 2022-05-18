import React from "react";
import { NavLink } from "react-router-dom";
const Navigation = ({ nav }) => {
  //   console.log(validation);
  return (
    <>
      <div className="form__card__navigation">
        <ul>
          {nav.map((item, index) => {
            return (
              <li key={index}>
                <NavLink activeclassname="active" to={item.link}>
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Navigation;
