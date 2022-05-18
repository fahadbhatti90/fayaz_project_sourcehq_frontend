import React, { Component } from "react";
import axios from "../../Component/axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Messages from "../../Component/Messages";
import SideBanner from "../../Component/SideBanner";

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmation:"",
      msg: "",
      redirect: false,
      success: "",
      errors: {},
      errMsg: "",
      token: "",
      isError: {
        email: "",
        password: "",
      },
    };
  }

  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
     let isError = { ...this.state.isError };
    switch (e.target.name) {
      case "email":
        isError.email = e.target.value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        )
          ? ""
          : "Email address is invalid";
        break;
      case "password":
        isError.password =
          e.target.value.length < 6 ? "Atleast 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ isError });
  };

  onSignInHandler = (e) => {
    e.preventDefault();
    if (this.state.isError.email === "" && this.state.isError.password === "") {
      axios
        .post("/client-login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((response) => {
          // this.setState({ isLoading: false });
          if (response.data.status === 200) {
            localStorage.clear();
            if (response.data.data.isConfirmed !== 0) {
              
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("userData", JSON.stringify(response.data.data));
              localStorage.setItem("token", JSON.stringify(response.data.token));
              this.setState({
                success: response.data.message,
                redirect: true,
          
              });
              // window.location = "/dashboard";
            } else if (response.data.data.isConfirmed === 0) {
              localStorage.setItem("confirmation", JSON.stringify(response.data.data.id));
              this.setState({
                success: response.data.message,
                redirect: true,
                confirmation: response.data.data.id,
          
              });
            }
              
            
            return <Navigate to="/dashboard" />;
          }
          if (response.data.status === "validation_failed") {
            let isMsg = { ...response.data.validation_error };
            this.setState({ errors: isMsg });
            setTimeout(() => {
              this.setState({ errors: {} });
            }, 6000);
          } else if (response.data.status === "failed") {
            this.setState({
              errMsg: response.data.message,
            });
            setTimeout(() => {
              this.setState({ errMsg: "" });
            }, 6000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    if (this.state.redirect && this.state.confirmation === "") {
      return <Navigate to="/dashboard" />;
    } else if (this.state.redirect && this.state.confirmation !== "") {
      return <Navigate to="/confirmation" />;
    }
     const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Navigate to="/dashboard" />;
    }
    
    const { isError } = this.state;
   
    // const isLoading = this.state.isLoading;
    return (
      <>
        <section className="form__area d-flex pt-0 pb-0 min-vh-100">
          <div className="form__area__left">
            <div className="form__page__top d-flex align-items-center justify-content-between">
             <SideBanner />
              <p>
                New Member -
                <Link to="/sign-up" className="text-link">
                  Sign Up
                </Link>
              </p>
            </div>

            <form>
              <h4> Sign In</h4>

              <Messages
                errMsg={this.state.errMsg}
                success={this.state.success}
                validation={this.state.errors}
              />

              <div className="row pt-3">
                <div className="col-md-12">
                  <div className="single__input__item">
                    <label htmlFor=""> Your email address </label>
                    <input
                      type="email"
                      name="email"
                      className={
                        isError.email.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChangehandler}
                    />
                    {isError.email.length > 0 && (
                      <span className="invalid-feedback">{isError.email}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single__input__item">
                    <label htmlFor="">Password </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                       className={
                        isError.password.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      value={this.state.password}
                      onChange={this.onChangehandler}
                    />
                    {isError.password.length > 0 && (
                      <span className="invalid-feedback">
                        {isError.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form__submit__btn pt-2">
                    <button
                      className="common__btn"
                      onClick={this.onSignInHandler}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <Link to="/reset" className="text-link">
                    Request password reset
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="form__area__right">
            <div className="form__area__content">
              <p>
                Connect Employers & <br /> Talent on One Platform
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
}
