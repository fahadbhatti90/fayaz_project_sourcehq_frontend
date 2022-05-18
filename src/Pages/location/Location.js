import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import Messages from "../../Component/Messages";
import Navigation from "../../Component/Navigation";
import Select from "react-select";
import Loading from "../../Component/Loading";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";

export default function Location() {
  const [show, setShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFilterClose = () => setFilterShow(false);
  const handleFilterShow = () => setFilterShow(true);
  const [taxList, setTaxList] = useState([]);
  const [tax_name, settaxName] = useState(null);
  const [tax_value, setTaxValue] = useState("");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [state_search, setStateSearch] = useState(null);
  const [country_search, setCountrySearch] = useState(null);
  const [locationNameSearch, setLocationNameSearch] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [filterlocationList, setFilterLocationList] = useState([]);
  const [taxLabelList, setTaxLabelList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [selectedStateList, selectedSetStateList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStateListSearch, setSelectedStateListSearch] = useState([]);
  const [success, setSuccess] = useState("");
  const [validationError, setValidationError] = useState({});
  const [errors, seterrors] = useState("");
  const pagePostsLimit = 3;

  useEffect(() => {
    fetchData();
    fetchLocation();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/GetLocationsData`, {
        headers: headers,
      })
      .then(({ data }) => {
        setTaxLabelList([...data.tax_label]);
        setCountriesList([...data.countries]);

        setStateList([...data.states]);
        setLoading(false);
      });
  };
  const fetchLocation = async () => {
    await axios
      .get(`/ShowAllLocations`, {
        headers: headers,
      })
      .then(({ data }) => {
        setLocationList([...data.location]);
        setFilterLocationList([...data.location]);
      });
  };

  // clear filter
  const handleFilterClear = () => {
    setLoading(true);
    setStateSearch(null);
    setCountrySearch(null);
    setLocationNameSearch("");
    setFilterLocationList([...locationList]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
    let todos = [...taxList];
    if (tax_name !== null && tax_value !== "") {
      let findtodos = todos.find((img) => img.tax_labels === tax_name);
      if (!findtodos) {
        todos.push({
          tax_labels: tax_name,
          tax: tax_value,
        });
        // todos = new Set(todos.map(({ tax_labels }) => tax_labels));
        setTaxList(todos);
        settaxName(null);
        setTaxValue("");
      }
    }
  };
  // remove tax
  const removeTax = (label) => {
    let findTax = taxList.filter((tax) => tax.tax_labels !== label);
    setTaxList(findTax);
  };

  // label id get
  const getLabel = (id) => {
    if (id) {
      let labelName = taxLabelList.find((item) => item.id === id);
      return labelName.label_name ? labelName.label_name : "";
    }
  };
  const handleCoundtryChange = (e) => {
    const { name, value } = e.target;
    let findstate = stateList.filter((val) => val.fk_country_id === value);
    let getstate = findstate.map((item, index) => {
      return { value: item.id, label: item.state_name };
    });
    selectedSetStateList(getstate);
    setCountry(value);
  };
  const handleCoundtryChangeSearch = (e) => {
    const { name, value } = e.target;
    let findstate = stateList.filter((val) => val.fk_country_id === value);
    let getstate = findstate.map((item, index) => {
      return { value: item.id, label: item.state_name };
    });
    setSelectedStateListSearch(getstate);
    setCountrySearch(value);
  };

  let labelList = taxLabelList.map((item, index) => {
    return { value: item.id, label: item.label_name };
  });
  let getcoutntry = countriesList.map((item, index) => {
    return { value: item.id, label: item.country_name };
  });

  // let todos = [...new Set(taxList.map(({ tax_labels }) => tax_labels))];
  // setTaxList(todos);
  const handleApplyFilters = (e) => {
    e.preventDefault();
    let tempLocations = [...locationList];
    // setFilterLocationList("");
    setLoading(true);
    if (locationNameSearch.length > 0) {
      tempLocations = tempLocations.filter((item) => {
        let tempSearch = locationNameSearch.toLocaleLowerCase();
        let tempTitle = item.location_name
          .toLocaleLowerCase()
          .slice(0, locationNameSearch.length);
        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }
    if (country_search !== null) {
      tempLocations = tempLocations.filter(
        (item) => item.country === country_search
      );
    }
    if (state_search !== null) {
      tempLocations = tempLocations.filter(
        (item) => item.state === state_search
      );
    }
    setFilterLocationList(tempLocations);
    handleFilterClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData();
    formData.append("location_name", locationName);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("zipcode", zipcode);
    formData.append("tax_labels", JSON.stringify(taxList));
    formData.append("business_id", user_data.business_id);

    await axios
      .post(`/AddLocation`, formData, {
        headers: headers,
        "Content-Type": "application/json",
      })
      .then(({ data }) => {
        if (data.status === 200) {
          setSuccess(data.message);
          e.target.reset();
          setLocationName("");
          setAddress("");
          setState(null);
          setCountry(null);
          setTaxList([]);
          fetchLocation();
          setTimeout(() => {
            setSuccess("");
            setDisabled(false);
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

  let val = labelList.find((item) => item.value === tax_name);
  let valCountry = getcoutntry.find((item) => item.value === country);
  let valState = selectedStateList.find((item) => item.value === state);
  let valCountrySearch = getcoutntry.find(
    (item) => item.value === country_search
  );
  let valStateSearch = selectedStateListSearch.find(
    (item) => item.value === state_search
  );

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
                <div className="form__card__title border-0">Locations</div>
              </div>
              <div className="form__card__title__wrap__right d-flex align-items-center pt-0 pb-0 ">
                <button
                  className="common__btn btn-green btn-sm rounded-0 offcanvas-open "
                  onClick={handleShow}
                >
                  New Location
                </button>
                <div className="form__card__title__wrap__btn ms-3 ">
                  <button className="filter__button" onClick={handleFilterShow}>
                    <img src="/assets/img/filter-icon.svg" alt="" />
                  </button>
                </div>
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
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <p>List of location ({filterlocationList.length})</p>
                      <div className="data__table__wrapper">
                        <table id="data-table" className="display table">
                          <thead>
                            <tr>
                              <th>Column 1</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterlocationList
                              .slice(
                                (currentPage - 1) * pagePostsLimit,
                                currentPage * pagePostsLimit
                              )

                              .map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <p className="text-dark">
                                        {item.location_name}
                                      </p>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        {filterlocationList.length > pagePostsLimit && (
                          <Pagination
                            initialPage={currentPage}
                            itemsPerPage={pagePostsLimit}
                            onPageСhange={(pageNumber) =>
                              setCurrentPage(pageNumber)
                            }
                            totalItems={filterlocationList.length}
                            pageNeighbours={2}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
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
              <label htmlFor="">Search by Name </label>
              <input
                type="text"
                className="form-control"
                name="locationNameSearch"
                value={locationNameSearch}
                onChange={(event) => {
                  setLocationNameSearch(event.target.value);
                }}
              />
            </div>

            <div className="single__input__item">
              <label htmlFor=""> Sort by Country </label>
              <Select
                aria-label="Default select example"
                options={getcoutntry}
                name="country_search"
                value={valCountrySearch ? valCountrySearch : ""}
                onChange={(val) => {
                  handleCoundtryChangeSearch({
                    target: { name: "country_search", value: val.value },
                  });
                }}
              />
            </div>
            <div className="single__input__item">
              <label htmlFor=""> Sort by State </label>
              <Select
                aria-label="Default select example"
                options={selectedStateListSearch}
                name="state_search"
                value={valStateSearch ? valStateSearch : ""}
                onChange={(event) => {
                  setStateSearch(event.value);
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
      <aside className={`offcanvas__sidebar ${show ? "active" : ""}`}>
        <div className="offcanvas__sidebar__body position-inherit">
          <div className="offcanvas__sidebar__body__title">
            <h5> New Location</h5>
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
                    Location Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="location_name"
                    value={locationName}
                    onChange={(event) => {
                      setLocationName(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="single__input__item">
                  <label htmlFor="">
                    Address <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    required
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="single__input__item">
                  <label htmlFor="">
                    Country <span className="text-red">*</span>
                  </label>
                  <Select
                    aria-label="Default select example"
                    options={getcoutntry}
                    required
                    name="country"
                    value={valCountry ? valCountry : ""}
                    onChange={(val) => {
                      handleCoundtryChange({
                        target: { name: "country", value: val.value },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="single__input__item">
                  <label htmlFor="">
                    State <span className="text-red">*</span>
                  </label>
                  <Select
                    aria-label="Default select example"
                    options={selectedStateList}
                    name="state"
                    required
                    value={valState ? valState : ""}
                    onChange={(event) => {
                      setState(event.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-4">
                <div className="single__input__item">
                  <label htmlFor="">
                    Zipcode <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    value={zipcode}
                    required
                    onChange={(event) => {
                      setZipcode(event.target.value);
                    }}
                  />
                </div>
              </div>

              <p>Tax Component</p>
              <div className="col-md-6">
                <div className="single__input__item">
                  <label htmlFor="">
                    Tax Label Name <span className="text-red">*</span>
                  </label>

                  <Select
                    name="tax_name"
                    options={labelList}
                    value={val ? val : ""}
                    // value={tax_name == null ? "" : labelList[tax_name]}
                    onChange={(event) => {
                      settaxName(event.value || null);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="single__input__item">
                  <label htmlFor="">
                    Tax % <span className="text-red">*</span>
                  </label>
                  <div className="row">
                    <div className="col-md-8">
                      <input
                        value={tax_value}
                        name="tax_value"
                        type="text"
                        className="form-control"
                        onChange={(e) => setTaxValue(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <button
                        className="add--btn common__btn btn-dark rounded-0"
                        onClick={(e) => handleAddClick(e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="list-group pt-3">
              <li className="list-group-item bg-gray d-flex align-items-center justify-content-between">
                <p>Tax Component </p>
              </li>
              {taxList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >
                    <p>{getLabel(item["tax_labels"])} </p>
                    <div className="list-group-item-right d-flex align-items-center ">
                      <p>
                        <b>{item["tax"] ? item["tax"] + "%" : ""} </b>
                      </p>

                      <button
                        className="bg-transparent p-0 border-0"
                        onClick={() => removeTax(item["tax_labels"])}
                      >
                        <img src="/assets/img/trash.svg" alt="" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </div>
            <div className="form__buttons__row offcanvas__form__btns d-flex align-items-center justify-content-between">
              <button
                className="common__btn gray-btn close-offcanvas"
                onClick={handleClose}
              >
                Cancel & Close
              </button>
              <button className="common__btn" type="submit" disabled={disabled}>
                Add location
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
