import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
export default class AppConfiguation extends Component {
  render() {
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
                <div className="form__card__title border-0">
                  Get Started with SourceHQ
                </div>
              </div>
              <div className="form__card__body__wrapper">
                <div className="form__card__body__wrapper__title">
                  <p>General</p>
                </div>
                <div className="general__card__wrapper">
                  <div className="general__card__item">
                    <div className="general__card__icon">
                      <img src="assets/img/id-card.svg" alt="" />
                    </div>
                    <div className="general__item__content">
                      <h6>Permissions and access</h6>
                      <p>
                        <Link to={"/member"} className="text-link">
                          Manage employee access in SoureHQ
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="general__card__item">
                    <div className="general__card__icon">
                      <img src="assets/img/id-card.svg" alt="" />
                    </div>
                    <div className="general__item__content">
                      <h6>Account settings</h6>
                      <p>
                        <Link to={"/primary-setup"} className="text-link">
                          Manage account
                        </Link>
                        <Link to={"/account-owner"} className="text-link">
                          Company details
                        </Link>
                        <Link to={"/language-currency"} className="text-link">
                          Language and currency
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="general__card__item">
                    <div className="general__card__icon">
                      <img src="assets/img/id-card.svg" alt="" />
                    </div>
                    <div className="general__item__content">
                      <h6>Company structure</h6>
                      <p>
                        <Link to={"/member"} className="text-link">
                          Teams
                        </Link>
                        <Link to={"/location"} className="text-link">
                          Locations
                        </Link>
                        <Link to={"/position"} className="text-link">
                          Positions
                        </Link>
                        <Link to={"/category"} className="text-link">
                          Category
                        </Link>
                        <Link to={"/hiretype"} className="text-link">
                          Hire Type
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="general__card__item">
                    <div className="general__card__icon">
                      <img src="assets/img/id-card.svg" alt="" />
                    </div>
                    <div className="general__item__content">
                      <h6>Documents</h6>
                      <p>
                        <Link to={""} className="text-link">
                          Company folders
                        </Link>
                        <Link to={""} className="text-link">
                          Employee folders
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="general__card__item">
                    <div className="general__card__icon">
                      <img src="assets/img/id-card.svg" alt="" />
                    </div>
                    <div className="general__item__content">
                      <h6>Attendance</h6>
                      <p>
                        <Link to={""} className="text-link">
                          Work schedules
                        </Link>
                        <Link to={""} className="text-link">
                          Projects
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="general__card__item">
                    <div className="general__card__icon">
                      <img src="assets/img/id-card.svg" alt="" />
                    </div>
                    <div className="general__item__content">
                      <h6>Time off</h6>
                      <p>
                        <Link to={""} className="text-link">
                          Policies
                        </Link>
                        <Link to={""} className="text-link">
                          Types
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="general__card__item">
                    <div className="general__card__icon">
                      <img src="assets/img/id-card.svg" alt="" />
                    </div>
                    <div className="general__item__content">
                      <h6>Expenses</h6>
                      <p>
                        <Link to={""} className="text-link">
                          Categories
                        </Link>
                      </p>
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
}
