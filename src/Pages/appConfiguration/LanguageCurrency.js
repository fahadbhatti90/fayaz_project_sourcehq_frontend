import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import Messages from "../../Component/Messages";
import Navigation from "../../Component/Navigation";
import Select from 'react-select';

export default function LanguageCurrency() {
  const [id, setId] = useState("");
  const [language, setLanguage] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [getLanguage, setGetLanguage] = useState([]);
  const [getcurrency, setGetCurrency] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [success, setSuccess] = useState("");
  const [errors, seterrors] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/ShowLanguageCurrency`, {
        headers: headers,
      })
      .then(({ data }) => {
        setGetLanguage([...data.languages]);
        setGetCurrency([...data.currencies]);
        setLanguage(data.client_business.language);
        setCurrency(data.client_business.currency);
        setId(data.client_business.id);
      })
      .catch(({ response: { data } }) => {
        console.log(data);
      });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("language", language);
    formData.append("currency", currency);
    formData.append("id", id);

    await axios
      .post(`/UpdateLanguageCurrency`, formData, {
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
   let languages = getLanguage.map((item, index) => {
     return (
        {value:item.id, label:item.code}
      
      );
   });
   let currencyOption = getcurrency.map((item, index) => {
     return (
        {value:item.id, label:item.code}
      
      );
   });
  
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
                <Messages
                  errMsg={errors}
                  success={success}
                  validation={validationError}
                />
                <div className="form__card__body__wrapper">
                  <p>
                    <b>Language and currency </b>
                  </p>

                  <form onSubmit={submitForm}>
                    <div className="form__card__form pt-3">
                      <div className="single__input__item">
                        <label htmlFor="">
                          Language <span className="text-red">*</span>
                        </label>
                        <Select
                          name="language"
                          options={languages}
                          value={languages.find((item) => item.value === language)}
                          // value={language == null ? "" : languages[language]}
                          onChange={(event) => {
                            setLanguage(event.value);
                          }}
                         
                        />
                        
                        <p className="text-light">
                          Select the default language to use SourceHQ
                        </p>
                      </div>
                      <div className="single__input__item">
                        <label htmlFor="">
                          Currency <span className="text-red">*</span>
                        </label>
                        <Select
                          
                          name="currency"
                          options={currencyOption}
                           value={currencyOption.find((item) => item.value === currency)}
                          onChange={(event) => {
                            setCurrency(event.value);
                          }}
                        />
                         
                        <p className="text-light">
                          Select the default Select the default currency
                        </p>
                      </div>
                      <div className="form__buttons__row d-flex align-items-center justify-content-between">
                        <button className="common__btn" type="submit">
                          Save Changes
                        </button>
                        <button className="common__btn gray-btn">Canel </button>
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
