import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import Messages from "../../Component/Messages";
import DatePicker from "react-datepicker";
import Navigation from "../../Component/Navigation";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function AccountOwner() {
  const [id, setId] = useState("");
  const [business_name, setBusiness_name] = useState("");
  const [business_mission, setBusiness_mission] = useState("");
  const [business_url, setBusiness_url] = useState("");
  const [vat_tax_id, setVat_tax_id] = useState("");
  const [crm_business, setCrm_business] = useState("");
  const [company_number, setCompany_number] = useState("");
  const [founding_year, setFounding_year] = useState("");
  const [success, setSuccess] = useState("");
  const [logo, setLogo] = useState(null);
  const [business_groups, setBusiness_groups] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [errors, seterrors] = useState("");
  useEffect(() => {
    fetchBusnisseType();
    fetchData();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchBusnisseType = async () => {
    await axios
      .post(`/get_business_groups`)
      .then(({ data }) => {
        setBusiness_groups([...data.general_setting]);
      })
      .catch(({ response: { data } }) => {
        console.log("erors");
      });
  };
  const fetchData = async () => {
    await axios
      .get(`/ManageAccountBusiness`, {
        headers: headers,
      })
      .then(({ data }) => {
        const {
          business_name,
          business_mission,
          business_url,
          vat_tax_id,
          founding_year,
          crm_business,
          company_number,
          id,
        } = data.client_business;
        setBusiness_name(business_name);
        setBusiness_mission(business_mission);
        setBusiness_url(business_url);
        setVat_tax_id(vat_tax_id);
        setFounding_year(founding_year);
        setCrm_business(crm_business);
        setCompany_number(company_number);
        setId(id);
        // setBusiness_groups([...data.general_setting]);
      })
      .catch(({ response: { data } }) => {
        console.log(data);
      });
  };
  let types = business_groups.map((item, index) => {
    return (
      <option value={item.id} key={index}>
        {item.label_name}
      </option>
    );
  });
  const onChangehandler = (e) => {
    setLogo(e.target.files[0]);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("business_name", business_name);
    formData.append("crm_business", crm_business);
    if (logo !== null) {
      formData.append("logo", logo);
    }
    formData.append("id", id);
    formData.append("vat_tax_id", vat_tax_id);
    formData.append("business_url", business_url);
    formData.append("business_mission", business_mission);
    formData.append("company_number", company_number);
    formData.append("founding_year", founding_year);
    await axios
      .post(`/UpdateAccountBusiness`, formData, {
        headers: headers,
      })
      .then(({ data }) => {
        if (data.status === 200) {
          setSuccess(data.message);
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
        <section className="main__wrapper">
          <div className="form__card">
            <div className="form__card__title__wrap d-flex align-items-center">
              <div className="form__card__title__btn">
                <Link to={""}>
                  <i className="fal fa-arrow-left"></i>
                </Link>
              </div>
              <div className="form__card__title border-0">Manage account</div>
            </div>
            <div className="form__card__flex d-flex">
               <Navigation
                nav={[
                  { name: "Manage account", link: "/primary-setup" },
                  { name: "Details", link: "/account-owner" },
                  { name: "Language and currency", link: "/language-currency" },
                ]}
              />
             
              <div className="form__card__flex__right">
                <div className="form__card__body__wrapper">
                  <p>
                    <b>Company Details</b>
                  </p>
                  <p>
                    The SoureHq account can only have a single owner. Only the
                    account owner has access to the account and billing
                    information. The account owner can transfer ownership to any
                    employee.
                  </p>
                  <Messages
                    errMsg={errors}
                    success={success}
                    validation={validationError}
                  />
                  <form onSubmit={submitForm}>
                    <div className="form__card__form pt-3">
                      <div className="single__input__item">
                        <label htmlFor="">
                          Your Business Name
                          <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="business_name"
                          onChange={(event) => {
                            setBusiness_name(event.target.value);
                          }}
                          value={business_name == null ? "" : business_name}
                        />
                      </div>
                      <div className="single__input__item">
                        <label htmlFor=""> Company website</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="https://www."
                          name="business_url"
                          readOnly
                          value={business_url == null ? "" : business_url}
                        />
                      </div>
                      <div className="single__input__item">
                        <label htmlFor=""> Upload logo</label>
                        <button className="upload-btn upload-action">
                          <input
                            type="file"
                            name="logo"
                            onChange={onChangehandler}
                          />
                          Upload logo
                        </button>
                      </div>
                      <div className="single__input__item">
                        <label htmlFor=""> Business Category</label>
                        <div className="row">
                          <div className="col-sm-12">
                            <select
                              className="form-select dropdownSelect"
                              aria-label="Default select example"
                              name="crm_business"
                              value={crm_business == null ? "" : crm_business}
                              onChange={(event) => {
                                setCrm_business(event.target.value);
                              }}
                            >
                              <option value="">Select Business Category</option>
                              {types}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="single__input__item">
                        <label htmlFor="">Company number</label>
                        <PhoneInput
                           className="form-control"
                          placeholder="Enter phone number"
                          name="company_number"
      value={company_number == null ? "" : company_number}
      onChange={setCompany_number}/>
                        {/* <input
                          type="text"
                          className="form-control"
                          name="company_number"
                          onChange={(event) => {
                            setCompany_number(event.target.value);
                          }}
                          value={company_number == null ? "" : company_number}
                        /> */}
                      </div>
                      <div className="single__input__item">
                        <label htmlFor="">VAT number / Tax ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vat_tax_id"
                          onChange={(event) => {
                            setVat_tax_id(event.target.value);
                          }}
                          value={vat_tax_id == null ? "" : vat_tax_id}
                        />
                      </div>
                      <div className="single__input__item">
                        <label htmlFor="">Founding year</label>
                        <DatePicker
                          selected={Date.parse(founding_year)}
                          className="form-control"
                          name="founding_year"
                          //   {format(startDate, "dd-MM-yyyy")}
                          //   format="yyyy"
                          onChange={(date) =>
                            setFounding_year(date.getFullYear())
                          }
                          showYearPicker
                          dateFormat="yyyy"
                          value={founding_year == null ? "" : founding_year}
                        />
                      </div>
                      <div className="single__input__item">
                        <label htmlFor="">Mission statement</label>
                        <textarea
                          name="business_mission"
                          onChange={(event) => {
                            setBusiness_mission(event.target.value);
                          }}
                          className="form-control"
                          value={
                            business_mission == null ? "" : business_mission
                          }
                        />
                      </div>
                      <div className="form__buttons__row d-flex align-items-center justify-content-between">
                        <button className="common__btn" type="submit">
                          Save Changes
                        </button>
                        <button className="common__btn gray-btn">Canel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
