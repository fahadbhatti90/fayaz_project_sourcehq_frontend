import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import { Pagination } from "react-pagination-bar";
import Messages from "../../Component/Messages";
import Navigation from "../../Component/Navigation";
import "react-pagination-bar/dist/index.css";
export default function HireType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [hireType, setHireType] = useState([]);
  const [filterHireType, setFilterHireType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [success, setSuccess] = useState("");
  const [validationError, setValidationError] = useState({});
  const [errors, seterrors] = useState("");
  const pagePostsLimit = 3;
  useEffect(() => {
    fetchData();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/ShowAllHireType`, {
        headers: headers,
      })
      .then(({ data }) => {
        setHireType([...data.all_job_hire_type]);
        setFilterHireType([...data.all_job_hire_type]);
      })
      .catch(({ data }) => {
        console.log(data);
      });
  };

  const handleSearch = (event) => {
    let tempLocations = [...hireType];
    if (event.target.value.length > 0) {
      tempLocations = tempLocations.filter((item) => {
        let tempSearch = event.target.value.toLocaleLowerCase();
        let tempTitle = item.name
          .toLocaleLowerCase()
          .slice(0, event.target.value.length);
        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }
    setFilterHireType(tempLocations);
    // setUsers(displayedContacts);
  };
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("business_id", user_data.business_id);

    await axios
      .post(`/AddHireType`, formData, {
        headers: headers,
        "Content-Type": "application/json",
      })
      .then(({ data }) => {
        if (data.status === 200) {
          setSuccess(data.message);
          e.target.reset();
          setName("");
          fetchData();
          setTimeout(() => {
            setSuccess("");
          }, 6000);
        } else if (data.status === "validation_failed") {
          setValidationError(data.errors);
          setTimeout(() => {
            setValidationError({});
          }, 6000);
        } else {
          seterrors(data.message);
          setTimeout(() => {
            seterrors("");
          }, 6000);
        }
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
                <div className="form__card__title border-0">Job Hire Type</div>
              </div>
              <div className="form__card__title__wrap__right d-flex align-items-center ">
                <button
                  className="common__btn btn-green btn-sm rounded-0 offcanvas-open"
                  onClick={handleShow}
                >
                  New Hire Type
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
                  <div className="d-flex align-items-center justify-content-between">
                    <p>Hire Type</p>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleSearch}
                      />
                    </div>
                  </div>

                  <div className="data__table__wrapper">
                    <table id="data-table" className="display table">
                      <thead>
                        <tr>
                          <th>Column 1</th>
                          <th>Column 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterHireType.length > 0 &&
                          filterHireType
                            .slice(
                              (currentPage - 1) * pagePostsLimit,
                              currentPage * pagePostsLimit
                            )

                            .map((item) => {
                              return (
                                <tr key={item.id}>
                                  <td>
                                    <p className="text-dark">{item.name}</p>
                                  </td>
                                  <td className="last-child">
                                    <p className="text-dark text-end">
                                      {/* <b>8 Members</b> */}
                                    </p>
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                    {filterHireType.length > pagePostsLimit && (
                      <Pagination
                        initialPage={currentPage}
                        itemsPerPage={pagePostsLimit}
                        onPageСhange={(pageNumber) =>
                          setCurrentPage(pageNumber)
                        }
                        totalItems={filterHireType.length}
                        pageNeighbours={2}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <aside className={`offcanvas__sidebar ${show ? "active" : ""}`}>
        <div className="offcanvas__sidebar__body position-inherit">
          <div className="offcanvas__sidebar__body__title">
            <h5> Create new Hire Type</h5>
            <div
              className="close-offcanvas offcanvas__close"
              onClick={handleClose}
            >
              Close
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            nibh urna, varius et congue vitae, tincidunt vitae magna. Cras vel
            magna leo. Phasellus rhoncus blandit urna, at vulputate magna
            finibus vitae.
          </p>
          <Messages
            errMsg={errors}
            success={success}
            validation={validationError}
          />
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-sm-12">
                <div className="single__input__item">
                  <label htmlFor="">
                    Hire Type name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    required
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form__buttons__row offcanvas__form__btns d-flex align-items-center justify-content-between">
              <button
                className="common__btn gray-btn close-offcanvas"
                onClick={handleClose}
              >
                Cancel & Close
              </button>
              <button type="submit" className="common__btn">
                Add Hire Type{" "}
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
