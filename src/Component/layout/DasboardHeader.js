import React, {  useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Session from "../Session";

export function DasboardHeader() {
  const navigate = useNavigate();
    



  const onLogoutHandler = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }


  const user = JSON.parse(localStorage.getItem("userData"));
  if (user === null) {
    return <Navigate to="/" push={true} />;
  }

  return (
    <>
    
      <Session />
      <header className="header dashboard-header">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="header__search">
            <form action="">
              <button className="bg-transparent p-0 border-0">
                <i className="fal fa-search"></i>
              </button>
              <input type="text" placeholder="Search" />
            </form>
          </div>
          <div className="header__right d-flex align-items-center justify-content-end">
            <Link to={""} className="header-link">
              <img src="/assets/img/Bell.svg" alt="" />
            </Link>
            <Link to={""} className="header-link">
              <img src="/assets/img/Question mark circle.svg" alt="" />
            </Link>
            <Link to={""} className="header-link">
              <img src="/assets/img/Cog settings.svg" alt="" />
            </Link>
            <div className="dropdown header__profile__dropdown">
              <button
                className="no-after bg-transparent border-0 p-0 dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="/assets/img/user-thumb.png" alt="" />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link to ={"#"}
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => onLogoutHandler(event)}
                    
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link  className="dropdown-item" to={"#"}>
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"#"}>
                    Something else here
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
