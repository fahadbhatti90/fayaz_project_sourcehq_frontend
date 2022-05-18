import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import Messages from "../../Component/Messages";
import Navigation from "../../Component/Navigation";
export default function JobView() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [job, setJob] = useState([]);
  const [allContractType, setAllContractType] = useState({});
  const [allProjectSow, setAllProjectSow] = useState({});
  const [allScheduleType, setAllScheduleType] = useState({});
  const [allPayType, setAllPayType] = useState({});
  let { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/GetJobDetail/${id}`, {
        headers: headers,
      })
      .then(({ data }) => {
        setJob({ ...data.job_details });
        setAllContractType({ ...data.contract_type });
        setAllProjectSow({ ...data.project_sow });
        setAllScheduleType({ ...data.schedule_type });
        setAllPayType({ ...data.pay_type });
      })
      .catch(({ data }) => {
        console.log(data);
      });
  };
  let contractOption = Object.entries(allContractType)
    .filter((item) => item.indexOf(job.job_contract_type) > -1)
    .map(([item, value]) => <span key={item}>{value}</span>);

  let sowOption = Object.entries(allProjectSow)
    .filter((item) => item.indexOf(job.job_project_sow) > -1)
    .map(([item, value]) => <span key={item}>{value}</span>);

  let payTypeOption = Object.entries(allPayType)
    .filter((item) => item.indexOf(job.job_pay_type) > -1)
    .map(([item, value]) => <span key={item}>{value}</span>);

  return (
    <>
      <DashboardSidebar />
      <main className="main__area">
        <DasboardHeader />
        <Breadcrumb />
        <section className="main__wrapper p-0 rounded-0">
          <div className="form__card p-0 rounded-0">
            <div className="form__card__title__wrap d-flex align-items-center justify-content-between">
              <div className="form__card__title__wrap__left d-flex align-items-center ">
                <div className="form__card__title border-0">
                  {job.job_title}
                  <a href="#" className="text-decoration-none text-dark">
                    <b>(#3455)</b>
                  </a>
                </div>
              </div>
              <div className="form__card__title__wrap__right d-flex align-items-center ">
                <button className="border-0 bg-transparent">
                  <img src="/assets/img/refresh.svg" alt="" />
                </button>
                <div
                  className={`${
                    job.job_status === 1
                      ? "status ms-2 live"
                      : job.job_status === 2
                      ? "status ms-2 pending"
                      : job.job_status === 3
                      ? "status ms-2"
                      : job.job_status === 4
                      ? "status ms-2"
                      : "status ms-2 pending"
                  } `}
                >
                  <span></span>
                  {`${
                    job.job_status === 1
                      ? "Live"
                      : job.job_status === 2
                      ? "InActive"
                      : job.job_status === 3
                      ? "Draft"
                      : job.job_status === 4
                      ? "Draft"
                      : "Archive"
                  } `}
                </div>
              </div>
            </div>
            <div className="form__card__flex d-flex min-vh-100 mb-4 border-bottom">
              <div className="form__card__navigation job-nav">
                <ul>
                  <li>
                    <a href="" className="active">
                      Job Details
                    </a>
                  </li>
                  <li>
                    <a href=""> Inbox (5)</a>
                  </li>
                  <li>
                    <a href=""> Shortlisted (34)</a>
                  </li>
                  <li>
                    <a href=""> Interview (34)</a>
                  </li>
                  <li>
                    <a href=""> Offfered (34)</a>
                  </li>
                  <li>
                    <a href=""> Onboarding (2)</a>
                  </li>
                  <li>
                    <a href=""> Hired (2)</a>
                  </li>
                  <li>
                    <a href=""> Job Settings</a>
                  </li>
                  <li>
                    <a href=""> Invite Manager</a>
                  </li>
                </ul>
              </div>
              <div className="form__card__flex__right">
                <div className="form__card__body__wrapper job__details__card__wrapper">
                  <div className="external__link">
                    <label htmlFor="">
                      <span>
                        <img src="/assets/img/external-link.svg" alt="" />
                      </span>
                      Published
                    </label>
                    <a href="">https://nike.sourcehq.com/job/234345656</a>
                  </div>
                  <div className="row pb-3">
                    <div className="col-md-8">
                      <p>
                        <b>Skills</b>
                      </p>
                      <div className="skills__list">
                        {job.jobs_skills !== undefined &&
                          job.jobs_skills.map((item, index) => (
                            <button key={index}>{item.name}</button>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="job__quick__action pt-3">
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle no-after"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Quick Action
                            <i className="fas fa-chevron-circle-down"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Edit Job
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Duplicate Job
                              </a>
                            </li>
                            <li>
                              <Link
                                to={""}
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={handleShow}
                              >
                                Change Status
                              </Link>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                              <a className="dropdown-item text-red" href="#">
                                Delete Job
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Archive Job
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job__details__wrapper">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="job__details__inner">
                          <div className="job__details__wrap">
                            <nav>
                              <div
                                className="nav nav-tabs"
                                id="nav-tab"
                                role="tablist"
                              >
                                <button
                                  className="nav-link active"
                                  id="nav-home-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-home"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-home"
                                  aria-selected="true"
                                >
                                  Job Description
                                </button>
                                <button
                                  className="nav-link"
                                  id="nav-profile-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-profile"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-profile"
                                  aria-selected="false"
                                >
                                  Internal Notes
                                </button>
                              </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                              <div
                                className="tab-pane fade show active"
                                id="nav-home"
                                role="tabpanel"
                                aria-labelledby="nav-home-tab"
                              >
                                <div
                                  className="job__description"
                                  dangerouslySetInnerHTML={{
                                    __html: job.job_description,
                                  }}
                                ></div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="nav-profile"
                                role="tabpanel"
                                aria-labelledby="nav-profile-tab"
                              >
                                <div
                                  className="job__description"
                                  dangerouslySetInnerHTML={{
                                    __html: job.job_internal_notes,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="job__detail__right">
                          <div className="job__detail__list">
                            <div className="single__job__detail__list">
                              <p>
                                Job Category
                                <b>
                                  {job.job_categories !== undefined &&
                                    job.job_categories.name}
                                </b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>
                                Job Position
                                <b>
                                  {job.job_position !== undefined &&
                                    job.job_position.name}
                                </b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>
                                Location
                                <b>
                                  {job.locations !== undefined &&
                                    job.locations.location_name}
                                </b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>
                                Remote Working
                                <b> {job.job_remote === 1 ? "Yes" : "No"}</b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>
                                Contract type <b>{contractOption}</b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>
                                Project SOW <b>{sowOption}</b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>
                                Pay Type
                                <b>{payTypeOption}</b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>
                                Hour Salary (Min - Max)
                                <b>
                                  ${job.job_min_bill_rate} - $
                                  {job.job_max_bill_rate}
                                </b>
                              </p>
                            </div>
                            <div className="single__job__detail__list">
                              <p>Hiring Manager </p>
                              <div className="hiring__manager__wrapper">
                                {job.hiring_manager !== undefined &&
                                  job.hiring_manager !== null && (
                                    <div className="hiring__manager">
                                      <div className="hiring__manager__thumb">
                                        <img
                                          src="/assets/img/user-thumb-1.png"
                                          alt=""
                                        />
                                      </div>
                                      <div className="hiring__manager__content">
                                        <b>
                                          {job.hiring_manager.first_name +
                                            " " +
                                            job.hiring_manager.last_name}
                                        </b>
                                        <span>Primary Manager</span>
                                      </div>
                                    </div>
                                  )}
                                {job.secondary_hiring_manager !== undefined &&
                                  job.secondary_hiring_manager !== null && (
                                    <div className="hiring__manager">
                                      <div className="hiring__manager__thumb">
                                        <img
                                          src="/assets/img/user-thumb-1.png"
                                          alt=""
                                        />
                                      </div>
                                      <div className="hiring__manager__content">
                                        <b>
                                          {job.secondary_hiring_manager
                                            .first_name +
                                            " " +
                                            job.secondary_hiring_manager
                                              .last_name}
                                        </b>
                                        <span>Primary Manager</span>
                                      </div>
                                    </div>
                                  )}
                                <div className="hiring__manager">
                                  <div className="hiring__manager__thumb">
                                    <img
                                      src="/assets/img/user-thumb-1.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="hiring__manager__content">
                                    <b>Emily Valdez</b>
                                    <span>Primary Manager</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div
        className={`modal fade transfer__modal changeStatus-modal ${
          show ? "show" : ""
        }`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        style={{ padding: 0, display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal__header position-relative d-flex justify-content-end pb-3">
              <div className="transfer__modal__icon">
                <img src="/assets/img/Controls.svg" alt="" />
              </div>
              <button
                type="button"
                className="btn-close p-0 shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal__body pt-0">
              <h6 className="mb-3"> Change Status</h6>
            </div>
            <div className="modal__status__job">
              Current Status is <b>Active</b>
            </div>
            <div className="modal__body pt-4">
              <form action="">
                <div className="single__input__item">
                  <label htmlFor=""> Change the Status </label>
                  <select
                    className="form-select dropdownSelect"
                    aria-label="Default select example"
                  >
                    <option selected=""> Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="single__input__item">
                  <label htmlFor=""> Reason for Status Change </label>
                  <select
                    className="form-select dropdownSelect"
                    aria-label="Default select example"
                  >
                    <option selected=""> Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="single__input__item">
                  <label htmlFor=""> Comments </label>
                  <textarea
                    name=""
                    id=""
                    className="form-control"
                    placeholder="Label Name"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer border-0 px-4 py-4 justify-content-end">
              <button
                type="button"
                className="common__btn gray-btn"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Canel
              </button>
              <button type="button" className="common__btn btn-blue">
                Update Status Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
