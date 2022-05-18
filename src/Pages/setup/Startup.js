import React, { Component } from "react";
import axios from "../../Component/axios";
import { Header } from "../../Component/layout/Header";
import Messages from "../../Component/Messages";
import { Navigate } from "react-router-dom";
export default class Startup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        business_name: "",
        business_url: "",
        crm_business: "",
        business_phone: "",
        career_portal: "",
        sub_domain: "sourchq.app",
      },
      redirect: false,
      success: "",
      errMsg: "",
      msg: {},
      business_groups: [],
      isError: {
        business_name: "",
        business_url: "",
        crm_business: "",
        business_phone: "",
        career_portal: "",
        sub_domain: "",
      },
    };

    axios.post(`/get_business_groups`).then(({ data }) => {
      this.setState({
        business_groups: [...data.general_setting],
      });
    });
  }
  onChangehandler = (e) => {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
    let isError = { ...this.state.isError };
    switch (e.target.name) {
      case "business_url":
        isError.business_url = e.target.value.match(
          new RegExp("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")
        )
          ? ""
          : "Invalid Url";
        break;
      // case "career_portal":
      //   isError.career_portal = e.target.value.match(
      //     new RegExp("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")
      //   )
      //     ? ""
      //     : "Invalid Url";
      //   break;

      default:
        break;
    }
    this.setState({ isError });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (
      this.state.isError.business_url === "" 
    ) {
      axios
        .post(`/submit_business`, this.state.formData, {
          headers: headers,
        })
        .then((response) => {
          // this.setState({ isLoading: false });
          if (response.data.status === 200) {
            this.setState({
              success: response.data.message,
              redirect: true,
            });
            // window.location = "/dashboard";
          } else if (response.data.status === "validation_failed") {
            let isMsg = { ...response.data.errors };
            this.setState({ errors: isMsg });
            setTimeout(() => {
              this.setState({ errors: {} });
            }, 6000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    const login = localStorage.getItem("isLoggedIn");
    if (!login) {
      return <Navigate to="/" />;
    }
    const { isError } = this.state;

    let types = this.state.business_groups.map((item, index) => {
      return (
        <option value={item.id} key={index}>
          {item.label_name}
        </option>
      );
    });
    if (this.state.redirect) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <>
        <Header />
        <section className="form__area">
          <div className="container">
            <div className="form__card">
              <div className="form__card__title">Get Started with SourceHQ</div>
              <div className="form__card__body">
                <Messages
                  errMsg={this.state.errMsg}
                  success={this.state.success}
                  validation={this.state.errors}
                />
                <form>
                  <div className="single__input__item">
                    <label htmlFor="">Your Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      className="form-control"
                      value={this.state.formData.business_name}
                      onChange={this.onChangehandler}
                    />
                  </div>
                  <div className="single__input__item">
                    <label htmlFor=""> Business Website URL</label>
                    <input
                      type="text"
                      name="business_url"
                      className={
                        isError.business_url.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="https://www."
                      value={this.state.formData.business_url}
                      onChange={this.onChangehandler}
                    />
                    {isError.business_url.length > 0 && (
                      <span className="invalid-feedback">
                        {isError.business_url}
                      </span>
                    )}
                  </div>
                  <div className="single__input__item">
                    <label htmlFor=""> Select your Business </label>
                    <select
                      className="form-select dropdownSelect"
                      name="crm_business"
                      aria-label="Default select example"
                      value={this.state.formData.crm_business}
                      onChange={this.onChangehandler}
                    >
                      <option value="">Select Busniss type</option>
                      {types}
                    </select>
                  </div>
                  <div className="single__input__item">
                    <label htmlFor=""> Your Mobile Number</label>
                    <input
                      type="text"
                      name="business_phone"
                      className="form-control"
                      value={this.state.formData.business_phone}
                      onChange={this.onChangehandler}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-7">
                      <div className="single__input__item">
                        <label htmlFor=""> Career Portal</label>
                        <input
                          type="text"
                          name="career_portal"
                          className= "form-control"
                          
                          placeholder="https://www."
                          value={this.state.formData.career_portal}
                          onChange={this.onChangehandler}
                        />
                       
                      </div>
                    </div>
                    <div className="col-sm-5">
                      <div className="single__input__item">
                        <label htmlFor=""> Domain</label>
                        <input
                          type="text"
                          name="sub_domain"
                          className="form-control"
                          readOnly
                          value="sourchq.app"
                          placeholder="sourchq.app"
                          // value={this.state.formData.sub_domain}
                          // onChange={this.onChangehandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form__submit__btn pt-3">
                    <button
                      className="common__btn"
                      onClick={this.onSubmitHandler}
                    >
                      Continue to Setup your account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
