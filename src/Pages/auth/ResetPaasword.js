import React, { Component } from "react";
import axios from "../../Component/axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SideBanner from "../../Component/SideBanner";
import Messages from "../../Component/Messages";

export default class ResetPaasword extends Component {
  constructor(props) {
    super(props);
    const pathArray = window.location.pathname.split("/");
    const id = pathArray[2];
    this.state = {
      password: "",
      msg: "",
      errMsg: "",
      token: id,
      redirect: false,
      errors: {},
      isError: {
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
      case "password":
        isError.password =
          e.target.value.length < 6 ? "Atleast 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ isError });
  };

  onResetHandler = (e) => {
    e.preventDefault();
    if (this.state.isError.password === "") {
      axios
        .post("/reset_password_with_token", {
          password: this.state.password,
          token: this.state.token,
        })
        .then((response) => {
          if (response.data.status === 200) {
            this.setState({
              msg: response.data.message,
            });
            setTimeout(() => {
              this.setState({ msg: "", redirect: true });
            }, 6000);
            return <Navigate to="/" />;
          }
          if (response.data.status === "validation_failed") {
            let isMsg = { ...response.data.errors };
            this.setState({
              errors: isMsg,
            });
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
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }
    const { isError } = this.state;
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Navigate to="/dashboard" />;
    }
    return (
      <>
        <section className="form__area d-flex pt-0 pb-0 min-vh-100">
          <div className="form__area__left">
            <div className="form__page__top d-flex align-items-center justify-content-between">
              <SideBanner />
              <p>
                Already a Member -
                <Link to="/" className="text-link">
                  Sign In
                </Link>
              </p>
            </div>
            <form>
              <h4> Password reset</h4>
              <Messages
                errMsg={this.state.errMsg}
                success={this.state.msg}
                validation={this.state.errors}
              />

              <div className="row pt-3">
                <div className="col-md-12">
                  <div className="single__input__item">
                    <label htmlFor=""> Enter your new Password </label>
                    <input
                      type="password"
                      name="password"
                      className={
                        isError.password.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your new Password"
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
                      onClick={this.onResetHandler}
                      className="common__btn"
                    >
                      Request Reset
                    </button>
                  </div>
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
