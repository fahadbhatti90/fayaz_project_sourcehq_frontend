import React from "react";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <>
          <header className="header">
        <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="header__logo">
                <Link to={""}><img src="assets/img/logo-main.svg" alt="" /></Link>
            </div>
            <div className="header__right d-flex align-items-center justify-content-end">
                <Link to={""} className="header-link"><img src="assets/img/Bell.svg" alt="" /></Link>
                <Link to={""} className="header-link"><img src="assets/img/Question mark circle.svg" alt="" /></Link>
                <Link to={""} className="header-link"><img src="assets/img/Cog settings.svg" alt="" /></Link>
                <div className="dropdown header__profile__dropdown">
                    <button className="no-after bg-transparent border-0 p-0 dropdown-toggle" type="button"
                        id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="assets/img/user-thumb.png" alt="" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" to={"#"}>Action</Link></li>
                        <li><Link className="dropdown-item" to={"#"}>Another action</Link></li>
                        <li><Link className="dropdown-item" to={"#"}>Something else here</Link></li>
                    </ul>
                </div>
            </div>
        </div>
      </header>
    </>
  )
}