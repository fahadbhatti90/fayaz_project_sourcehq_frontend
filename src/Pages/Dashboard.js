import React, { Component } from 'react'
import { DashboardSidebar } from '../Component/layout/DashboardSidebar';
import { Link } from "react-router-dom";
import { DasboardHeader } from '../Component/layout/DasboardHeader';
import { Breadcrumb } from '../Component/layout/Breadcrumb';

export default class Dashboard extends Component {
  render() {
    return (
      <>
        
        <DashboardSidebar />
        <main className="main__area">
          <DasboardHeader />
          <Breadcrumb />
           <section className="main__wrapper">
            <div className="form__card">
                <div className="form__card__title">
                    Get Started with SourceHQ
                </div>
                <div className="list-group">
                    <li className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="list__group__left d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"  />
                            </div>
                            <p><del>Sign up for your SourceHQ Trial</del></p>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="list__group__left d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                            <p>Set up teams <Link to={""}><img src="assets/img/external-link.svg" alt="" /></Link></p>
                        </div>
                        <div className="list__group__right">
                            Add teams and assign them to your employees
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="list__group__left d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                            <p>Set up locations <Link to={""}><img src="assets/img/external-link.svg" alt="" /></Link></p>
                        </div>
                        <div className="list__group__right">
                            Add company locations and select public holidays
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="list__group__left d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                            <p>Set up positions <Link to={""}><img src="assets/img/external-link.svg" alt="" /></Link></p>
                        </div>
                        <div className="list__group__right">
                            Add positions and assign them to your employees
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="list__group__left d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                            <p> Set up time off policies <Link to={""}><img src="assets/img/external-link.svg" alt="" /></Link>
                            </p>
                        </div>
                        <div className="list__group__right">
                            Add time off policies and manage time off usage in your company
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="list__group__left d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                            <p>Set up work schedules <Link to={""}><img src="assets/img/external-link.svg" alt="" /></Link></p>
                        </div>
                        <div className="list__group__right">
                            Add work schedules and track working time in your company
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="list__group__left d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                            <p>Get your employees on board<Link to={""}><img src="assets/img/external-link.svg" alt="" /></Link>
                            </p>
                        </div>
                        <div className="list__group__right">
                            Add user accounts and invite your team to SourceHQ
                        </div>
                    </li>
                </div>
                <div className="form__card__body">
                    <div className="form__card__alert d-flex alert alert-dismissible mb-0">
                        <div className="form__card__alert__icon"><img src="assets/img/source-icon.svg" alt="" /></div>
                        <div className="form__alert__content">
                            <div className="form__alert__content__title">
                                SOURCE HQ . now
                            </div>
                            <p>Jane Doe if you need help with your account setting </p>
                            <small>Please reach to our Implementation Support to help you setup the instance - <Link
                                    to={""} className="text-link"> Contact Support</Link></small>
                        </div><button className="alert-close" data-bs-dismiss="alert"><i className="fal fa-times"></i></button>
                    </div>
                </div>
            </div>
        </section>
        </main>
      </>
    )
  }
}
