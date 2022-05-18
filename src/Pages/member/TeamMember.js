import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import { Pagination } from "react-pagination-bar";
import Messages from "../../Component/Messages";
import "react-pagination-bar/dist/index.css";
import styled from "styled-components";
export default function TeamMember() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputList, setInputList] = useState([{ email: "", role_id: "" }]);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [pageRole, setPageRoleName] = useState("");
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState("");
  const [validationError, setValidationError] = useState({});
  const [errors, seterrors] = useState("");

  const pagePostsLimit = 3;
  let { id } = useParams();
  useEffect(() => {
    fetchRole();
    fetchData();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/GetRolesClients/${id}`, {
        headers: headers,
      })
      .then(({ data }) => {
        setPageRoleName(data.data[0].name);
        setUsers([...data.data[0].users]);
        setFilterUsers([...data.data[0].users]);
      })
      .catch(({ data }) => {
        console.log(data);
      });
  };
  const fetchRole = async () => {
    await axios
      .get(`/GetAllUserRoles`, {
        headers: headers,
      })
      .then(({ data }) => {
        setRoles([...data.data.roles.slice(1)]);
      })
      .catch(({ response: { data } }) => {
        console.log(data);
      });
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { email: "", role_id: "" }]);
  };

  const handleSearch = (event) => {
    var searchQuery = event.target.value.toLowerCase();
    var displayedContacts = users.filter(function(el) {
      var searchValue = `${el.first_name} ${el.last_name}`.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    setFilterUsers(displayedContacts);
    // setUsers(displayedContacts);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData();

    formData.append("invitation_emails", JSON.stringify(inputList));
    await axios
      .post(`/storeInvitation`, formData, {
        headers: headers,
        "Content-Type": "application/json",
      })
      .then(({ data }) => {
        if (data.status === 200) {
          setSuccess(data.message);
          setInputList([{ email: "", role_id: "" }]);
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
      })
      .catch(({ response: { data } }) => {
        console.log(data);
        if (data.status === "validation_failed") {
          setValidationError(data.errors);
        } else {
          seterrors(data.message);
        }
        console.log(data);
      });
  };

  return (
    <>
      <DashboardSidebar />
      <main className="main__area">
        <DasboardHeader />
        <Breadcrumb />
        <Section>
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
                  <button
                    className="common__btn btn-green btn-sm rounded-0 offcanvas-open"
                    onClick={handleShow}
                  >
                    New Member
                  </button>
                </div>
              </div>
              <div className="form__card__flex d-flex">
                <div className="form__card__navigation">
                  <ul>
                    <li>
                      <Link to={""} className="active">
                        Teams
                      </Link>
                    </li>
                    <li>
                      <Link to={"/location"}> Locations</Link>
                    </li>
                    <li>
                      <Link to={"/position"}> Positions</Link>
                    </li>
                    <li>
                      <Link to={"/category"}> Category</Link>
                    </li>
                    <li>
                      <Link to={"/hiretype"}> Hire Type</Link>
                    </li>
                  </ul>
                </div>
                <div className="form__card__flex__right">
                  <div className="form__card__body__wrapper">
                    <div className="d-flex align-items-center justify-content-between">
                      <p>{pageRole}</p>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleSearch}
                        />
                      </div>
                    </div>

                    <div className="data__table__wrapper table-responsive-sm">
                      <table id="data-table" className="display table">
                        <thead>
                          <tr>
                            <th>Column 1</th>
                            <th>Column 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterUsers
                            .slice(
                              (currentPage - 1) * pagePostsLimit,
                              currentPage * pagePostsLimit
                            )
                            .map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="commmon__data__title d-flex align-items-center justify-content-start">
                                      <div className="common__list__card__thumb">
                                        <img
                                          src="/assets/img/user-thumb-1.png"
                                          alt=""
                                        />
                                      </div>
                                      <p>{`${item.first_name}  ${item.last_name}`}</p>
                                      <p className="ms-4 text-light">
                                        {item.email}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="last-child">
                                    <div className="common__list__card__right d-flex align-items-center justify-content-end">
                                      {item.client_status === 1 && (
                                        <p className="text-green common__list__status">
                                          Active Member
                                        </p>
                                      )}
                                      {item.client_status === 2 && (
                                        <p className="text-light common__list__status">
                                          Inactive Member
                                        </p>
                                      )}
                                      {item.client_status === 3 && (
                                        <p className="text-red common__list__status">
                                          Delete Member
                                        </p>
                                      )}
                                      <div className="common__card__dropdown">
                                        <div className="dropdown">
                                          <button
                                            className="no-after p-0 bg-transparent border-0 dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="fal fa-bars"></i>
                                          </button>
                                          <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                          >
                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                to={""}
                                              >
                                                <span>
                                                  <i className="fas fa-eye"></i>
                                                </span>
                                                View Profile
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                to={""}
                                              >
                                                <span>
                                                  <i className="fas fa-eye"></i>
                                                </span>
                                                Edit
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                to={""}
                                              >
                                                <span>
                                                  <i className="fas fa-eye"></i>
                                                </span>
                                                Delete
                                              </Link>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                to={""}
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                              >
                                                Change status
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      <Pagination
                        initialPage={currentPage}
                        itemsPerPage={pagePostsLimit}
                        onPageСhange={(pageNumber) =>
                          setCurrentPage(pageNumber)
                        }
                        totalItems={users.length}
                        withProgressBar={true}
                        pageNeighbours={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Section>
      </main>
      <aside className={`offcanvas__sidebar ${show ? "active" : ""}`}>
        <div className="offcanvas__sidebar__body">
          <div className="offcanvas__sidebar__body__title">
            <h5>Invite team member</h5>
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
            {inputList.map((x, i) => {
              return (
                <div className="row" key={i}>
                  <div className="col-sm-5">
                    <div className="single__input__item">
                      <label htmlFor="">
                        Email address <span className="text-red">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        required
                        onChange={(e) => handleInputChange(e, i)}
                        value={x.email}
                      />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="single__input__item">
                      <label htmlFor="">
                        Role <span className="text-red">*</span>
                      </label>
                      <select
                        className="form-select dropdownSelect"
                        name="role_id"
                        value={x.role_id}
                        required
                        onChange={(e) => handleInputChange(e, i)}
                        aria-label="Default select example"
                      >
                        <option value=""> Select Role</option>

                        {roles.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-2 d-inline-flex">
                    {inputList.length !== 1 && (
                      <div
                        className="form-icon"
                        onClick={() => handleRemoveClick(i)}
                      >
                        <img src="/assets/img/trash.svg" alt="" />
                      </div>
                    )}
                    {inputList.length - 1 === i && (
                      <div className="form-icon" onClick={handleAddClick}>
                        <img src="/assets/img/plus.svg" alt="" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="offcanvas__form__btn">
              <button className="common__btn" type="submit" disabled={disabled}  >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}

const Section = styled.div`
  .text-light {
    color: #d7d6d6 !important;
    padding-top: 2px;
  }
  .data__table__wrapper {
    top: 7px;
  }
`;
