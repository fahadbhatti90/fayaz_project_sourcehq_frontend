import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import moment from "moment";
import Select from "react-select";

export default function JobList() {
  const [filterShow, setFilterShow] = useState(false);
  const handleFilterClose = () => setFilterShow(false);
  const handleFilterShow = () => setFilterShow(true);
  const [jobList, setJobList] = useState([]);
  const [filterJobList, setFilterJobList] = useState([]);
  const [job_title, setJobTitle] = useState("");
  const [hiring_manager, setHiringManager] = useState(null);
  const [job_status, setJobStatus] = useState(null);
  const [job_location, setJobLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allHiringManager, setAllHiringManager] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [job_contract_type, setJobContractType] = useState(null);
  const [job_category, setJobCategory] = useState(null);
  const [allSkill, setAllSkill] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [allContractType, setAllContractType] = useState({});
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetchData();
    fetchFilterRecord();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/ListAllJobs/${user_data.business_id}`, {
        headers: headers,
      })
      .then(({ data }) => {
        setJobList([...data.location]);
        setFilterJobList([...data.location]);

        setLoading(false);
      });
  };
  const fetchFilterRecord = async () => {
    await axios
      .get(`/ShowAddJobForm/${user_data.business_id}`, {
        headers: headers,
      })
      .then(({ data }) => {
        setAllLocation([...data.location]);
        setAllContractType({ ...data.contract_type });
        setAllHiringManager([...data.hiring_manager]);
        setAllStatus({ ...data.Status });
        setAllSkill([...data.skills]);
        setAllCategories([...data.all_job_categories]);
      });
  };
  let jobs = filterJobList.map((item, index) => {
    return {
      id: item.id,
      job: item.job_title,
      location: item.locations.location_name,
      Publishedon: moment(item.job_date_published).format("YYYY-MM-DD"),
      Candidate: 11,
      Status: item.job_status,
    };
  });

  const columns = [
    {
      dataField: "job",
      text: "Job",
      sort: true,
    },
    {
      dataField: "location",
      text: "Location",
      sort: true,
    },
    {
      dataField: "Publishedon",
      text: "Published on",
      sort: true,
    },
    {
      dataField: "Candidate",
      text: "Candidate",
      sort: true,
    },

    {
      dataField: "Status",
      text: "Status",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <div
            className={`${
              row.Status === 1
                ? "status live"
                : row.Status === 2
                ? "status pending"
                : row.Status === 3
                ? "status"
                : row.Status === 4
                ? "status"
                : "status pending"
            } `}
          >
            <span></span>{" "}
            {`${
              row.Status === 1
                ? "Live"
                : row.Status === 2
                ? "InActive"
                : row.Status === 3
                ? "Draft"
                : row.Status === 4
                ? "Draft"
                : "Archive"
            } `}
          </div>
        );
      },
    },
    {
      dataField: "",
      text: "",
      formatter: (cellContent, row) => {
        return (
          <div className="table__action d-flex align-items-center ">
            <div className="dropdown">
              <button
                className="dropdown-toggle bg-transparent p-0 border-0 no-after"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fal fa-ellipsis-v" />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to={""}>
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={""}>
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={""}>
                    Something else here
                  </Link>
                </li>
              </ul>
            </div>
            <div className="table__arrow">
              <Link to={`/view-job/${row.id}`}>
                <i className="far fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        );
      },
    },
  ];
  let hiringManageOption = allHiringManager.map((item, index) => {
    return {
      value: item.id,
      label: `${item.first_name}  ${item.last_name}`,
    };
  });
  let contractOption = Object.entries(allContractType).map(([item, index]) => {
    return { value: item, label: index };
  });

  let statusOption = Object.entries(allStatus).map(([item, index]) => {
    return { value: item, label: index };
  });
  let skill = allSkill.map((item, index) => {
    return { value: item.id, label: item.name };
  });
  let categoriesOption = allCategories.map((item, index) => {
    return { value: item.id, label: item.name };
  });
  let locationOption = allLocation.map((item, index) => {
    return { value: item.id, label: item.location_name };
  });

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, // Hide the going to First and Last page button
    hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: jobs.length,
      },
    ],
  };
  const handleApplyFilters = (e) => {
    e.preventDefault();
    let tempLocations = [...jobList];
    // setFilterLocationList("");
    setLoading(true);
    if (job_title.length > 0) {
      tempLocations = tempLocations.filter((item) => {
        let tempSearch = job_title.toLocaleLowerCase();
        let tempTitle = item.job_title
          .toLocaleLowerCase()
          .slice(0, job_title.length);
        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }
    if (job_contract_type !== null) {
      tempLocations = tempLocations.filter(
        (item) => item.job_contract_type === job_contract_type
      );
    }
    if (selectedSkills.length > 0) {
      tempLocations = tempLocations
        .map((item) => ({
          ...item,
          children: item.jobs_skills.filter((child) =>
            selectedSkills.includes(child.id)
          ),
        }))
        .filter((item) => item.children.length > 0);
    }
    if (job_category !== null) {
      tempLocations = tempLocations.filter(
        (item) => item.job_category === job_category
      );
    }
    if (job_location !== null) {
      tempLocations = tempLocations.filter(
        (item) => item.job_location === job_location
      );
    }
    if (hiring_manager !== null) {
      tempLocations = tempLocations.filter(
        (item) =>
          item.hiring_manager === hiring_manager ||
          item.hiring_manager_1 === hiring_manager
      );
    }
    if (job_status !== null) {
      console.log("job_status");
      tempLocations = tempLocations.filter(
        (item) => item.job_status === job_status
      );
    }
    setFilterJobList(tempLocations);
    handleFilterClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const handleFilterClear = () => {
    setJobTitle("");
    setJobCategory(null);
    setJobLocation(null);
    setJobContractType(null);
    setSkills(null);
    setHiringManager(null);
    setJobStatus(null);
    setSelectedSkills([]);
    setFilterJobList([...jobList]);
  };
  const handleChange = (value) => {
    setSkills(value);
    let res = [];

    if (value.length > 0) {
      value.map((item, index) => {
        res.push(item.value);
      });
    }
    setSelectedSkills(res);

    console.log(res);
  };
  return (
    <>
      <DashboardSidebar />
      <main className="main__area">
        <DasboardHeader />
        <Breadcrumb />
        <section className="main__wrapper">
          <div className="form__card">
            <div className="form__card__title__wrap border-0 d-flex align-items-center justify-content-between">
              <div className="form__card__title__wrap__left d-flex align-items-center ">
                <div className="form__card__title__btn">
                  <Link to={""}>
                    <i className="fal fa-arrow-left"></i>
                  </Link>
                </div>
                <div className="form__card__title border-0">
                  Jobs ({filterJobList.length})
                </div>
              </div>
              <div className="form__card__title__wrap__right d-flex align-items-center pt-0 pb-0 ">
                <Link
                  to={"/add-job"}
                  className="common__btn btn-green btn-sm rounded-0"
                >
                  Add New Job
                </Link>
                <div className="form__card__title__wrap__btn ms-3 ">
                  <button className="filter__button" onClick={handleFilterShow}>
                    <img src="/assets/img/filter-icon.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="job__data__table__wrapper">
            <div className="data__table hide-search  show-th pb-4">
              <div className="table-responsive-sm">
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={jobs}
                  columns={columns}
                  pagination={paginationFactory(options)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <aside className={`location--offcanvas ${filterShow ? "active" : ""}`}>
        <div className="offcanvas__sidebar__title d-flex align-items-center justify-content-between">
          <p>Filters</p>
          <div className="offcanvas__sidebar__title__right d-flex align-items-center justify-content-end">
            <button
              className="common__btn btn-bordered gray-btn btn-sm"
              onClick={handleFilterClear}
            >
              Clear All
            </button>
            <div
              className="offcanvas__close__button close-offcanvas"
              onClick={handleFilterClose}
            >
              <i className="fal fa-times"></i>
            </div>
          </div>
        </div>
        <div className="offcanvas__sidebar__body position-inherit">
          <form action="">
            <div className="single__input__item">
              <label htmlFor=""> Search by keywords </label>
              <input
                type="text"
                className="form-control"
                name="job_title"
                value={job_title}
                required
                onChange={(event) => {
                  setJobTitle(event.target.value);
                }}
              />
            </div>

            <div className="single__input__item">
              <label htmlFor=""> Sort by Manager </label>
              <Select
                name="hiring_manager"
                isClearable
                value={hiringManageOption.find(
                  (item) => item.value === hiring_manager
                )}
                options={hiringManageOption}
                onChange={(event) => {
                  setHiringManager(event !== null ? event.value : "");
                }}
              />
            </div>
            <div className="single__input__item">
              <label htmlFor=""> Sort by Location </label>
              <Select
                name="job_location"
                value={locationOption.find(
                  (item) => item.value === job_location
                )}
                options={locationOption}
                onChange={(event) => {
                  setJobLocation(event !== null ? event.value : "");
                }}
              />
            </div>
            <div className="single__input__item">
              <label htmlFor=""> Sort by Skill </label>
              <Select
                isMulti
                name="skills"
                value={skills}
                onChange={(value) => handleChange(value)}
                options={skill}
              />
            </div>
            <div className="single__input__item">
              <label htmlFor=""> Sort by Status </label>
              <Select
                name="job_status"
                options={statusOption}
                value={statusOption.find((item) => item.value === job_status)}
                onChange={(event) => {
                  setJobStatus(event !== null ? event.value : "");
                }}
              />
            </div>
            <div className="single__input__item">
              <label htmlFor=""> Sort by Contract Type </label>
              <Select
                name="job_contract_type"
                value={contractOption.find(
                  (item) => item.value === job_contract_type
                )}
                options={contractOption}
                onChange={(event) => {
                  setJobContractType(event !== null ? event.value : "");
                }}
              />
            </div>
            <div className="single__input__item">
              <label htmlFor=""> Sort by Job Category </label>
              <Select
                name="job_category"
                value={categoriesOption.find(
                  (item) => item.value === job_category
                )}
                options={categoriesOption}
                onChange={(event) => {
                  setJobCategory(event !== null ? event.value : "");
                }}
              />
            </div>
          </form>
        </div>
        <div className="apply__filter__btn">
          <button type="submit" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}
