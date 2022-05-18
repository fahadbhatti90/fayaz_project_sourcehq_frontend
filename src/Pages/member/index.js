import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import Navigation from "../../Component/Navigation";
//Datatable Modules

export default function Member() {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/GetAllUserRoles`, {
        headers: headers,
      })
      .then(({ data }) => {
        setRoles([...data.data.roles]);
      })
      .catch(({ response: { data } }) => {
        console.log(data);
      });
  };

  return (
    <>
      <DashboardSidebar />
      <main className="main__area">
        <DasboardHeader />
        <Breadcrumb />
        <section className="main__wrapper">
          <div className="form__card">
            <div className="form__card__title__wrap d-flex align-items-center justify-content-between">
              <div className="form__card__title__wrap__left d-flex align-items-center ">
                <div className="form__card__title__btn">
                  <Link to={""}>
                    <i className="fal fa-arrow-left"></i>
                  </Link>
                </div>
                <div className="form__card__title border-0">Manage Team</div>
              </div>
              <div className="form__card__title__wrap__right">
                <button className="common__btn btn-green btn-sm rounded-0">
                  New Member
                </button>
              </div>
            </div>
            <div className="form__card__flex d-flex">
              <Navigation
                nav={[
                   { name: "Teams", link: "/member" },
                  { name: "Locations", link: "/location" },
                  { name: "Positions", link: "/position" },
                  { name: "Tax Label", link: "/tax-label" },
                  { name: "Department", link: "/department" },
                  { name: "Category", link: "/category" },
                  { name: "Hire Type", link: "/hiretype" },
                ]}
              />
              <div className="form__card__flex__right">
                <div className="form__card__body__wrapper">
                  <p>List of team and number of member under each group</p>

                  <div className="common__card__wrapper">
                    {roles.map((item, index) => {
                      return (
                        <Link
                          to={`/team-member/${item.id} `}
                          key={item.id}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="common__list__card d-flex align-items-center justify-content-between">
                            <div className="common__list__card__left d-flex align-items-center">
                              <div className="common__list__card__icon">
                                <img
                                  src="/assets/img/add-member-icon.svg"
                                  alt=""
                                />
                              </div>
                              <p>{item.name}</p>
                            </div>
                            <div className="common__list__card__right">
                              <p>
                                <b>{item.users_count} Members</b>
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
