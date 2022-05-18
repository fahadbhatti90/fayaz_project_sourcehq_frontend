import React from "react";
import { Link,NavLink,useLocation  } from "react-router-dom";
export const DashboardSidebar = () => {
    const location = useLocation();
    // console.log(location);
  return (
    <><aside className="dashboard__menu">
        <div className="dashboard__menu__logo">
            <Link to={""}><img src="/assets/img/logo-main.svg" alt="" /></Link>
        </div>
        <div className="dashboard__menu__links">
            <ul>
                <li className={location.pathname === "/dashboard" ? "active" : ""}><Link to={"/dashboard"} ><span><img src="/assets/img/menu-icon.svg" alt="" /></span> Dashboard</Link>
                </li>
                <li><Link to={""}><span><img src="/assets/img/menu-icon.svg" alt="" /></span> Inbox</Link></li>
                <li><Link to={""}><span><img src="/assets/img/menu-icon.svg" alt="" /></span> Calendar</Link></li>
                <li><Link data-bs-toggle="collapse" to="#collapseExample" role="button" aria-expanded="false"
                        aria-controls="collapseExample"><span><img src="/assets/img/menu-icon.svg" alt="" /></span>
                        Recruitment <i className="fal fa-chevron-down"></i></Link>
                    <div className="collapse" id="collapseExample">
                        <ul>
                            <li><Link to={"/list-job"}>Job</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                        </ul>
                    </div>
                </li>
                <li><Link data-bs-toggle="collapse" to="#collapseExample2" role="button" aria-expanded="false"
                        aria-controls="collapseExample2"><span><img src="/assets/img/menu-icon.svg" alt="" /></span>
                        Projects <i className="fal fa-chevron-down"></i></Link>
                    <div className="collapse" id="collapseExample2">
                        <ul>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                        </ul>
                    </div>
                </li>
                <li><Link data-bs-toggle="collapse" to="#collapseExample3" role="button" aria-expanded="false"
                        aria-controls="collapseExample3"><span><img src="/assets/img/menu-icon.svg" alt="" /></span>
                        People <i className="fal fa-chevron-down"></i></Link>
                    <div className="collapse" id="collapseExample3">
                        <ul>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                        </ul>
                    </div>
                </li>
                <li><Link to={""}><span><img src="/assets/img/menu-icon.svg" alt="" /></span> Talent Pool</Link></li>
                <li><Link to={""}><span><img src="/assets/img/menu-icon.svg" alt="" /></span> Time & Expenses</Link></li>
                <li><Link to={""}><span><img src="/assets/img/menu-icon.svg" alt="" /></span> Reports</Link></li>
                <li><Link data-bs-toggle="collapse" to="#collapseExample4" role="button" aria-expanded="false"
                        aria-controls="collapseExample4"><span><img src="/assets/img/menu-icon.svg" alt="" /></span>
                        Files <i className="fal fa-chevron-down"></i></Link>
                    <div className="collapse" id="collapseExample4">
                        <ul>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                        </ul>
                    </div>
                </li>
                <li><Link data-bs-toggle="collapse" to="#collapseExample5" role="button" aria-expanded="false"
                        aria-controls="collapseExample5"><span><img src="/assets/img/menu-icon.svg" alt="" /></span>
                        Company <i className="fal fa-chevron-down"></i></Link>
                    <div className="collapse" id="collapseExample5">
                        <ul>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                        </ul>
                    </div>
                </li>
                  <li><NavLink data-bs-toggle='collapse' to="#collapseExample6" role="button" aria-expanded={location.pathname === "/app-configuration" || location.pathname === "/primary-setup"  ? "true" : "false"}
                        aria-controls="collapseExample6"><span><img src="/assets/img/menu-icon.svg" alt="" /></span>
                        Settings <i className="fal fa-chevron-down"></i></NavLink>
                    <div className= {location.pathname === "/app-configuration" || location.pathname === "/primary-setup"  ? "collapse show" : "collapse"} id="collapseExample6">
                        <ul>
                            <li><NavLink to={"/app-configuration"}>App Configuration</NavLink ></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                            <li><Link to={""}>Example Link</Link></li>
                        </ul>
                    </div>
                </li>
                <li><Link to={""}><span><img src="/assets/img/menu-icon.svg" alt="" /></span> Logoff</Link></li>
            </ul>
        </div>
    </aside></>
  )
}