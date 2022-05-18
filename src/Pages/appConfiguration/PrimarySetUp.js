import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
export default function PrimarySetUp() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    await axios
      .get(`/SetUpPrimaryData`, {
        headers: headers,
      })
      .then(({ data }) => {
        setData(data.client_business);
      })
      .catch(({ response: { data } }) => {
        console.log(data);
      });
  };
  let imgs = data["logo"];
  console.log(data);
  if (data['vat_tax_id'] === null) {
    navigate("/account-owner");
  } 
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
                <div className="form__card__title border-0">
                  Get Started with SourceHQ
                </div>
              </div>
              <div className="form__card__title__wrap__btn">
                <Link to={"/account-owner"} className="common__btn btn-bordered">Edit</Link>
              </div>
            </div>
            <div className="form__card__flex__right">
              <div className="form__card__body__wrapper">
                <div className="profile__setup__area">
                  <div className="profile__setup__top text-center">
                    <div className="profile__setup__thumbnail">
                      <img src={imgs} alt="NDFS" />
                    </div>
                    <h4>{data["sub_domain"]}</h4>
                    <p>
                      These are the legal entities for your company, check that
                      <br /> the information is correct and fill in what is
                      missing.
                    </p>
                  </div>
                  <div className="profile__data__list">
                    <li>
                      <div className="profile__data__list__left">
                        Company name
                      </div>
                      <div className="profile__data__list__right">
                        {data["business_name"]}
                      </div>
                    </li>
                    <li>
                      <div className="profile__data__list__left">
                        SourceHQ HR subdomain
                      </div>
                      <div className="profile__data__list__right">
                        {data["sub_domain"]}
                      </div>
                    </li>
                    <li>
                      <div className="profile__data__list__left">
                        Language and format
                      </div>
                      <div className="profile__data__list__right">
                        {data["language"]}
                      </div>
                    </li>
                    <li>
                      <div className="profile__data__list__left">
                        Company number
                      </div>
                      <div className="profile__data__list__right">
                        {data["company_number"]}
                      </div>
                    </li>
                    <li>
                      <div className="profile__data__list__left">
                        VAT number
                      </div>
                      <div className="profile__data__list__right">
                        {data["vat_tax_id"]}
                      </div>
                    </li>
                    <li>
                      <div className="profile__data__list__left">
                        Founding year
                      </div>
                      <div className="profile__data__list__right">
                        {data["founding_year"]}
                      </div>
                    </li>
                    <li>
                      <div className="profile__data__list__left">
                        Mission statement
                      </div>
                      <div className="profile__data__list__right">
                        {data["business_mission"]}
                      </div>
                    </li>
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
